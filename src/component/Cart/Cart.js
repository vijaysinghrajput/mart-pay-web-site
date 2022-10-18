import React, { useContext, useEffect } from 'react';
import { Button, ChakraProvider, useMediaQuery } from '@chakra-ui/react';
import Address from './Address';
import CartItems from './CartItems';
import DeliveryTiming from './DeliveryTiming';
import PaymentDetails from './PaymentDetails';
import PaymentOption from './PaymentOption';
import MainContext from '../../context/MainContext';
import { useState } from 'react';
import Checkout from '../Checkout/Checkout';
import Cookies from 'universal-cookie';
import Base64 from '../../helper/EncodeDecode';
// import { OrderSuccessFull } from './OrderSuccessfull';
import { BsBagX } from 'react-icons/bs';
import { useDisclosure, Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();


const Cart = (props) => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { auth, reloadData, condition, cartItems, products, removeFromCart, genRanHex, totalAmount, cartDetails, setCartDetails, removeCart } = useContext(MainContext);
    const [selectedAddress, setAddress] = useState();
    const [selectedDeliveryTiming, setDeliveryTiming] = useState();
    const [selectedPaymentOption, setPayment] = useState("COD");
    const [orderSuccessFull, setOrderSuccessFull] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const [wantCarryBag, setCarryBag] = useState(false);
    const UserIDs = cookies.get("userID");
    const UserID = UserIDs === undefined ? "" : Base64.atob(UserIDs);
    const navigator = useNavigate();

    useEffect(() => {
        reloadData();
    }, [])

    const checkOutData = {
        selectedAddress,
        selectedDeliveryTiming,
        selectedPaymentOption,
        cartItems
    };

    const placeOrder = () => {
        const orderID = `${+ new Date()}${genRanHex(16)}`;
        setOrderSuccessFull(true);
        const couponId = cartDetails.couponDetails !== undefined ? cartDetails.couponDetails[0]?.coupon_id : "";

        console.log("sll list", cartItems, wantCarryBag)

        fetch(URL + "/APP-API/App/finalPlaceOrder", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                orderID,
                AddressId: cartDetails.selectedAddress.address_id,
                UserID,
                FinalTotalAmount: totalAmount,
                iscouponApplied: cartDetails.couponApplied,
                couponPrice: cartDetails.discountPriceByCoupon ? cartDetails.discountPriceByCoupon : 0,
                PaymentMode: cartDetails.selectedPaymentOption,
                couponId,
                isDevApplied: cartDetails.isDeliveryChargeApplied,
                delcharge: cartDetails.deliveryCharge,
                order_time: +new Date(),
                delivery_date: +new Date(selectedDeliveryTiming.day),
                delivery_slot: selectedDeliveryTiming.timingSlot,
                cartItems,
                is_carry_bag_taken: wantCarryBag,
                carryBagCharges: condition[0].carry_bag_charge
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {
                // setOrderSuccessFull(true);
                setCartDetails([]);
                removeCart();
                responseJson.status && navigator("/orderSuccess", { state: { order: true } });
            })
            .catch((error) => {
                //  console.error(error);
            });
    }

    const checkIfAllItemsAvilable = () => {

        const soldOutItems = cartItems.filter((data) => {
            return products.find(o => o.id == data.id) == undefined;
        });

        if (soldOutItems.length) {
            onOpen();
        } else setNavigate(true);
    }

    const removeSoldOutItems = () => {
        const soldOutItems = cartItems.filter((data) => {
            return products.find(o => o.id == data.id) == undefined;
        })
        soldOutItems.map((items) => {
            removeFromCart(items.id)
        });
        onClose();
    }

    return (
        <>
            <section className="pb-4 osahan-main-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 pb-3">
                            {navigate ? <Checkout setNavigate={setNavigate} checkOutData={checkOutData} /> : (
                                <div className="accordion" id="accordionExample">
                                    <CartItems />
                                    {auth.isUserLogin && <>
                                        <Address setAddress={setAddress} />
                                        <DeliveryTiming setDeliveryTiming={setDeliveryTiming} />
                                        <PaymentOption selectedAddress={selectedAddress} setNavigate={checkIfAllItemsAvilable} setPayment={setPayment} />
                                    </>}
                                </div>
                            )}
                        </div>
                        {isNotSmallerScreen ?
                            <div className="col-lg-4">
                                <div className="sticky_sidebar">
                                    <PaymentDetails setCarryBagMain={setCarryBag} />
                                    {navigate && <Button isLoading={orderSuccessFull} onClick={() => placeOrder()} class="btn bg-success text-light btn-lg btn-block mt-3 mb-3 d-flex justify-content-center align-items-center">Place Order</Button>}
                                </div>
                            </div>
                            :
                            navigate && <div className="col-lg-4 mb-5">
                                <div className="sticky_sidebar">
                                    <PaymentDetails setCarryBagMain={setCarryBag} />
                                    {navigate && <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", background: "#fff", padding: 10 }}>
                                        <Button isLoading={orderSuccessFull} onClick={() => placeOrder()} class="btn bg-success btn-lg btn-block d-flex justify-content-center align-items-center">Place Order</Button>
                                    </div>}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
            {/* <ChakraProvider resetCSS={true}> */}
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton background="none" border="none" />
                    <ModalBody>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <BsBagX size={54} style={{ color: "red" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <h5>
                                Some items are currently out of stock.
                            </h5>
                        </div>
                        <p style={{ textAlign: "center" }}>Please remove unavilable items.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button background="red" border="none" onClick={removeSoldOutItems} colorScheme={"red"}>Remove Items</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* </ChakraProvider> */}
        </>
    )

}

export default Cart;