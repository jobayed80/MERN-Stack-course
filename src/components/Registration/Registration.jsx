

// import React from 'react'
// import { Button, Form, Grid, Container , TextField ,InputAdornment, IconButton ,FormControl , InputLabel , OutlinedInput} from '@mui/material'
// import { useState } from 'react';
// import {Link , useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'
// import {Alert , Box , Collapse}  from '@mui/material'


// import { getAuth, createUserWithEmailAndPassword , sendEmailVerification } from "firebase/auth";


// const Registration = () => {

//    let navigate = useNavigate()
//    let auth = getAuth();
//    const [open, setOpen] = React.useState(false); //this for alert notice


//    let [fullName , setFullName] = useState("")
//    let [errorFullName, setErrorFullName] = useState("")
//    let [email , setEmail] = useState("")
//    let [errorEmail, setErrorEmail] = useState("")
//    let [password , setPassword] = useState("")
//    let [errorPassword, setErrorPassword] = useState("")
//    let [errorPasswordLength, setErrorPasswordLength] = useState("")
//    let [confirmPassword , setconfirmPassword] = useState("")
//    let [errorConfirmPassword , setErrorConfirmPassword] = useState("")
//    let [errorPasswordMatch , setErrorPasswordMatch] = useState("")
//    let [firebaseALreadyUsed , setFirebaseALreadyUsed] = useState("")



//     //    Sign in Successfully sweet alert2
//     const Toast = Swal.mixin({
//         toast: true,
//         position: 'top-end',
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//             toast.addEventListener('mouseenter', Swal.stopTimer)
//             toast.addEventListener('mouseleave', Swal.resumeTimer)
//         }
//     })


//     // Send a user a verification email
//     let sendEmalVerification = () => {
//         sendEmailVerification(auth.currentUser)
//             .then(() => {
//                 // Email verification sent!
//                 // ...
//             });
//     }

//    let handleSubmit = () =>{

//         if(!fullName){
//             setErrorFullName("please enter full nanme")
//         }
//         else if(!email){
//             setErrorEmail("please enter email address")
//             setErrorFullName("")
//         }
//         else if(!password){
//             setErrorPassword("please enter password")
//             setErrorEmail("")
//         }
//         else if(password.length<8){
//             setErrorPasswordLength("please must be gratter than or equal 8")
//             setErrorPassword("")
            
//         }
//         else if(password!==confirmPassword){
//             setErrorPasswordMatch("password don't matched! please try again")
//             setErrorPassword("")
//             setErrorPasswordLength("")
//         }
//         else if(!confirmPassword){
//             setErrorConfirmPassword("please enter confirm password")
//             setErrorPassword("")
//             setErrorPasswordLength("")
//         }
        
        

//         else {

//             setErrorPasswordMatch("")
//             // here used firebase
//             createUserWithEmailAndPassword(auth, email, password)
//                 .then((userCredential) => {
//                     // Signed in 
//                     const user = userCredential.user;
//                     console.log(user)
//                     sendEmalVerification();
//                     Toast.fire({
//                         icon: 'success',
//                         title: 'Signed up successfully'
//                     })
//                     navigate('/login')
//                 })
//                 .catch((error) => {
//                     const errorCode = error.code;
//                     const errorMessage = error.message;
//                     // ..
//                     if (errorCode.includes("email-already-in-use")) {
//                         setFirebaseALreadyUsed("Email already used! please try to another email")
//                         setOpen(true)
//                     }
//                     console.log(errorCode)

//                 });
//         }
//    }

//    let handleClean = () =>{
//     setFullName("")
//     setEmail("")
//     setPassword("")
//     setconfirmPassword("")
//     setErrorFullName("")
//     setErrorEmail("")
//     setErrorPassword("")
//     setErrorConfirmPassword("")
//     setErrorPasswordLength("")
//     setErrorPasswordMatch("")

//    }











//     return (
//         <div id='reg-part'>

//             <Container>

//                 <Grid container spacing={2}>

//                     <Grid item xs={6}>

//                         <div className='left'>
//                             <h1>Get started with easily register</h1>
//                             <p className='content'>Free register and you can enjoy it</p>
                            
//                             {
//                                 firebaseALreadyUsed ?
//                                     <div className='alert-notice'>
//                                         <Box sx={{ width: '100%' ,  marginTop:"20px"}}>
//                                             <Collapse in={open}>
//                                                 <Alert severity="error"
//                                                     action={
//                                                         <IconButton
//                                                             aria-label="close"
//                                                             color="inherit"
//                                                             size="small"
//                                                             onClick={() => {
//                                                                 setOpen(false);
//                                                             }}
//                                                         >
//                                                             {/* <CloseIcon fontSize="inherit" /> */}
//                                                             X
//                                                         </IconButton>
//                                                     }
//                                                     sx={{ mb: 2 }}
//                                                 >
//                                                    <strong>{firebaseALreadyUsed}</strong>
//                                                 </Alert>
//                                             </Collapse>

//                                         </Box>
//                                     </div> : ""}


//                             <div className='textField'>
//                                 <TextField
//                                     helperText={errorFullName}
//                                     id="demo-helper-text-misaligned"
//                                     label="Full Name"
//                                     type="text"
//                                     style={{width:"370px"}}
//                                     value={fullName}
//                                     onChange={(e) => setFullName(e.target.value)}
//                                 />
                                   
//                                  <br></br>

//                                 <TextField
//                                     helperText={errorEmail}
//                                     id="demo-helper-text-misaligned"
//                                     type="email"
//                                     label="Email Address"
//                                     style={{width:"370px" , marginTop:"36px"}}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     value={email}
//                                 />
//                                 <br></br>

//                                 <TextField
//                                     helperText={errorPassword ? errorPassword : errorPasswordLength ? errorPasswordLength :""}
//                                     id="demo-helper-text-misaligned"
//                                     label="Password"
//                                     type="password"
//                                     style={{width:"370px" , marginTop:"36px"}}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     value={password}
//                                 />
//                                 <br></br>
//                                 <TextField
//                                     helperText={errorConfirmPassword ? errorConfirmPassword : errorPasswordMatch ? errorPasswordMatch : ""}
//                                     id="demo-helper-text-misaligned"
//                                     label="Confirm password"
//                                     type="password"
//                                     style={{width:"370px" , marginTop:"36px"}}
//                                     onChange={(e) => setconfirmPassword(e.target.value)}
//                                     value={confirmPassword}
//                                 />
//                                 <br></br>

//                                 <Button onClick={handleSubmit} style={{width:"370px" , marginTop:"36px" , padding:"15px 0"}} variant="contained" disableElevation>
//                                     Sign Up
//                                 </Button>
//                                 <Button onClick={handleClean} style={{width:"370px" , marginTop:"12px" , padding:"15px 0"}} variant="contained" disableElevation>
//                                     Clean
//                                 </Button>

//                                 <div className='already-Account'>
//                                     <p className='already-content'>Already  have an account ? <Link className='goTopage' to={'/login'}>Sign In</Link> </p>
//                                 </div>



//                             </div>

//                         </div>

//                     </Grid>
//                     <Grid item xs={6}>
//                         <div className="right">
//                             <img style={{ width: "100%", height: "100vh" }} src="./images/Registration.png"></img>
//                         </div>
//                     </Grid>

//                 </Grid>

//             </Container>

//         </div>
//     )
// }

// export default Registration