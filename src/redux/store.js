import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import root from "./root";

const middlewares = [logger];

const store = createStore(root, applyMiddleware(...middlewares))

export default store;