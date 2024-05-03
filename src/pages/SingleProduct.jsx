import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function SingleProduct() {
    const params = useParams()
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([])

    // Initial details
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error)
        }
    }

    // get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product//related-product/${pid}/${cid}`)
            setRelatedProduct(data?.product);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className="card card-side  w-[60%] mx-auto h-[70vh] bg-slate-300 mt-5 ">
                <img src={`http://localhost:8080/api/v1/product/product-photo/${product?._id}`} alt={product?.name} />
                <div className='flex flex-col gap-5 mx-auto  items-center justify-center' >
                    <h2 className='text-3xl'>Product Details</h2>
                    <h2 className="card-title">{product?.name}</h2>
                    <p>{product?.description}</p>
                    <p>Price $ {product?.price}</p>
                    <div>Category: {product?.category?.name}</div>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Add to Card</button>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-center py-5 text-3xl font-semibold'>Similar Product</h2>
                {relatedProduct.length < 1 && (<p>No Similar Porducts Found</p>)}
                <div className='flex flex-wrap gap-3 justify-center py-5'>
                    {relatedProduct.map(p => (
                        <div className="card w-96 bg-base-100 shadow-xl cursor-pointer" key={p._id}>
                            <figure><img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {p.name}
                                    <div className="badge badge-secondary">TK {p.price}</div>
                                </h2>
                                <p>{p.description?.substring(0, 30)}...</p>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">{p.quantity}</div>
                                    <div className="badge badge-outline">{p.category.name}</div>
                                </div>
                                <div className='flex gap-20 justify-center py-5'>
                                    <button className="btn bg-primary text-white ">Add to Card</button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default SingleProduct;
