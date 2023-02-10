import React, { useEffect } from 'react'
import { TbDotsVertical } from 'react-icons/tb'
import './FriendRequest.css'
import { Alert, Grid } from '@mui/material'


import { getDatabase, ref, set , push , onValue } from "firebase/database";
import { useState } from 'react'
import { getAuth } from "firebase/auth";

import Swal from 'sweetalert2'

const FriendRequest = () => {

    let auth = getAuth();
    const db = getDatabase();
    const [friendRequest, setFriendRequest] = useState([])
    const [noFriendRequest , setNoFriendRequest] = useState("")

    useEffect(() => {
        const requestArr = []
        const FriendRequestRef = ref(db, 'FriendRequests/');
        onValue(FriendRequestRef, (snapshot) => {

            snapshot.forEach((item) => {
                if (item.val().ReciverID == auth.currentUser.uid) {

                    requestArr.push({
                        SenderName: item.val().SenderName,
                        SenderID: item.val().SenderID,
                        ReciverID: item.val().ReciverID,
                        ReciverName: item.val().ReciverName
                        
                    })
                }
                else{
                    setNoFriendRequest("No Friend Requests")
                }
            })
            // const data = snapshot.val();
            // console.log("FriendRequest",data)
            setFriendRequest(requestArr)

        });
    }, [])




    let handleAcceptFriend= (friends)=>{
        console.log(friends)
        const firnedsListRef = ref(db, 'Friends/');
        const Per_FriendList_Auto_GeneratedID = push(firnedsListRef);
        set(Per_FriendList_Auto_GeneratedID, {
            SenderName:friends.SenderName,
            ReciverName: friends.ReciverName
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: friends.SenderName,
            text:"friend requested accepted",
            // title: 'friend request done',
            showConfirmButton: false,
            timer: 2500
          })
        
    }


    return (
        <div className='friendRequest'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h2>Friend Request</h2>
                </Grid>
                <Grid item xs={5}>

                </Grid> 
                <Grid item xs={1}>
                    <TbDotsVertical></TbDotsVertical>
                </Grid>

            </Grid>

            {/* box-1 */}

            {
                friendRequest.map(item => (
                    
                        <Grid container spacing={2} className="box">
                            <Grid item xs={3} className='image' style={{ marginTop: "5px" }}>
                                <img src="./images/groupList1.png" alt="" />
                            </Grid>
                            <Grid item xs={6} className="name">
                                <h2>{item.SenderName}</h2>
                                <small>{item.SenderID}</small>

                            </Grid>
                            <Grid item xs={3} className="button">
                                <button onClick={()=> handleAcceptFriend(item)}>Accept</button>
                            </Grid>
                        </Grid>
                        
                        // <Alert severity='info'>{noFriendRequest}</Alert>
                ))
            }

            {
               friendRequest.length<=0 &&
                <Alert style={{marginTop:"40px"}} severity='info'>{noFriendRequest}</Alert>
            }







        </div>
    )
}

export default FriendRequest