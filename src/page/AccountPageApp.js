import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import contextData from '../context/MainContext';
import MainAccountComponent from '../component/Account/MainAccountComponent';
import { DualHelixLoader } from '../component/Loaders/DualHelix';
import AccountNavigatinMenu from '../component/Account/AccountNavigatinMenu';

const AccountPage = () => {

    const data = useContext(contextData);

    localStorage.setItem("cartItems", JSON.stringify(data.cartItems));

    // console.log("daat", data)

    return (
        <>

            <Header />
            <div className="py-5">
                {data.isLoading ? (
                    <DualHelixLoader />
                ) : (
                    <AccountNavigatinMenu />
                )}
            </div>
            <Footer />

        </>
    );
}

export default (AccountPage);
