import produce from "immer";
import * as ACTIONS from './actionTypes';
import { uniq } from 'lodash';
import { activeRoomInit } from '../state/initialState';


const reducer = produce((draft, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_USERS_PENDING:
            draft.usersStatus = 'PENDING';
        break;
        case ACTIONS.FETCH_USERS_SUCCESS:
            draft.usersStatus = 'SUCCESS';
            draft.users = action.users;
        break;
        case ACTIONS.FETCH_USERS_ERROR:
            draft.usersStatus = 'ERROR';
        break;
        case ACTIONS.FETCH_ROOMS_PENDING:
            draft.roomsStatus = 'PENDING';
            break;
        case ACTIONS.FETCH_ROOMS_SUCCESS:
            draft.roomsStatus = 'SUCCESS';
            draft.rooms = action.rooms;
            break;
        case ACTIONS.FETCH_ROOMS_ERROR:
            draft.roomsStatus = 'ERROR';
            break;
        case ACTIONS.SET_ACTIVE_ROOM_STATUS_PENDING:
            draft.activeRoom.status = 'PENDING';
            break;
        case ACTIONS.SET_ACTIVE_ROOM_STATUS_SUCCESS:
            draft.activeRoom.status = 'SUCCESS';
            break;
        case ACTIONS.SET_ACTIVE_ROOM_STATUS_ERROR:
            draft.activeRoom.status = 'ERROR';
            break;
        case ACTIONS.SET_ACTIVE_ROOM_ID:
            draft.activeRoom.id = action.roomId;
        break;
        case ACTIONS.FETCH_ROOM_USERS_SUCCESS:
            draft.activeRoom.users = uniq(action.users);
            draft.activeRoom.status = 'SUCCESS';
        break;
        case ACTIONS.FETCH_ROOMS_MESSAGES_SUCCESS:
            draft.activeRoom.messages = action.messages;
            break;
        case ACTIONS.LEAVE_CHAT:
            draft.activeRoom = activeRoomInit;
            break;
        default:
            return draft;
    }
});



export default reducer;
