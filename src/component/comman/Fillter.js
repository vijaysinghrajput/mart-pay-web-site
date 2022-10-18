import React, { useState, useEffect } from 'react';
import $ from 'jquery';

export const Filter = ({ setShortingMain }) => {

    const [shorting, setShorting] = useState({});
    // const [filter, setFilter] = useState({});

    useEffect(() => {
        setShortingMain(shorting);
        $("#exampleModal .close").click()
    }, [shorting]);

    return (
        <>
            <div class="modal fade right-modal" id="exampleModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Filter</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="osahan-filter">
                                <div class="filter">

                                    <div class="p-3 bg-light border-bottom">
                                        <h6 class="m-0">SORT BY</h6>
                                    </div>
                                    <div class="custom-control border-bottom px-0  custom-radio">
                                        <input type="radio" onChange={e => setShorting({ relevence: true })} id="customRadio5" name="location" class="custom-control-input" />
                                        <label class="custom-control-label py-3 w-100 px-3" for="customRadio5">Relevence</label>
                                    </div>
                                    <div class="custom-control border-bottom px-0  custom-radio">
                                        <input type="radio" onChange={e => setShorting({ priceLTH: true })} id="customRadio3" name="location" class="custom-control-input" />
                                        <label class="custom-control-label py-3 w-100 px-3" for="customRadio3">Price (Low to High)</label>
                                    </div>
                                    <div class="custom-control border-bottom px-0  custom-radio">
                                        <input type="radio" onChange={e => setShorting({ priceHTL: true, })} id="customRadio4" name="location" class="custom-control-input" />
                                        <label class="custom-control-label py-3 w-100 px-3" for="customRadio4">Price (High to Low)</label>
                                    </div>
                                    <div class="custom-control border-bottom px-0  custom-radio">
                                        <input type="radio" onChange={e => setShorting({ discount: true })} id="customRadio6" name="location" class="custom-control-input" />
                                        <label class="custom-control-label py-3 w-100 px-3" for="customRadio6">Discount (High to Low)</label>
                                    </div>

                                    {/* <div class="p-3 bg-light border-bottom">
                                        <h6 class="m-0">FILTER</h6>
                                    </div>
                                    <div class="custom-control border-bottom px-0  custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="defaultCheck1" checked />
                                        <label class="custom-control-label py-3 w-100 px-3" for="defaultCheck1">Open Now</label>
                                    </div>
                                    <div class="custom-control border-bottom px-0  custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="defaultCheck2" />
                                        <label class="custom-control-label py-3 w-100 px-3" for="defaultCheck2">Credit
                                            Cards</label>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer p-0 border-0">
                            <div class="col-6 m-0 p-0">
                                <button type="button" class="btn border-top btn-lg btn-block"
                                    data-dismiss="modal">Close</button>
                            </div>
                            <div class="col-6 m-0 p-0">
                                <button type="button" class="btn btn-success btn-lg btn-block" data-dismiss="modal">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}