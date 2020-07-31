import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { DrinksNavigator } from './DrinksNavigator';

const AppNavigator = (props) => {

    return (
        <NavigationContainer>
            <DrinksNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;