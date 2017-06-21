// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// NEW
export const SELECT_GENERATION_TYPE = 'SELECT_GENERATION_TYPE'
export const SELECT_EDITOR_STATE = 'SELECT_EDITOR_STATE'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}


// SET GENERATION TYPE: 'faker' OR 'user'
export function selectGenerationType (type = 'faker') {
  return {
    // type    : COUNTER_INCREMENT,
    type    : SELECT_GENERATION_TYPE,
    payload : type
  }
}

// SET EDITOR TYPE: PREVIEW OR EDITOR ->
// PREVIEW: FALSE ... IN EDITING MODE
// PREVIEW: TRUE ... IN PREVIEW MODE
export function selectEditorState (preview = false) {
  return {
    // type    : COUNTER_INCREMENT,
    type    : SELECT_EDITOR_STATE,
    payload : preview
  }
}


export const actions = {
  // increment,
  // doubleAsync,
  selectGenerationType,
  selectEditorState,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  // [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  // [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,

    // NEW
  [SELECT_GENERATION_TYPE]    : (state, action) => {
    console.log("state", state);
    // console.log("action", action);
    // console.log("value", action.payload.target.value);

    return { ...state, type: action.payload.target.value }
  },
  [SELECT_EDITOR_STATE]       : (state, action) => {
    console.log("SELECT_EDITOR_STATE - state ", state);
    console.log("SELECT_EDITOR_STATE - action", action);
    console.log("SELECT_EDITOR_STATE - action", action.payload.target.value === 'true');
    return { ...state, preview: action.payload.target.value === 'true' }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
// const initialState = 0
const initialState = {
  preview: false,
  schema: {},
  type: '',
}

// COMBINE ALL THE ACTION HANDLERS ???
export default function schemaBuilderReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
