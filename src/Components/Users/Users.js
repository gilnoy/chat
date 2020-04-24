import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import { fetchRoomUsers } from '../../state/actions';
import { getRoomUsers, getActiveRoomId } from '../../state/selectors';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from "styled-components";
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

const Users = ({ fetchRoomUsers, users = [], activeRoomId }) => {
    const classes = useStyles();

    useEffect(()=>{
        if(activeRoomId !== undefined) {
            fetchRoomUsers(activeRoomId);
        }
    }, [fetchRoomUsers, activeRoomId])

    return (
        <List className={classes.root}>
            <Header><Typography>Current Users</Typography></Header>
            {users.map((user) =>
                <ListItem key={user.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <FaceIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name}/>
                </ListItem>
            )}
        </List>
    );
};

const mapStateToProps = (state) => ({
    users: getRoomUsers(state),
    activeRoomId: getActiveRoomId(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRoomUsers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Users);
