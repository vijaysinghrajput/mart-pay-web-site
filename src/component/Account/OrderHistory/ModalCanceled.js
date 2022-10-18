import React, { useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useMediaQuery
} from '@chakra-ui/react';
import URL from '../../../URL';

export const ModalCanceled = ({ items }) => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div class="pb-3" onClick={onOpen}>
                <a href="javascript:void(0)" class="text-decoration-none text-dark">
                    <div class="p-3 rounded shadow-sm bg-white">
                        <div class="d-flex align-items-center mb-3">
                            <p class="bg-danger text-white py-1 px-2 mb-0 rounded small">Canceled</p>
                            <p class="text-muted ml-auto small mb-0"><i class="icofont-clock-time"></i>
                                {items.delivery_date}</p>
                        </div>
                        <div class="d-flex">
                            <p class="text-muted m-0">Transaction. ID<br />
                                <span class="text-dark font-weight-bold">#{items.order_number}</span>
                            </p>
                            {isNotSmallerScreen &&
                                <p class="text-muted m-0 ml-auto">Delivering to<br />
                                    <span class="text-dark font-weight-bold">{items.address_details.address_type}</span>
                                </p>
                            }
                            <p class="text-muted m-0 ml-auto">Total Payment<br />
                                <span class="text-dark font-weight-bold">₹{Math.round(items.total_amount)}</span>
                            </p>
                        </div>
                    </div>
                </a>
                <Modal onClose={onClose} isOpen={isOpen} size={"lg"} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Order Details</ModalHeader>
                        <ModalCloseButton background="none" border="none" />
                        <ModalBody maxHeight="lg" overflow="auto">
                            <div className="orderDetailsMain">
                                <div className="basicDetails">
                                    <img style={{ height: 65 }} src="https://cdn-icons.flaticon.com/png/512/3091/premium/3091759.png?token=exp=1642357839~hmac=10d3a7c4518d82eab413c5426f941882" alt="" />
                                    <div className="orderNumber ml-3 m-auto">
                                        <h6 style={{ fontSize: 14 }}>Order: <span style={{ marginLeft: 2, fontWeight: "700" }}>{items.order_number}</span></h6>
                                        <h6 style={{ fontSize: 14, marginBottom: 0 }}>Order On: <span style={{ marginLeft: 2, fontWeight: "700" }}>{items.order_date}</span></h6>
                                    </div>
                                </div>
                                <div className="orderItemsDetails mt-3">
                                    <h6 style={{ fontSize: 16, fontWeight: "700", marginBottom: 2 }}>Order Items</h6>
                                    <p style={{ fontSize: 12 }}>{items.orderItems.length} products from <span style={{ fontWeight: "700" }}>SuperG</span></p>
                                    <div className="container_orderItems">
                                        {items.orderItems.map((data, i) => {
                                            return (
                                                <div className="orderItems d-flex align-items-center">
                                                    <img style={{ height: 50 }} src={URL + "/images/product-images/" + data.p_image} alt="" />
                                                    <h6 className='mb-0 ml-4'>{data.p_name} <span style={{ fontWeight: "700", marginBottom: 0 }}>x {data.p_qty}</span></h6>
                                                    <h6 className='mb-0 ml-auto mr-3' style={{ fontWeight: "700" }}>₹{Math.round((data.p_price) - ((data.p_price) * (data.p_discount / 100))) * data.p_qty}</h6>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="orderPaymentHistory mt-3">
                                        <div className="orderTotal mx-3">
                                            <h6>Total</h6>
                                            <h6 style={{ fontWeight: "700" }}>₹{Math.round(items.isDevApplied ? (items.total_amount - items.delcharge) : (items.total_amount))}</h6>
                                        </div>
                                        <div className="orderTotal mx-3">
                                            <h6>Delivery</h6>
                                            <h6 style={{ fontWeight: "700" }}>₹{items.isDevApplied ? (items.delcharge) : "00"}</h6>
                                        </div>
                                        <div className="orderTotal mx-3">
                                            <h6 style={{ fontWeight: "700" }}>Ammount to pay</h6>
                                            <h6 style={{ fontWeight: "700" }}>₹{Math.round(items.total_amount)}</h6>
                                        </div>
                                    </div>
                                    <div className="destination mt-3">
                                        <h6 style={{ fontWeight: "700", fontSize: 18 }}>Shiping to :</h6>
                                        <div className="mx-3">
                                            <h6 style={{ fontWeight: "700", fontSize: 14 }}>{items.address_details.name}</h6>
                                            <p className='mb-1'>{items.address_details.user_house_no}, {items.address_details.base_address}, {items.address_details.address}, {items.address_details.city}, {items.address_details.zipcode}</p>
                                            <p style={{ fontWeight: "700", fontSize: 14 }}>Phone: {items.address_details.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter justifyContent={"center"}>
                            <p className='mb-0'>This order has been cancelled!!</p>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </>
    )

}