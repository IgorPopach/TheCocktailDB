import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrinksScreen, { screenOptions as DrinksScreenOptions } from '../screens/DrinksScreen';
import FiltersScreen, { screenOptions as FiltersScreenOptions } from '../screens/FiltersScreen';

const defaultNavigationOptions = {
    headerTitleStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        lineHeight: 28,
    },
    headerBackTitleStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        lineHeight: 28,
    },
};

const DrinksStackNavigator = createStackNavigator();

export const DrinksNavigator = () => (
    <DrinksStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
        <DrinksStackNavigator.Screen
            name="Drinks"
            component={DrinksScreen}
            options={DrinksScreenOptions}
        />
        <DrinksStackNavigator.Screen
            name="Filters"
            component={FiltersScreen}
            options={FiltersScreenOptions}
        />
    </DrinksStackNavigator.Navigator>
);