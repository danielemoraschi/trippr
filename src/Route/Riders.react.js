/**
 * Created by dmoraschi on 02/02/2017.
 */
/**
 * Created by dmoraschi on 31/12/2016.
 */
'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Linking } from 'react-native';
import { ListView } from 'react-native';
import { ListItem } from 'react-native-material-ui';
import {
    UBER_KEY,
    HAILO_KEY,
    GETT_KEY,
    LYFT_KEY
} from "../../app/config";

class Riders extends Component {
    constructor(props) {
        super(props);

        let from = {
            title: this.props.item.from.title,
            latitude: this.props.item.from.position.lat,
            longitude: this.props.item.from.position.lng,
        };
        
        let to = {
            title: this.props.item.to.title,
            latitude: this.props.item.to.position.lat,
            longitude: this.props.item.to.position.lng,
        };

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        const uber = "client_id=" + UBER_KEY
            +"&pickup[latitude]="+from.latitude+"&pickup[longitude]="+from.longitude
            +"&dropoff[latitude]="+to.latitude+"&dropoff[longitude]="+to.longitude;

        const hailo = "hailoapp://confirm?pickupCoordinate="+from.latitude+","+from.longitude
            +"&destinationCoordinate="+to.latitude+","+to.longitude
            +"&pickupAddress="+encodeURIComponent(from.title)
            +"&destinationAddress="+encodeURIComponent(to.title)
            //+"&pickupLocality=XXX&destinationAddress=XXX&destinationLocality=XXX"
            +"&referrer=" + HAILO_KEY;

        const gett = "gett://order"
            +"?pickup_latitude="+from.latitude+"&pickup_longitude="+from.longitude
            +"&dropoff_latitude="+to.latitude+"&dropoff_longitude="+to.longitude;
            //&product_id=GETT_KEY

        const lyft = "lyft://ridetype?id=lyft&partner=" + LYFT_KEY
            +"&pickup[latitude]="+from.latitude+"&pickup[longitude]="+from.longitude
            +"&destination[latitude]="+to.latitude+"&destination[longitude]="+to.longitude;

        const citymapper = "?startcoord="+from.latitude+"%2C"+from.longitude
            +"&endcoord="+to.latitude+"%2C"+to.longitude;

        const transit = "transit://directions"
            +"?from="+from.latitude+","+from.longitude
            +"&to="+to.latitude+","+to.longitude;

        const moovit = "moovit://nearby?partner_id=test_ridr"
            +"&orig_lat="+from.latitude+"&orig_lat="+from.longitude
            +"&dest_lat="+to.latitude+"&dest_lon="+to.longitude;

        this.state = {
            cabs: ds.cloneWithRows([
                {
                    key: 0,
                    text: "Uber",
                    url: "uber://?action=setPickup&" + uber,
                    login: "https://m.uber.com/sign-up?" + uber,
                }, {
                    key: 1,
                    text: "Hailo",
                    url: hailo,
                    login: false,
                }, {
                    key: 2,
                    text: "Gett",
                    url: gett,
                    login: false,
                }, {
                    key: 3,
                    text: "Lyft",
                    url: lyft,
                    login: false,
                },
                {
                    key: 4,
                    text: "Citymapper",
                    url: "citymapper://directions" + citymapper,
                    login: "https://citymapper.com/directions" + citymapper,
                },
                {
                    key: 5,
                    text: "Transit",
                    url: transit,
                    login: false,
                },
                {
                    key: 6,
                    text: "Moovit",
                    url: moovit,
                    login: "https://app.appsflyer.com/id498477945?pid=DL&c=test_ridr",
                }
            ])
        };
    }

    onPress(rowData) {
        Linking
            .openURL(rowData.url)
            .catch(err => {
                if (! rowData.login) {
                    alert('An error occurred: ' + err)
                    return;
                }
                Linking
                    .openURL(rowData.login)
                    .catch(err =>
                        alert('An error occurred: ' + err)
                    );
            });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ListView
                    dataSource={this.state.cabs}
                    renderRow={(rowData, sectionID, rowID) =>
                        <ListItem
                            divider
                            dense
                            numberOfLines={2}
                            // left
                            leftElement="map"
                            //centre
                            centerElement={{
                                primaryText: rowData.text,
                            }}
                            onPress={() => this.onPress(rowData)}
                        />
                    }
                />
            </View>
        );
    }
}

export default Riders;
