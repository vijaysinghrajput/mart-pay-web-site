import React, { useContext, useEffect } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import AccountContainer from '../comman/AccountContainer';
import AccountNavigatinMenu from './AccountNavigatinMenu'
import MyAccountComp from './MyAccountComp'
import AddressComp from './AddressComp'
import Condition from './Condition'
import Promos from './Promos'
import Notification from './Notification'
import MainData from '../../context/MainContext';
import { useLocation } from 'react-router-dom'
import ContactUs from './ContactUs';
import { MyOrder } from './MyOrders';

const MainAccountComponent = (props) => {

    const data = useContext(MainData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();


    return (
        <>

            <AccountContainer>
                {isNotSmallerScreen && <AccountNavigatinMenu />}

                {data.auth.isUserLogin && (
                    <>
                        {location.pathname == '/account' && <MyAccountComp />}
                        {location.pathname == '/notification' && <Notification />}
                        {location.pathname == '/address' && <AddressComp />}
                        {location.pathname == '/orders' && <MyOrder />}
                    </>
                )}


                {location.pathname == '/offers' && <Promos />}

                {location.pathname == '/contact' && <ContactUs />}

                {location.pathname == '/help' && <AddressComp />}

                {location.pathname == '/condition' && <Condition />}


            </AccountContainer>





        </>
    )

}

export default MainAccountComponent;