import React, { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

function UserOrder() {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/auth/orders');
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);


    return (
        <Layout>
            <div className='flex '>
                <div className='w-[20%] bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
                    <UserMenu />
                </div>
                <div className='overflow-x-auto w-[80%] mx-5'>

                    <h1 className='text-center mt-5 text-3xl font-semibold'>All Orders</h1>

                    {
                        orders.length > 0 ? ( // Check if orders array is not empty
                            orders.map((o, i) => (
                                <div className='border shadow-lg mb-5' key={o._id}>
                                    <table className='table'>
                                        <thead >
                                            <tr>
                                                <th>SL</th>
                                                <th>Status</th>
                                                <th>Buyer</th>
                                                <th>Date</th>
                                                <th>Payment</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr key={o._id}>
                                                <td>{i + 1}</td>
                                                <td>{o.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? 'Success' : 'Faild'}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div>

                                        {o?.products?.map((p, j) => (
                                            <div className='flex gap-5 mb-5 bg-yellow-300' key={p._id + j}>
                                                <div className='w-[100px]'>
                                                    <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                                </div>
                                                <div className='w-[60%] pt-2 '>
                                                    <p className='text-2xl font-semibold'>{p.name}</p>
                                                    <p className='text-xl'>TK : {p.price}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No orders available.</p> // Display a message if orders array is empty
                        )
                    }

                </div>
            </div>
        </Layout>
    );
}

export default UserOrder;
