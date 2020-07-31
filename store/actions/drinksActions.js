import fetchData from '../../utils/fetchData';

export const STORE_DRINKS = 'STORE_DRINKS';
export const STORE_NEXT_DRINKS = 'STORE_NEXT_DRINKS';
export const STORE_CATEGORIES = 'STORE_CATEGORIES';
export const STORE_CATEGORIES_DATA = 'STORE_CATEGORIES_DATA';
export const SWITCH_CATEGORY = 'SWITCH_CATEGORY';
export const CLEAR_DRINKS = 'CLEAR_DRINKS';

const storeCategories = (categories) => ({
    type: STORE_CATEGORIES,
    payload: categories
});

const storeCategoriesData = (category) => ({
    type: STORE_CATEGORIES_DATA,
    payload: category
});

const storeDrinks = (drinks) => ({
    type: STORE_DRINKS,
    payload: drinks
});

export const clearDrinks = () => ({
    type: CLEAR_DRINKS
});

export const fetchCategoriesEpic = () => dispatch =>
    fetchData('list.php?c=list')
        .then(res => {
            const categories = res.drinks.map(cat => ({
                category: cat.strCategory,
                isChecked: true,
            }));
            dispatch(storeCategories(categories));
            return categories;
        })
        .then(categories => dispatch(fetchDrinksEpic(categories)));

export const fetchDrinksEpic = () => (dispatch, getState) => {
    const { categories } = getState().drinks;
    let categoryIndex;
    categoryIndex = categories.findIndex(filter =>
        filter.data && filter.isChecked);

    if (categoryIndex !== -1) {
        const category = categories[categoryIndex].category;
        const data = categories[categoryIndex].data;
        dispatch(storeDrinks({
            category,
            data
        }));
    } else {
        categoryIndex = categories.findIndex(filter =>
            !filter.data && filter.isChecked);
        if (categoryIndex === -1) {
            return;
        }
        const category = categories[categoryIndex].category;
        const params = `c=${category}`;
        return fetchData(`filter.php?${params}`)
            .then(res => {
                const drinks = res.drinks.map(item => ({
                    id: item.idDrink,
                    name: item.strDrink,
                    image: `${item.strDrinkThumb}/preview`
                }));
                dispatch(storeDrinks({
                    category,
                    data: drinks
                }));
                dispatch(storeCategoriesData({
                    category,
                    data: drinks
                }));
            })
    }
};

export const switchCheckbox = (category) => ({
    type: SWITCH_CATEGORY,
    payload: category
});