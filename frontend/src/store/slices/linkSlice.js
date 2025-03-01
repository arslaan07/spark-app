import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  linkCount: 0, // Initialize link count
  linkToDelete: null, // link to delete
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
        setLinkToDelete: (state, action) => {
          state.linkToDelete = action.payload;
        },
        setSelectedLink: (state, action) => {
            state.selectedLink = action.payload;
        },
    },
});

export const { incrementLinkCount, decrementLinkCount, setLinkCount, setLinkToDelete,
    setSelectedLink
 } = linkSlice.actions;
export default linkSlice.reducer;