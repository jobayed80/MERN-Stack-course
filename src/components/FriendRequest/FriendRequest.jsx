import React from 'react'
import { TbDotsVertical } from 'react-icons/tb'
import './FriendRequest.css'
import { Grid } from '@mui/material'
const FriendRequest = () => {
    return (
        <div className='friendRequest'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h2>Friend Request</h2>
                </Grid>
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={1}>
                    <TbDotsVertical></TbDotsVertical>
                </Grid>

            </Grid>

            {/* box-1 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image' style={{marginTop:"5px"}}>
                    <img src="./images/requ1.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain Rabi</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Accept</button>
                </Grid>
            </Grid>

            {/* box-2 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ2.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Accept</button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ4.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Accept</button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ5.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Accept</button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ1.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Accept</button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/groupList2.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Accept</button>
                </Grid>
            </Grid>






        </div>
    )
}

export default FriendRequest