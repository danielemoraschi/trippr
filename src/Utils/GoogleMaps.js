/**
 * Created by dmoraschi on 03/01/2017.
 */
'use strict';

import { GOOGLE_KEY } from "../../app/config";

const GOOGLE_DIR_API = "https://maps.googleapis.com/maps/api/directions/json";
const GOOGLE_GEO_API = "https://maps.googleapis.com/maps/api/geocode/json";

const GoogleMaps = (() => {

    /**
     *
     * @param lat
     * @param lng
     */
    function geoCode(lat, lng) {
        let api = [
            GOOGLE_GEO_API,
            "?latlng=", lat, ",", lng,
            "&key=", GOOGLE_KEY
        ].join('');

        return fetch(api)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                return {
                    status: error.toString()
                };
            });
    }

    /**
     *
     * @param from_lat
     * @param from_lng
     * @param to_lat
     * @param to_lng
     */
    function getDirectionsAsync(from_lat, from_lng, to_lat, to_lng) {
        let api = [
            GOOGLE_DIR_API,
            "?origin=", from_lat, ",", from_lng,
            "&destination=", to_lat, ",", to_lng,
            "&key=", GOOGLE_KEY
        ].join('');

        return fetch(api)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                return {
                    status: error.toString()
                };
            });
    }

    /**
     *
     * @param encoded
     * @returns {Array}
     */
    function decodePolyline(encoded) {
        if (!encoded) {
            return [];
        }

        let poly = [];
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;

        while (index < len) {
            let b, shift = 0, result = 0;

            do {
                b = encoded.charCodeAt(index++) - 63;
                result = result | ((b & 0x1f) << shift);
                shift += 5;
            } while (b >= 0x20);

            lat += (result & 1) != 0 ? ~(result >> 1) : (result >> 1);

            shift = 0;
            result = 0;

            do {
                b = encoded.charCodeAt(index++) - 63;
                result = result | ((b & 0x1f) << shift);
                shift += 5;
            } while (b >= 0x20);

            lng += (result & 1) != 0 ? ~(result >> 1) : (result >> 1);

            poly.push({
                latitude: lat / 1e5,
                longitude: lng / 1e5,
            });
        }

        return poly;
    }


    return {
        getDirectionsAsync: getDirectionsAsync,
        decodePolyline: decodePolyline,
        geoCode: geoCode
    }

})();

export default GoogleMaps;