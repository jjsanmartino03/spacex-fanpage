import {createStore, applyMiddleware} from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import mainSaga from "./sagas";
import loggerMiddleware from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, loggerMiddleware)
);
sagaMiddleware.run(mainSaga);

export default store;
