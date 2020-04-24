import {
    FETCH_USERS_PENDING,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_ROOMS_ERROR,
    FETCH_ROOMS_PENDING,
    FETCH_ROOMS_SUCCESS,
    SET_ACTIVE_ROOM_ID,
    FETCH_ROOM_USERS_SUCCESS,
    FETCH_ROOM_USERS_ERROR,
    SET_ACTIVE_ROOM_STATUS_PENDING,
    SET_ACTIVE_ROOM_STATUS_SUCCESS,
    SET_ACTIVE_ROOM_STATUS_ERROR,
    FETCH_ROOMS_MESSAGES_SUCCESS,
    LEAVE_CHAT
} from './actionTypes';

const fetchUsersPending = () => ({
  type: FETCH_USERS_PENDING
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users
});

const fetchUsersError = (error) => ({
  type: FETCH_USERS_ERROR,
  error
});

export const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersPending());
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(res => {
      dispatch(fetchUsersSuccess(res));
      return res;
    })
    .catch(error => {
      dispatch(fetchUsersError(error));
    })
  }
}


const fetchRoomsPending = () => ({
  type: FETCH_ROOMS_PENDING
});

const fetchRoomsSuccess = (rooms) => ({
  type: FETCH_ROOMS_SUCCESS,
  rooms
});

const fetchRoomsError = (error) => ({
  type: FETCH_ROOMS_ERROR,
  error
});

export const fetchRooms = () => {
  return dispatch => {
    dispatch(fetchRoomsPending());
    fetch(' http://localhost:3001/rooms')
        .then(res => res.json())
        .then(res => {
          dispatch(fetchRoomsSuccess(res));
          return res;
        })
        .catch(error => {
          dispatch(fetchRoomsError(error));
        })
  }
}

export const setActiveRoomId = (roomId) => ({
    type: SET_ACTIVE_ROOM_ID,
    roomId
});

export const setActiveRoomPending = (roomId) => ({
    type: SET_ACTIVE_ROOM_STATUS_PENDING,
    roomId
});

export const setActiveRoomSuccess = (roomId) => ({
    type: SET_ACTIVE_ROOM_STATUS_SUCCESS,
    roomId
});

export const setActiveRoomError = (roomId) => ({
    type: SET_ACTIVE_ROOM_STATUS_ERROR,
    roomId
});

export const setActiveRoom = (roomId, userId) => async dispatch => {
    dispatch(setActiveRoomPending());
    dispatch(setActiveRoomId(roomId));

    try {
        await fetch(`http://localhost:3001/rooms/${roomId}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId})
        });

        dispatch(fetchRoomsUserSuccess());
    } catch(e) {
        dispatch(setActiveRoomError('error adding user to room'));
    }
}


const fetchRoomsUserSuccess = ({users}) => ({
    type: FETCH_ROOM_USERS_SUCCESS,
    users
});

const fetchRoomsUserError = (error) => ({
    type: FETCH_ROOM_USERS_ERROR,
    error
});

export const fetchRoomUsers = (roomId) => {
    return dispatch => {
        fetch(`http://localhost:3001/rooms/${roomId}/users`)
            .then(res => res.json())
            .then(res => {
                dispatch(fetchRoomsUserSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchRoomsUserError(error));
            })
    }
}



const fetchRoomsMessagesSuccess = ({text}) => ({
    type: FETCH_ROOMS_MESSAGES_SUCCESS,
    messages: text
});

export const fetchRoomMessages = (roomId) => {
    return dispatch => {
        fetch(`http://localhost:3001/rooms/${roomId}/text`)
            .then(res => res.json())
            .then(res => {
                dispatch(fetchRoomsMessagesSuccess(res));
                return res;
            })
            .catch(error => {
            })
    }
}


export const setMessage = (roomId, userId, message) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/rooms/${roomId}/text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"text":message, "userId": userId})
        });

        dispatch(fetchRoomMessages(roomId));
    } catch(e) {
        dispatch(setActiveRoomError('error adding user to room'));
    }
}


export const leaveChat = (roomId, userId) => async dispatch => {
    try {
        dispatch({
            type: LEAVE_CHAT
        });
        await fetch(`http://localhost:3001/rooms/${roomId}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

    } catch(e) {

    }
}
