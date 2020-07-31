import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import drinksReducer from './reducers/drinksReducer';

const rootReducer = combineReducers({
    drinks: drinksReducer,
});


export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));