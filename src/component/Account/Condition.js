import React from 'react';
import { useNavigate } from 'react-router';

const Condition = (props) => {

    const navigate = useNavigate();

    return (
        <>
            <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
                <h4 class="mb-4 profile-title">Conditions</h4>
                <div class="help_support">

                    <div class="mb-1">
                        <a href="#" onClick={() => navigate("/about")} class="text-decoration-none"><button class="p-3 btn-light border d-flex align-items-center btn w-100" type="button">
                            About
                            <i class="text-success icofont-rounded-right ml-auto"></i>
                        </button></a>
                    </div>
                    <div class="mb-1">
                        <a href="#" onClick={() => navigate("/term-and-condition")} class="text-decoration-none"><button class="p-3 btn-light border d-flex align-items-center btn w-100" type="button">
                            Term & Condition
                            <i class="text-success icofont-rounded-right ml-auto"></i>
                        </button></a>
                    </div>
                    <div class="mb-1">
                        <a href="#" onClick={() => navigate("/privacy-and-policy")} class="text-decoration-none"><button class="p-3 btn-light border d-flex align-items-center btn w-100" type="button">
                            Privacy & Policy
                            <i class="text-success icofont-rounded-right ml-auto"></i>
                        </button></a>
                    </div>
                    <div class="mb-1">
                        <a href="#" onClick={() => navigate("/shipping-policy")} class="text-decoration-none"><button class="p-3 btn-light border d-flex align-items-center btn w-100" type="button">
                            Shipping Policy
                            <i class="text-success icofont-rounded-right ml-auto"></i>
                        </button></a>
                    </div>
                    <div class="mb-1">
                        <a href="#" onClick={() => navigate("/return-and-refund-policy")} class="text-decoration-none"><button class="p-3 btn-light border d-flex align-items-center btn w-100" type="button">
                            Return &  Refund Policy
                            <i class="text-success icofont-rounded-right ml-auto"></i>
                        </button></a>
                    </div>

                    <div class="mb-1">
                        <a href="#" onClick={() => navigate("/faq")} class="text-decoration-none"><button class="p-3 btn-light border d-flex align-items-center btn w-100" type="button">
                            FAQ
                            <i class="text-success icofont-rounded-right ml-auto"></i>
                        </button></a>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Condition;