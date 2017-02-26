/**
 * Created by dmoraschi on 31/12/2016.
 */
'use strict';

import React, { Component } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Alert } from 'react-native';
import { ListView } from 'react-native';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { ToastAndroid } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { ListItem } from 'react-native-material-ui';
import { SwipeListView } from 'react-native-swipe-list-view';
import { default as Icon } from 'react-native-vector-icons/MaterialIcons';

import { DoubleLineListItem } from '../Components';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

class RouteList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        this.state = {
            dataSource: ds.cloneWithRows(this.props.items),
        };

        return (
            <View style={{flex:1}}>
                <Toolbar
                    leftElement="menu"
                    onLeftElementPress={this.props.openDrawer}
                    centerElement={"My trips"}
                    isSearchActive={false}
                    searchable={{
                        autoFocus: true,
                        autoCorrect: true,
                        placeholder: 'Search',
                        onChangeText: this.props.onChangeText,
                        onSearchClosed: this.props.onSearchClosed,
                        onSearchPressed: this.props.onSearchPressed,
                        onSubmitEditing: this.props.onSubmitEditing,
                    }}
                    //rightElement="more-vert"
                />
                <SwipeListView
                    swipeRowStyle={{flex: 1}}
                    disableRightSwipe={true}
                    closeOnRowPress={true}
                    listViewRef={ ref => this._swipeListViewRef = ref }
                    rightOpenValue={-75}

                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode="on-drag"
                    automaticallyAdjustContentInsets={false}
                    
                    pageSize={5}
                    scrollRenderAheadDistance={15}
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID) =>
                        <DoubleLineListItem
                            divider
                            numberOfLines={3}
                            // left
                            //leftElement="map"
                            //centre
                            centerElement={{
                                primaryText: this.props.getTitle(rowData),
                                primarySecondLineText: this.props.getToTitle(rowData),
                                secondaryText: this.props.getInfo(rowData)
                            }}
                            onPress={() => {
                                this.props.onPressItem(rowData, rowID);
                            }}
                            //right
                            //rightElement="more-vert"
                            //onRightElementPress={() => this.props.onLongPressItem(rowData, rowID)}
                        />
                    }
                    renderHiddenRow={(rowData, sectionID, rowID) =>
                        <TouchableHighlight
                            style={{
                                alignItems: 'center',
                                backgroundColor: 'rgb(244,67,44)',
                                borderColor: "#ddd",
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                            onPress={() => {
                                this.props.onLongPressItem(rowData, rowID);
                                //this._swipeListViewRef.safeCloseOpenRow();
                            }}
                        >
                            <Text
                                style={{
                                    textAlign:"center",
                                    alignItems: 'center',
                                    bottom: 0,
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    top: 26,
                                    right: 0,
                                    //backgroundColor: 'red',
                                    width: 75,
                                    fontSize:20
                                }}
                            >
                                <Icon
                                    style={{
                                        alignItems: 'center',
                                        bottom: 0,
                                        justifyContent: 'center',
                                        color: '#fff',
                                        top: 0,
                                        right: 0,
                                        //backgroundColor: 'red',
                                        width: 75,
                                    }}
                                    size={30}
                                    name="delete"
                                />
                            </Text>
                        </TouchableHighlight>
                    }
                />
            </View>
        );
    }
}

export default RouteList;
