/**
 * Created by dmoraschi on 31/12/2016.
 */
'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Alert } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import { RouteList } from './';
import { RouteRepository } from '../Repository';

import Lunr from '../Utils/Lunr';
import MapView from 'react-native-maps' ;

let defaultList = [
    {
        title: null,//"To the Nursery from Work",
        from: {
            title: "The Relay Building",
            position: {
                lat: 51.5151434,
                lng: -0.0741534
            }
        },
        to: {
            title: "21 New Street, EC2TP, London, UK",
            position: {
                lat: 51.5173724,
                lng: -0.0809598
            }
        },
    },
    {
        title: null,//"To Tower Bridge from Home",
        from: {
            title: "5 Sylvester Path, E8 1EN, London, UK",
            position: {
                lat: 51.5460349,
                lng: -0.0581023
            }
        },
        to: {
            title: "Tower Bridge, Tower Bridge Road, London, UK",
            position: {
                lat: 51.5054597,
                lng: -0.0775452
            }
        },
    },
    {
        title: null,//"Edinburgh",
        from: {
            title: "The Relay Building",
            position: {
                lat: 51.5151434,
                lng: -0.0741534
            }
        },
        to: {
            title: "Edinburgh",
            position: {
                lat: 55.9411418,
                lng: -3.2754228
            }
        },
    },
    {
        title: null,//"To Milan",
        from: {
            title: "The Relay Building",
            position: {
                lat: 55.9411418,
                lng: -3.2754228
            }
        },
        to: {
            title: "Milan City",
            position: {
                lat: 45.4539673,
                lng: 8.8486655
            }
        },
    },
    {
        title: null,//"To Tower Bridge from Home",
        from: {
            title: "5 Sylvester Path, E81EN, London, UK",
            position: {
                lat: 51.5460349,
                lng: -0.0581023
            }
        },
        to: {
            title: "Tower Bridge, Tower Bridge Road, London, UK",
            position: {
                lat: 51.5054597,
                lng: -0.0775452
            }
        },
    },
    {
        title: null,//"To Tower Bridge from Home",
        from: {
            title: "5 Sylvester Path, E81EN, London, UK",
            position: {
                lat: 51.5460349,
                lng: -0.0581023
            }
        },
        to: {
            title: "Tower Bridge, Tower Bridge Road, London, UK",
            position: {
                lat: 51.5054597,
                lng: -0.0775452
            }
        },
    },
    {
        title: null,//"To Tower Bridge from Home",
        from: {
            title: "5 Sylvester Path, E81EN, London, UK",
            position: {
                lat: 51.5460349,
                lng: -0.0581023
            }
        },
        to: {
            title: "Tower Bridge, Tower Bridge Road, London, UK",
            position: {
                lat: 51.5054597,
                lng: -0.0775452
            }
        },
    },
    {
        title: null,//"Daniele's house",
        from: {
            title: "5 Sylvester Path, E81EN, London, UK",
            position: {
                lat: 51.5460349,
                lng: -0.0581023
            }
        },
        to: {
            title: "Tower Bridge, Tower Bridge Road, London, UK",
            position: {
                lat: 51.5054597,
                lng: -0.0775452
            }
        },
    },
    {
        title: null,//"To Tower Bridge from Home",
        from: {
            title: "5 Sylvester Path, E81EN, London, UK",
            position: {
                lat: 51.5460349,
                lng: -0.0581023
            }
        },
        to: {
            title: "Tower Bridge, Tower Bridge Road, London, UK",
            position: {
                lat: 51.5054597,
                lng: -0.0775452
            }
        },
    },
    {
        title: null,//"To Tower Bridge from Home",
        from: {
            title: "5 Sylvester Path, E81EN, London, UK",
            position: {
                lat: 51.5460349,
                lng: -0.0581023
            }
        },
        to: {
            title: "Tower Bridge, Tower Bridge Road, London, UK",
            position: {
                lat: 51.5054597,
                lng: -0.0775452
            }
        },
    },
    {
        title: null,//"To Tower Bridge from Home",
        from: {
            title: "5 Sylvester Path, E81EN, London, UK",
            position: {
                lat: 51.5460349,
                lng: -0.0581023
            }
        },
        to: {
            title: "Tower Bridge, Tower Bridge Road, London, UK",
            position: {
                lat: 51.5054597,
                lng: -0.0775452
            }
        },
    }
];


class RouteContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        // RouteRepository.destroy().then(() => {
        //     RouteRepository.multiAdd(defaultList).then(resp => {
        //         let arr = Object.keys(resp).map(function (key) { return resp[key]; });
        //         this.setState({items: arr})
        //     });
        // });

        RouteRepository.findAll().then(resp => {
            resp !== null && this.setState({items: resp});
        });
    }

    /**
     *
     * @param rowData
     * @param rowID
     */
    alertMenu = (rowData, rowID) => {
        Alert.alert(
            'Remove item?',
            null,
            [
                {text: 'Cancel'},
                {text: 'Confirm', onPress: () => this.deleteItem(rowData, rowID)},
                //{text: 'Edit', onPress: () => this.viewItem(rowData, rowID)},
                // want work in android, needed proper menu
                //{text: 'Edit2', onPress: () => this.viewItem(rowData, rowID)},
            ]
        )
    };

    /**
     *
     * @param rowData
     * @returns {string}
     */
    getTitle = (rowData) => {
        return "" + (rowData.title ? rowData.title : rowData.from.title);
    };

    /**
     *
     * @param rowData
     * @returns {string}
     */
    getToTitle = (rowData) => {
        return "" + (rowData.title ? rowData.title : rowData.to.title);
    };

    /**
     *
     * @param rowData
     * @returns {string}
     */
    getInfo = (rowData) => {
        return "Last update: "
            + this.getFormattedDateString(rowData.updated_at);
    };

    /**
     *
     * @param timestamp
     * @returns {string}
     */
    getFormattedDateString = (timestamp) => {
        let date = new Date(timestamp);

        let year = date.getFullYear();
        let month = ("0"+(date.getMonth()+1)).substr(-2);
        let day = ("0"+date.getDate()).substr(-2);
        let hour = ("0"+date.getHours()).substr(-2);
        let minutes = ("0"+date.getMinutes()).substr(-2);
        let seconds = ("0"+date.getSeconds()).substr(-2);

        return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
    };

    /**
     *
     * @param rowData
     * @param index
     */
    deleteItem = (rowData, index) => {
        RouteRepository.archiveById(rowData._id).then(() => {
            let items = this.state.items;
            items.splice(index, 1);
            this.setState({items: items});
        });
    };

    /**
     *
     * @param item
     */
    addItem = (item) => {
        RouteRepository.add(item).then((newItem) => {
            let items = this.state.items;
            items.unshift(newItem);
            this.viewItem(newItem, 0);
            this.setState({items: items});
        });
    };

    /**
     *
     * @param item
     */
    addNewAtCurrentLocation = (item) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                item.from.title = "Your location";
                item.from.position.lat = position.coords.latitude;
                item.from.position.lng = position.coords.longitude;
                this.addItem(item);
            },
            (error) => {
                item.from.title = "Unable to find current location";
                this.addItem(item);
                console.log("addNewAtCurrentLocation", item, error.message);
            },
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    };

    /**
     *
     * @param item
     * @param index
     */
    updateItem = (item, index) => {
        item._id && RouteRepository.updateById(item, item._id).then(() => {
            this.staleItem(item, index);
        });
    };

    /**
     *
     * @param item
     * @param index
     */
    staleItem = (item, index) => {
        let items = this.state.items;
        items[index] = item;
        this.setState({items: items});
    };

    /**
     *
     * @param rowData
     * @param rowID
     */
    viewItem = (rowData, rowID, generateDirections) => {
        this.props.navigator.push({
            id: "RouteView",
            passProps: {
                item: rowData,
                id: rowID,
                updateItem: this.updateItem,
                getTitle: this.getTitle,
                generateDirections: generateDirections !== false,
            }
        });
    };

    /**
     *
     * @param rowData
     * @param rowID
     */
    viewAddItem = (rowData, rowID) => {
        alert("TODO");
        // this.props.navigator.push({
        //     title: 'New Item',
        //     component: RouteAdd,
        //     passProps: {
        //         item: rowData,
        //         id: rowID,
        //         update: this.updateItem
        //     }
        // });
        this.generateSearchIndex();
    };

    /**
     *
     * @param text
     */
    searchOnChangeText = (text) => {
        let items = [];
        this.setState({ items: items });

        let searchResult = Lunr.search(text);
        searchResult.map((item) => {
            if (this.state.savedItems[item.ref]) {
                items.push(this.state.savedItems[item.ref]);
                this.setState({ items: items });
            }
        });
    };

    /**
     *
     */
    searchOnSearchClosed = () => {
        this.setState({
            items: this.state.savedItems,
            savedItems: [],
        });
    };

    /**
     *
     */
    searchOnSearchPressed = () => {
        this.generateSearchIndex();
    };

    /**
     *
     * @returns {*|Promise}
     */
    generateSearchIndex = () => {
        let promises = this.state.items.map((item, index) => {
            Lunr.addToIndex(item, index);
        });

        return Promise.all(promises).then(() => {
            this.setState({
                savedItems: this.state.items,
                items: [],
            });
        });
    };

    /**
     *
     */
    searchOnSubmitEditing = () => {};

    /**
     *
     * @returns {XML}
     */
    render() {
        let m = <MapView
            initialRegion={{
              latitude: 37.78825, longitude: -122.4324,
              latitudeDelta: 0.0922, longitudeDelta: 0.0421,
            }}
        />;

        let { items } = this.state;

        return (
            <View style={{flex:1}}>
                {m}
                <RouteList
                    items={items}
                    onPressItem={this.viewItem}
                    onLongPressItem={this.alertMenu}
                    onChangeText={this.searchOnChangeText}
                    onSearchClosed={this.searchOnSearchClosed}
                    onSearchPressed={this.searchOnSearchPressed}
                    onSubmitEditing={this.searchOnSubmitEditing}
                    openDrawer={this.props.openDrawer}
                    getTitle={this.getTitle}
                    getToTitle={this.getToTitle}
                    getInfo={this.getInfo}
                />
                <ActionButton
                    onPress={() => {
                        let item = {
                            title: null,
                            points: null,
                            from: {
                                title: null,
                                position: {
                                    lat: 0,
                                    lng: 0
                                }
                            },
                            to: {
                                title: "Set destination",
                                position: {
                                    lat: 0,
                                    lng: 0
                                }
                            },
                        };
                        this.addNewAtCurrentLocation(item);
                    }}
                />
            </View>
        );
    }
}

export default RouteContainer;