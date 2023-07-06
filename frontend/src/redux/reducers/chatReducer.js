import * as chatConstants from "../constants/chatConstants";
const CHAT_INITIAL_STATE = {
  chatRooms: {},
  socket: false,
  newNofi: false,
};

const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case chatConstants.SET_CHATROOMS: {
      if (state.chatRooms[action.payload.user]) {
        state.chatRooms[action.payload.user].push({
          client: action.payload.message,
        });
        return {
          ...state,
        };
      } else
        return {
          ...state,
          chatRooms: {
            ...state.chatRooms,
            [action.payload.user]: [{ client: action.payload.message }],
          },
        };
    }
    case chatConstants.SET_SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
      };
    case chatConstants.SET_NOFI:
      return {
        ...state,
        newNofi: action.payload.newNofi,
      };
    default:
      return state;
  }
};

export default adminChatReducer;
