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

const updateUser = () => ({
  type : "UPDATE_USER"
})

export {LoginFailure,LoginStart,LoginSuccess,Logout, updateUser}