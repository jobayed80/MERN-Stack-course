import React, { useEffect } from 'react'
import { TbDotsVertical } from 'react-icons/tb'
import './FriendRequest.css'
import { Alert, Grid } from '@mui/material'


import { getDatabase, ref, set , push , onValue , remove } from "firebase/database";
import { useState } from 'react'
import { getAuth } from "firebase/auth";

import Swal from 'sweetalert2'

const FriendRequest = () => {

    let auth = getAuth();
    const db = getDatabase();
    const [friendRequest, setFriendRequest] = useState([])
    const [noFriendRequest , setNoFriendRequest] = useState("")
    const [realTime_FriendRequest_dlt, setrealTime_FriendRequest_dlt] = useState(true)
    // const [date, setDate] = React.useState(new Date())
    // console.log("Time Accepts Fnd", date)

    useEffect(() => {
        const requestArr = []
        const FriendRequestRef = ref(db, 'FriendRequests/');
        onValue(FriendRequestRef, (snapshot) => {

            snapshot.forEach((item) => {
                if (item.val().ReciverID == auth.currentUser.uid) {

                    requestArr.push({
                        Per_FriendRequest_List_Key:item.key,
                        SenderName: item.val().SenderName,
                        SenderID: item.val().SenderID,
                        ReciverID: item.val().ReciverID,
                        ReciverName: item.val().ReciverName
                        
                    })
                    console.log("Friend Request key" , requestArr)
                }
                else{
                    setNoFriendRequest("No Friend Requests")
                    
                }
            })
            // const data = snapshot.val();
            // console.log("FriendRequest",data)
            setFriendRequest(requestArr)

        });
    }, [realTime_FriendRequest_dlt]) ////ekhane manne holo request accepted houyar sathe sathe listy theke reomove hye jabe




    let handleAcceptFriend= (friends)=>{
        // console.log("Jobayed Time Friends",friends)
        const firnedsListRef = ref(db, 'Friends/');
        const Per_FriendList_Auto_GeneratedID = push(firnedsListRef);
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth()
            + "/" + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            
            // console.log("Time Accepts Fnd", datetime)

        set(Per_FriendList_Auto_GeneratedID, {

            Per_FriendRequest_List_Key:friends.Per_FriendRequest_List_Key,
            SenderName: friends.SenderName,
            SenderID: friends.SenderID,
            ReciverID: friends.ReciverID,
            ReciverName: friends.ReciverName,
            // date: '${new Date().getDate()} / ${new Date().getMonth()} / ${new Date().getFullYears()}'
            date: new Date()
        }).then(()=>{
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: friends.SenderName,
                text:"friend requested accepted",
                // title: 'friend request done',
                showConfirmButton: false,
                timer: 2500
              })

            //   etar mane holo jokhn request accepted korbe tokhn friend request list theke delete hye jabe,,,,,,
            const removeFriendRequest = ref(db, 'FriendRequests/' +friends.Per_FriendRequest_List_Key);
            remove(removeFriendRequest).then(() => {
                setrealTime_FriendRequest_dlt(!realTime_FriendRequest_dlt) //ekhane manne holo delete houyar sathe sathe list theke muche jabe
            });



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
                <Alert style={{marginTop:"40px"}} severity='info'>No Friend Request</Alert>
            }







        </div>
    )
}

export default FriendRequest