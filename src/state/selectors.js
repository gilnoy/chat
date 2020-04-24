import {createSelector} from 'reselect';

export const getUsers = state => state.users;
export const isAppReady = state => state.usersStatus === 'SUCCESS' && state.roomsStatus === 'SUCCESS';
export const getRooms = state => state.rooms;
export const getActiveRoomId = state => state.activeRoom.id;
export const getActiveRoomUsers = state => state.activeRoom.users;
export const isChatActive = createSelector(getActiveRoomId, ( activeRoomId ) => activeRoomId !== undefined );
export const selectCurrentUserId = createSelector(getUsers, ( users ) => users.length > 0 ? users[0].id : undefined );
export const getRoomUsers = createSelector(getUsers, getActiveRoomUsers,( users, activeRoomUsers = [] ) =>
    activeRoomUsers.map((userId)=>users.filter(({id})=> userId === id)[0])
);

export const getRoomMessages = state => state.activeRoom.messages;




