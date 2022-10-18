import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../../context/MainContext';
import { RiCoupon3Fill } from 'react-icons/ri';
import { Switch } from '@chakra-ui/react'


export const PaymentDetails = ({ setCarryBagMain }) => {

    const data = useContext(MainContext);
    const { cartItems, condition, setCartDetails, cartDetails, setTotalPrice, genRanHex, totalAmount } = data;
    const [total, setTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [isDeliveryChargeApplied, setIsDeliveryChargeApplied] = useState(false);
    const CARRY_BAG_CHARGE_MINIMUM_QTY = Number(condition[0]?.carry_bag_charge_minimum_qty);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const youHaveToTakeCarryBag = cartItems.length > CARRY_BAG_CHARGE_MINIMUM_QTY ? true : false;
    const [wantCarryBag, setCarryBag] = useState(true);

    console.log("hey nvaett", youHaveToTakeCarryBag, CARRY_BAG_CHARGE_MINIMUM_QTY);

    useEffect(() => {
        setCarryBagMain(wantCarryBag);
    }, [wantCarryBag]);

    const GetTotal = cartItems.reduce(function (a, b) {
        const price = (b.price) - ((b.price) * (b.discount / 100))
        return a + Number(price * b["itemQuant"]);
    }, 0);

    const GetDiscount = cartItems.reduce(function (a, b) {
        const price = ((b.price) * (b.discount / 100)) * b.itemQuant;
        return a + Number(price);
    }, 0);

    console.log("asdsa", wantCarryBag);

    useEffect(() => {
        setTotal(GetTotal);
        setTotalDiscount(GetDiscount);
        if (GetTotal < parseInt(condition[0]?.shipping)) {
            setDeliveryCharge(condition[0].charges);
            setIsDeliveryChargeApplied(true);
        } else {
            setDeliveryCharge(0);
            setIsDeliveryChargeApplied(false);
        }
    }, [condition, data]);

    useEffect(() => setTotalPrice(grandTotal), [grandTotal])

    useEffect(() => {
        cartDetails?.discountPriceByCoupon ? setGrandTotal(Number(total) + Number(deliveryCharge) - cartDetails?.discountPriceByCoupon) : setGrandTotal(Number(total) + Number(deliveryCharge));
        if (GetTotal < parseInt(condition[0]?.shipping)) {
            setCartDetails({
                deliveryCharge: Number(deliveryCharge),
                isDeliveryChargeApplied,
                total: GetTotal,
            })
        } else {
            setCartDetails({
                isDeliveryChargeApplied,
                deliveryCharge: 0,
            })
        }
        setCartDetails({
            coupon: undefined,
            couponApplied: false,
            couponDetails: undefined,
            couponId: undefined,
            discountPriceByCoupon: undefined
        })
    }, [deliveryCharge, total]);

    useEffect(() => {
        cartDetails?.discountPriceByCoupon && setGrandTotal(Number(total) + Number(deliveryCharge) - cartDetails?.discountPriceByCoupon);
        console.log("cartdetails ->", cartDetails)
    }, [cartDetails?.discountPriceByCoupon, total]);


    return (
        <>
            <div className="bg-white rounded overflow-hidden shadow-sm mb-3 checkout-sidebar">
                <div className="d-flex align-items-center osahan-cart-item-profile border-bottom bg-white p-3">
                    <img alt="osahan" src="/img/logo.svg" className="mr-3 rounded-circle img-fluid" />
                    <div className="d-flex flex-column">
                        <h6 className="font-weight-bold m-0">SuperG.in</h6>
                        {/* <p className="mb-0 small text-muted"><i className="feather-map-pin" /> Bhardwadjpuram, Rustampur, 273004</p> */}
                    </div>
                </div>
                <div>
                    <div className="bg-white p-3 clearfix">
                        <p className="font-weight-bold small mb-2">Bill Details</p>
                        <p className="mb-1">Item Total <span className="small text-muted">({Math.round(cartItems.length)} item)</span> <span className="float-right text-dark"><span style={{ fontWeight: "700", marginRight: 2 }}>₹</span>{Math.round(total)}</span></p>
                        {/* <p className="mb-1">Store Charges <span className="float-right text-dark">$62.8</span></p> */}
                        {Math.round(total) < condition[0]?.shipping && <> <p className="mb-3">Delivery Fee <span className="float-right text-dark">+ ₹{Math.round(deliveryCharge)}</span></p>
                            <div class="alert alert-danger text-center p-1" role="alert">
                                <small>Shop more for ₹{Math.round(condition[0]?.shipping - total)} to get free delivery.</small>
                            </div> </>}
                        {cartDetails?.couponApplied && <h6 className="mb-0 mt-2 text-success" style={{ fontSize: 14 }}><RiCoupon3Fill style={{ marginBottom: 3, marginRight: 5 }} />Coupon Discount @ {parseInt(cartDetails?.couponDetails[0].coupon_discount)}{cartDetails?.couponDetails[0].coupon_type == "amount" ? "₹ Flat" : "%"}<span className="float-right text-success">- ₹{Math.round(cartDetails.discountPriceByCoupon)}</span></h6>}
                        {youHaveToTakeCarryBag ?
                            <>
                                <h6 className="mb-0 text-dark mt-3" style={{ fontSize: 14 }}>Carry Bag <Switch size='sm' isChecked={youHaveToTakeCarryBag} disabled /><span className="float-right">+ ₹{condition[0]?.carry_bag_charge}</span></h6>
                                <small>Carry bag is required for more than {CARRY_BAG_CHARGE_MINIMUM_QTY} items</small>
                            </>
                            :
                            <h6 className="mb-0 text-dark mt-3" style={{ fontSize: 14 }}>Carry Bag <Switch size='md' ml={2} isChecked={wantCarryBag} onChange={e => setCarryBag(e.target.checked)} /><span className="float-right">+ ₹{condition[0]?.carry_bag_charge}</span></h6>
                        }
                    </div>
                    <div className="p-3 border-top">
                        <h5 className="mb-0">TO PAY <span className="float-right text-danger">₹ {wantCarryBag ? Math.round(grandTotal) + Number(condition[0]?.carry_bag_charge) : Math.round(grandTotal)}</span></h5>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PaymentDetails;