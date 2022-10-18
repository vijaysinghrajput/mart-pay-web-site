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
import { DualHelixLoader } from '../../component/Loaders/DualHelix';


import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


import URL from '../../URL'
import { position } from '@chakra-ui/styled-system';

const searchOptions = {
    // input: 'Gorakhpur Uttar Pardesh',
    location: window.google.maps.LatLng(26.7606, 83.3732),
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




class ChooseArea extends Component {



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
            user_mobile: '',
            user_house_no: '',
            user_street: '',
            user_full_address: '',
            user_city: '',
            user_addres_type: 'Home',
            UserAddressData: [],
            mapLoaded: false











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
    }


    async componentDidMount() {


        const UserIDs = cookies.get("userID");
        const UserID = Base64.atob(UserIDs)
        await this.setState({ UserID })
        this.FetchAllAddress()

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
                this.setState({ isDataLoading: false, UserAddressData: responseJson.address, })
                // console.log('address', responseJson.address)
            })
            .catch((error) => { });
    }



    render() {



        return (
            <>

<section class="osahan-signin-main" style={{ overflowX: "hidden" }}>
                <div class="container containerLogin">
                    <div class="row d-flex align-items-center justify-content-center vh-100">
                        <div class="col-lg-6">
                        
                            <div class="osahan-signin shadow-sm bg-white p-4 rounded vh-sm-100">
                                <div class="p-3">
                                    <h2 class="my-0">Welcome Back</h2>
                                    <p class="small mb-4">Sign in to Continue.</p>
                                    <div class="form-group">

                                    <React.Fragment>


<div class="col-md-12 form-group">
    <label class="form-label"> <label class="text-danger">*</label> Area / Locality</label>
    <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}


    >

        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input

                    {...getInputProps({
                        placeholder: 'E.g. Taramandal , Golghar , Mohaddipur',
                        className: 'form-control',
                    })}
                />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                            ? 'list-group-item active'
                            : 'list-group-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                            ? { cursor: 'pointer' }
                            : { cursor: 'pointer' };
                        return (
                            <div class="list-group"
                                {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                })}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

    </PlacesAutocomplete>









</div>






</React.Fragment>



                                    <label class="form-label">Locate your delivery address on map   <label class="text-danger"> - Move red location marker to your delivery address</label></label>
                                        <div class="">
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
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            </>





        );

    }

    refreshSate() {
        this.setState({
            address: '',
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
            user_city: '',
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
                    user_city: q.city


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

                    var deletes = "delete" + i;

                    window.location.reload();

                    $(deletes).modal('hide');



                }



            })
            .catch((error) => {
                //  console.error(error);

            });



    }
    async SaveAddress(type, address_id) {



        this.setState({ isClickedAdd: true, })



        const { user_name, user_mobile, user_house_no, user_street, user_addres_type, user_city, user_full_address } = this.state;

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

        else if (user_city === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Please Choose Locality';
            toast.error(msg)

        }

        else if (user_full_address === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Please Choose Locality';
            toast.error(msg)

        }


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
                    UserId: this.state.UserID,
                    user_name: user_name,
                    user_mobile: user_mobile,
                    user_house_no: user_house_no,
                    user_street: user_street,
                    user_full_address: user_full_address,
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
                            UserAddressData: responseJson.data
                        })
                        this.refreshSate()


                        $('#addAddressModal').modal('toggle');



                    }



                })
                .catch((error) => {
                    //  console.error(error);

                });

        }




    }






    handleChange = address => {
        this.setState({ address: address });
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

export default ChooseArea;