import Layout from '../../components/Layout'
import '../../App.css'
import AdminMenu from './AdminMenu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
const { Option } = Select

function AddProduct() {


  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState('')
  const [photo, setPhoto] = useState('')
  const navigate = useNavigate()


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
  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantity', quantity);
      productData.append('photo', photo);
      productData.append('category', category);
      productData.append('shipping', shipping);

      const { data } = await axios.post('http://localhost:8080/api/v1/product/create-product', productData);

      if (data.success) {
        toast.success('Product Created successfully');
        navigate('/dashboard/admin/products')
       
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <div className='flex '>
        <div className='w-[20%]  bg-yellow-300 overflow-auto pt-5 min-h-[80vh] '>
          <AdminMenu />
        </div>

        <div className='w-[80%] pl-6 my-8'>
          <div className='text-3xl text-center pt-3 font-medium'>Manage Product</div>


          <div className="m-1 flex justify-center mt-5">
            <Select
              className='w-[35%]'
              defaultValue="Select Category"
              showSearch
              onChange={(value) => setCategory(value)}
            >
              <Select.Option disabled>Select Category</Select.Option>
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
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden


                />
              </div>
            </label>
          </div>
          <div>
            {photo && (
              <div>
                <img src={URL.createObjectURL(photo)} alt="product photo" className='h-52 mx-auto' />
              </div>
            )}
          </div>

          <div className='flex justify-center mt-5'>
            <input type="text" placeholder="Product Title" className="input input-bordered input-warning w-full max-w-xs"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='flex justify-center mt-5'>
            <textarea type="text" placeholder="Product Description" className="input input-bordered input-warning w-full max-w-xs"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='flex justify-center mt-5'>
            <input type="number" placeholder="Product Price" className="input input-bordered input-warning w-full max-w-xs"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className='flex justify-center mt-5'>
            <input type="number" placeholder="Product Quantity" className="input input-bordered input-warning w-full max-w-xs"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>


          <div className='flex justify-center mt-5'>
            <select
              className='w-[30%]'
              onChange={(e) => setShipping(e.target.value)}
            >
              <option>Select Shipping</option>
              <option value="0">No</option>
              <option value="1">Yes</option>

            </select>

          </div>

          <div className='flex justify-center mt-5'>
            <button className='btn btn-primary' onClick={handleCreate}>Creat Product</button>
          </div>


        </div>
      </div>
    </Layout>
  )
}

export default AddProduct