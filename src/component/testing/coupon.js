import React, { Component } from 'react';
import SplshImage from './SplshImage';

import { Redirect, Link, withRouter } from 'react-router-dom';
import URL from '../URL'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Cookies from 'universal-cookie';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cookies = new Cookies()

class CheackOut extends Component {
    constructor(props) {

        super(props);

        this.state = {
            clickedPaymen: false,
            isloaded: false,
            UserID: null,
            UserAddressData: null,
            addressId: 1,
            iscouponApplied: 0,
            couponMsg: '',
            CouponValue: '',
            couponId: '',
            totalAmount: 0,
            FinalTotalAmount: 0,
            afterDiscountTotal: 0,
            delcharge: 0,
            delMinimumPrice: 0,
            FinalTotal: 0,
            isDevApplied: 'NONE',
            PaymentMode: 'COD',


        }
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.onChange = this.onChange.bind(this);




    }
    handleBack() {

        this.props.history.goBack();

    }

    handleNext(Routation) {
        this.props.history.push(Routation);
    }



    onChange(e) {
        if (e.target.id === 'coupon') {
            this.setState({ CouponValue: e.target.value, iscouponApplied: 0 });
        }

    }

    fetchPrice() {

        this.setState({ isLoad: true })
        fetch(URL + "/APP-API/Product/GetPlaceOrderPrice", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({


                UserID: this.state.UserID


            })

        })
            .then((response) => response.json())
            .then((responseJson) => {



                this.setState({

                    totalAmount: responseJson.totalAmount,
                    afterDiscountTotal: responseJson.afterDiscountTotal,
                    delcharge: responseJson.delcharge,
                    delMinimumPrice: responseJson.delMinimumPrice,
                    FinalTotal: responseJson.FinalTotal,
                    FinalTotalAmount: responseJson.FinalTotal,
                    isDevApplied: responseJson.isDevApplied,
                    isloaded: true

                })






            })
            .catch((error) => {
                //  console.error(error);

            });

    }

    async componentDidMount() {

        var isLogged = await cookies.get('isLogged')

        // alert(isLogged)

        if (isLogged === undefined) {
            // alert('not loged')

            this.handleNext("/Login")



        }

        var user_name = await cookies.get('user_name');
        var user_mobile_number = await cookies.get('user_mobile_number');

        var UserID = await cookies.get('UserID');
        this.setState({ user_name, user_mobile_number, UserID })

        this.FetchAllAddress()
        this.fetchPrice()

    }

    FetchAllAddress() {

        fetch(URL + "/APP-API/App/getAllAddress", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({


                UserID: this.state.UserID


            })

        })
            .then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.address[0] == undefined) {
                    this.handleNext("/Add-Address/Checkout")
                    this.setState({ UserAddressData: null, })


                }
                else {
                    this.setState({ UserAddressData: responseJson.address, addressId: responseJson.address[0].address_id, })

                }






            })
            .catch((error) => {
                //  console.error(error);

            });


    }


    //     <div onClick={()=>this.setState({PaymentMode:'online'})} className="col-12 col-md-6 col-lg-4 col-xl-4  p-2">
    // <div class="card border-0 shadow-sm">
    // <div class="card-body">
    // <div className="row ">
    // <div className="col-4 col-md-4 col-lg-4 col-xl-4">
    // {this.state.PaymentMode=='online'?
    // (
    //   <button class="btn btn-default button-rounded-36 shadow"><i class="material-icons">adjust</i></button>

    // ):
    // (
    //   <button class="btn btn-dark button-rounded-36 shadow"><i class="material-icons">adjust</i></button>

    // )}

    // </div>
    // <div className="col-8 col-md-8 col-lg-8 col-xl-8">

    // <h5 class="mt-1"> Online Payment </h5>
    // </div>

    // </div>
    // </div>
    // </div>
    // </div>



    render() {


        if (this.state.isloaded === false) {
            return <SplshImage />;
        }
        else {


            return (


                <div className="mt-3">
                    <ToastContainer />
                    <div class="row mx-0">
                        <div class="col mt-3">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb bg-dark">
                                    <li class="breadcrumb-item">
                                        <a onClick={() => this.handleBack()} class="text-white">Back</a>
                                    </li>
                                    <li class="breadcrumb-item">
                                        <a >CheckOut</a>
                                    </li>

                                </ol>
                            </nav>
                        </div>

                    </div>

                    <div class="col text-center">
                        <button
                            onClick={() => this.handleNext("/Add-Address/Checkout")}

                            type="button" class="btn btn-default mb-2 "><i class="material-icons">add_box</i> ADD NEW ADDRESSS</button>

                    </div>




                    {this.state.UserAddressData === null ?
                        (
                            <div class="media-body">

                                <h6 class="subtitle mt-4 mb-1">No Address Yet</h6>

                            </div>

                        ) : (


                            <div className="row mt-3">

                                {this.state.UserAddressData.map((item, key) => {
                                    return (
                                        <div onClick={() => this.setState({ addressId: item.address_id })} className="col-12 col-md-6 col-lg-4 col-xl-4 mb-3 d-flex align-items-stretch">
                                            <div className="card shadow-sm border-0  p-4">
                                                <h6 className="small">Address {key + 1} </h6>

                                                <div className="card-body">
                                                    <h6 class="mb-1"> {item.name} </h6>
                                                    <p class="mb-2 text-secondary"> {item.address} </p>
                                                    <p class="small"> {item.zipcode} , {item.city}, {item.phone} ,{item.alternative_phone} </p>
                                                </div>


                                                {this.state.addressId === item.address_id ?
                                                    (
                                                        <div class="badge btn-default p-1 ">  <h6 class="text-center mt-1"> Delivery on this address </h6> </div>

                                                    )
                                                    : null}


                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                    <br />

                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-auto">
                                    <span class="btn btn-success p-3 rounded-circle">
                                        <i class="material-icons">local_activity</i>
                                    </span>
                                </div>
                                <div class="col">
                                    <div class="form-group mb-0 float-label active">
                                        <input type="text" onChange={this.onChange} id="coupon" class="form-control" required="" />
                                        <label class="form-control-label">Apply Coupon Code</label>
                                    </div>
                                </div>
                                <div class="col-auto align-self-center">
                                    {this.state.iscouponApplied == 0 ?
                                        (
                                            <button
                                                onClick={() => this.AppliedCouponAction()}
                                                class="btn btn-default button-rounded-36 shadow"><i class="material-icons">arrow_forward</i></button>
                                        ) : null}

                                </div>
                            </div>
                        </div>


                        <div class="card-body border-top-dashed">
                            <div class="row ">
                                <div class="col-4">
                                    <p class="text-secondary mb-1 small">Sub Total</p>
                                    <h5 class="mb-0">₹ {this.state.afterDiscountTotal}</h5>
                                </div>
                                <div class="col-4 text-center">
                                    <p class="text-secondary mb-1 small">Delivery Charge</p>
                                    <h5 class="mb-0">₹ {this.state.isDevApplied == 'NO' ? '0' : this.state.delcharge}</h5>
                                </div>
                                <div class="col-4 text-right">
                                    <p class="text-secondary mb-1 small">Total</p>
                                    <h5 class="mb-0">₹ {this.state.FinalTotal}</h5>
                                </div>
                            </div>

                        </div>



                    </div>

                    {this.state.isDevApplied == 'YES' ?
                        (
                            <div class="alert alert-primary mt-2" role="alert">
                                * Delivery free over on  ₹ {this.state.delMinimumPrice}
                            </div>
                        )
                        : null}



                    {this.state.iscouponApplied == 1 ?
                        (
                            <div class="alert alert-success mt-1" role="alert">
                                {this.state.CouponValue} applied successfully
                            </div>
                        )
                        : null}

                    {this.state.iscouponApplied == 1 ?
                        (

                            <div class="alert alert-success mt-1" role="alert">
                                {this.state.couponMsg}
                            </div>
                        )
                        : null}



                    <div className="row ">

                        <div onClick={() => this.setState({ PaymentMode: 'COD' })} className="col-12 col-md-6 col-lg-4 col-xl-4 mb-1 p-2">
                            <div class="card border-0 shadow-sm">
                                <div class="card-body">

                                    <div className="row ">
                                        <div className="col-4 col-md-4 col-lg-4 col-xl-4">

                                            {this.state.PaymentMode == 'COD' ?
                                                (
                                                    <button class="btn btn-default button-rounded-36 shadow"><i class="material-icons">adjust</i></button>

                                                ) :
                                                (
                                                    <button class="btn btn-dark button-rounded-36 shadow"><i class="material-icons">adjust</i></button>

                                                )}

                                        </div>
                                        <div className="col-8 col-md-8 col-lg-8 col-xl-8">

                                            <h5 class="mt-1"> Cash On Delivery </h5>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>





                    </div>



                    <div class="card mb-4 border-0 shadow-sm border-top-dashed">
                        <div class="card-body text-center">
                            <p class="text-secondary my-1">Net Payable</p>
                            <h3 class="mb-0">₹ {this.state.FinalTotalAmount}</h3>
                            <br />
                            {this.state.clickedPaymen == false ? (
                                <a onClick={() => this.PlaceThisOrderFinal()} class="btn btn-lg btn-default text-white btn-block btn-rounded shadow"><span>Place Order</span><i class="material-icons">arrow_forward</i></a>

                            ) :
                                (
                                    <div class="row">
                                        <div class="col-12 text-center">
                                            <div class="btn btn-default btn-rounded mb-3">
                                                <div class="btn-loader">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )}
                        </div>
                    </div>




                </div>
            );
        }

    }


    async AppliedCouponAction() {



        this.setState({ isLoadCoupon: true })
        fetch(URL + "/APP-API/Product/CouponAction", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({


                coupon: this.state.CouponValue,
                UserID: this.state.UserID


            })

        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({ isLoadCoupon: false })

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
                    toast.success(msgPopPup)

                    if (responseJson.userStatus == 'used') {

                        var msgPopPup = '** You already used this coupon code';
                        toast.error(msgPopPup)

                    }


                    if (Number(responseJson.data[0].minimum_order_amount) > Number(this.state.totalAmount)) {

                        var msgPopPup = "COUPON VAILD ONLY ON MORE THAN ₹ " + Math.floor(responseJson.data[0].minimum_order_amount);
                        toast.error(msgPopPup)


                    }
                    else {
                        // console.log('TOTAL IS OK',)
                        if (responseJson.data[0].coupon_type == 'percentage') {

                            const discount = this.state.afterDiscountTotal * (Math.floor(responseJson.data[0].coupon_discount) / 100)
                            const net = this.state.afterDiscountTotal - Math.round(discount)

                            var msg = 'You got ' + Math.floor(responseJson.data[0].coupon_discount) + ' % OFF  ₹ ' + Math.round(discount) + ' Save'

                            if (this.state.isDevApplied == 'NO') {
                                this.setState({ FinalTotalAmount: net, iscouponApplied: 1, couponMsg: msg, couponId: responseJson.data[0].coupon_id })
                            }
                            else {
                                this.setState({ FinalTotalAmount: net + Math.floor(this.state.delcharge), iscouponApplied: 1, couponMsg: msg, couponId: responseJson.data[0].coupon_id })
                            }




                        }
                        else if (responseJson.data[0].coupon_type == 'amount') {
                            var msg = 'You got ₹' + Math.floor(responseJson.data[0].coupon_discount) + ' OFF '

                            this.setState({ FinalTotalAmount: this.state.FinalTotalAmount - responseJson.data[0].coupon_discount, iscouponApplied: 1, couponMsg: msg, couponId: responseJson.data[0].coupon_id })

                        }
                        else if (responseJson.data[0].coupon_type == 'freeshiping') {
                            if (this.state.isDevApplied == 'NO') {

                                var msgPopPup = "Free Shipping applied already";
                                toast.error(msgPopPup)


                            }
                            else {
                                var msg = 'You got free shipping ₹' + Math.floor(this.state.delcharge) + ' OFF '
                                this.setState({ FinalTotalAmount: this.state.FinalTotalAmount - this.state.delcharge, iscouponApplied: 1, couponMsg: msg, couponId: responseJson.data[0].coupon_id })

                            }



                        }

                    }

                }

                if (responseJson.userStatus == 'used') {

                    var msgPopPup = '** You already used this coupon code';
                    toast.error(msgPopPup)

                }















            })
            .catch((error) => {
                //  console.error(error);

            });


    }





    PlaceThisOrderFinal() {

        this.setState({ clickedPaymen: true })

        if (this.state.PaymentMode == 'COD') {




            fetch(URL + "/APP-API/Product/CODPayment", {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    AddressId: this.state.addressId,
                    UserID: this.state.UserID,
                    FinalTotalAmount: this.state.FinalTotalAmount,
                    iscouponApplied: this.state.iscouponApplied,
                    PaymentMode: this.state.PaymentMode,
                    couponId: this.state.couponId,
                    isDevApplied: this.state.isDevApplied,
                    delcharge: this.state.delcharge

                })

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ clickedPaymen: false })


                    // console.log('Payment Server',responseJson)

                    if (responseJson.status == 'Success') {


                        var msgPopPup = '** Order Placed Successfull';
                        toast.success(msgPopPup)

                        let that = this.props;

                        setTimeout(function () {



                            that.history.push("/Order")


                        }, 700);













                    }
                    else {


                        var msgPopPup = '** Network Problem';
                        toast.error(msgPopPup)


                    }







                })
                .catch((error) => {
                    //  console.error(error);

                });



        }
        else if (this.state.PaymentMode == 'online') {

            this.setState({ orderclicked: true })
            fetch(URL + "/APP-API/Product/TemperaryPayment", {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    AddressId: this.state.addressId,
                    UserID: this.state.UserID,
                    FinalTotalAmount: this.state.FinalTotalAmount,
                    iscouponApplied: this.state.iscouponApplied,
                    PaymentMode: this.state.PaymentMode,
                    couponId: this.state.couponId,
                    isDevApplied: this.state.isDevApplied,
                    delcharge: this.state.delcharge



                })

            })
                .then((response) => response.json())
                .then((responseJson) => {

                    this.setState({ clickedPaymen: false })

                    // console.log('Payment Server',responseJson)

                    if (responseJson !== '') {


                        this.sendToPayemt(responseJson)

                    }
                    else {


                        var msgPopPup = '** Network Problem';
                        toast.error(msgPopPup)
                    }







                })
                .catch((error) => {
                    //  console.error(error);

                });






        }

    }



}

export default withRouter(CheackOut);