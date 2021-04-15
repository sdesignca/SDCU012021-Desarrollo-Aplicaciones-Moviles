import { combineReducers } from "redux";

import * as types from "../types/users";

const user = (state = null, action) => {
  switch (action.type) {
    case types.ADD_USER_STARTED:
      return action.payload.user;
    case types.ADD_USER_COMPLETED:
      return null;
    case types.ADD_USER_FAILED:
      return state;
    default:
      return state;
  }
};

const usersList = (state = [], action) => {
  switch (action.type) {
    case types.LOADING_USERS_STARTED:
      return [...state];
    case types.LOADING_USERS_COMPLETED:
      return [...state, ...action.payload.users];
    case types.LOADING_USERS_FAILED:
      return [...state];
    case types.ADD_USER_COMPLETED:
      return [...state, action.payload.user];
    case types.REMOVE_USER_STARTED:
      const usersCopy = [...state];
      usersCopy.splice(action.payload.index, 1);
      return usersCopy;
    case types.MODIFY_USER:
      const newUsersList = state.map((user) =>
        user.usuario === action.payload.user.usuario
          ? { ...user, cantidad: action.payload.user.cantidad }
          : user
      );

      // const usersC = [...state];
      // const newUsersQuantityIndex = usersC.findIndex(
      //   (user) => user.usuario === action.payload.user.usuario
      // );
      // usersC.splice(newUsersQuantityIndex, 1);
      // usersC.push(action.payload.user);
      // console.log(usersC);
      return newUsersList;
    default:
      return state;
  }
};

const users = combineReducers({
  user,
  usersList,
});

export default users;

export const getUser = (state) => state?.user;
export const getUsersList = (state) => state?.usersList;
export const getUserFromList = (state, index) => state?.usersList[index];
