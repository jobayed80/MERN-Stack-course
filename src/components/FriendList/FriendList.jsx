import React from 'react'
import { Grid } from '@mui/material'
import { TbDotsVertical } from 'react-icons/tb'
import './FriendList.css'

import { getDatabase, ref, onValue} from "firebase/database";
import { useState } from 'react';
import { useEffect } from 'react';

const FriendList = () => {

    const db = getDatabase();
    const [friendListArr , setFriendListArr] = useState([])




    useEffect(()=>{
        const friends=[]
        const friendsRef = ref(db, 'Friends/');
        onValue(friendsRef, (snapshot) =>{
            snapshot.forEach((item)=>{
                friends.push({
                    SENDERname:item.val().SenderName
                    
                })
                setFriendListArr(friends)
                console.log('FriendlIst',friends)
            })
        })
    },[])









    return (
        <div className='friendList'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h2>Friends</h2>
                </Grid>
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={1}>
                    <TbDotsVertical></TbDotsVertical>
                </Grid>

            </Grid>

         



            {
                friendListArr.map(item=>(

                    <Grid container spacing={2} className="box">
                    <Grid item xs={3} className='image' style={{ marginTop: "5px" }}>
                        <img src="./images/requ1.png" alt="" />
                    </Grid>
                    <Grid item xs={5} className="name">
                        <h2>{item.SENDERname}</h2>
                        <h4>Hi Guys, Wassup!</h4>
                    </Grid>
                    <Grid item xs={4} className="button">
                        <p>Today, 8:56pm</p>
                    </Grid>
                    </Grid>

                ))
            
            }

           


           




        </div>
    )
}

export default FriendList