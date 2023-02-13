import React from 'react'
import { Grid } from '@mui/material'
import { TbDotsVertical } from 'react-icons/tb'
import './FriendList.css'

import { getDatabase, ref, onValue} from "firebase/database";
import { useState } from 'react';
import { useEffect } from 'react';
import { getAuth} from "firebase/auth";
import {Alert} from '@mui/material'

const FriendList = () => {


    let auth = getAuth();
    const db = getDatabase();
    const [friendListArr , setFriendListArr] = useState([])
    let [noFriendRequest, setNoFriendRequest ] = useState("")




    useEffect(() => {
        const friends = []
        const friendsRef = ref(db, 'Friends/');
        onValue(friendsRef, (snapshot) => {
            snapshot.forEach((item) => {

                if (auth.currentUser.uid == item.val().SenderID || auth.currentUser.uid == item.val().ReciverID) { ///ekhane mane holo j,,,ami jare request patai ni ba amk patai ni tare ami dekhte parbo na setsar conditin
                    friends.push({
                        Per_Request_Key: item.key,
                        SenderName: item.val().SenderName,
                        SenderID: item.val().SenderID,
                        ReciverID: item.val().ReciverID,
                        ReciverName: item.val().ReciverName
                    })
                }
                else if(auth.currentUser.uid != item.val().SenderID || auth.currentUser.uid != item.val().ReciverID){
                    setNoFriendRequest("No Friend request")
                }
                setFriendListArr(friends)
                // console.log('FriendlIst', friends)
            })
        })
    }, [])









    return (
        <div className='friendList'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {
                        friendListArr.length<=1 ?
                        <h2>Friend {friendListArr.length}</h2>
                        :
                        <h2>Friends {friendListArr.length}</h2>
                    }
                    {/* <h2>Friends {friendListArr.length}</h2> */}
                </Grid>
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={1}>
                    <TbDotsVertical></TbDotsVertical>
                </Grid>

            </Grid>



            {
                friendListArr.length <= 0
                &&
                <Alert style={{ marginTop: "40px" }} severity='info'>You Have No Friends</Alert>
            }





            {
                friendListArr.map(item=>(

                    <Grid container spacing={2} className="box">
                    <Grid item xs={3} className='image' style={{ marginTop: "5px" }}>
                        <img src="./images/requ1.png" alt="" />
                    </Grid>
                    <Grid item xs={5} className="name">

                        {
                            auth.currentUser.uid ==  item.SenderID ?  //ekhane mane holo jobayed login korle tar fnd er name show korbe,,tar fnd login korle jobayed er name show krbe
                            <h2>{item.ReciverName}</h2>
                            :
                            <h2>{item.SenderName}</h2>
                        }
                        
                        <h4>Hi Guys, Wassup!</h4>
                       
                    </Grid>
                    <Grid item xs={4} className="button">
                        {/* <p>{console.log("Jobayed Time",item.date)}</p> */}
                        <p>{item.date}</p>
                    </Grid>
                    </Grid>

                ))
            
            }

           


           




        </div>
    )
}

export default FriendList