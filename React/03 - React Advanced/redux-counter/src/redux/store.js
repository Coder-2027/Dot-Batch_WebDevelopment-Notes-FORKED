import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from './slices/CounterSlice'            //here in the name of counterSlice we have got counterSlice.reducer() because we have exported it from there
// if we have exported 

export const store = configureStore({          //it creates a global store containing all slices
  reducer: {
    counter: CounterSlice                  //here counter is the name of slice and CounterSlice is the name of reducer which we have exported at the end of file
    // we can even write it as 'counter: CounterSlice.reducer' OR 'counter: CounterSlice.Reducer'
  },
})
