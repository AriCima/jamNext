function setDictionary(dictionary) {
  return {
    type: 'SET_DICTIONARY',
    payload: dictionary,
  };
}

export {
  setDictionary,
};
