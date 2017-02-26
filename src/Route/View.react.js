/**
 * Created by dmoraschi on 31/12/2016.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Linking } from 'react-native';
import { ListView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { AppRegistry } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

import MapView from 'react-native-maps';

import { FromToToolbar } from '../Components';
import { Riders } from './'
import GoogleMaps from '../Utils/GoogleMaps';

import STYLE from './../../app/styles';


class RouteView extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * Init
     */
    componentDidMount = () => {
        this.generateDirections(this.props.item, null);
    };

    /**
     *
     */
    goBack = () => {
        let { item } = this.state;
        if(item) {
            this.props.updateItem(this.state.item, this.props.id);
        }
        this.props.navigator.pop();
    };

    /**
     *
     * @param type
     */
    viewSearchPlace = (type) => {
        this.props.navigator.push({
            id: "SearchPlaceView",
            passProps: {
                item: this.state.item,
                id: this.props.id,
                type: type,
                staleItem: this.staleItem,
            }
        });
    };

    /**
     *
     * @param item
     * @param index
     */
    staleItem = (item, index) => {
        item.points = null;
        this.generateDirections(item, null)
    };

    /**
     *
     */
    swapFromTo = () => {
        let { item, originalItem } = this.state;
        if (! item) {
            return;
        }

        if (originalItem) {
            this.generateDirections(originalItem, item);
            return;
        }

        let newItem = {
            _id: item._id,
            title: item.title,
            from: item.to,
            to: item.from,
            points: null,
            directionPolygon: null,
        };

        this.generateDirections(newItem, item)
    };

    /**
     *
     * @param item
     * @param originalItem
     */
    generateDirections = (item, originalItem) => {
        if (item.points || ! this.props.generateDirections) {
            this.generatePolyline(item, originalItem);
            return;
        }

        if (! (item.from.position.lat && item.from.position.lng
            && item.to.position.lat && item.to.position.lng)) {
            this.generatePolyline(item, originalItem)
            return;
        }

        GoogleMaps.getDirectionsAsync(
            item.from.position.lat, item.from.position.lng,
            item.to.position.lat, item.to.position.lng
        ).then((responseJson) => {
            if (responseJson.status === "OK") {
                item.points = responseJson.routes[0].overview_polyline.points;
                item.directionPolygon = GoogleMaps.decodePolyline(item.points);
            } else {
                item.points = null;
                item.directionPolygon = [{
                    latitude: item.from.position.lat,
                    longitude: item.from.position.lng
                },
                {
                    latitude: item.to.position.lat,
                    longitude: item.to.position.lng
                }];
                console.log("generateDirections", item, responseJson.status);
            }

            this.generatePolyline(item, originalItem);
        });
    };

    /**
     *
     */
    generatePolyline = (item, originalItem) => {
        this.setState({
            originalItem: originalItem || null,
            item: item,
            region: new MapView.AnimatedRegion({
                latitude: item.from.position.lat,
                longitude: item.from.position.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }),
            from: {
                latlng: {
                    latitude: item.from.position.lat,
                    longitude: item.from.position.lng,
                },
                title: item.from.title,
                description: '',
            },
            to: {
                latlng: {
                    latitude: item.to.position.lat,
                    longitude: item.to.position.lng,
                },
                title: item.to.title,
                description: '',
            },
            points: item.points,
            directionPolygon: item.directionPolygon
        });
    };

    /**
     *
     * @param from
     * @param to
     * @param delay
     * @param duration
     * @param animated
     */
    fitMapView = (from, to, delay, duration, animated) => {
        setTimeout(() => {
            // this.refs.map.fitToSuppliedMarkers([
            //     from,
            //     to
            // ], true);
            let toFit = (to.latlng.latitude && to.latlng.longitude)
                ? to.latlng
                : from.latlng;

            this.refs.map.fitToCoordinates([from.latlng, toFit], {
                edgePadding: {top: 60, right: 60, bottom: 60, left: 60},
                duration: duration,
                animated: animated,
            });
        }, delay);
    };

    /**
     *
     * @returns {*}
     */
    renderToolbar = () => {
        const { item, from, to } = this.state;

        let fromTitle, toTitle = "";
        if (item) {
            fromTitle = from.title;
            toTitle = to.title;
        } else {
            fromTitle = this.props.item.from.title;
            toTitle = this.props.item.to.title;
        }

        return (
            <FromToToolbar
                style={{
                    container: {
                        height:110,
                        zIndex:100000,
                        shadowColor: "rgb(0,0,0)",
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    },
                }}
                isSearchActive={false}
                leftElement="arrow-back"
                rightElement="import-export"
                onRightElementPress={this.swapFromTo}
                onLeftElementPress={this.goBack}
                topElement={fromTitle}
                topElementIcon="radio-button-checked"
                onTopElementPress={() =>
                    this.viewSearchPlace("from")
                }
                bottomElement={toTitle}
                bottomElementIcon="place"
                onBottomElementPress={() =>
                    this.viewSearchPlace("to")
                }
            />
        );
    };

    /**
     *
     * @param key
     * @param marker
     * @returns {*}
     */
    renderMarker = (key, marker) => {
        if (! marker) {
            return null;
        }

        return (
            <MapView.Marker
                key={marker.title}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                draggable
                onDragEnd={(e) => {
                    let { item, originalItem } = this.state;
                    let newItem = {
                        _id: item._id,
                        title: item.title,
                        from: item.from,
                        to: item.to,
                        points: null,
                        directionPolygon: null,
                    };

                    GoogleMaps.geoCode(
                        e.nativeEvent.coordinate.latitude,
                        e.nativeEvent.coordinate.longitude
                    ).then((responseJson) => {
                        if (responseJson.status === "OK") {
                            newItem[key].title = responseJson.results[0].formatted_address;
                            newItem[key].position.lat = responseJson.results[0].geometry.location.lat;
                            newItem[key].position.lng = responseJson.results[0].geometry.location.lng;
                        } else {
                            newItem[key].title = "Unable to retrieve street address";
                            newItem[key].position.lat = e.nativeEvent.coordinate.latitude;
                            newItem[key].position.lng = e.nativeEvent.coordinate.longitude;
                            console.log("renderMarker@geoCode", e.nativeEvent.coordinate, responseJson.status);
                        }

                        this.generateDirections(newItem, originalItem);
                        //this.state.region.setValue(e.nativeEvent.coordinate);
                    });

                }}
            />
        );
    };

    /**
     *
     */
    renderFromMarker = () => {
        const { from } = this.state;
        return this.renderMarker("from", from);
    };

    /**
     *
     */
    renderToMarker = () => {
        const { to } = this.state;
        return this.renderMarker("to", to);
    };

    /**
     *
     * @returns {*}
     */
    renderDirectionPolygon = () => {
        const { directionPolygon } = this.state;
        if (! directionPolygon) {
            return null;
        }

        return (
            <MapView.Polyline
                coordinates={directionPolygon}
                strokeWidth={6}
                strokeColor={STYLE.Theme.palette.secondaryColor}
                zIndex={10000000}
                lineCap={"round"}
            />
        );
    };

    /**
     *
     * @returns {*}
     */
    renderMapView = () => {
        const { region, from, to } = this.state;
        if (from && to) {
            this.fitMapView(from, to, 200, 100, true);
        }

        return (
            <MapView
                ref="map"
                style={STYLE.Map}
                zoomEnabled={true}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsTraffic={false}
                //region={region}
                //onRegionChange={this.onRegionChange}
                loadingEnabled
                loadingIndicatorColor="rgb(52,57,75)"
                loadingBackgroundColor="transparent"
            >
                {this.renderFromMarker()}
                {this.renderToMarker()}
                {this.renderDirectionPolygon()}
            </MapView>
        );
    };

    /**
     *
     * @returns {*}
     */
    renderRiders = () => {
        const { item } = this.state;
        if (! item) {
            return null;
        }

        return (
            <Riders item={this.state.item} />
        );
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{
                    zIndex:100000,
                    shadowColor: "rgb(0,0,0)",
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                }}>
                    {this.renderToolbar()}
                </View>
                <View style={{flex:1,height:200}}>
                    {this.renderMapView()}
                </View>
                <View style={{flex:1}}>
                    {this.renderRiders()}
                </View>
            </View>
        );
    }
}

/**
 *
 * @type {{generateDirections}}
 */
RouteView.propTypes = {
    generateDirections: PropTypes.bool,
};

/**
 *
 * @type {{generateDirections: boolean}}
 */
RouteView.defaultProps = {
    generateDirections: true
};

export default RouteView;
