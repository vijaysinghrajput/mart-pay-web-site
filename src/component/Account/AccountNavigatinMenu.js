import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useMediaQuery } from '@chakra-ui/react';
import MainData from '../../context/MainContext';
import { GiBasket } from 'react-icons/gi';


const AccountNavigatinMenu = (props) => {
    const data = useContext(MainData);
    const { logOut, auth } = data;
    const UserData = data.user.user_info;
    const navigate = useNavigate();
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

    useEffect(() => {
        !auth.isUserLogin && navigate("/login");
    }, [auth])


    return (
        <>
            <div class="col-lg-4" style={isNotSmallerScreen ? {} : { paddingBottom: "5rem" }}>
                {!isNotSmallerScreen &&
                    <div class="p-4 profile text-center border-bottom">
                        <img src='https://i.pinimg.com/736x/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.jpg' class="img-fluid rounded-pill" />
                    </div>
                }
                <div class="osahan-account bg-white rounded shadow-sm overflow-hidden">
                    {isNotSmallerScreen &&
                        <div class="p-4 profile text-center border-bottom">
                            <img src='https://i.pinimg.com/736x/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.jpg' class="img-fluid rounded-pill" />

                        </div>
                    }
                    <div class="account-sections">
                        <ul class="list-group">

                            {data.auth.isUserLogin && (
                                <>

                                    {/* 
                                    <a href="#" onClick={() => navigate("/address")} class="text-decoration-none text-dark">
                                        <li class="border-bottom bg-white d-flex align-items-center p-3">
                                            <i class="icofont-address-book osahan-icofont bg-dark"></i>My Address
                                            <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                        </li>
                                    </a> */}

                                    <a href="#" onClick={() => navigate("/orders")} class="text-decoration-none text-dark">
                                        <li class="border-bottom bg-white d-flex align-items-center p-3">
                                            <GiBasket size={30} className='osahan-icofont bg-success' />My Orders
                                            <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                        </li>
                                    </a>{/* 

                                    <a href="#" onClick={() => navigate("/notification")} class="text-decoration-none text-dark">
                                        <li class="border-bottom bg-white d-flex align-items-center p-3">
                                            <i class="icofont-notification osahan-icofont bg-success"></i>Notifications
                                            <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                        </li>
                                    </a> */}

                                </>

                            )}
                            {/* <a href="#" onClick={() => navigate("/offers")} class="text-decoration-none text-dark">
                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                    <i class="icofont-sale-discount osahan-icofont bg-danger"></i>Offers
                                    <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                </li>
                            </a> */}

                            <a href="#" onClick={() => navigate("/condition")} class="text-decoration-none text-dark">
                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                    <i class="icofont-info-circle osahan-icofont bg-primary"></i>Conditions
                                    <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                </li>
                            </a>
                            <a href="#" onClick={() => navigate("/contact")} class="text-decoration-none text-dark">
                                <li class="border-bottom bg-white d-flex align-items-center p-3">
                                    <i class="icofont-phone osahan-icofont bg-warning"></i>Contact Us
                                    <span class="badge badge-success p-1 badge-pill ml-auto"><i class="icofont-simple-right"></i></span>
                                </li>
                            </a>
                            {data.auth.isUserLogin && (
                                <a href="#" onClick={() => logOut()} class="text-decoration-none text-dark">
                                    <li class="border-bottom bg-white d-flex  align-items-center p-3">
                                        <i class="icofont-lock osahan-icofont bg-danger"></i> Logout
                                    </li>
                                </a>
                            )}


                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AccountNavigatinMenu;