import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from './slices/CounterSlice'

export const store = configureStore({          //it creates a global store containing all slices
  reducer: {
    counter: CounterSlice                  //here counter is the name of slice and CounterSlice is the name of reducer which we have exported at the end of file
  },
})
