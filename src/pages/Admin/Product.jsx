import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import Layout from '../../components/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Product = () => {
    const [products, setProducts] = useState([])

    //Get all product
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/get-product')
            setProducts(data.products);
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong')
        }
    }


    //lifecycle hooks method
    useEffect(() => {
        getAllProducts()

    }, [])



    return (
        <Layout>
            <div className='flex '>
                <div className='w-[20%]  bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
                    <AdminMenu />
                </div>

                <div className='w-[80%]'>
                    <div className='text-3xl  text-center font-semibold pt-4'>
                        Product List
                    </div>
                    <div className='flex flex-wrap gap-3 justify-center py-5'>
                        {products?.map(p => (
                            <div key={p._id}>
                                <Link to={`/dashboard/admin/products/${p.slug}`}>
                                    <div className="card w-96 bg-base-100 shadow-xl">
                                        <figure><img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {p.name}
                                                <div className="badge badge-secondary cursor-pointer">TK {p.price}</div>
                                            </h2>
                                            <p>{p.description.substring(0, 30)}...</p>
                                            <div className="card-actions justify-end">
                                                <div className="badge badge-outline">{p.quantity}</div>
                                                <div className="badge badge-outline">{p.category.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Product