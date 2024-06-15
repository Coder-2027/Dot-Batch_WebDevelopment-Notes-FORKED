import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../redux/slices/CounterSlice';

const Counter = () => {

    const count = useSelector((state) => state.counter.value );                    //to fetch data from slice we use this hook
    // useSelector Hook: This is a hook provided by react-redux that allows you to extract data from the Redux store state. It takes a selector function as its argument.
// Selector Function: (state) => state.counter.value is the selector function. It receives the entire store state as its argument and returns a part of it. In this case, it’s returning state.counter.value, which would be the current value of your counter.
// state.counter.value: This is the part of the state that the selector function is accessing. It assumes that your store’s state has a counter object with a value property in it.

    //here in state.counter -> counter is the name of slice from where value is to be accessed
    //here first the call goes to store then it goes to the particular slice from where data is to be taken -------> flow of data
    
    const dispatch = useDispatch();                //inorder to call the functions which we have fetched from action creater we need to use useDispatch hook

                                //if we want to use states then we useSelector hook and if we want to use functions then we use useDispatch hook

  return (
    <div>
      <button
      onClick={() => dispatch(increment())}                        //first we need to import increment and decrement
      >
        Increment
      </button>
      <br/>
      <br/>

      <div>{count}</div>

      <br/>
      <br/>

      <button
      onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  )
}

export default Counter
