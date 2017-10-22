// THIS IS THE REDUX STORE THAT HOLDS THE 'access_token' AND OTHER STATES THAT
// CAN BE ACCESSED FORM OTHER COMPONENTS - hz

import { createStore, compose, applyMiddleware }  from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(
    reducers,
    {},
    compose (
        applyMiddleware(thunk)
    )
);

export default store;