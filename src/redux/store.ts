// import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth/reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import orderReducer from "redux/order/reducer";
import shippingReducer from "redux/shipping/reducer";
import categories from 'redux/category/reducer'
import notification from 'redux/notification/reducer'
import constants from "redux/constants/reducer";

const combinedReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
    shipping: shippingReducer,
    subcategories:categories,
    notification,
    constants,
});

const reducer = (state, action) => {
    // TODO: add condition for HYDRATE
    return combinedReducer(state, action);
};

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }: any) => {
    if (isServer) {
        //If it's on server side, create a store
        return createStore(reducer, bindMiddleware([thunkMiddleware]));
    } else {
        //If it's on client side, create a store which will persist
        const { persistStore, persistReducer, autoRehydrate } = require("redux-persist");
        const storage = require("redux-persist/lib/storage").default;


        const persistConfig = {
            key: "state",
            storage,// if needed, use a safer storage
            // blacklist: ["orderReducer"], // only counter will be persisted, add other reducers if needed
        };

        const persistedReducer = persistReducer(persistConfig, reducer); // Create a new reducer with our existing reducer
        // persistReducer<RootState>(persistConfig, rootReducer());

        const store: any = createStore(
            persistedReducer,
            {},
            bindMiddleware([thunkMiddleware])
        ); // Creating the store again
        store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

        return store;
    }
};

export const wrapper = createWrapper(makeStore);