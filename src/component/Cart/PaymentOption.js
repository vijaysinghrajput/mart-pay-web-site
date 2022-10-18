import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

export const PaymentOption = ({ setPayment, setNavigate, selectedAddress }) => {

    return (
        <>
            <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden mt-3">
                <div className="card-header bg-white border-0 p-0" id="headingfour">
                    <h2 className="mb-0">
                        <button className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapsefour" aria-expanded="true" aria-controls="collapsefour">
                            <span className="c-number">4</span> Payment
                        </button>
                    </h2>
                </div>
                <div id="collapsefour" className="collapse" aria-labelledby="headingfour" data-parent="#accordionExample">
                    <div className="card-body px-3 pb-3 pt-1 border-top">
                        <div className="schedule">
                            <ul className="nav nav-tabs justify-content-center nav-fill" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation" onClick={() => setPayment("POD")}>
                                    <a className="nav-link text-dark active show" id="cash-tab" data-toggle="tab" href="#cash" role="tab" aria-controls="cash" aria-selected="false">
                                        <p className="mb-0 font-weight-bold"><i className="icofont-rupee mr-2" />
                                            Pay on Delivery</p>
                                    </a>
                                </li>
                                {/* <li className="nav-item" role="presentation" onClick={() => setPayment("ONLINE")}>
                                    <a className="nav-link text-dark" id="online-tab" data-toggle="tab" href="#online" role="tab" aria-controls="online" aria-selected="false">
                                        <p className="mb-0 font-weight-bold"><i className="icofont-globe mr-2" />
                                            Online Payment</p>
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                        <Button disabled={selectedAddress !== undefined ? false : true} onClick={() => setNavigate(true)} className="btn btn-success btn-lg btn-block mt-3 w-100" type="button">{selectedAddress !== undefined ? "Continue" : "Select or add new address"}</Button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PaymentOption;