import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ListItem } from 'react-native-material-ui';
import { Icon } from 'react-native-material-ui';

const propTypes = {
    centerElement: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.shape({
            primaryText: PropTypes.string.isRequired,
            primarySecondLineText: PropTypes.string.isRequired,
            secondaryText: PropTypes.string,
        }),
    ]),
};

function getNumberOfSecondaryTextLines(numberOfLines) {
    if (numberOfLines === 'dynamic') {
        return null;
    }

    return numberOfLines - 1;
}

class DoubleLineListItem extends ListItem {
    constructor(props) {
        super(props);
    }

    renderCenterElement = (styles) => {
        const { centerElement } = this.props;
        const numberOfLines = getNumberOfSecondaryTextLines(this.state.numberOfLines);

        let content = null;

        if (React.isValidElement(centerElement)) {
            content = centerElement;
        } else if (centerElement) {
            let primaryText = null;
            let secondaryText = null;

            if (typeof centerElement === 'string') {
                primaryText = centerElement;
            } else {
                primaryText = centerElement.primaryText;
                primarySecondLineText = centerElement.primarySecondLineText;
                secondaryText = centerElement.secondaryText;
            }

            content = (
                <View style={styles.textViewContainer}>
                    <View style={styles.firstLine}>
                        <View style={styles.primaryTextContainer}>
                            <Text numberOfLines={1} style={styles.primaryText}>
                                From: {primaryText}
                            </Text>
                            <Text numberOfLines={1} style={styles.primaryText}>
                                To: {primarySecondLineText}
                            </Text>
                        </View>
                    </View>
                    {secondaryText &&
                    <View>
                        <Text numberOfLines={numberOfLines} style={styles.secondaryText}>
                            {secondaryText}
                        </Text>
                    </View>
                    }
                </View>
            );
        }


        return (
            <View style={styles.centerElementContainer}>
                {content}
            </View>
        );
    }
}

DoubleLineListItem.propTypes = propTypes;

export default DoubleLineListItem;