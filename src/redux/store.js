// store.js

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Se necessario, puoi usare redux-thunk per gestire le azioni asincrone
import musicReducer from './reducers';

const store = createStore(musicReducer, applyMiddleware(thunk));

export default store;
