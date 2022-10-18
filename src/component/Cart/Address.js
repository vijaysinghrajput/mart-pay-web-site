import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import $ from 'jquery';

import Geocode from "react-geocode";

import Base64 from "../../helper/EncodeDecode";
import Cookies from 'universal-cookie';
import { Select } from '@chakra-ui/react'


import URL from '../../URL'
import { position } from '@chakra-ui/styled-system';

const searchOptions = {
    // input: 'Gorakhpur Uttar Pardesh',
    location: window.google?.maps?.LatLng(26.7606, 83.3732),
    types: ['address'],
    componentRestrictions: { country: "in" },



}






// import LoactionPicker from '../map/LoactionPicker'




const cookies = new Cookies()



Geocode.setApiKey("AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE");
Geocode.setLanguage("en");
Geocode.setRegion("in");
// Geocode.setLocationType("ROOFTOP");
// Geocode.enableDebug();




class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDataLoading: true,
            UserID: '',
            address: '',
            position: {
                lat: 26.7606,
                lng: 83.3732
            },
            zoom: 14,
            user_name: '',
            serviceArea: [],
            user_mobile: '',
            user_house_no: '',
            user_street: '',
            user_full_address: '',
            user_city: 'Gorakhpur',
            user_addres_type: 'Home',
            UserAddressData: [],
            mapLoaded: false,
            selectedDeliveryAddress: null
        }
        this.onChange = this.onChange.bind(this);
    }

    handleMapIdle = () => {
        this.setState({
            mapLoaded: true
        });
    }

    onChange(e) {
        if (e.target.id === 'user_name') {
            this.setState({ user_name: e.target.value });
        } else if (e.target.id === 'user_mobile') {
            this.setState({ user_mobile: e.target.value });
        } else if (e.target.id === 'user_house_no') {
            this.setState({ user_house_no: e.target.value });
        }
        else if (e.target.id === 'user_street') {
            this.setState({ user_street: e.target.value });
        }
        else if (e.target.id === 'base_address') {
            this.setState({ base_address: e.target.value });
        }
    }

    async componentDidMount() {
        const UserIDs = cookies.get("userID");
        const UserID = UserIDs && Base64.atob(UserIDs)
        await this.setState({ UserID })
        this.FetchAllAddress();

        console.log("addres check ---->", this.state.UserAddressData);
    }

    FetchAllAddress() {
        fetch(URL + "/APP-API/App/getAllAddress", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }, body: JSON.stringify({ UserID: this.state.UserID })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('address', responseJson);
                responseJson.address.length ? this.setState({
                    isDataLoading: false,
                    UserAddressData: responseJson.address,
                    selectedDeliveryAddress: responseJson.address[0].address_id,
                }) : this.setState({
                    UserAddressData: [],
                    selectedDeliveryAddress: null,
                });
                this.setState({
                    serviceArea: responseJson.serviceArea.sort((a, b) => a.area_name.localeCompare(b.area_name)),
                })

                this.props.setAddress(responseJson.address[0])
            })
            .catch((error) => { });
    }

    render() {

        return (
            <>
                <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden mt-3">
                    <div className="card-header bg-white border-0 p-0" id="headingtwo">
                        <h2 className="mb-0">
                            <button onClick={() => this.refreshSate()} className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                                <span className="c-number">2</span> Order Address
                            </button>
                        </h2>
                    </div>
                    <div id="collapsetwo" className="collapse" aria-labelledby="headingtwo" data-parent="#accordionExample">
                        <div className="card-body p-0 border-top">
                            <div className="osahan-order_address">
                                <div className="p-3 row">
                                    <div className="col-12 my-3">
                                        {/* <a href="#" className="btn btn-success btn-lg w-50 mx-auto btn-block mt-3" type="button" >Please Add Delivery Address</a> */}
                                        <a href="#" data-toggle="modal" data-target="#addAddressModal" className="text-decoration-none text-success ml-2"> <i className="icofont-plus-circle mr-1" />Add New  Address</a>
                                    </div>
                                    <>
                                        {this.state.UserAddressData.length ? (
                                            <>
                                                {this.state.UserAddressData.map((item, i) => {
                                                    return (
                                                        <div class="custom-control col-lg-6 custom-radio mb-3 position-relative border-custom-radio defaultChecked">
                                                            {/* <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" /> */}
                                                            <label class="custom-control-label w-100" for="customRadioInline1">
                                                                <div>
                                                                    <div class="p-3 bg-white rounded shadow-sm w-100">
                                                                        <p class="small text-muted m-0">{item.name} , {item.phone}</p>
                                                                        <p class="small text-muted m-0">{item.user_house_no} , {item.address}</p>
                                                                        <p class="small text-muted m-0">{item.base_address} , {item.city}</p>
                                                                        <p class="pt-2 m-0 text-right">
                                                                            <span class="small">
                                                                                <a href="#" onClick={() => this.EditCalled(item.address_id)} data-toggle="modal" data-target={"#EditAddressModal" + i} class="text-decoration-none text-success">
                                                                                    <i class="icofont-edit"></i> Edit</a>
                                                                            </span>
                                                                            <span class="small ml-3"><a href="#" data-toggle="modal" data-target={"#delete" + i} class="text-decoration-none text-danger"><i class="icofont-trash"></i> Delete</a></span>
                                                                        </p>
                                                                    </div>

                                                                    <span data-toggle="collapse" data-target="#collapsethree" onClick={() => { this.setState({ selectedDeliveryAddress: item.address_id }); this.props.setAddress(item) }} className={this.state.selectedDeliveryAddress == item.address_id ? 'btn btn-success border-top btn-lg btn-block' : 'btn btn-default border-top btn-lg btn-block'} >
                                                                        Deliver Here
                                                                    </span>

                                                                </div>
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <>
                                                {/* <div className="card-header bg-white border-0 p-0" id="headingtwo">
                                                <a href="#" data-toggle="modal" data-target="#addAddressModal" className="text-decoration-none text-success ml-auto"> <i className="icofont-plus-circle mr-1" />Add New Delivery Address</a>
                                            </div> */}
                                            </>
                                        )}
                                    </>
                                    {this.state.selectedDeliveryAddress == null && !this.state.UserAddressData.length ? (
                                        <a href="#" data-toggle="modal" data-target="#addAddressModal" className="btn btn-danger w-75 mx-auto btn-lg btn-block mt-3" type="button" >Please Add Delivery Address</a>
                                    ) : (
                                        <a href="#" className="btn btn-success btn-lg btn-block mt-3" type="button" data-toggle="collapse" data-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree">Continue</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="addAddressModal" tabindex="-1" role="dialog" aria-labelledby="addAddressModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addAddressModalLabel">Add Delivery Address</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form class="">
                                    <div class="form-row">
                                        <div class="col-md-12 form-group">
                                            <label class="form-label"> <label class="text-danger">*</label> Select Delivery Area</label>
                                            <Select size="sm" onChange={this.handleChange} id="base_address" value={this.state.base_address}>
                                                {this.state.serviceArea.map((areas, i) => {
                                                    return (
                                                        <option style={{}} value={areas.area_name}>{areas.area_name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <div class="col-md-12 form-group"><label class="form-label"> <label class="text-danger">*</label> Full Name</label>
                                            <input onChange={this.onChange} placeholder="First & Last Name" id="user_name" value={this.state.user_name} type="text" class="form-control" />
                                        </div>
                                        <div class="col-md-12 form-group">
                                            <label class="form-label"> <label class="text-danger">*</label> Mobile Number (10 Digit)</label>
                                            <input onChange={this.onChange} placeholder="10 Digit Mobile Number" id="user_mobile" value={this.state.user_mobile} type="tel" class="form-control" />
                                        </div>

                                        {/* <label class="form-label">Locate your delivery address on map   <label class="text-danger"> - Move red location marker to your delivery address</label></label> */}
                                        {/* <div class="container-fluid">
                                            <div class="map-responsive">
                                                <Map
                                                    google={window.google}
                                                    center={this.state.position}
                                                    zoom={this.state.zoom}
                                                    defaultZoom="Zoom"
                                                    initialCenter={{
                                                        lat: this.state.position.lat,
                                                        lng: this.state.position.lng
                                                    }}
                                                    onIdle={this.handleMapIdle}
                                                >
                                                    {this.state.mapLoaded && (
                                                        <Marker
                                                            // map={window.google}
                                                            draggable={true}
                                                            position={{ lat: this.state.position.lat, lng: this.state.position.lng }}
                                                            onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                                            name="Delivery Location" />
                                                        // animation={window.google.maps.Animation.DROP} />
                                                    )}
                                                    <InfoWindow
                                                        position={{ lat: (this.state.position.lat + 0.0018), lng: this.state.position.lng }}

                                                    >
                                                        <div>
                                                            <p style={{ padding: 0, margin: 0 }}>hello</p>
                                                        </div>
                                                    </InfoWindow>
                                                </Map>
                                            </div>
                                        </div> */}
                                        <div class="col-md-12 form-group"><label class="form-label"> <label class="text-danger">*</label> Flat / House / Office No.</label>
                                            <input onChange={this.onChange} type="text" value={this.state.user_house_no} id="user_house_no" class="form-control" />
                                        </div>
                                        <div class="col-md-12 form-group"><label class="form-label"> <label class="text-danger">*</label> Street / Society / Office Name</label>
                                            <input type="text" onChange={this.onChange} value={this.state.user_street} id="user_street" class="form-control" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer p-0 border-0">
                                <div class="col-6 m-0 p-0">
                                    <button type="button" class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
                                </div>
                                <div class="col-6 m-0 p-0">
                                    <button onClick={() => this.SaveAddress('insert', null)} type="button" class="btn btn-success btn-lg btn-block">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.UserAddressData.length ? (
                    <>
                        {this.state.UserAddressData.map((item, i) => {
                            return (
                                <div key={i + 12} class="modal fade EditAddressModal" tabindex="-1" id={"EditAddressModal" + i} role="dialog" aria-labelledby="EditAddressModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="EditAddressModalLabel">Edit Delivery Address</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form class="">
                                                    <div class="form-row">
                                                        <div class="col-md-12 form-group">
                                                            <label class="form-label"> <label class="text-danger">*</label> Select Delivery Area</label>
                                                            <Select size="sm" onChange={this.handleChange} id="base_address" value={this.state.base_address}>
                                                                {this.state.serviceArea.map((areas, i) => {
                                                                    return (
                                                                        <option style={{}} value={areas.area_name}>{areas.area_name}</option>
                                                                    )
                                                                })}
                                                            </Select>
                                                        </div>
                                                        <div class="col-md-12 form-group"><label class="form-label"> <label class="text-danger">*</label> Full Name</label>
                                                            <input onChange={this.onChange} placeholder="First & Last Name" id="user_name" value={this.state.user_name} type="text" class="form-control" />
                                                        </div>

                                                        <div class="col-md-12 form-group"><label class="form-label"> <label class="text-danger">*</label> Mobile Number (10 Digit)</label>
                                                            <input onChange={this.onChange} placeholder="10 Digit Mobile Number" id="user_mobile" value={this.state.user_mobile} type="tel" class="form-control" />
                                                        </div>

                                                        <div class="col-md-12 form-group">
                                                        </div>


                                                        <div class="col-md-12 form-group"><label class="form-label"> <label class="text-danger">*</label> Flat / House / Office No.</label>
                                                            <input onChange={this.onChange} type="text" value={this.state.user_house_no} id="user_house_no" class="form-control" />
                                                        </div>

                                                        <div class="col-md-12 form-group"><label class="form-label"> <label class="text-danger">*</label> Street / Society / Office Name</label>
                                                            <input type="text" onChange={this.onChange} value={this.state.user_street} id="user_street" class="form-control" />
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer p-0 border-0">
                                                <div class="col-6 m-0 p-0">
                                                    <button type="button" class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
                                                </div>
                                                <div class="col-6 m-0 p-0">
                                                    <button onClick={() => this.SaveAddress('update', item.address_id)} type="button" class="btn btn-success btn-lg btn-block">Update changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            )
                        })}
                    </>


                ) : null}

                {/* delete address Start */}
                {this.state.UserAddressData.length ? (

                    <>
                        {this.state.UserAddressData.map((item, i) => {
                            return (


                                <div class="modal fade modal DeleteAddressModal" id={"delete" + i} tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-sm modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title modal" id="DeleteModalLabel">Delete</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body text-center d-flex align-items-center">
                                                <div class="w-100 px-3">
                                                    <i class="icofont-trash text-danger display-1 mb-5"></i>
                                                    <h6>Are you sure you want to delete this?</h6>
                                                    <p class="small text-muted m-0">{item.name} , {item.phone}</p>
                                                    <p class="small text-muted m-0">{item.user_house_no} , {item.address}</p>
                                                    <p class="small text-muted m-0">{item.base_address} , {item.city}</p>
                                                </div>
                                            </div>
                                            <div class="modal-footer p-0 border-0">
                                                <div class="col-6 m-0 p-0">
                                                    <button type="button" class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
                                                </div>
                                                <div class="col-6 m-0 p-0">
                                                    <button onClick={() => this.deleteAddress(item.address_id, i)} type="button" class="btn btn-danger btn-lg btn-block">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </>


                ) : null
                }
                {/* delete address End */}

                <ToastContainer />

            </>
        )

    }

    refreshSate() {
        this.setState({
            address: '',
            base_address: this.state.serviceArea[0].area_name,
            position: {
                lat: 26.7606,
                lng: 83.3732
            },
            zoom: 14,
            user_name: '',
            user_mobile: '',
            user_house_no: '',
            user_street: '',
            user_full_address: '',
            user_city: 'Gorakhpur',
            user_addres_type: 'Home',
        })
    }
    EditCalled(address_id) {

        this.state.UserAddressData.filter(q => {
            if (q.address_id === address_id) {


                this.setState({
                    user_name: q.name,
                    user_mobile: q.phone,
                    user_house_no: q.user_house_no,
                    user_street: q.address,
                    address: q.base_address,
                    user_full_address: q.base_address,
                    user_city: q.city,
                    address: q.address,
                    base_address: q.base_address
                })

                this.setState(prevState => {
                    let position = Object.assign({}, prevState.position);  // creating copy of state variable position
                    position.lat = q.latitude;
                    position.lng = q.longitude          // update the name property, assign a new value
                    return { position };                                 // return new object position object
                })



            }
        })




    }

    deleteAddress(delete_id, i) {

        this.setState({ isClickedAdd: true })
        fetch(URL + "/APP-API/App/deleteUserAddress", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({

                delete_id: delete_id,
                UserID: this.state.UserId

            })


        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({ isClickedAdd: false })

                if (responseJson.status == 'done') {

                    var msg = 'Your address removed successfully'
                    toast.success(msg)
                    this.setState({ UserAddressData: responseJson.data })

                    $(".modal .close").click();
                    $(".modal-backdrop").remove();
                    $("body").removeClass("modal-open")

                    this.FetchAllAddress();



                }



            })
            .catch((error) => {
                //  console.error(error);

            });



    }
    async SaveAddress(type, address_id) {



        this.setState({ isClickedAdd: true, })



        const { user_name, user_mobile, user_house_no, user_street, user_addres_type, user_city, base_address, address } = this.state;

        console.log("hey data ---->", this.state);

        var phoneno = /^\d{10}$/;

        if (user_name === "") {

            this.setState({ isClickedAdd: false, })
            var msg = 'Full Name Requird';
            toast.error(msg)
        }

        else if (user_mobile === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Mobile Number Requird';
            toast.error(msg)

        }

        /* else if (user_city === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Please Choose Locality';
            toast.error(msg)

        } */

        // else if (user_full_address === '') {
        //     this.setState({ isClickedAdd: false, })

        //     var msg = 'Please Choose Locality';
        //     toast.error(msg)

        // }


        else if (user_house_no === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Flat / House / Office No. Requird';
            toast.error(msg)

        }

        else if (user_street === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Street / Society / Office Name Requird';
            toast.error(msg)

        }
        else if (base_address === '') {
            this.setState({ base_address: this.state.serviceArea[0].area_name, });
        }




        else {



            this.setState({ isClickedAdd: true })
            fetch(URL + "/APP-API/App/insertUserAddress", {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    actiontype: type,
                    address_id: address_id,
                    // address: address,
                    UserId: this.state.UserID,
                    user_name: user_name,
                    user_mobile: user_mobile,
                    user_house_no: user_house_no,
                    user_street: user_street,
                    base_address: base_address,
                    user_city: user_city,
                    user_addres_type: user_addres_type,
                    user_lat: this.state.position.lat,
                    user_lng: this.state.position.lng,

                })


            }).then((response) => response.json())
                .then((responseJson) => {

                    this.setState({ isClickedAdd: false })


                    //  console.log(responseJson)

                    if (responseJson.status == 'done') {

                        var msg = 'Your address ' + type + ' successfully'
                        toast.success(msg)

                        this.setState({
                            UserAddressData: responseJson.data, selectedDeliveryAddress: responseJson.data[0].address_id
                        })
                        this.refreshSate()


                        $('#addAddressModal .close').click();
                        $('.EditAddressModal .close').click();



                    }



                })
                .catch((error) => {
                    //  console.error(error);

                });

        }




    }






    handleChange = base_address => {
        this.setState({ base_address: base_address.target.value });
    };

    handleSelect = async (address) => {

        await geocodeByAddress(address)
            .then(
                (results) => {



                    this.gettingCoords(results[0])
                    this.gettingAddressFormating(results[0])



                }
            )
            .catch(error => console.error(error));



    };


    async gettingCoords(Googleresult) {
        await getLatLng(Googleresult)
            .then(
                (latLng) => {
                    this.setState({ position: latLng })

                    // console.log('place holer coord', position)

                }
            ).catch(error => console.error(error));

    }



    getAddressFromLatAndLng(lat, lng) {
        Geocode.fromLatLng(lat, lng).then(
            (response) => {

                this.gettingAddressFormating(response.results[0])
            },
            (error) => {
                console.error(error);
            }
        );



    }

    gettingAddressFormating(response) {
        let address_line_1, address_line_2, address_line_3, address_line_4, city;
        for (let i = 0; i < response.address_components.length; i++) {
            for (let j = 0; j < response.address_components[i].types.length; j++) {
                switch (response.address_components[i].types[j]) {

                    case "route":
                        address_line_1 = response.address_components[i].long_name;
                        break;

                    case "sublocality_level_2":
                        address_line_2 = response.address_components[i].long_name;
                        break;

                    case "neighborhood":
                        address_line_3 = response.address_components[i].long_name;
                        break;


                    case "sublocality_level_1":
                        address_line_4 = response.address_components[i].long_name;
                        break;



                    case "administrative_area_level_2":
                        city = response.address_components[i].long_name;
                        break;


                }
            }
        }

        var Addressdata = [address_line_1, address_line_2, address_line_3, address_line_4];

        Addressdata = Addressdata.filter(function (element) {
            return element !== undefined;
        });

        // console.log('addrees', Addressdata[0])

        this.setState({ user_full_address: Addressdata[0] })
        this.setState({ user_city: city })

        if (city !== 'Gorakhpur') {
            toast.error('Sorry! We only deliver in Gorakhpur UP')

        }
    }



    onMarkerDragEnd = async (coord, index) => {

        const { latLng } = await coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        // console.log('marker postion lat', lat)
        // console.log('marker postion lng', lng)

        this.getAddressFromLatAndLng(lat, lng)


        // this.setState({ zoom: 6 })
        this.setState({ zoom: 16 })

        this.setState(prevState => {
            let position = Object.assign({}, prevState.position);  // creating copy of state variable position
            position.lat = lat;
            position.lng = lng          // update the name property, assign a new value
            return { position };                                 // return new object position object
        })



    };


}

export default Address;