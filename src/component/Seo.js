import React, { useContext, useEffect } from 'react';


import { Helmet } from "react-helmet";


const Seo = ({ title, descreption, image }) => {



    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />

                <title>{title}</title>

                <meta name="description" content={descreption} />
                <meta name="keywords" content="Online Shopping in Gorakhpur ,Grocery In Gorakhpur, Grocery Store, Grocery  , Gorakhpur , Grocery home Delivery service , Best Online Shopping in Gorakhpur , online grocery in gorakhpur , online shopping gorakhpur , Shopping In Gorakhpur ,  Shopping Website In Gorakhpur , Online Shopping In Gorakhpur , Shopping Site In Gorakhpur, Biggest Shopping in Gorakhpur,Online Shopping in India, free delivery shopping in  gorakhpur , Online Kirana Grocery shop in Gorakhpur , Online kirana store gorakhpur , Home Delivery in gorakhpur , Gorakhpur online portal , grocery delivery in gorakhpur ,  Grocery ,   Personal Care ,  Baby Care ,  Cleaning, Householding ,  Beverages ."/>

                <meta property="og:title" content={title} />
                <meta property="og:description"
                    content={descreption} />
                <meta property="og:image" itemprop="image"
                    content={image == null ? 'https://superg.in/admin/images/category_images/62b98e188905060143a433b1363b3266.png' : image} />

                <meta property="twitter:title" content={title} />
                <meta property="twitter:description"
                    content={descreption} />
                <meta property="twitter:image"
                    content={image == null ? 'https://superg.in/admin/images/category_images/62b98e188905060143a433b1363b3266.png' : image} />


            </Helmet>



        </>
    );
}

export default Seo;
