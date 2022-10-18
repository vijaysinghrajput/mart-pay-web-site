import React, { useContext, useState } from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import ProductsBySubcategory from '../component/ProductsBy/ProductsBySubcategory';

const ProductsBySubcategoryPage = (props) => {

    return (
        <>
            <Header />
            <ProductsBySubcategory />
            <Footer />
        </>
    )

}

export default ProductsBySubcategoryPage;