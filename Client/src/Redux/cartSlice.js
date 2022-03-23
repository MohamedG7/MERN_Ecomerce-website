import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    quantity: 0,
    total: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            state.quantity -= 1;
            state.products = state.products.filter((x) => x._id !== action.payload.id);
            state.total -= action.payload.price * action.payload.quantity;
        },
        emptyCart: (state, action) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        }
    }
});

export const {
    addProduct,
    removeProduct,
    emptyCart
} = cartSlice.actions;

export default cartSlice.reducer