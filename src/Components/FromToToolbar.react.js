/**
 * Created by dmoraschi on 29/01/2017.
 */

import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import { default as VectorIcon } from 'react-native-vector-icons/MaterialIcons';
import STYLE from './../../app/styles';

/**
 *
 * @param props
 * @param context
 * @returns {{centerElementContainer: *[], centerElement: *[], topElement: *[], bottomElement: *[]}}
 */
function getStyles(props, context) {
    const { toolbar } = context.uiTheme;
    return {
        centerElementContainer: [
            toolbar.centerElementContainer,
            {
                padding: 0
            },
            props.style.centerElementContainer,
        ],
        centerElement: [
            toolbar.titleText,
            toolbar.centerElement,
            {
                fontSize: 16
            },
            props.style.centerElement,
        ],
        topElement: [
            {
                paddingLeft: 0,
                paddingTop: 10,
                paddingBottom: 5,
                borderColor: STYLE.Theme.palette.lightColor,
                borderBottomWidth: 1,
                borderStyle: 'solid'
            },
            props.style.topElement,
        ],
        bottomElement: [
            {
                paddingLeft: 0,
                paddingTop: 10,
                paddingBottom: 5,
                borderColor: STYLE.Theme.palette.lightColor,
                borderBottomWidth: 1,
                borderStyle: 'solid',
            },
            props.style.bottomElement,
        ],
    };
}

class FromToToolbar extends React.Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        //this.getCenterElement = this.getCenterElement.bind(this);
    }

    /**
     *
     * @param type
     * @param element
     * @param style
     * @param onPress
     * @returns {*}
     */
    getTopBottomElement = (type, element, style, onPress) => {
        return (
            <TouchableWithoutFeedback key={"center-"+type}
                onPress={onPress}
            >
                <View style={style[type+"Element"]}>
                    <Text numberOfLines={1} style={style.centerElement}>
                        {element || "..."}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    /**
     *
     * @param style
     * @returns {XML}
     */
    getLeftElement = (style) => {
        return <View style={style[type+"Element"]}>
            <VectorIcon
                name={this.props[type+"ElementIcon"]}
                //name="adjust"
            />
        </View>;
    };

    /**
     *
     * @returns {XML}
     */
    getCenterElement = () => {
        const styles = getStyles(this.props, this.context);

        let top = this.getTopBottomElement(
            "top",
            this.props.topElement,
            styles,
            this.props.onTopElementPress
        );

        let bottom = this.getTopBottomElement(
            "bottom",
            this.props.bottomElement,
            styles,
            this.props.onBottomElementPress
        );

        return (
            <Animated.View style={styles.centerElementContainer}>
                {top}
                {bottom}
            </Animated.View>
        );
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        let center = this.getCenterElement();
        return (
            <Toolbar
                {...this.props}
                centerElement={center}
            />
        );
    }
}

/**
 *
 * @type {{onTopElementPress: *, topElement: *, onBottomElementPress: *, bottomElement: *}}
 */
FromToToolbar.propTypes = {
    onTopElementPress: PropTypes.func,
    topElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    onBottomElementPress: PropTypes.func,
    bottomElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]),
    /**
     * You can overide any style for the component via this prop
     */
    style: PropTypes.shape({
        centerElementContainer: Animated.View.propTypes.style,
        centerElement: Text.propTypes.style,
        topElement: View.propTypes.style,
        bottomElement: View.propTypes.style,
    }),
};

/**
 *
 * @type {{style: {}}}
 */
FromToToolbar.defaultProps = {
    style: {}
};

/**
 *
 * @type {{uiTheme: *}}
 */
FromToToolbar.contextTypes = {
    uiTheme: PropTypes.object.isRequired
};


export default FromToToolbar;