import React, { useState, useEffect, useRef } from "react";

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE");
Geocode.setLanguage("en");
Geocode.setRegion("in");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();


import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



const searchOptions = {
    // input: 'Gorakhpur Uttar Pardesh',
    location: window.google.maps.LatLng(26.7606, 83.3732),
    types: ['address'],
    componentRestrictions: { country: "in" },



}






export default class LoactionPicker extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            address: '',
            position: {
                lat: 26.7606,
                lng: 83.3732
            },
            zoom: 13,

            user_address: {
                user_house_no: null
            }



        };


    }







    handleChange = address => {
        this.setState({ address: address });
    };

    handleSelect = address => {

        geocodeByAddress(address)
            .then(
                (results) => {


                    this.gettingCoords(results[0])



                }
            )
            .catch(error => console.error(error));



    };


    gettingCoords(Googleresult) {
        getLatLng(Googleresult)
            .then(
                (latLng) => {


                    this.setState({ position: latLng })
                    // this.getAddressFromLatAndLng(latLng.lat, latLng.lng)


                }
            ).catch(error => console.error(error));

    }



    getAddressFromLatAndLng(lat, lng) {
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                let house_no, address_line_1, address_line_2, address_line_3, address_line_4, city, state, country;
                for (let i = 0; i < response.results[0].address_components.length; i++) {
                    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                        switch (response.results[0].address_components[i].types[j]) {
                            case "premise":
                                house_no = response.results[0].address_components[i].long_name;
                                break;
                            case "route":
                                address_line_1 = response.results[0].address_components[i].long_name;
                                break;

                            case "sublocality_level_2":
                                address_line_2 = response.results[0].address_components[i].long_name;
                                break;

                            case "neighborhood":
                                address_line_3 = response.results[0].address_components[i].long_name;
                                break;


                            case "sublocality_level_1":
                                address_line_4 = response.results[0].address_components[i].long_name;
                                break;

                            case "locality":
                                city = response.results[0].address_components[i].long_name;
                                break;



                            case "administrative_area_level_1":
                                state = response.results[0].address_components[i].long_name;
                                break;
                            case "country":
                                country = response.results[0].address_components[i].long_name;
                                break;
                        }
                    }
                }
                // console.log(city, state, country);

                var user_house_no, user_full_address, user_city;
                if (user_house_no !== undefined) {
                    this.setState(prevState => {
                        let user_address = Object.assign({}, prevState.user_address);
                        user_address.user_house_no = house_no;
                        return { user_address };
                    })

                    this.props.sendDataToParent(this.state.user_address)
                }

            },
            (error) => {
                console.error(error);
            }
        );



    }
    onMarkerDragEnd = (coord, index) => {

        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        // console.log('marker postion lat', lat)
        // console.log('marker postion lng', lng)

        this.getAddressFromLatAndLng(lat, lng)


        // this.setState({ zoom: 6 })
        this.setState({ position: latLng, zoom: 16 })


    };


    render() {
        return (


            <React.Fragment>


                <div class="col-md-12 form-group">
                    <label class="form-label">Area / Locality</label>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        searchOptions={searchOptions}


                        class="form-control"
                    >

                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input

                                    class="form-control"

                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
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

                    <label class="form-label">{this.state.address}</label>


                    <div class="container-fluid">
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


                            >

                                <Marker
                                    position={this.state.position}
                                    draggable={true}
                                    onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                    name="Delivery Location"
                                // animation={window.google.maps.Animation.DROP}

                                />

                            </Map>

                        </div>
                    </div>





                </div>






            </React.Fragment>


        );
    }
}