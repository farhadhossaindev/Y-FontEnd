import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";
import Register from "./pages/Auth/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDhshboard from "./pages/Admin/AdminDhshboard";
import AdminProfile from "./pages/Admin/AdminProfile";
import AddCategory from "./pages/Admin/AddCategory";
import AddProduct from "./pages/Admin/AddProduct";
import AllUsers from "./pages/Admin/AllUsers";
import UserProfile from "./pages/user/UserProfile";
import UserOrder from "./pages/user/UserOrder";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import SingleProduct from "./pages/SingleProduct";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import { Card } from "./pages/Card";
import AdminOrder from "./pages/Admin/AdminOrder";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/card" element={<Card />} />
        <Route path="/categories/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/order" element={<UserOrder />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDhshboard />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/addcategory" element={<AddCategory />} />
          <Route path="admin/addproduct" element={<AddProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/allusers" element={<AllUsers />} />
          <Route path="admin/all-orders" element={<AdminOrder />} />
        </Route>

        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
