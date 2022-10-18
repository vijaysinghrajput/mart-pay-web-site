import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgSuccess from './gif/orderSuccess.gif';
import Header from '../Header';
import { useMediaQuery } from '@chakra-ui/react';
import Footer from '../Footer';
import { useEffect } from 'react';

export const OrderSuccessFull = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");


    useEffect(() => {
        // console.log("orderhisotry", location.state.order)
        // location.state.order === undefined ? navigate("/") : setTimeout(() => navigate("/orders"), 10000);
    }, [props.order]);

    return (
        <>
            <Header />
            <div class="row d-flex justify-content-center bg-success" style={isNotSmallerScreen ? { paddingTop: "16rem" } : { paddingTop: "6rem" }}>
                <div class="col-md-6">
                    <div class="p-5 text-center">
                        <i class="icofont-check-circled display-1 text-warning"></i>
                        {/* <img src={imgSuccess} height={100} alt="" /> */}
                        <h1 class="text-white font-weight-bold" style={{ fontSize: 18 }}>Your order has been successful 🎉</h1>
                        <p class="text-white">Check your order status in <Link to="/orders" class="font-weight-bold text-decoration-none text-white">My Order</Link> about next steps information.</p>
                    </div>

                    <div class="bg-white rounded p-3 m-5 text-center">
                        <h6 class="font-weight-bold mb-2">Preparing your order</h6>
                        <p class="small text-muted">Your order will be prepared and will come soon</p>
                        <Link to="/orders" class="btn rounded btn-warning btn-lg btn-block">Track My Order</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}