const Reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
          isChecked : true
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
          isChecked : action.isChecked,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
          isChecked : true,
        };
      case "LOGOUT":
        return {
          user: null,
          isFetching: false,
          error: false,
          isChecked : true
        };
      default:
        return state;
    }
  };
  
  export default Reducer;