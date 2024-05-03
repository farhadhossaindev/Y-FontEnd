import React from 'react'
import Layout from '../components/Layout'
import useCategory from '../hooks/UseCategory'
import { Link } from 'react-router-dom';

const Categories = () => {

    const categories = useCategory();

    return (
        <Layout title={'All Categories'}>
            <div className='flex justify-center items-center h-[80vh] gap-5 flex-wrap'>
                {categories.map((c) => (
                    <Link to={`/categories/${c.slug}`} key={c._id} className='bg-black text-white px-2 py-2 rounded-md'>{c.name}</Link>
                ))}
            </div>

        </Layout>
    )
}

export default Categories