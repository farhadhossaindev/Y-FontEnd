import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from 'moment';
import { Select } from 'antd';
const { Option } = Select;

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"]);

    const getOrders = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/auth/all-orders');
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);


    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/auth/orders-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={'All Orders'}>
            <div className='flex'>
                <div className='w-[20%] bg-yellow-300 pt-5'>
                    <AdminMenu />
                </div>

                <div className='w-[80%] mx-5 mt-5'>
                    {orders.map((o, i) => (
                        <div className='border shadow-lg mb-5' key={o._id}>
                            <table className='table'>
                                <thead>
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
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>
                                            <Select
                                                variant="outlined"
                                                onChange={(value) => handleChange(o._id, value)}
                                                defaultValue={o?.status}
                                            >
                                                {status.map((s, i) => (
                                                    <Option key={i} value={s}>
                                                        {s}
                                                    </Option>
                                                ))}
                                            </Select>

                                        </td>
                                        <td>{o?.buyer?.name}</td>
                                        <td>{moment(o?.createAt).fromNow()}</td>
                                        <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                                        <td>{o?.products?.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                {o?.products?.map((p, index) => (
                                    <div className='flex gap-5 mb-5 bg-yellow-300' key={`${p._id}-${index}`}>
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
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default AdminOrder;
