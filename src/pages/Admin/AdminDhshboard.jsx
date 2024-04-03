import Layout from '../../components/Layout'
import '../../App.css'
import AdminMenu from './AdminMenu';

function AdminDhshboard() {

    return (
        <Layout>
            <div className='flex '>
                <div className='w-[20%]  bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
                    <AdminMenu />
                </div>

                <div className='w-[80%] pl-6'>
                    DashBoard
                </div>
            </div>
        </Layout>
    )
}

export default AdminDhshboard