const LoginStart = function (userCredentials) {
    return ({
      type: "LOGIN_START",
   })
};

const LoginSuccess = (user, remember) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
  isChecked : remember
});

const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

const Logout = () => ({
  type: "LOGOUT",
});


export {LoginFailure,LoginStart,LoginSuccess,Logout}