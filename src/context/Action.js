const LoginStart = function (userCredentials) {
    return ({
      type: "LOGIN_START",
   })
};

const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

const Logout = () => ({
  type: "LOGOUT",
});

export {LoginFailure,LoginStart,LoginSuccess,Logout}