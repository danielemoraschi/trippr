/**
 * Created by dmoraschi on 23/01/2017.
 */
'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Animated } from 'react-native';
import { GooglePlacesAutocomplete } from '../Elements';
import { GOOGLE_KEY } from "../../app/config";

const homePlace = {description: "Home", formatted_address: "Home", geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: "Work", formatted_address: "Work", geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const example = {
    "description":"Tower Bridge Road, London, United Kingdom",
    "id":"dec518499beef01b3db6b399f7282d5927a6b77d",
    "matched_substrings":[
        {
            "length":5,
            "offset":0
        }
    ],
    "place_id":"EilUb3dlciBCcmlkZ2UgUm9hZCwgTG9uZG9uLCBVbml0ZWQgS2luZ2RvbQ",
    "reference":"CjQtAAAAqYDY4Mx5Wm7e9M4Lt40IF8oosUnZNhChIduUoXrB8nYhem-QtVIk6FabYDLMiW-2EhAw198TOQKfygxvHnmlwf9dGhSckRLzDCJyple22Jjpgxfsh-KShQ",
    "structured_formatting":
        {
            "main_text":"Tower Bridge Road",
            "main_text_matched_substrings":[
                {
                    "length":5,
                    "offset":0
                }
            ],
            "secondary_text":"London, United Kingdom"
        },
    "terms":[
        {
            "offset":0,
            "value":"Tower Bridge Road"
        },
        {
            "offset":19,
            "value":"London"
        },
        {
            "offset":27,
            "value":"United Kingdom"
        }
    ],
    "types":[
        "route",
        "geocode"
    ]
};
const details = {
    "html_attributions" : [],
    "result" : {
        "address_components" : [
            {
                "long_name" : "Tower Bridge Road",
                "short_name" : "Tower Bridge Rd",
                "types" : [ "route" ]
            },
            {
                "long_name" : "Greater London",
                "short_name" : "Greater London",
                "types" : [ "administrative_area_level_2", "political" ]
            },
            {
                "long_name" : "United Kingdom",
                "short_name" : "GB",
                "types" : [ "country", "political" ]
            }
        ],
        "adr_address" : "\u003cspan class=\"street-address\"\u003eTower Bridge Rd\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eUnited Kingdom\u003c/span\u003e",
        "formatted_address" : "Tower Bridge Rd, United Kingdom",
        "geometry" : {
            "location" : {
                "lat" : 51.5001971,
                "lng" : -0.07858719999999998
            }
        },
        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
        "id" : "dec518499beef01b3db6b399f7282d5927a6b77d",
        "name" : "Tower Bridge Road",
        "place_id" : "ChIJW5Jn8kQDdkgRhl_LxOfF12A",
        "reference" : "CmRbAAAAb8CkG4q-InwVgfUyNklriN5sb_G_2x-9-fpypv067VnXUbUEvZ0YGZoOQrcL5dAFwDq8KVBOj9CPiv_udVTpvVe_93dF-IJaEdYxklWlmUlCcrskl1oebMm-VSps-3OQEhDo3ViZfySx7-tE16t4iN7pGhSscCDG5VvH0Ih_XuBiyQOpcPIZKw",
        "scope" : "GOOGLE",
        "types" : [ "route" ],
        "url" : "https://maps.google.com/?q=Tower+Bridge+Rd,+United+Kingdom&ftid=0x48760344f267925b:0x60d7c5e7c4cb5f86",
        "utc_offset" : 0
    },
    "status" : "OK"
};

class SearchPlacesAutocomplete extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        };
    }

    /**
     *
     */
    goBack = () => {
        this.props.navigator.pop();
    };

    /**
     *
     * @param position
     */
    goBackWithPosition = (position) => {
        if (position) {
            let stateItem = this.state.item;
            console.log(stateItem)
            stateItem[this.props.type] = position;
            this.props.staleItem(stateItem, this.props.id);
        }
        this.goBack();
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <View style={{flex:1}}>
                <GooglePlacesAutocomplete
                    onSearchClosed={this.goBack}
                    placeholder='Search'
                    placeholderTextColor={'#A8A8A8'}
                    // minimum length of text to search
                    minLength={3}
                    enablePoweredByContainer={false}
                    autoFocus={true}
                    // true/false/undefined
                    listViewDisplayed={true}
                    fetchDetails={true}
                    // display street only
                    // renderDescription={(row) => {
                    //     return row.description
                    // }}
                    // 'details' is provided when fetchDetails = true
                    onPress={(data, details = null) => {
                        let position = {
                            title: "",
                            position: {
                                lat: null, lng: null,
                            }
                        };
                        if (details) {
                            position = {
                                title: details.formatted_address,
                                position: {
                                    lat: details.geometry.location.lat,
                                    lng: details.geometry.location.lng,
                                }
                            };
                        }
                        this.goBackWithPosition(position);
                    }}
                    getDefaultValue={() => {
                        // text input default value
                        return '';
                    }}
                    query={{
                        // available options:
                        // https://developers.google.com/places/web-service/autocomplete
                        key: GOOGLE_KEY,
                        language: 'en', // language of the results
                        //types: '(cities)', // default: 'geocode'
                    }}
                    styles={{
                        description: {
                            fontWeight: 'bold',
                        },
                        predefinedPlacesDescription: {
                            color: '#000',
                        },
                    }}
                    // Will add a 'Current location' button at
                    // the top of the predefined places list
                    currentLocation={true}
                    currentLocationLabel="Search nearby"
                    // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    nearbyPlacesAPI='GooglePlacesSearch'
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API:
                        // https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    // available options for GooglePlacesSearch API:
                    // https://developers.google.com/places/web-service/search
                    GooglePlacesSearchQuery={{
                        rankby: 'distance',
                    }}
                    // filter the reverse geocoding results by types:
                    // ['locality', 'administrative_area_level_3'] if you want to display only cities
                    filterReverseGeocodingByTypes={[
                        'locality',
                        'administrative_area_level_3'
                    ]}
                    //predefinedPlaces={[homePlace, workPlace]}
                    predefinedPlacesAlwaysVisible={true}
                />
            </View>
        );
    }
};

export default SearchPlacesAutocomplete;