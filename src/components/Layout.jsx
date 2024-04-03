import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children, title, description, keywords, author }) {
    return (
        <div>

            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>

            <Navbar />
            <main style={{ minHeight: '80vh' }}>
                <ToastContainer />
                {children}
            </main>
            <Footer />
        </div>
    );
}
Layout.defaultProps = {
    title: 'AaMeRaa E-commerce Shop ',
    description: 'Ecommerce project',
    Keyboard: 'clothing feshion style',
    author: 'Aameraa lifestyle'
}

export default Layout;
