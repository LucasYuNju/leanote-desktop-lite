export default store => next => action => {
  if (action.error) {
    console.error(action.type, action.error);
  }
  const result = next(action);
  return result;
}
