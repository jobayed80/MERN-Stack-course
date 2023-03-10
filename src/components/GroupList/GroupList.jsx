import React from 'react'
import './GroupList.css'
import {TbDotsVertical} from 'react-icons/tb'
import {Grid} from '@mui/material'

const GroupList = () => {
  return (
    <div className='gruopList'>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h2>Group List</h2>
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
                    <img src="./images/groupList1.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Friends Reunion</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Join</button>
                </Grid>
            </Grid>

            {/* box-2 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/groupList2.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Friends Forever</h2>
                    <h4>Good to see you.</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Join</button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/groupList4.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Crazy Cousins</h2>
                    <h4>What plans today?</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Join</button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/groupList1.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                    <h4>What plans today?</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Join</button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/groupList2.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                    <h4>What plans today?</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Join</button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/groupList4.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                    <h4>What plans today?</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button>Join</button>
                </Grid>
            </Grid>






        </div>
  )
}

export default GroupList