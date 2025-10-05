import  { configureStore }  from "@reduxjs/toolkit";
import  TestSlice  from "./slices/global.slice";


export const store = configureStore({

    reducer:{
        test:TestSlice
    }
})