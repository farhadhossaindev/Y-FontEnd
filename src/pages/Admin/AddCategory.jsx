import Layout from '../../components/Layout'
import '../../App.css'
import AdminMenu from './AdminMenu';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';

function AddCategory() {
    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    const [name, setName] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/category/create-category', { name })
            if (data?.success) {
                toast.success(`${name} is created`)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong in input from')
        }
    }

    //get all Category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category')
            if (data?.success) {
                setCategories(data?.category)
                getAllCategory();
            }
        } catch (error) {
            console.log(error)
            toast.error('Somthing went wrong in catting category')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    // Update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} is Updated`)
                setSelected(null)
                setUpdatedName('')
                getAllCategory()

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somthing Went worng')
        }
    }

    // Delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pId}`)
            if (data.success) {
                toast.success(`Category is Deleted`)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somthing Went worng')
        }
    }

    return (
        <Layout>
            <div className='flex '>
                <div className='w-[20%]  bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
                    <AdminMenu />
                </div>

                <div className='w-[80%] pl-6'>
                    <div className='text-3xl text-center pt-3 font-medium'>Manage Category</div>

                    <section className="mx-auto w-full max-w-7xl px-4 py-4">

                        <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        <div className="mt-6 flex flex-col">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-12 py-3.5 text-left text-2xl font-bold text-gray-700"
                                                    >
                                                        Category Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-xl font-bold text-gray-700"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {categories?.map(c => (
                                                    <tr key={c._id}>
                                                        <th className='text-left pl-20'>
                                                            {c.name}
                                                        </th>
                                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 gap-4 flex">

                                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                                            <button
                                                                className="btn bg-primary text-white"
                                                                onClick={() => {
                                                                    document.getElementById('my_modal_5').showModal();
                                                                    setUpdatedName(c.name);
                                                                    setSelected(c);
                                                                }}
                                                            >
                                                                Edit
                                                            </button>

                                                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                                <div className="modal-box">
                                                                    <h3 className="font-bold text-lg pb-5">Update Category</h3>
                                                                    <div className='mx-auto w-full'>
                                                                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                                                                    </div>

                                                                    <div className="modal-action">
                                                                        <form method="dialog">
                                                                            {/* if there is a button in form, it will close the modal */}

                                                                            <button className="btn">Close</button>

                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </dialog>

                                                            <button className="text-white font-medium bg-red-600 px-5 py-4 rounded-md "
                                                                onClick={() => handleDelete(c._id)}
                                                            >
                                                                Delete
                                                            </button>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>



                </div>
            </div>
        </Layout>
    )
}

export default AddCategory