

import React, { useState } from 'react'
import { getAuth , signOut} from "firebase/auth";
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import {Grid}  from '@mui/material'
import 'animate.css';
import { useNavigate } from 'react-router-dom'
import Leftbar from '../components/Leftbar/Leftbar.jsx';
import GroupList from '../components/GroupList/GroupList.jsx';
import Search from '../components/Search/Search.jsx';
import FriendRequest from '../components/FriendRequest/FriendRequest.jsx';
import FriendList from '../components/FriendList/FriendList.jsx';
import UserList from '../components/UserList/UserList.jsx';




const Home = () => {
 

  const auth = getAuth();
  let navigate = useNavigate()

  let [emailVerification, setEmailVerification] = useState("")
  const [open, setOpen] = React.useState(false); //this for alert notice

  //    Logout Successfully sweet alert2
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})







  // this part current user details
  let UserProfile = (e) => {

    const user = auth.currentUser;
    if (user !== null ) {
    
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;

      console.log(displayName)
      console.log(email)
      console.log(photoURL)
      console.log(emailVerified)
      console.log(uid)

      console.log(user)

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      
    }
  }

  useEffect((e) => {

      UserProfile();

  }, [])



  // Logout
  let Logout = () => {
    signOut(auth).then(() => {
      Toast.fire({
        icon: 'success',
        title: 'Logout successfully'
      })
      navigate('/login')
    }).catch((error) => {
      console.log(error)
    })
  }






  return (
    <div className='home-part'>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Leftbar active="home"></Leftbar>
        </Grid>
        <Grid item xs={4}>
          <Search></Search>
          <GroupList></GroupList>
          <FriendRequest></FriendRequest>
        </Grid>
        <Grid item xs={3}>
            <FriendList></FriendList>
        </Grid>
        <Grid item xs={3}>
          <UserList></UserList>
        </Grid>
      </Grid>

    </div>

  )
}

export default Home