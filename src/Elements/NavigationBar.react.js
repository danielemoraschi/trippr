/**
 * Created by dmoraschi on 22/01/2017.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import { Navigator } from 'react-native';
import STYLE from '../../app/styles';


class AppNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return <Navigator.NavigationBar
            routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                    return (<Text>Cancel</Text>);
                },
                RightButton: (route, navigator, index, navState) => {
                    return (<Text>Done</Text>);
                },
                Title: (route, navigator, index, navState) => {
                    return (<Text>Awesome Nav Bar</Text>);
                },
            }}
            style={{backgroundColor: 'gray'}}
        />
    }
}
