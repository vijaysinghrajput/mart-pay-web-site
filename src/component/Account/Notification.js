import React, { useContext, useEffect, useState } from 'react';
import MainData from '../../context/MainContext';


import { useLocation } from 'react-router-dom'
import URL from '../../URL'


const Notification = ({ }) => {

    const data = useContext(MainData);
    const user_notification = data.user.user_notification;


    const location = useLocation();

    const getDayName = (dateStr, locale) => {

        var date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: 'long' });

    }


    return (

        <>

            <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
                <div class="osahan-promos">
                    <h4 class="mb-4 profile-title">Notifications</h4>

                    {user_notification.length ? (




                        <>
                            {user_notification.map((item, i = 1) => {
                                return (
                                    <div class="pb-3">
                                        <div class="text-decoration-none text-white">
                                            <div className="rounded  shadow-sm p-3 text-white bg-dark" >
                                                <div class="row align-items-center">
                                                    <div class="col-12">
                                                        <div class="d-flex align-items-center">
                                                            <img class="pp-osahan-logo" src="img/logo.svg" />
                                                            <div class="brand ml-2">
                                                                <h5 class="m-0">{item.title}</h5>
                                                            </div>
                                                        </div>


                                                        <div class="mt-2 mb-3">
                                                            <p class="text-white m-0">{item.details}</p>
                                                        </div>
                                                        <div class="mt-2 mb-3">
                                                            <p class="text-white m-0">{(item.date)} {item.time}</p>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })}
                        </>


                    ) : null}





                </div>
            </div>

        </>
    )

}

export default Notification;