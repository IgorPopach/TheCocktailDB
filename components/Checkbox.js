import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Colors from '../constants/Colors';

const Checkbox = ({ value, text, onPress, style }) => {
    return (
        <TouchableOpacity style={{ ...styles.checkbox, ...style }} {...{ onPress }}>
            <Text style={styles.text}>{text}</Text>
            {value ? <FontAwesomeIcon icon={faCheck} size={23} /> : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 23,
        marginBottom: 62
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: Colors.accent
    }
});

export default Checkbox;