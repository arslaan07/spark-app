import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shopCount: 0, // Initialize shop count
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        incrementShopCount: (state) => {
            state.shopCount += 1;
        },
        decrementShopCount: (state) => {
            state.shopCount -= 1;
        },
        setShopCount: (state, action) => {
            state.shopCount = action.payload;
        }
    },
});

export const { incrementShopCount, decrementShopCount, setShopCount } = shopSlice.actions;
export default shopSlice.reducer;