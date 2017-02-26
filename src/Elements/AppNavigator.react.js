/**
 * Created by dmoraschi on 01/01/2017.
 */
'use strict';

import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { Navigator } from 'react-native';
import { ControlPanel } from './';

import ROUTES from '../../app/routes';
import STYLE from '../../app/styles';


class AppNavigator extends Component {
    constructor(props) {
        super(props);
    }

    closeDrawer = () => {
        this._drawer.close()
    };

    openDrawer = () => {
        this._drawer.open()
    };

    navigator = () => {
        //this.refs.navigator.resetTo(route);
        this.closeDrawer();
        return this.refs.navigator;
    };

    render() {
        let navigator = <Navigator
            ref="navigator"
            configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
            initialRoute={{ id: "RouteContainer"}}
            renderScene={this.navigatorRenderScene}
            
        />;

        let controlPanel = <ControlPanel
            routes={ROUTES}
            navigator={this.navigator}
            closeDrawer={this.closeDrawer}
        />;

        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                captureGestures={true}
                negotiatePan={true}
                content={controlPanel}
                tapToClose={true}
                openDrawerOffset={0.15} // 20% gap on the right side of drawer
                panCloseMask={0.5}
                closedDrawerOffset={-3}
                styles={STYLE.Drawer}
                //tweenDuration={250}
                //tweenEasing="easeInOutCubic"
                tweenDuration={150}
                tweenEasing="linear"
                useInteractionManager={true}
                panThreshold={1}
                elevation={1}
                tweenHandler={(ratio) => ({
                    main: {
                        opacity: 1,
                    },
                    mainOverlay: {
                        //opacity:(2-ratio)/2,
                        opacity: ratio / 1.5,
                        backgroundColor: 'black',
                    }
                })}
            >
                {navigator}
            </Drawer>
        );
    }

    convertRoutesToArrayKey = () => {
        let ret = [];
        for (let route in ROUTES) {
            if(! ROUTES.hasOwnProperty(route)) continue;
            ret.push({ id: route });
        }
        return ret;
    };

    navigatorRenderScene = (route, navigator) => {
        if (! ROUTES[route.id]) {
            alert("View: " + route.id + " does not exists.");
        }

        let passProps = {};
        if (route.passProps) {
            passProps = route.passProps;
            //delete(route.passProps)
        }

        passProps.closeDrawer = this.closeDrawer;
        passProps.openDrawer = this.openDrawer;

        return ROUTES[route.id](route, navigator, passProps);
    };
}

export default AppNavigator;
