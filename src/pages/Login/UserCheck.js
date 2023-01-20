

import React from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import 'animate.css';
import { useNavigate } from 'react-router-dom'

const UserCheck = () => {
    
  const auth = getAuth();
  let navigate = useNavigate()



  let verificationEmail = () =>{
    Swal.fire({
              imageUrl: 'https://imgix.emailable.com/how_does_email_verification_impact_your_email_marketing_campaigns_roi_featured_4d6d15f7a1.jpg?auto=format&crop=focalpoint&dpr=2&fit=crop&h=630&q=30&w=1200',
              imageWidth: 450,
              imageHeight: 220,
              imageAlt: 'Custom image',
              title: 'Sorry!',
              text: 'Please check your email for Email Verification! — check it out!',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              showConfirmButton: true,

              

            }).then((result) => {
              if (result.isConfirmed) {
                // html:'<a href="//www.gmail.com">links</a> '
               
                Swal.fire({
                  html:'<a href="//www.gmail.com" target="_blank">Go to Email — Click</a> ',
                  showConfirmButton: true,
                  toast: true,
                  
                }).then((result) =>{
                  if(result.isConfirmed)
                  
                  {
                    navigate('/login')
                  
                  }


                })

              }
            })
  }



  useEffect(() =>{

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // setEmailVerification(userail.emVerified) //if the emailVerified is false then this statement is working
          if(user.emailVerified){
            navigate('/home')
          }
          else{
            console.log("veri hoi ni")
            verificationEmail()
          }
          
        } else {
          // etar mane holo jodi keu login na kore sorasori home page e aste cai,,but parben an
  
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


  },[])









  return (
    <div></div>
  )
}

export default UserCheck