import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, ActivityIndicator, SafeAreaView, SectionList, StyleSheet } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { fetchCategoriesEpic } from '../store/actions/drinksActions';
import { fetchDrinksEpic } from '../store/actions/drinksActions';
import Colors from '../constants/Colors';
import Drink from '../components/Drink';

const DrinksScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const drinks = useSelector(({ drinks }) => drinks.drinks);

    const dispatch = useDispatch();

    const loadCategories = useCallback(() => {
        setError(null);
        setIsRefreshing(true);
        return dispatch(fetchCategoriesEpic())
            .then(() => {
                setIsRefreshing(false);
            })
            .catch(() => {
                setError('Something went wrong');
                setIsRefreshing(false);
            })
    }, [dispatch]);

    const loadMoreDrinksHandler = useCallback(() => {
        setError(null);
        setIsLoading(true);
        dispatch(fetchDrinksEpic())
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setError('Something went wrong');
                setIsLoading(false);
            })
    }, [dispatch]);

    const loading = () => isLoading ?
        <ActivityIndicator size='large' color={Colors.primary} /> : null

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    const renderItem = ({ item }) => {
        const { image, name } = item;
        return <Drink {...{ image, name }} />
    };

    if (error) {
        return <View style={styles.centered}>
            <View style={styles.text}>
                <Text>An error occurred!</Text>
            </View>
            <View style={styles.text}>
                <Text>{error}</Text>
            </View>
            <Button title='Try again' onPress={loadCategories} color={Colors.accent} />
        </View>
    };

    return (
        <SafeAreaView style={styles.container}>
            {drinks.length !== 0 && <SectionList
                sections={drinks}
                keyExtractor={(item, index) => item.id + index}
                renderItem={renderItem}
                renderSectionHeader={({ section: { category } }) => (
                    <Text style={styles.header}>{category}</Text>
                )}
                onRefresh={loadCategories}
                refreshing={isRefreshing}
                onEndReachedThreshold={0}
                onEndReached={loadMoreDrinksHandler}
                initialNumToRender={7}
                ListFooterComponent={loading}
                contentContainerStyle={styles.list}
            />}
        </SafeAreaView>
    );
};

export const screenOptions = navData => ({
    headerRight: () =>
        <FontAwesomeIcon
            style={styles.icon}
            icon={faFilter}
            size={23}
            onPress={() => navData.navigation.navigate('Filters')}
        />
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        lineHeight: 16,
        color: Colors.primary,
        margin: 20
    },
    list: {
        paddingHorizontal: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        margin: 20,
    },
    text: {
        marginBottom: 10
    }
});

export default DrinksScreen;