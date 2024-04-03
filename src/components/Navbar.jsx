import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { toast } from 'react-toastify';



function Navbar() {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth');
    toast.success('Logout Successfully')
  }
  return (
    <>



      <div className="navbar bg-black text-white uppercase font-[serif] shadow-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/shop'}>Shop</Link></li>
              <li><Link to={'/privacy-policy'}>Category</Link></li>

            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/shop'}>Shop</Link></li>
            <li><Link to={'/privacy-policy'}>Category</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          {
            !auth.user ? (<>
              <Link to={'/login'}><h1 className='bg-yellow-400 text-black px-5 py-3 rounded font-bold cursor-pointer '>Login</h1></Link>
              <Link to={'/register'}> <h1 className='bg-yellow-400 text-black px-5 py-3 rounded font-bold cursor-pointer '>Register</h1></Link>
            </>) :
              (<>





                <ul className="menu menu-horizontal ">
                  <li>
                    <details>
                      <summary className='bg-yellow-400 text-black px-5 py-3 rounded font-bold cursor-pointer hover:bg-yellow-400 '>
                        <h1>{auth?.user?.name}</h1>
                      </summary>
                      <ul className=" w-full bg-black rounded-t-none">
                          <li><Link className='mx-auto' to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</Link></li>
                          <li><Link className='mx-auto' to={'/login'} onClick={handleLogout}> Logout</Link></li>
                      </ul>
                    </details>
                  </li>
                </ul>




              </>)
          }


          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg text-black">8 Items</span>
                <span className="text-yellow-700">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn bg-yellow-400 btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



    </>
  )
}

export default Navbar