import { createSlice } from "@reduxjs/toolkit";

const initialState = {                                //it is an object may be because we can have more than one variable inside our initial state
    value:0,
}

export const CounterSlice = createSlice({                            //inside this we send an object containing three keys
    name:"counter",
    initialState,
    reducers: {                                                //inside this we define functionalities of our application
        increment : (state) => {                                             //here state is our current state -> or the object of initialState
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
})

export const {increment, decrement} = CounterSlice.actions;            //all the functionalities that we are using we need to export thrm
//here counterslice ke action waali implementation se humne functionalities bahar nikaal li
// to get implementation of all functions from our sllice

                            // here createSlice waala function gives an object in return containing two key value pairs
//                        1.actions
//                        2.reducer
export default CounterSlice.reducer;
