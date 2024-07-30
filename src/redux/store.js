import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./featcher/postSlice"; 

export default configureStore({
    reducer:{
        app:postSlice, 
    },
});



