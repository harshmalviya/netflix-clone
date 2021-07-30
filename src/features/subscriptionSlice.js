import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState: {
        subscription: {},
        isSubscribed: false,
    },
    reducers: {
        checkSubscribed(state, action){
            const subscriptionDetails = action.payload;
            state.subscription = subscriptionDetails;
            if(subscriptionDetails?.role){
                state.isSubscribed = true;
            }
        }
    }
});

export default subscriptionSlice.reducer;

export const { checkSubscribed } = subscriptionSlice.actions;


