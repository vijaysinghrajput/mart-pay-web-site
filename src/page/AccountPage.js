import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import contextData from '../context/MainContext';
import MainAccountComponent from '../component/Account/MainAccountComponent';
import { DualHelixLoader } from '../component/Loaders/DualHelix';

const AccountPage = () => {

    const data = useContext(contextData);

    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));

    // console.log("daat", data)

    return (
        <>

            <Header />

            {data.isLoading ? (
                <DualHelixLoader />
            ) : (
                <MainAccountComponent />
            )}

            <Footer />

        </>
    );
}

export default (AccountPage);
