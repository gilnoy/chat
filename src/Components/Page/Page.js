import React, {  useEffect } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import Chat from '../Chat';
import Rooms from '../Rooms';
import styled from 'styled-components';
import {isAppReady} from "../../state/selectors";
import {fetchUsers, fetchRooms} from "../../state/actions";
import CircularProgress from '@material-ui/core/CircularProgress';


const Wrapper =  styled.div`
    width: 50%;
    height: 50%;
    background-color: #CCC;
    border: 1px solid #CCC;
    border-radius: 5px;
    
    > * {
        margin-bottom: 10px;
    }
`;

const Page  = ({isReady, fetchUsers, fetchRooms}) => {
    useEffect(()=>{
        if(!isReady) {
            fetchUsers();
            fetchRooms();
        }
    },[fetchUsers, isReady])
    return (
        <>
        { isReady ?
            <Wrapper>
                <Rooms/>
                <Chat/>
            </Wrapper>
            : <CircularProgress/>}
        </>

    );
}

const mapStateToProps = (state) => ({
    isReady: isAppReady(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUsers,
    fetchRooms
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Page);

