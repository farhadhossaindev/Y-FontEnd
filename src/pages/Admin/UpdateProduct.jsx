import Layout from '../../components/Layout'
import '../../App.css'
import AdminMenu from './AdminMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Select } from 'antd';



const UpdateProduct = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const [photo, setPhoto] = useState('')
    const navigate = useNavigate()
    const params = useParams()
    const [id, SetId] = useState('')

    //get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
            const product = data.product;

            // Update state with product details
            setName(product.name);
            SetId(data.product._id)
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category._id);
            setQuantity(product.quantity);
            setShipping(product.shipping);
            // You might need additional logic based on your data structure

        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getSingleProduct()
    }, [])


    // get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);

            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong fetching categories');
        }
    }


    useEffect(() => {
        getAllCategory()
    }, [])

    //Creat product funtion
    // Update product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            photo && productData.append('photo', photo);
            productData.append('category', category);

            const { data } = await axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`, productData);

            if (data.success) {
                toast.success('Product Updated successfully');
                navigate('/dashboard/admin/products')
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    //Delete product
    const handleDelete = async () => {
        try {
            let answer = window.prompt("If you want delete this product type here ' yes '")
            if (!answer) return;
            const { data } = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`)
            toast.success("Product Deleted Succfully");
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error)
            toast.error('Somthing Went wrong')
        }
    }


    return (
        <Layout>
            <div className='flex '>
                <div className='w-[20%]  bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
                    <AdminMenu />
                </div>

                <div className='w-[80%] pl-6 my-8'>
                    <div className='text-3xl text-center pt-3 font-medium'>Update Product</div>

                    <div className="m-1 flex justify-center mt-5">
                        <Select
                            className="input input-bordered input-warning w-full max-w-xs"
                            defaultValue="Select Category"
                            showSearch
                            onChange={(value) => setCategory(value)}
                            value={category}
                        >
                            <option disabled>Select Category</option>
                            {categories.map(c => (
                                <option value={c._id} key={c._id} >{c.name}</option>

                            ))}

                        </Select>
                    </div>


                    <div className='flex justify-center mt-5'>
                        <label className='btn bg-yellow-300 w-2/6 '>
                            {photo ? photo.name : "Upload photo"}
                            <div className='flex justify-center mt-5'>
                                <input type="file"
                                    name='photo'
                                    accept='image/*'
                                    value={photo}
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </div>
                        </label>
                    </div>
                    <div>
                        {photo ? (
                            <div>
                                <img src={URL.createObjectURL(photo)} alt="product photo" className='h-52 mx-auto' />
                            </div>
                        ) : (
                            <div>
                                <img src={`http://localhost:8080/api/v1/product/product-photo/${id}`} alt="product photo" className='h-52 mx-auto' />
                            </div>
                        )}
                    </div>

                    <div className='flex justify-center mt-5'>
                        <input type="text" placeholder="Product Title" className="input input-bordered input-warning w-full max-w-xs"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-center mt-5'>
                        <textarea type="text" placeholder="Product Description" className="input input-bordered input-warning w-full max-w-xs"
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-center mt-5'>
                        <input type="number" placeholder="Product Price" className="input input-bordered input-warning w-full max-w-xs"
                            value={price} onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-center mt-5'>
                        <input type="number" placeholder="Product Quantity" className="input input-bordered input-warning w-full max-w-xs"
                            value={quantity} onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>


                    <div className='flex justify-center mt-5'>
                        <select className="select select-warning w-full max-w-xs" onChange={(value) => { setShipping(value) }}
                            value={shipping ? '1' : '0'}
                        >
                            <option disabled >Select Shipping</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>

                    </div>

                    <div className='flex justify-center mt-5'>
                        <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                    </div>

                    <div className='flex justify-center mt-5'>
                        <button className='btn bg-red-500  text-white' onClick={handleDelete}>Delete Product</button>
                    </div>


                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct