# Understanding Questions:

#### What are the steps of execution from the pressing of the 1 button to the rendering of our updated value? List what part of the code excutes for each step.

1. **The user presses the 1 button.**
* Once the user presses the 1 button, our onClick, `onClick={handleClick}`, is triggered, invoking our handleClick event handler which dispatches our addOne function, invoked. 

```
const handleClick = () => {
  return dispatch(addOne())
}
```

* Once dispatched, our `addOne()` action creator is executed and it creates an **action object**  with the type of `ADD_ONE` which is the variable reference to the string `'ADD_ONE'`

```
export const addOne = () => {
  return ({ type: ADD_ONE });
}
```

* Ultimately, the object with the property type of `'ADD_ONE'` is returned into our `reducer` which triggers the case of `ADD_ONE`
which executes the code for adding one to the `state.total`:

```
const reducer = (state, action) => {
  switch (action.type) {

    case (ADD_ONE):
      return ({
        ...state,
        total: state.total + 1
      });
```


...

2 **TotalDisplay shows the total with the operation updating state.**

* In `App.js`, we render the \<TotalDisplay /> component and pass in `state.total` through props as `value` like so:

`<TotalDisplay value={state.total} />`

* In our **Reducer** file, we initialized state as

```
export const initialState = {
  total: 0,
  operation: '+',
  memory: 0
}
```

so, once the user presses one of our numerical button components, `<CalcButton onClick={() => handleClick(1)} value={1} />`, for example, we execute our callback function which invokes our `handleClick` event handler and we pass in the value for that button through arguments. 

* Once inside of our event handler, we receive the value of the `<CalcButton />` through the `num` parameter and we **dispatch** the `applyNumber` **action creator**, passing in `num`.

```
const handleClick = (num) => {
  return dispatch(applyNumber(num))
}
  ```

* This invokes our action creator and once inside of `applyNumber`, we pass down the value of the button the user pressed through the `number` parameter and we return an action object.

```
export const applyNumber = (number) => {
  return ({ type: APPLY_NUMBER, payload: number })
}

```

* The value of the action object is a variable which references the `'APPLY_NUMBER'` string which gets returned to our reducer along with the value of the button on the **payload**.

```
case (APPLY_NUMBER):
  return ({
    ...state,
    total: calculateResult(state.total, action.payload, state.operation)
  });
```

* This triggers the `APPLY_NUMBER` case which then creates a new object reference for our state sets our `total` state equal to the invocation of `calculateResult()` passing in three arguments:
`calculateResult(state.total, action.payload, state.operation)`

This function itself has a **switch** statement and three cases:

```
const calculateResult = (num1, num2, operation) => {
  switch (operation) {

    case ("+"):
      return num1 + num2;

    case ("*"):
      return num1 * num2;

    case ("-"):
      return num1 - num2;
  }
}
```

Depending on which operation was passed into `state.operation`, it will trigger the difference switch cases for our `calculateResult()` function and pass in the two numbers to calculate.

`calculateResult()` will then return the result of the operation into our reducer.


