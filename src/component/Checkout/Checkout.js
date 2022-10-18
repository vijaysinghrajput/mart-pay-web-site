import React, { useContext } from 'react';
import { useState } from 'react';
import MainContext from '../../context/MainContext';
import Cookies from 'universal-cookie';
import Base64 from '../../helper/EncodeDecode';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Switch } from '@chakra-ui/react'
import { AiOutlineFieldTime } from 'react-icons/ai';


const cookies = new Cookies();

const Checkout = ({ setNavigate, checkOutData }) => {

    const data = useContext(MainContext);
    const { setCartDetails, cartItems, cartDetails } = data;
    const [coupon, setCoupon] = useState(cartDetails?.coupon);
    const [couponApplied, setCouponApplied] = useState(cartDetails?.couponApplied == undefined ? false : cartDetails?.couponApplied);
    const [couponDetails, setCouponDetails] = useState(cartDetails?.couponDetails);
    const [discountPriceByCoupon, setDiscountPriceByCoupon] = useState(cartDetails?.discountPriceByCoupon);
    const UserIDs = cookies.get("userID");
    const UserID = Base64.atob(UserIDs);
    const { selectedAddress,
        selectedDeliveryTiming,
        selectedPaymentOption } = checkOutData;

    const GetTotal = cartItems.reduce(function (a, b) {
        const price = (b.price) - ((b.price) * (b.discount / 100))
        return a + Number(price * b["itemQuant"]);
    }, 0);

    useEffect(() => {
        setCartDetails({
            ...checkOutData
        });
    }, []);

    const getDate = (date) => {
        let dateObj = new Date(date);
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        return day + "/" + month + "/" + year;
    }

    useEffect(() => {
        setCartDetails({
            coupon,
            couponApplied,
            couponDetails,
            discountPriceByCoupon,
            couponId: undefined
        });
    }, [couponApplied, couponDetails, discountPriceByCoupon])

    const isCouponValid = () => {

        fetch(URL + "/APP-API/App/CouponAction", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                coupon,
                UserID
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.status == 'NoCoupon') {

                    var msgPopPup = '** Please enter valid coupon code';
                    toast.error(msgPopPup)

                }

                if (responseJson.status == 'expaird') {

                    var msgPopPup = '** Expired Coupon Code';
                    toast.error(msgPopPup)

                }

                if (responseJson.status == 'vailed') {

                    var msgPopPup = '** Valid Coupon Code';
                    toast.success(msgPopPup);

                    if (responseJson.userStatus == 'used') {

                        var msgPopPup = '** You already used this coupon code';
                        toast.error(msgPopPup)

                    }


                    if (Number(responseJson.data[0].minimum_order_amount) > Number(GetTotal)) {

                        var msgPopPup = "COUPON VAILD ONLY ON MORE THAN ₹ " + Math.floor(responseJson.data[0].minimum_order_amount);
                        toast.error(msgPopPup)


                    }
                    else {
                        setCouponDetails(responseJson.data);
                        if (responseJson.data[0].coupon_type == 'percentage') {

                            const discount = GetTotal * (Math.floor(responseJson.data[0].coupon_discount) / 100);
                            // const net = GetTotal - Math.round(discount);
                            setDiscountPriceByCoupon(discount);
                            var msg = 'You got ' + Math.floor(responseJson.data[0].coupon_discount) + ' % OFF  ₹ ' + Math.round(discount) + ' Save';
                            toast.success(msg);
                        }
                        else if (responseJson.data[0].coupon_type == 'amount') {
                            var msg = 'You got ₹' + Math.floor(responseJson.data[0].coupon_discount) + ' OFF ';
                            toast.success(msg);
                            setDiscountPriceByCoupon(Math.floor(responseJson.data[0].coupon_discount));
                        }
                        setCouponApplied(true);
                    }
                }
                if (responseJson.userStatus == 'used') {
                    var msgPopPup = '** You already used this coupon code';
                    toast.error(msgPopPup);
                }
            })
            .catch((error) => {
                //  console.error(error);
            });
    }



    return (
        <>
            <div class="bg-white rounded shadow-sm overflow-hidden">
                <div class="p-3">
                    <div class="d-flex align-items-center">
                        <span class="small">
                            <a href="#" onClick={() => setNavigate(false)} class="font-weight-bold text-decoration-none text-success" data-toggle="modal" data-target="#exampleModal">
                                <RiArrowGoBackFill /> Back
                            </a>
                        </span>
                    </div>
                </div>
                <div class="address p-3 bg-light">
                    <h6 class="m-0 text-dark d-flex align-items-center">Address </h6>
                </div>
                <div class="p-3">
                    <div class="d-flex align-items-center">
                        <p class="mb-2 font-weight-bold">{selectedAddress.address_type}</p>
                        <p class="mb-2 badge badge-danger ml-auto">Default</p>
                    </div>
                    <p class="small text-muted m-0">{selectedAddress.name}</p>
                    <p class="small text-muted m-0">H.No. {selectedAddress.user_house_no}, {selectedAddress.base_address}, {selectedAddress.city}</p>
                    {/* <p class="small text-muted m-0">Zip: {selectedAddress.zipcode}</p> */}
                    <p class="small text-muted m-0">Phone: {selectedAddress.phone}</p>
                </div>
                <div class="address p-3 bg-light">
                    <h6 class="m-0 text-dark">Payment Method</h6>
                </div>
                <div class="p-3">
                    <div class="d-flex align-items-center">
                        <i class="icofont-credit-card"></i>
                        <span class="ml-3">{selectedPaymentOption}</span>
                    </div>
                </div>
                <div class="address p-3 bg-light">
                    <h6 class="m-0 text-dark">Delivery Slot</h6>
                </div>
                <div class="p-3">
                    <div class="d-flex align-items-center">
                        <AiOutlineFieldTime />
                        <span class="ml-3">{getDate((Number(selectedDeliveryTiming.day)))}, {selectedDeliveryTiming.timingSlot}</span>
                    </div>
                </div>
                <div class="address p-3 bg-light">
                    <h6 class="text-dark m-0">Promo Code</h6>
                </div>
                <div>
                    <div class="accordion" id="accordionExample">
                        <div class="d-flex align-items-center" id="headingThree">
                            <a class="p-3 d-flex align-items-center text-decoration-none text-success w-100"
                                type="button" data-toggle="collapse" data-target="#collapseThree"
                                aria-expanded="false" aria-controls="collapseThree">
                                <i class="icofont-badge mr-3"></i> Add Promo Code
                                <i class="icofont-rounded-down ml-auto"></i>
                            </a>
                        </div>
                        <div id="collapseThree" class="collapse p-3 border-top" aria-labelledby="headingThree"
                            data-parent="#accordionExample">
                            <div class="clearfix">
                                <div class="input-group-sm mb-2 input-group">
                                    <input onChange={d => setCoupon(d.target.value)} placeholder="Enter promo code" type="text" class="form-control" />
                                    <div class="input-group-append"><button id="button-addon2" type="button" onClick={isCouponValid}
                                        class="btn btn-success"><i class="icofont-percent"></i>
                                        APPLY</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )

}

export default Checkout;