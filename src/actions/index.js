// Action Constants

export const APPLY_NUMBER = 'APPLY_NUMBER';
export const CHANGE_OPERATION = 'CHANGE_OPERATION';

// Action Object Creators
export const applyNumber = (number) => {
  return ({ type: APPLY_NUMBER, payload: number });
}

export const changeOperation = (operation) => {
  return ({ type: CHANGE_OPERATION, payload: operation })
}

// export const ADD_ONE = 'ADD_ONE';

// export const addOne = () => {
//   return ({ type: ADD_ONE });
// }