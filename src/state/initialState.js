export const activeRoomInit = {
        status: undefined,
        id: undefined,
        users: [],
        messages: []
}

const initialState = {
    activeRoom: activeRoomInit,
    activeRoomId: undefined,
    users: [],
    usersStatus: undefined,
    rooms: [],
    roomsStatus: undefined
}

export default initialState;