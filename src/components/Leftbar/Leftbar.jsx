


import React, { useState } from 'react'
import {AiOutlineHome , AiOutlineMessage} from 'react-icons/ai'
import {IoIosNotificationsOutline} from 'react-icons/io'
import {AiOutlineSetting} from 'react-icons/ai'
import {IoIosLogOut} from 'react-icons/io'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {signOut , getAuth , onAuthStateChanged} from 'firebase/auth'
import { useEffect } from 'react'
import {Modal , Box} from '@mui/material'
import './Leftbar.css'
 

const Leftbar = (props) => {


  const auth = getAuth()
  
  const navigate = useNavigate()
  const [open , setOpen] = useState(false)

  let [disPlayName , setDisplayName] = useState('')
  let [pic , setPic] = useState('')





  

  let SigninUser_Logout_Check = () => {
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setEmailVerification(userail.emVerified) //if the emailVerified is false then this statement is working
        // ekhane ei if er kaj lagbe na ,,,karon verification er agei kora hoice,,
        // kintu kaj korara mane holo amr home page theke logout korar por jodi keu abr login
        // na kore sorasori home page e aste cai tahole aste parbe na,,tar jnnoi ei function
        
                      // if(user.emailVerified){
                      //   console.log("true hoice")
                      //   console.log(user.emailVerified)
                      //   navigate('/home')
                      // }
                      // else{
                      //   console.log("veri hoi ni")
                      //   // verificationEmail()
                      // }
                      console.log("start Leftbar.js")
                      setDisplayName(user.displayName)
                      console.log(user.photoURL)
                      setPic(user.photoURL)
                      
      } else {
        // etar mane holo jodi keu login na kore sorasori home page e aste cai,,but parben na
        
        Swal.fire({
          imageUrl: './images/LoginLogo.jpg',
          imageWidth: 450,
          imageHeight: 220,
          imageAlt: 'Custom image',
          title: '<strong>Opps Srorry!...</strong>',
          text: 'Please you must be Login — check it out!',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },

        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login')
          }
        })


      }
    });
  }


  useEffect(() => {
    
    // if (user !== null) {
    //   user.providerData.forEach((profile) => {
    //     setDisplayName(user.displayName)
    //     // setPic(user.photoURL)
    //     console.log(user.photoURL)
    //   });
    // }

    SigninUser_Logout_Check()


  },[])

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

  // Logout Button
  let handleLogButton = () =>{

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



  let handleClose = () =>{
    setOpen(false)
  }

  let handleOpen = () =>{
    setOpen(true)
    Swal.fire({
      title: disPlayName,
      text: 'Modal with a custom image.',
      imageUrl: pic,
      imageWidth: 200,
      imageHeight: 200,
      imageRadious:50,
      imageAlt: 'Custom image',
    })
  }



  return (
    <div  className='leftbar-part'>




    {/* profile Info Mddal */}
      <div >

        {/* <div>
          <Modal keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='modal'
          >
            <Box className='leftbar-box' >
              current user details from firebase
              
            </Box>
          </Modal>
        </div> */}

      </div>

        <div className='image'>
            <img src={pic} onClick={handleOpen} style={{cursor:"pointer"}}></img>
            <div onClick={handleOpen} className='display-Name'>{disPlayName}</div>
        </div>
        <div className='list-icons'>
            <ul className='icon'>
                <li className={props.active == 'home' && 'active'}><a href="#" ><AiOutlineHome/></a></li>
                <li className={props.active == 'msg' && 'active'}><a href="#" ><AiOutlineMessage/></a></li>
                <li className={props.active == 'notice' && 'active'}><a href="#"><IoIosNotificationsOutline/></a></li>
                <li className={props.active == 'settings' && 'active'}><a href="#"><AiOutlineSetting/></a></li>
                <li onClick={handleLogButton} ><a href="#"><IoIosLogOut/></a></li>
                
            </ul>
        </div>
    </div>
  )
}

export default Leftbar