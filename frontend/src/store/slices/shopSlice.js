import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shopCount: 0, // Initialize shop count
  shopToDelete: null, // shop to delete
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
        },
        setShopToDelete: (state, action) => {
          state.shopToDelete = action.payload;
        },
        setSelectedShop: (state, action) => {
            state.selectedShop = action.payload;
        },
    },
});

export const { incrementShopCount, decrementShopCount, setShopCount, setShopToDelete,
    setSelectedShop
 } = shopSlice.actions;
export default shopSlice.reducer;