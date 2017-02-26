/**
 * Created by dmoraschi on 07/01/2017.
 */

import React from 'react';
import { RouteView } from '../src/Route';
import { RouteContainer } from '../src/Route';
import { SearchPlacesAutocomplete } from '../src/Route';

const ROUTES = {
    "RouteContainer": (route, navigator, passProps)=> {
        return <RouteContainer
            route={route}
            navigator={navigator}
            {...passProps}
        />
    },
    "RouteView": (route, navigator, passProps)=> {
        return <RouteView
            route={route}
            navigator={navigator}
            {...passProps}
        />
    },
    "SearchPlaceView": (route, navigator, passProps)=> {
        return <SearchPlacesAutocomplete
            route={route}
            navigator={navigator}
            {...passProps}
        />
    },
};

export default ROUTES;