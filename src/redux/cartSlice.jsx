import { createSlice } from "@reduxjs/toolkit";
import { increment } from "firebase/firestore";

const initialState = {
    cardselectitems: [],
    statusTab: false,
};

export const cardSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
       addToCart(state, action){
        const {items, quantityNumber, productId} = action.payload;
        const indexProductId = state.cardselectitems.findIndex(item => item .productId === productId);

        if(indexProductId >= 0){
            state.cardselectitems[indexProductId].quantityNumber = quantityNumber;
        }
        else{
            state.cardselectitems.push({...items, productId, quantityNumber});
        }

       },
       toggleStatusTab(state){
            if(state.statusTab === false){
                state.statusTab = true;
            }else{
                state.statusTab = false;
            }
        },
        removeFromCart(state, action) {
            const productIdToRemove = action.payload;
            state.cardselectitems = state.cardselectitems.filter(
                (item) => item.productId !== productIdToRemove
            );
        },
        
    }
})

export const {addToCart, toggleStatusTab, removeFromCart } = cardSlice.actions;

export default cardSlice.reducer;