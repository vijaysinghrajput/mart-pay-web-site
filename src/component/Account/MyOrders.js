import React from 'react';
import Base64 from "../../helper/EncodeDecode";
import Cookies from 'universal-cookie';
import URL from "../../URL";
import { useEffect } from 'react';
import { useState } from 'react';
import { ModalDeliverd } from './OrderHistory/ModalDeliverd';
import { ModalProgress } from './OrderHistory/ModalInProgress';
import { ModalCanceled } from './OrderHistory/ModalCanceled';

const cookies = new Cookies();

export const MyOrder = (props) => {

    const [ordersHistory, setOrdersHistory] = useState([]);


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        const userID = cookies.get("userID");
        const UserID = Base64.atob(userID)
        fetch(URL + "/APP-API/App/FetchOrders", {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                UserID
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // functionality.fetchAllData(responseJson);
                setOrdersHistory(responseJson);
            })
            .catch((error) => {
                //  console.error(error);
            });
    };
    return (
        <>
            <section class="col-lg-8">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <ul class="nav  nav-tabs custom-tabs border-0 flex-row justify-content-around bg-white rounded overflow-hidden shadow-sm p-2 c-t-order"
                                id="myTab" role="tablist">
                                <li class="nav-item border-top" role="presentation">
                                    <a class="nav-link border-0 text-dark py-3 active" id="progress-tab" data-toggle="tab"
                                        href="#progress" role="tab" aria-controls="progress" aria-selected="false">
                                        <i class="icofont-wall-clock mr-2 text-warning mb-0"></i> On Progress</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link border-0 text-dark py-3" id="completed-tab" data-toggle="tab"
                                        href="#completed" role="tab" aria-controls="completed" aria-selected="true">
                                        <i class="icofont-check-alt mr-2 text-success mb-0"></i> Completed</a>
                                </li>
                                <li class="nav-item border-top" role="presentation">
                                    <a class="nav-link border-0 text-dark py-3" id="canceled-tab" data-toggle="tab"
                                        href="#canceled" role="tab" aria-controls="canceled" aria-selected="false">
                                        <i class="icofont-close-line mr-2 text-danger mb-0"></i> Canceled</a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content col-md-12" id="myTabContent">
                            <div class="tab-pane fade show active" id="progress" role="tabpanel" aria-labelledby="progress-tab">
                                <div class="order-body">
                                    {ordersHistory.map((items, i) => {
                                        return (
                                            items.Order_status !== "Delivered" && items.Order_status !== "Cancel" && <ModalProgress fetchData={fetchData} items={items} />
                                        )
                                    })}
                                </div>
                            </div>
                            <div class="tab-pane fade" id="completed" role="tabpanel"
                                aria-labelledby="completed-tab">
                                <div class="order-body">
                                    {ordersHistory.map((items, i) => {
                                        return (
                                            items.Order_status === "Delivered" && <ModalDeliverd items={items} />
                                        )
                                    })}
                                </div>
                            </div>
                            <div class="tab-pane fade" id="canceled" role="tabpanel" aria-labelledby="canceled-tab">
                                <div class="order-body">
                                    {ordersHistory.map((items, i) => {
                                        return (
                                            items.Order_status === "Cancel" && <ModalCanceled items={items} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}