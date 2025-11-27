import { createSlice }  from "@reduxjs/toolkit";

const initialState ={
    count : 0
}
export const TestSlice = createSlice({
    name:"test",
    initialState,
    reducers:{
        setCount:(state,action) => {
            state.count = action.payload
        }
    }
})
export default TestSlice.reducer
export const {setCount} = TestSlice.actions