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

3. **The user changes the arithmetic operation.**

* When the user presses one of our `<CalcButton />` components, the `onClick()` gets triggered and executes `handleChangeOperation()` which then receives the operation as a string. We hardcoded this value according to which button represents which operation, such as addition, multiplication, or subtraction.
```
<CalcButton onClick={() => handleChangeOperation('+')} value={'+'} />
<CalcButton onClick={() => handleChangeOperation('*')} value={'*'} />
<CalcButton onClick={() => handleChangeOperation('-')} value={'-'} />
```

* Once inside of `handleChangeOperation()`, we pass in the operation that was selected into our `changeOperation` action creator function through arguments, and that returns an action object with type `CHANGE_OPERATION` which is a variable that references `'CHANGE_OPERATION'` as a string, and which operation was selected is also returned through the payload. It looks like this: 

`{ type: CHANGE_OPERATION, payload: operation }` This is passed into **dispatch** and gets sent to the reducer.

```
const handleChangeOperation = (operation) => {
  return (dispatch(changeOperation(operation)))
}
```

* Once inside of the reducer, we trigger the `CHANGE_OPERATION` case and update our `state.operation` to what whichever operation was passed into the payload:

```
case (CHANGE_OPERATION):
  return ({
    ...state,
    operation: action.payload
  });
```

4. **The user presses CE, the clear entry button.**

* When the user presses CE, the onClick gets triggered which fires our handleClear function.
`<CalcButton onClick={handleClear} value={'CE'} />`.

```
const handleClear = () => {
  return dispatch(clearDisplay())
}
```

* This action does not need to return a payload to the reducer, so we don't receive any arguments. `handleClear` simply invokes `clearDisplay`, our action creator, which returns this simple action object: `{ type: CLEAR_DISPLAY }`


* That action object is sent into dispatch which is sent to the reducer, which then triggers the `CLEAR_DISPLAY` case in the switch statement.

```
case (CLEAR_DISPLAY):
  return ({
    ...state,
    total: 0
  })
```

* Finally, we simply create a deep copy of state, and update `state.total` to 0, which updates our `<TotalDisplay value={state.total} />` component which renders our total.

