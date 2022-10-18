import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import HomeComponent from '../component/HomePage/HomeComponent';

import { Helmet } from "react-helmet";
import { SeoData } from '../URL';

const HomePageSeo = ({ title}) => {

 

    return (
        <>
     <Helmet>
        <meta charSet="utf-8" /> 
        <title>{title}</title>
        <meta name="description"  content={title+ ', ' +SeoData.decerption} />
        <meta name="keywords" content={SeoData.keyword}/>
        <meta name="author" content={SeoData.author} />

      </Helmet>

      <Header />

      <HomeComponent />

      <Footer />

        </>
    );
}

export default HomePageSeo;
