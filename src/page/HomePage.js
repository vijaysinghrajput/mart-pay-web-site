import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import contextData from '../context/MainContext';
import HomeComponent from '../component/HomePage/HomeComponent';
import { SeoData } from '../URL';

import { Helmet } from "react-helmet";


const HomePage = () => {


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" /> 
        <title>{SeoData.title}</title>

        <meta name="description"  content={SeoData.decerption} />
        <meta name="keywords" content={SeoData.keyword}/>
        <meta name="author" content={SeoData.author} />


      </Helmet>

      <Header />

      <HomeComponent />

      {/* <Footer /> */}

    </>
  );
}

export default (HomePage);
