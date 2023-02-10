import React from 'react'
import './UserList.css'
import { Grid } from '@mui/material'
import { TbDotsVertical } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'
import { getAuth} from "firebase/auth";
// read data from realdatabase
import { getDatabase, ref, onValue , set , push} from "firebase/database";
import { useEffect } from 'react'
import { useState } from 'react'

import Swal from 'sweetalert2'

const UserList = () => {

    let auth = getAuth();
    // read data from realdatabase
    const [userLitFromDB , setUserLitFromDB] = useState([])
    const [friendRequest, setFriendRequest] = useState([])
    const [change, setChange] = useState(false)
    const db = getDatabase();




    useEffect(()=>{
            
        // ekhane userArry name ekta variable nichi. forEach lopp use kore database theke anar por then userArry er moddhe push kora hoice,,,then setUserLitFromDB er moddhe assigned korechi
        let userArry = []
        const userRef = ref(db, 'USERS/');
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item)=>{
                userArry.push({
                    username: item.val().username,
                    email: item.val().email,
                    id: item.key
                })
            })
            setUserLitFromDB(userArry)
           
          });
    },[])



    //ekhane eta use kjorara karon holo jokhn request dewya sesh hbe tokhn oi name k request dite parbo nah,,,tai r + click kore requ dite parbbe na
    // ei jnnoi ekhane eta use korar fole all request arraylist e thakbe,,,then sei array theke abr remove korte  
    useEffect(() => {
        const requestArr = []
        const FriendRequestRef = ref(db, 'FriendRequests/');
        onValue(FriendRequestRef, (snapshot) => {

            snapshot.forEach((item) => {
                
                requestArr.push(item.val().ReciverID+item.val().SendeID)  // ekhane sorasori reciver id proyojon ei jnno array use korci just,,,
                
            })
            // const data = snapshot.val();
            // console.log("FriendRequest",data)
            setFriendRequest(requestArr)
            console.log(requestArr)

        });
    }, [change]) //chnage er mane holo requester er + icon click korar por check icon cole asbe,,mane ei reload er sathe sathe kaj korbe
    







    // Friend Request start
    let handleFriendRequest = (info)=>{
        console.log("done", info)
        const RequListRef = ref(db,'FriendRequests/') //ekhane mane holo REALTIME DATABASE e file create kore
        const PerRequList_Auto_Generated_ID = push(RequListRef) //etar mane holo j,,amra jokhn registration kori then sei info REALTIME DATABASE e jauyarpor ekta id create kore,,
        // ekhaner push mane holo friendrequest jare jare patacii tader prottekr info er jnno auto id create kore dicce

        // set(ref(db, 'FriendRequests/'), {
        //     Name: info.username,
        //     ReciverID: info.id,
        //     SendeID: auth.currentUser.uid    
        //   });
        

          set(PerRequList_Auto_Generated_ID, {
            // Name: auth.currentUser.displayName,
            SenderID: auth.currentUser.uid,
            SenderName: auth.currentUser.displayName,
            ReciverID: info.id,
            ReciverName: info.username
        });
        setChange(!change) //etar mane hoolo requester er + icon click korar por check icon cole asbe
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: info.username,
            text:"friend requested",
            // title: 'friend request done',
            showConfirmButton: false,
            timer: 1500
          })
    }



    return (
        <div className='userList'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h2>User List</h2>
                </Grid>
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={1}>
                    <TbDotsVertical></TbDotsVertical>
                </Grid>

            </Grid>

        
            
            {
                userLitFromDB.map(item=>(
                    auth.currentUser.uid !==item.id && //etar mane holo j,,,ami nijei to user,,,so , user list e to r amr list thakbe nah,,,nijeke to r nije requ dite parbo nah
                    <Grid container spacing={2} className="box">
                        <Grid item xs={3} className='image' style={{ marginTop: "5px" }}>
                            <img src="./images/requ1.png" alt="" />
                        </Grid>
                        <Grid item xs={6} className="name">
                            <h2>{item.username}</h2>    
                            <h5>{item.id}</h5>
                            
                        </Grid>
                        {
                            friendRequest.includes(item.id+auth.currentUser.uid) || friendRequest.includes(auth.currentUser.uid+item.id) ?
                            <Grid item xs={3} className="button">
                            <button onClick={()=>handleFriendRequest(item)}><BsCheckLg></BsCheckLg></button>
                            </Grid>
                            :
                            <Grid item xs={3} className="button">
                            <button onClick={()=>handleFriendRequest(item)}><AiOutlinePlus></AiOutlinePlus></button>
                            </Grid>
                            
                           
                        }
                    </Grid>
            ))}

            



        </div>
    )
}

export default UserList