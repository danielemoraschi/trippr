import React, { PropTypes } from 'react';
import { View, ListView, Image, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { ListItem } from 'react-native-material-ui';
import { GooglePlacesAutocomplete as NativeGooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const defaultStyles = {
    poweredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    powered: {
        marginTop: 25,
    },
    listView: {
        flex: 1,
    },
    row: {
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
};

class GooglePlacesAutocomplete extends NativeGooglePlacesAutocomplete {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     * This method is exposed to parent components to blur textInput manually.
     * @public
     */
    triggerBlur = () => {
        //if (this.refs.textInput) this.refs.textInput.blur();
    };

    /**
     * This method is exposed to parent components to blur textInput manually.
     * @public
     */
    renderCenterElement = () => {
        //if (this.refs.textInput) this.refs.textInput.blur();
    };

    /**
     *
     */
    getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this._requestNearby(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                this._disableRowLoaders();
                console.error(error.message);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };

    /**
     *
     * @param rowData
     * @param sectionID
     * @param rowID
     * @returns {XML}
     * @private
     */
    _renderRow = (rowData = {}, sectionID, rowID) => {
        return (
            <ListItem
                style={Object.assign(defaultStyles.row, this.props.styles.row)}
                divider
                numberOfLines={1}
                //rowData.icon?rowData.icon
                leftElement={ rowData.isCurrentLocation
                    ? "gps-fixed"
                    : (rowData.isPredefinedPlace ? "room" : "explore")
                }
                centerElement={this._renderDescription(rowData)}
                onPress={() => this._onPress(rowData)}
            >
                {this._renderLoader(rowData)}
            </ListItem>
        );
    };

    /**
     *
     * @returns {*}
     * @private
     */
    _getListView = () => {
        if ((this.state.text !== '' || this.props.predefinedPlaces.length || this.props.currentLocation === true) && this.state.listViewDisplayed === true) {
            return (
                <View style={{flex:1}}>
                    <ListView
                        keyboardShouldPersistTaps={true}
                        keyboardDismissMode="on-drag"
                        style={[defaultStyles.listView, this.props.styles.listView]}
                        dataSource={this.state.dataSource}
                        renderSeparator={this._renderSeparator}
                        automaticallyAdjustContentInsets={false}
                        {...this.props}
                        renderRow={this._renderRow}
                    />
                </View>
            );
        }

        return null;
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        let {onChangeText, onFocus, ...userProps} = this.props.textInputProps;

        return (
            <View style={{flex: 1}}>
                <Toolbar
                    { ...userProps }
                    ref="textInput"
                    leftElement="menu"
                    centerElement={this.state.text}
                    isSearchActive={true}
                    searchable={{
                        autoFocus: true,
                        autoCorrect: true,
                        placeholder: this.props.placeholder || 'Search',
                        onChangeText: onChangeText
                            ? text => {
                                this._onChangeText(text);
                                onChangeText(text)
                            } : this._onChangeText,
                        onSearchClosed: this.props.onSearchClosed,
                        onSearchPressed: this.props.onSearchPressed,
                        onSubmitEditing: this.props.onSubmitEditing,
                    }}
                    //rightElement="more-vert"
                    //onFocus={onFocus ? () => {this._onFocus(); onFocus()} : this._onFocus}
                />
                {this._getListView()}
            </View>
        );
    }
}

module.exports = { GooglePlacesAutocomplete };
