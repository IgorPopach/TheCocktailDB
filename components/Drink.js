import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Drink = ({ image, name }) => (
    <View style={styles.item}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={2} selectable={true}>{name}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 40,
    },
    image: {
        height: 100,
        width: 100,
    },
    textContainer: {
        marginLeft: 20
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: Colors.primary,
    }
});

export default Drink;