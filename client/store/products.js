import Axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        products,
    };
};

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get("/api/products");
            dispatch(setProducts(data));
        } catch (err) {
            console.log(err);
        }
    };
};

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
};
