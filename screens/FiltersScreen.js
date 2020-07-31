import React, { useCallback } from 'react';
import { Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Checkbox from '../components/Checkbox';
import { switchCheckbox, fetchDrinksEpic, clearDrinks } from '../store/actions/drinksActions';
import Colors from '../constants/Colors';

const FiltersScreen = ({ navigation }) => {
    const filters = useSelector(({ drinks }) => drinks.categories);

    const dispatch = useDispatch();
    const onPressHandler = (id) => {
        dispatch(switchCheckbox(id));
    };

    const updateDrinksList = useCallback(() => {
        dispatch(clearDrinks());
        dispatch(fetchDrinksEpic());
        navigation.goBack()
    }, [filters, dispatch]);

    const checkbox = filters.map((item, index) => (
        <Checkbox
            key={item.category}
            value={item.isChecked}
            text={item.category}
            onPress={onPressHandler.bind(this, item.category)}
            style={filters.length - 1 === index ? styles.lastChild : null}
        />
    ))
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollview}>
                {checkbox}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={updateDrinksList}>
                <Text style={styles.text}>Apply</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export const screenOptions = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    scrollview: {
        paddingHorizontal: 35,
    },
    button: {
        bottom: 110,
        marginHorizontal: 35,
        backgroundColor: Colors.accent,
        alignItems: 'center',
        padding: 16
    },
    text: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        lineHeight: 19,
        color: 'white'
    },
    lastChild: {
        marginBottom: 132
    }
});

export default FiltersScreen;