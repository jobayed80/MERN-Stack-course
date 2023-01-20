
import React, { Component } from 'react'
import { useState } from 'react';

// etar connection library gula hoccce index.js theke
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// Used for PhoneInput with Country
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'







class PhoneAuthentication extends Component{


   

     
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }


    configureCaptcha = () => {
        // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        //   'size': 'invisible',
        //   'callback': (response) => {
        //     // reCAPTCHA solved, allow signInWithPhoneNumber.
        //     this.onSignInSubmit();
        //     console.log("Recaptca varified")
        //   },
        //   defaultCountry: "IN"
        // });

        // const auth = getAuth();
        // window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        //     'size': 'invisible',
        //     'callback': (response) => {
        //         // reCAPTCHA solved, allow signInWithPhoneNumber.
        //         this.onSignInSubmit();
        //         console.log("Recaptca varified")
        //     }
        // }, auth);

        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
              this.onSignInSubmit();
              console.log("Recaptca varified")
            },
            defaultCountry: "BD",
            'expired-callback': () => {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          }, auth);

        
          
    }


    onSignInSubmit = (e) => {
        e.preventDefault()
        this.configureCaptcha()
        const phoneNumber = "+880" + this.state.mobile
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("OTP has been sent")
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                console.log("Error; SMS not sent")
                // ...
            });
    }

    onSubmitOTP = (e) => {
        e.preventDefault()
        const code = this.state.otp
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
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








    render(){

        
        
        return(

            <>
                {/* <PhoneInput
                    defaultCountry="RU"
                    value={value}
                    onChange={setValue} /> */}



                <h2>Login Form</h2>
                <form onSubmit={this.onSignInSubmit}>
                    {/* <div id="sign-in-button"></div> */}
                    <input type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange} />
                    <button type="submit">Submit</button>
                    <div id="recaptcha-container"></div>
                </form>

                <h2>Enter OTP</h2>
                <form onSubmit={this.onSubmitOTP}>
                    <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </>

        )

    }

}

export default PhoneAuthentication