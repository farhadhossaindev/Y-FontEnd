import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useCard } from '../context/Card';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { toast } from 'react-toastify';

export const Card = () => {
    const [auth, setAuth] = useAuth();
    const [card, setCard] = useCard();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Remove product from cart
    const removeCardItem = (pid) => {
        try {
            let myCard = [...card];
            let index = myCard.findIndex(item => item._id === pid);
            myCard.splice(index, 1);
            setCard(myCard);
            localStorage.setItem('card', JSON.stringify(myCard));
        } catch (error) {
            console.log(error);
        }
    };

    // Get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    // Total price
    const totalPrice = () => {
        try {
            let total = 0;
            card?.map(item => { total = total + item.price; });
            return total.toLocaleString('en-US', { style: 'currency', currency: "USD" });
        } catch (error) {
            console.log(error);
        }
    };

    // Handle payment
    const handlePayment = async () => {
        try {

            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();

            // Extract only necessary data from card items
            const simplifiedCard = card.map(item => ({
                _id: item._id,
                quantity: item.quantity, // Assuming there's a quantity property
                // Add other necessary properties here
            }));

            // Prepare data for the request
            const requestData = {
                nonce: nonce,
                cart: simplifiedCard,
            };

            // Send the simplified data to the server
            const response = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", requestData);

            setLoading(false);
            localStorage.removeItem("card");
            setCard([]);
            navigate('/dashboard/user/order');
            console.log("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className='text-center text-xl'>
                <h2 className='text-center text-2xl mt-5'>{`Hello ${auth?.token && auth?.user?.name}`}</h2>
                <h4>{card?.length
                    ? `You have ${card.length} items in your card ${auth?.token ? "" : 'Please login to checkout'
                    }`
                    : 'Your Card is Empty'}</h4>
            </div>

            <div className='flex mx-10 gap-[10%] mt-5'>
                <div className='w-[60%] '>
                    {card?.map(p => (
                        <div className='flex  gap-5 mb-5 bg-yellow-300' key={p._id}>
                            <div className='w-[100px]'><img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} /></div>
                            <div className='w-[60%] pt-2 '>
                                <p className='text-2xl font-semibold'>{p.name}</p>
                                <p className='text-xl'>TK : {p.price}</p>
                                <p>{p.description.substring(0, 30)}</p>
                                <button className=' bg-red-600 px-2 py-1 mt-2 rounded-md text-white' onClick={() => removeCardItem(p._id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-[30%] '>
                    <h2 className='text-center text-2xl font-semibold'>Card Summary</h2>
                    <p className='text-center mt-2 text-xl border-b-2 pb-3'>Total | checkout | Payment</p>
                    <p className='mt-2 text-xl '>Total : {totalPrice()}</p>
                    {auth.user?.address ? (
                        <div>
                            <div>Current Address</div>
                            <h4>{auth?.user?.address}</h4>
                            <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}> Update Address</button>
                        </div>
                    ) : (
                        <div>{auth?.token ? (
                            <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                        ) : (
                            <button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: '/card', })}>Please login to checkout</button>
                        )}</div>
                    )}

                    <div className="mt-2 flex flex-col mb-5">
                        {!clientToken || !card?.length ? (
                            ""
                        ) : (
                            <>
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: "vault",
                                        },
                                    }}
                                    onInstance={(instance) => setInstance(instance)}
                                />

                                <button
                                    className="btn btn-primary text-white"
                                    onClick={handlePayment}
                                    disabled={loading || !instance || !auth?.user?.address}
                                >
                                    {loading ? "Processing ...." : "Make Payment"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};



