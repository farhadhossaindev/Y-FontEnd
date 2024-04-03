import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Layout title={'Page not Found'}>
      <div className='flex justify-center items-center h-[80vh] flex-col gap-5'>
        <h1 className='text-9xl font-semibold font-[sans-serif]'>404</h1>
        <h2 className='text-3xl font-semibold'>Oops ! Page Not Found</h2>
        <Link to={'/'}><button className='btn bg-yellow-400'>Go Back</button></Link>
      </div>
    </Layout>
  )
}

export default NotFound