import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  linkCount: 0, // Initialize link count
}

const linkSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {
        incrementLinkCount: (state) => {
            state.linkCount += 1;
        },
        decrementLinkCount: (state) => {
            state.linkCount -= 1;
        },
        setLinkCount: (state, action) => {
            state.linkCount = action.payload;
        },
    },
});

export const { incrementLinkCount, decrementLinkCount, setLinkCount } = linkSlice.actions;
export default linkSlice.reducer;