
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function CategoryProduct() {

  const params = useParams();
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])

  useEffect(() => {
    if (params?.slug) getProductByCard()
  }, [params?.slug])

  const getProductByCard = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <Layout>
      <div>
        <h1 className='text-center text-3xl mt-5 font-semibold'> Category-{category?.name}</h1>
        <h1 className='text-center text-xl pt-2'>{products.length} Result Found</h1>

        <div >
          {/* Product cards */}
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
                    <button onClick={() => navigate(`/product/${p.slug}`)} className="btn bg-slate-600 text-white ">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Load more button
          <div className='m-2 p-3'>
            {products.length < total && (
              <button className='btn btn-warning' onClick={loadMore}>{loading ? 'Loading...' : 'Load More'}</button>
            )}
          </div> */}
        </div>

      </div>
    </Layout>
  )
}

export default CategoryProduct