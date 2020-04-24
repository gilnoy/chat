import React, { useEffect } from 'react';
import styled from 'styled-components';

import {connect} from "react-redux";
import {getRoomMessages, selectCurrentUserId, getActiveRoomId} from "../../state/selectors";
import {fetchRoomMessages} from "../../state/actions";
import {bindActionCreators} from "redux";


const Wrapper = styled.div`
    padding: 7px;
    background-color: #FFF;
    overflow-y: auto;
    display: inline-flex;
    flex-direction: column;
    height: 400px;
    width: 298px;
`;

const Message = styled.div`
    border-radius: 1000px;
    background-color: ${props => props.isUser ? '#CCC' : 'green'};
    padding: 5px;
    margin-bottom: 3px;
    display: inline;
    white-space: wrap;
`;

const Messages = ({messages = [], currentUserId, roomId, fetchRoomMessages }) => {
    useEffect(() => {
        fetchRoomMessages(roomId);
        const interval = setInterval(() => {
            fetchRoomMessages(roomId);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return <Wrapper>
        {messages.map(({text, userId })=>{
            return text ? <Message key={text} isUser={userId === currentUserId}>{text}</Message> : ''
        })}
    </Wrapper>
};

const mapStateToProps = (state) => ({
    messages: getRoomMessages(state),
    currentUserId: selectCurrentUserId(state),
    roomId: getActiveRoomId(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRoomMessages
}, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(Messages);

