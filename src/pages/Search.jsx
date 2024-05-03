
import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [values, setvalues] = useSearch()
    const navigate = useNavigate()
    return (
        <Layout title={'Search Result'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Result</h1>
                    <h6>{values?.result.length < 1 ? 'No product Found' : `Found ${values?.result.length}`}</h6>

                    <div className='flex flex-wrap gap-3 justify-center py-5'>
                        {values.result.map(p => (
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
                                        <button onClick={() => navigate(`/product/${p.slug}`)} className="btn bg-slate-600 text-white ">Read More</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </Layout>
    )
}

export default Search