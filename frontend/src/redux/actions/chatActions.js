import * as chatConstants from "../constants/chatConstants";

export const setChatRoom = (user, message) => (dispatch, getState) => {
  dispatch({
    payload: {
      user,
      message,
    },
    type: chatConstants.SET_CHATROOMS,
  });
};
export const setSocket = (socket) => (dispatch, getState) => {
  dispatch({
    payload: {
      socket,
    },
    type: chatConstants.SET_SOCKET,
  });
};
export const setNewNofi = (newNofi) => (dispatch, getState) => {
  dispatch({
    payload: {
      newNofi,
    },
    type: chatConstants.SET_NOFI,
  });
};
export const adminDeleteChart = (socketId) => (dispatch, getState) => {
  dispatch({
    payload: {
      socketId,
    },
    type: chatConstants.ADMIN_DELETE_CHAT,
  });
};
