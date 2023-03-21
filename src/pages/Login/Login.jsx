import React from 'react'
import './Login.css'
import {
    Button, Form, Grid, Container, TextField, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput
    , Modal, Typography
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import {
    getAuth, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber,
    sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider,
    GithubAuthProvider, signOut
} from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database"; // used for realtime database

import { useState, useEffect } from 'react'
import { FcGoogle, FcPhone } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaTwitter } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Alert, Box, Collapse } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { IoCloseSharp } from "react-icons/io";

// Used for PhoneInput with Country
import 'react-phone-number-input/style.css'
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import { getPadTime } from '../Timer/getPadTime'
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// used for Phone Authentication Modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 370,
    height: 370,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};




const Login = () => {

    const auth = getAuth(); //Firebse
    console.log("Jobayed", auth)
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false); //this for alert notice
    const [key, setKey] = useState('home');

    let [email, setEmail] = useState("")
    let [errorEmail, setErrorEmail] = useState("")
    let [password, setPassword] = useState("")
    let [errorPassword, setErrorPassword] = useState("")
    let [errorPasswordLength, setErrorPasswordLength] = useState("")
    let [firebaseError, setFirebaseError] = useState("")
    let [numberTypeValid, setNumberTypeValid] = useState("")


    // used for modal
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };






    //    Sign in Successfully sweet alert2
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


    let handleLogin = () => {

        if (!email) {
            setErrorEmail("please enter email address")

        }
        else if (!password) {
            setErrorPassword("please enter password")
            setErrorEmail("")
        }
        else if (password.length < 8) {
            setErrorPasswordLength("please must be gratter than or equal 8")
            setErrorPassword("")

        }


        else {
            setErrorPasswordLength("")
            setErrorPassword("")
            setErrorEmail("")
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)

                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                    navigate('/ucheck')



                })
                .catch((error) => {
                    const errorCode = error.code
                    console.log(errorCode)
                    if (errorCode.includes("wrong-password")) {
                        setFirebaseError("password incorrect! please try again")
                        setOpen(true)
                    }
                    else if (errorCode.includes("user-not-found")) {
                        setFirebaseError("email not found! please try again")
                        setOpen(true)
                    }
                    else if (errorCode.includes("too-many-request")) {
                        setFirebaseError("too-many-request! please again reload")
                        setOpen(true)
                    }

                });
        }
    }

    let handleResetPassword = () => {

        if (!email) {
            setErrorEmail("please enter email address")

        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setPassword("")
                    setFirebaseError("")
                    Toast.fire({
                        icon: 'success',
                        title: 'Password reset email sent! - check it'
                    })
                })
                .catch((error) => {
                    setErrorEmail("")
                    const errorCode = error.code;
                    if ((errorCode.includes("user-not-found"))) {
                        setFirebaseError("Email is not found! please enter valid email")
                        setOpen(true)
                    }

                });
        }

    }









    // this part for Google SignIn ---------------------------- Start
    let handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                navigate('/home')
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                console.log(email)
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(credential)
                // ...
            });


    }






    // This part for Twitter Login\
    let handleTwitterLogin = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                console.log(credential)
                const token = credential.accessToken;
                console.log("Twiter hoi ")
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log(errorCode)
                console.log("Twiter hoi ni")
                const errorMessage = error.message;
                console.log(errorMessage)
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
            });
    }










    // ------------------------------------- Used for Phone Authentication ------=========================== STart
    let [phone, setPhone] = useState("")
    let [otp, setOtp] = useState("")

    let configureCaptcha = () => {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                onSignInSubmit();
                alert("Recaptcha verified")

            },
            defaultCountry: "BD",
            'expired-callback': (response) => {
                // Response expired. Ask user to solve reCAPTCHA again.
                console.log("recaptcha expired...")
            }
        }, auth);
    }

    let onSignInSubmit = (e) => {
        e.preventDefault();
        configureCaptcha();
        console.log("kaj hoice")
        console.log(phone)
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the

                window.confirmationResult = confirmationResult;
                console.log("OTP has been sent")


                // ...
            }).catch((error) => {
                // Error; SMS not sent
                console.log(error)
                console.log("Error; SMS not sent")
                // ...
            });
    }


    let handleChange = (e) => {
        e.preventDefault()
        setOtp(e.target.value)
    }

    let onSubmitOTP = (e) => {
        e.preventDefault()
        console.log(otp + "OTP paichi")
        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.

            const user = result.user;
            console.log(user)
            // console.log(JSON.stringify(user))
            alert("User is verified")



            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error)
        });


    }

    // ------- This part for Resend OTP Code Start--------
    let [timeleft, setTimeleft] = useState(2 * 60)
    let [isCounting, setIsCounting] = useState(true)
    let minutes = getPadTime(Math.floor(timeleft / 60))
    let seconds = getPadTime(timeleft - minutes * 60)

    let resendOTP = (e) => {
        e.preventDefault()
        window.recaptchaVerifier.recaptcha.reset()
        window.recaptchaVerifier.clear()
        console.log("resend kaj hbe ")

        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...

                onSignInSubmit();
                alert("Recaptcha verified")

            },
            defaultCountry: "BD",
            'expired-callback': (response) => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
                console.log("recaptcha expired...")
            }
        }, auth);

        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the

                window.confirmationResult = confirmationResult;
                console.log("OTP has been sent")


                // ...
            }).catch((error) => {
                // Error; SMS not sent
                console.log(error)
                console.log("Error; SMS not sent")
                // ...
            });
        // ------- This part for Resend OTP Code End--------


    }
    //  sconds start code
    useEffect(() => {

        const interval = setInterval(() => {
            isCounting &&
                setTimeleft((timeleft) => (timeleft >= 1 ? timeleft - 1 : 0))
        }, 1000);
        return () => {
            clearInterval(interval)
        };
    }, [isCounting])
    // ------- This part for Resend OTP Code ENd--------


    //  Logout PhoneNumber
    let hadleLogout = (e) => {
        e.preventDefault()
        console.log("Logout hoice")
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logout")
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    // ------------------------------------- Used for Phone Authentication ------=========================== STart













    return (

        <div id='login-part'>


            {/* -------------------------------- This part for Phone Authentication --------------------------Start */}
            <Container maxWidth="sm">
                
                {/* <h2>Login Forms</h2>
                
                <form onSubmit={onSignInSubmit}>
                    <Grid container spacing={2}>
                        <div id="sign-in-button"></div>
                        <Grid item xs={12} className="gird">

                            <PhoneInput
                                placeholder="Enter phone number"
                                international={true}
                                countryCallingCodeEditable={false}
                                nableSearch={true}
                                value={phone}
                                onChange={setPhone} />

                           
                            <input type="submit" value="Submit"></input>
                        </Grid>


                        <div id="recaptcha-container"></div>


                    </Grid>
                </form> */}

                {/* <div>
                    <h2>Enter OTP</h2>
                    <form onSubmit={onSubmitOTP}>
                        <Grid container spacing={2}>
                            <div id="sign-in-button"></div>
                            <Grid item xs={12} className="gird">

                                <input type="number" name="otp" placeholder="OTP Number" onChange={handleChange} />

                                <input type="submit" value="Submit"></input>
                            </Grid>


                             <div id="recaptcha-container"></div> 


                        </Grid>
                    </form>
                </div> */}

                {/* <div className='Resend'>



                    <form>
                        <h1>
                            <span>Resend OTP in </span>
                            <span >{minutes}</span>
                            <span>:</span>
                            <span>{seconds}</span>
                        </h1>
 
                        <button onClick={resendOTP}>Resends OTP</button>
                        <button onClick={hadleLogout}>Logout</button>


                    </form>



                </div> */}
                            

                <div className='phoneModal'>


                    <Modal
                        hideBackdrop
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={{ ...style }} className="modalBox">

                            <Typography id="modal-modal-description" sx={{ mt: 0 }}>

                                <Grid container spacing={0}>
                                    <Grid item xs={9} className="gird">

                                    </Grid>
                                    <Grid item xs={3} className="gird">
                                        <Button className='btnModalClose' onClick={handleClose}>Close</Button>
                                    </Grid>
                                </Grid>

                            </Typography>

                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                            >
                                <Tab eventKey="home" title="Home" style={{ width: "100%" }}>

                                    <Typography id="modal-modal-title" variant="h6" component="h1">
                                        Phone Authentication
                                    </Typography>

                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                                        <form onSubmit={onSignInSubmit}>

                                            <Grid container spacing={2} >
                                                <div id="sign-in-button"></div>
                                                <Grid item xs={12} className="gird">

                                                    <PhoneInput
                                                        style={{ width: "100%" }}
                                                        placeholder="Enter phone number"
                                                        international={true}
                                                        countryCallingCodeEditable={false}
                                                        nableSearch={true}
                                                        value={phone}
                                                        onChange={setPhone}

                                                        error={phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'} />

                                                </Grid>

                                                <Grid item xs={12} className="gird">

                                                    <Typography style={{ fontSize: "15px" }} id="modal-modal-description" sx={{ mt: -1 }}>
                                                        <Grid container spacing={1}>

                                                            <Grid item xs={5} className="gird">
                                                                
                                                                <small>Is valid: {phone && isValidPhoneNumber(phone) ? 'true' : 'false'}</small>
                                                            </Grid>
                                                            <Grid item xs={7} className="gird">
                                                                <small>National: {phone && formatPhoneNumber(phone)}</small>
                                                            </Grid>
                                                            <Grid item xs={12} className="gird">
                                                                <small>International: {phone && formatPhoneNumberIntl(phone)}</small>
                                                            </Grid>

                                                        </Grid>
                                                    </Typography>

                                                </Grid>

                                                <Grid item xs={12} className="gird">
                                                    <input className='btnSUBMIT' style={{ width: "100%", padding: "10px", marginTop: '2px' }} type="submit" value="Submit"></input>
                                                </Grid>

                                                <div id="recaptcha-container"></div>


                                            </Grid>

                                        </form>

                                    </Typography>


                                </Tab>
                                <Tab eventKey="profile" title="Profile" style={{ width: "100%" }}>
                                    nnnnnnnnnnnnnnnnnnnnnnnnn
                                </Tab>

                            </Tabs>



                        </Box>
                    </Modal>
                </div>

            </Container> <br></br>  <br></br> <br></br>
            {/* -------------------------------- This part for Phone Authentication ----------------------------End */}




            <Container>

                <Grid container spacing={2}>

                    <Grid item xs={6}>

                        <div className='left'>
                            <h1>Login to your account!</h1>

                            <div className="social-Media" style={{width:"370px"}}>

                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    
                                    <Grid xs={6}>
                                        <div className='loginAuth'>
                                            <div className='google' onClick={handleGoogleSignIn}>
                                                <div>
                                                    <FcGoogle />
                                                </div>
                                                <div>
                                                    <p className='go-content'>
                                                        Login with Google
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid xs={6}>
                                        <div className='loginAuth' onClick={handleOpen}>
                                            <div className='phone'>
                                                <FcPhone />
                                                <p className='phn-content'>
                                                    Login with Phone
                                                </p>
                                            </div>
                                        </div>
                                    </Grid>
                                    
                                </Grid>

                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid xs={6}>

                                        <div className='loginAuth'>
                                            <div className='facebook'>
                                                <BsFacebook />
                                                <p className='fb-content'>
                                                    Login with Facebook
                                                </p>
                                            </div>
                                        </div>

                                    </Grid>

                                    <Grid xs={6}>
                                        <div className='loginAuth' onClick={handleOpen}>
                                            <div className='github' onClick={handleTwitterLogin}>
                                                <FaTwitter />
                                                <p className='it-content'>
                                                    Login with Github
                                                </p>
                                            </div>
                                        </div>
                                    </Grid>
                                    
                                </Grid>

                            </div>


                            
                          
                            <div className='alert'>
                                {
                                    firebaseError ?
                                        <div className='alert-notice'>
                                            <Box sx={{ width: '370px', marginTop: "2px" }}>
                                                <Collapse in={open}>
                                                    <Alert severity="error"
                                                        action={
                                                            <IconButton
                                                                aria-label="close"
                                                                color="inherit"
                                                                size="small"
                                                                onClick={() => {
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                x  {/* <CloseIcon fontSize="inherit"  /> */}

                                                            </IconButton>
                                                        }
                                                        sx={{ mb: 2 }}
                                                    >
                                                        <strong>{firebaseError}</strong>
                                                    </Alert>
                                                </Collapse>

                                            </Box>
                                        </div> : ""}
                            </div>


                            <div className='textField'>
                                <TextField
                                    helperText={errorEmail}
                                    id="demo-helper-text-misaligned"
                                    label="Email Address"
                                    type="email"
                                    style={{ width: "370px", marginTop: "2px" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <br></br>

                                <TextField
                                    helperText={errorPassword ? errorPassword : errorPasswordLength ? errorPasswordLength : ""}
                                    id="demo-helper-text-misaligned"
                                    label="Password"
                                    type="password"
                                    style={{ width: "370px", marginTop: "30px" }}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <br></br>

                                <div className='resetPass' onClick={handleResetPassword}>
                                    <p>forget password?</p>
                                </div>



                                <Button onClick={handleLogin} style={{ width: "370px", marginTop: "20px", padding: "15px 0" }} variant="contained" disableElevation>
                                    Login to Continue
                                </Button>

                                <div className='already-Account'>
                                    <p className='already-content'>Don’t have an account ? <Link className='goTopage' to={'/'}>Sign Up</Link> </p>
                                </div>



                            </div>

                        </div>

                    </Grid>
                    <Grid item xs={6}>
                        <div className="right">
                            <img style={{ width: "100%", height: "100vh" }} src="./images/Login.png"></img>
                        </div>
                    </Grid>

                </Grid>

            </Container>




        </div>
    )
}

export default Login



