import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { fetchRooms, setActiveRoom } from '../../state/actions';
import { getRooms, getActiveRoomId, selectCurrentUserId } from '../../state/selectors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        padding: 0,
        margin: 0,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Header = styled.div`
    background-color: #1976d2;
    padding: 10px;
    color: #FFF;
`;

const Rooms = ({ setActiveRoom, rooms = [], activeRoomId, userId }) => {
    const classes = useStyles();

    const onClick = useCallback((id)=>{
        setActiveRoom(id, userId)
    }, [setActiveRoom]);

    return (
        <List className={classes.root}>
            <Header><Typography>Rooms</Typography></Header>
            {rooms.map((room) =>
                <ListItem key={room.id} onClick={() => onClick(room.id)} button selected={activeRoomId === room.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <MeetingRoomIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={room.name}/>
                </ListItem>
            )}
        </List>
    );
};

const mapStateToProps = (state) => ({
    rooms: getRooms(state),
    activeRoomId: getActiveRoomId(state),
    userId: selectCurrentUserId(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRooms,
    setActiveRoom
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
