


import React, { useState } from 'react'
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineSetting } from 'react-icons/ai'
import { IoIosLogOut } from 'react-icons/io'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { signOut, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadString , getDownloadURL } from "firebase/storage";
import { useEffect } from 'react'
import { Modal, Box, Typography , Grid } from '@mui/material'
import { AiOutlineUpload } from 'react-icons/ai'
import './Leftbar.css'
import moment from 'moment';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 580,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 5,
};


const Leftbar = (props) => {


  const auth = getAuth()

  const navigate = useNavigate()
  const [openImage, setOpenImage] = useState(false)
  const [open, setOpen] = useState(false)




  let handleCloseImage = () => {
    setOpenImage(false)
  }

  let handleOpenImage = () => {
    setOpenImage(true)
  }





  const handleOpen = () => setOpenImage(true);


  let [disPlayName, setDisplayName] = useState('')
  let [pic, setPic] = useState('')
  let [email, setEmail] = useState('')
  let [userID, setUseID] = useState("")
  let [creationTime, setCreationTime] = useState('')
  let [lastSignInTime, setlLastSignInTime] = useState("")
  let [file, setFile] = useState()


  let SigninUser_Logout_Check = () => {
    const user = auth.currentUser;
    // console.log("USER",user) 
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

        setDisplayName(user.displayName)
        setUseID(user.uid)
        setPic(user.photoURL)
        setEmail(user.email)
        setCreationTime(user.metadata.creationTime)
        setlLastSignInTime(user.metadata.lastSignInTime)

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


  }, [])

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
  let handleLogButton = () => {

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


  let handleClose = () => {
    setOpen(false)
  }

  let handleModalOpen = () => {
    setOpen(true)

    // ekahne GMTY time k convert kore BD Time kora hoice....
    let GMT_DHAKAtime_lastSignInTime = moment(lastSignInTime).utcOffset(lastSignInTime)
    // console.log("sfnwesaidhjsufsvo", date.format('DD/MM/YYYY HH:mm'))

    var Meldungstext = "";
    Meldungstext = Meldungstext + "Email ID : " + email + "<br>"
    Meldungstext = Meldungstext + "User ID : " + userID + "<br>"
    Meldungstext = Meldungstext + "Creation Time : " + creationTime + "<br>"
    // Meldungstext = Meldungstext + "Last SignIn Time : " + lastSignInTime + "<br>"
    Meldungstext = Meldungstext + "Last SignIn Time : " + GMT_DHAKAtime_lastSignInTime.format('DD/MM/YYYY HH:mm:ss') + "<br>"




    Swal.fire({
      imageUrl: pic,
      imageAlt: 'Custom image',
      title: disPlayName,
      html: Meldungstext,
      imageWidth: 100,
      imageHeight: 100,
      imageRadious: 50,
      imageAlt: 'Custom image',
      imageClass: 'img-responsive rounded-circle',
      animation: true
    })
  }



  // *******************   Profile Pic Upload Start  ********************* 
  const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();



  let handleProfileUpload = (e) => {
    console.log(e.target.files)
    // setFile(URL.createObjectURL(e.target.files[0]));
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  }

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      const storage = getStorage();
      const storageRef = ref(storage, 'Jobayed');

      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        console.log("uploaded storage")

        // this part used for image download link crate
        // Get the download URL
        getDownloadURL(storageRef)
          .then((url) => {
            console.log(url)
            updateProfile(auth.currentUser, {
              photoURL:url
            }).then(()=>{
              console.log("Photo updated")
            }).catch((error)=>{
              console.log("Uploaded error in Databse", error)
            })
            
          })
       
      });
      
    
      setCropData(cropper.getCroppedCanvas().toDataURL());

      

    }
  };
  // *******************   Profile Pic Upload Endd  ********************* 


  return (
    <div className='leftbar-part'>




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

      <div className='profile'>

        <img src={pic} onClick={handleModalOpen} style={{ cursor: "pointer", marginTop: "1rem" }}></img>
        <div className="overlay" onClick={handleOpen}>
          <AiOutlineUpload className='upload-img'></AiOutlineUpload>
        </div>

      </div>



      {/* Profile Picture Modal */}
      <Modal

        open={openImage}
        onClose={handleCloseImage}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"

      >
        <Box sx={style} className="Pofile-Modal">
          
          <Typography id="keep-mounted-modal-title" variant="h5" component="h1" style={{ textAlign: 'center' }}>
            Change your Profile Picture
          </Typography>
          {/* <Typography id="keep-mounted-modal-description" sx={{ mt: 4 }}>

            <div className='profile-Picture'>

              {!auth.currentUser.photoURL
                ?
                <div className="avatar">
                  <img src={image?image :"./images/avatar.png"} />
                 
                </div>
                :
                <img src={pic} style={{ cursor: "pointer", marginTop: "1rem", borderRadius: "50%" }}></img>
              }


            </div>
            <input type="file" onChange={handleProfileUpload} />
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 4 }} tyle={{ textAlign: 'center' }}>

            <div className='cropper-box'>
              <input type="file" onChange={handleProfileUpload} />

              <br />
              <br />
              <Cropper
                style={{ height: 400, width: "100%" }}
                zoomTo={0.4}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
                guides={true}
              />
            </div>
            <div className="box" style={{ width: "50px", height:"200px" }}>
              
              <div
                className="img-preview"
                style={{ width: "100%", float: "left", height: "300px" }}
              />
            </div>
          </Typography> */}




          <div className="img-cropper-model">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
              <Grid item xs={8}>
                <div className="left-img-cropper">
                  <input type="file" onChange={handleProfileUpload} />

                  <br />
                  <br />
                  <Cropper
                    className='img-cropper-left'
                    zoomTo={0.1}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="right-img">
                  <div className="top">
                    <div className="img-preview previewer" />
                  </div>
                  <div className="right" style={{marginTop:"20px"}}>
                    

                      <button style={{ float: "right" }} onClick={getCropData}>
                        Upload Profile Picture 
                      </button>
                   
                    <img style={{ width: "100%" }} src={cropData} alt="cropped" />
                  </div>
                </div>
              </Grid>

              

            </Grid>


          </div>


          

        </Box>
      </Modal>



      <div className="name-title">
        <div onClick={handleModalOpen} className='display-Name'>{disPlayName}</div>
        <small style={{ color: "white", fontSize: "10px" }}>{email}</small>

      </div>


      <div className='list-icons'>
        <ul className='icon'>
          <li className={props.active == 'home' && 'active'}><a href="#" ><AiOutlineHome /></a></li>
          <li className={props.active == 'msg' && 'active'}><a href="#" ><AiOutlineMessage /></a></li>
          <li className={props.active == 'notice' && 'active'}><a href="#"><IoIosNotificationsOutline /></a></li>
          <li className={props.active == 'settings' && 'active'}><a href="#"><AiOutlineSetting /></a></li>
          <li onClick={handleLogButton} ><a href="#"><IoIosLogOut /></a></li>

        </ul>
      </div>
    </div>
  )
}

export default Leftbar