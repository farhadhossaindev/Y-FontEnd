import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { prices } from '../components/prices';

function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Function to get all categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to get total count of products
    const getTotal = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/product-count');
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data.products]);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // Function to load more products
    const loadMore = () => {
        setPage(page + 1);
    };

    // Function to filter products
    const filterProduct = async () => {
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/product/product-filter', { checked, radio });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Event handler for category filter
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    };

    // Effect to fetch categories and total count on component mount
    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    // Effect to load products when page changes
    useEffect(() => {
        getAllProducts();
    }, [page]);

    // Effect to filter products when category or price changes
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
        else filterProduct();
    }, [checked, radio]);

    return (
        <Layout title={'Shop'}>
            <div className="row flex">
                <div className="col w-3/12">
                    {/* Category filter */}
                    <div>
                        <h1 className='text-center py-4 text-xl font-semibold'>Filter by Category</h1>
                        {categories.map(c => (
                            <div className="form-control ml-10" key={c._id}>
                                <label className="label cursor-pointer justify-start gap-5">
                                    <input type="checkbox" className="checkbox" onChange={(e) => handleFilter(e.target.checked, c._id)} />
                                    <span className="label-text">{c.name}</span>
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Price filter */}
                    <div>
                        <h1 className='text-center py-4 text-xl font-semibold'>Filter by Price</h1>
                        {prices.map(p => (
                            <div className='flex justify-start gap-5 py-1 ml-10' key={p.name}>
                                <input value={p.array} type="radio" name="radio-1" className="radio" onChange={() => setRadio(p.array)} />
                                <span>{p.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Reset filters button */}
                    <div className=' ml-10 mt-5'>
                        <button className='btn btn-warning' onClick={() => window.location.reload()}>Reset Filters</button>
                    </div>
                </div>

                <div className="col w-3/4">
                    {/* Product cards */}
                    <h1 className='text-center text-3xl py-4 font-bold'>All Product</h1>
                    <div className='flex flex-wrap gap-3 justify-center py-5'>
                        {products.map(p => (
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
                                        <button className="btn bg-slate-600 text-white ">Read More</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Load more button */}
                    <div className='m-2 p-3'>
                        {products.length < total && (
                            <button className='btn btn-warning' onClick={loadMore}>{loading ? 'Loading...' : 'Load More'}</button>
                        )}
                    </div>
                </div>

            </div>
        </Layout>
    );
}

export default Shop;
