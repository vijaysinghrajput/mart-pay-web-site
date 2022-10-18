import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePageSeo from '../page/HomePageSeo'
  

import React, { useContext, useEffect } from 'react';



const SeoKeyWord = () => {



    return (
        <>
          <Route 
path="/online-shopping-in-gorakhpur"  
element={<HomePageSeo 
  
     />} />



        </>
    );
}

export default SeoKeyWord;
