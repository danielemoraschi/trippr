'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { Drawer } from 'react-native-material-ui';
import { Avatar } from 'react-native-material-ui';

import STYLE from './../../app/styles';


export default class ControlPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let footer = <Text>
            Footer
        </Text>;

        let avatar = <Avatar
            size={56}
            style={STYLE.Avatar}
            image={<Image
                style={STYLE.AvatarImage}
                source={STYLE.AvatarImageSource}
            />}
        />;

        return (
            <Drawer style={STYLE.DrawerPanel}>
                <Drawer.Header
                    style={STYLE.DrawerHeader}
                >
                    <Drawer.Header.Account
                        avatar={avatar}
                        footer={footer}
                    >
                    </Drawer.Header.Account>
                </Drawer.Header>
                <Drawer.Section
                    dense
                    title={"Menu"}
                    items={[
                        {
                            icon: "book",
                            value: "My trips",
                            onPress: () => {
                                this.props.navigator().resetTo({
                                    id: "RouteContainer",
                                    passProps: {}
                                });
                            },
                        },{
                            icon: "close",
                            value: "Close the drawer",
                            onPress: this.props.closeDrawer
                        }
                    ]}
                >

                </Drawer.Section>
            </Drawer>
        )
    }
}
