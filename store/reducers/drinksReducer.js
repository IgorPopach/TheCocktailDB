import { STORE_DRINKS, STORE_CATEGORIES, SWITCH_CATEGORY, STORE_CATEGORIES_DATA, CLEAR_DRINKS } from '../actions/drinksActions';

const initialState = {
    categories: [],
    drinks: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case STORE_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        case STORE_CATEGORIES_DATA:
            const addedCategoriesData = state.categories.map(cat => {
                if (cat.category === payload) {
                    return {
                        ...cat,
                        data: payload.data
                    };
                };
                return cat;
            });
            return {
                ...state,
                categories: addedCategoriesData
            };
        case STORE_DRINKS:
            const newDrinksCat = {
                category: payload.category,
                data: payload.data
            };
            return {
                ...state,
                drinks: state.drinks.concat(newDrinksCat)
            }
        case CLEAR_DRINKS:
            return {
                ...state,
                drinks: []
            }
        case SWITCH_CATEGORY:
            const switchedCategories = state.categories.map(cat => {
                if (cat.category === payload) {
                    return {
                        ...cat,
                        isChecked: !cat.isChecked
                    };
                };
                return cat;
            });
            return {
                ...state,
                categories: switchedCategories
            };
        default: return state;
    }
};