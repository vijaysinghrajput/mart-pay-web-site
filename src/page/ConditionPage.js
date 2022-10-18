import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import contextData from '../context/MainContext';
import MainConditionComponent from '../component/Account/MainConditionComponent';
import { DualHelixLoader } from '../component/Loaders/DualHelix';

const ConditionPage = () => {

    const data = useContext(contextData);

    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));

    // console.log("daat", data)

    return (
        <>

            <Header />

            {data.isLoading ? (
                <DualHelixLoader />
            ) : (
                <MainConditionComponent />
            )}

            <Footer />

        </>
    );
}

export default (ConditionPage);
