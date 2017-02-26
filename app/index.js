/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { AppRegistry } from 'react-native';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';
import { AppNavigator } from '../src/Elements';

import STYLE from './styles';


export default class AwesomeProject extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <StatusBar
                    backgroundColor={STYLE.Theme.palette.secondaryColor}
                    barStyle="light-content"
                />
                <ThemeProvider uiTheme={STYLE.Theme}>
                    <AppNavigator />
                </ThemeProvider>
            </View>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
