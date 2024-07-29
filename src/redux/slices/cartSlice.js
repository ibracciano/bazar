import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    userInfo: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const isInCart = state.products.find(product => product.id === action.payload.id);

            isInCart ? isInCart.quantity += action.payload.quantity : state.products.push(action.payload)

        },
        remove: (state, action) => {
            const updated = state.products.filter(product => product.id !== action.payload.id);
            state.products = updated
        },

        reset: (state) => {
            state.products = []
        },

        incrementQuantity: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload.id);
            item.quantity++;

        },
        decrementQuantity: (state, action) => {
            const item = state.products.find((item) => item.id === action.payload.id);
            item.quantity > 1 && item.quantity--;

        },
        logIn: (state, action) => {
            state.userInfo = action.payload;
        },

        logOut: (state) => {
            state.userInfo = null;
        }


    },
})

// Action creators are generated for each case reducer function
export const { add, remove, reset, incrementQuantity, decrementQuantity, logIn, logOut } = cartSlice.actions

export const cartReducer = cartSlice.reducer