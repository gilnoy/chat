import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {getActiveRoomId, selectCurrentUserId} from "../../state/selectors";
import {bindActionCreators} from "redux";
import {setMessage, leaveChat } from "../../state/actions";
import Button from '@material-ui/core/Button';


const Wrapper = styled.div`
    padding: 10px 15px;
    display: flex;
    background-color: #FFF;
    border-top: 1px solid #CCC;
    
    justify-content: space-between;
`

const MessageBar = ({roomId, userId, setMessage, leaveChat}) => {
    const onKeyUp = (event) => {
        if(event.key === 'Enter') {
            setMessage(roomId, userId, event.target.value);
            event.target.value = '';
        }
    };

    const onLeave = () => {
        leaveChat(roomId,userId);
    }

    return <Wrapper>
        <TextField id="message" label="Your Message..." onKeyUp={onKeyUp} />
        <Button color="secondary" onClick={onLeave}>Leave Chat</Button>
    </Wrapper>
};

const mapStateToProps = (state) => ({
    roomId: getActiveRoomId(state),
    userId: selectCurrentUserId(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setMessage,
    leaveChat
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);

