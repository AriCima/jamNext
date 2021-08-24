
function setDictionaryReducer(state = {}, action) {
  return {
    ...state,
    dictionary: action.payload,
  };
}

export { setDictionaryReducer };
