import React from 'react';
import { styled } from '@mui/system';
import AddFriendButton from './AddFriendButton';
import FriendsTitle from './FriendsTitle';
import PendingInvitations from './PendingInvitationsList/PendingInvitationsList';
import FriendsList from './FriendsList/FriendsList';

const MainContainer = styled('div')({
    width:'224px',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    backgroundColor:'#2F3136',
});

const FriendsSideBar = () =>{
    return(
        <MainContainer>
            <AddFriendButton/>
            <FriendsTitle title='Private Messages'/>
            <FriendsList/>
            <FriendsTitle title='Invitations'/>
            <PendingInvitations/>
             
        </MainContainer>
    );
};

export default FriendsSideBar;