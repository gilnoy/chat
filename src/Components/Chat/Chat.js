import React from 'react';
import Users from '../Users';
import styled from 'styled-components';
import {isChatActive} from "../../state/selectors";
import Alert from '@material-ui/lab/Alert';
import {connect} from "react-redux";
import MessageBar from "../MessageBar";
import Messages from "../Messages";

const Wrapper = styled.div`
    display: flex;
    height: 500px;
    
    .info {
        width: 100%;
    }
`;

const UsersSection = styled.div`
    width: 30%;
    height: 100%;
    background-color: #FFF;
    border-right: 1px solid #CCC;
`;

const ChatSection = styled.div`
    height: 100%;
    background-color: #FFF;    
`;




const Chat = ({ isChatActive }) => {
    return (<Wrapper>
        { isChatActive ? <>
            <UsersSection>
                <Users/>
            </UsersSection>
            <ChatSection>
                <Messages/>
                <MessageBar/>
            </ChatSection>
        </> : <Alert severity="info" className='info'>Please select a room in order to start a chat</Alert>}

    </Wrapper>)
};


const mapStateToProps = (state) => ({
    isChatActive: isChatActive(state),
});

export default connect(mapStateToProps, null)(Chat);

