/**
 * Redux Store
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from '../reducers';
import RootSaga from "../sagas";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware,thunk];

export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        composeEnhancers(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(RootSaga);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
