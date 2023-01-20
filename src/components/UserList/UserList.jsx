import React from 'react'
import './UserList.css'
import { Grid } from '@mui/material'
import { TbDotsVertical } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

// read data from realdatabase
import { getDatabase, ref, onValue} from "firebase/database";
import { useEffect } from 'react'

const UserList = () => {

    const db = getDatabase();

    useEffect(()=>{
        const starCountRef = ref(db, 'USERS/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log('usersData', data)
          });
    },[])
    return (
        <div className='userList'>
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
                <Grid item xs={3} className='image' style={{ marginTop: "5px" }}>
                    <img src="./images/requ1.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>

            {/* box-2 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ2.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Hossain</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ4.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Rabbi</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ5.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ1.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jannatul Bushra</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/groupList2.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jarif AL Sami</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image' style={{ marginTop: "5px" }}>
                    <img src="./images/requ1.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>

            {/* box-2 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ2.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Hossain</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ4.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Rabbi</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ5.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jobayed Hossain</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/requ1.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jannatul Bushra</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>


            {/* box-3 */}

            <Grid container spacing={2} className="box">
                <Grid item xs={3} className='image'>
                    <img src="./images/groupList2.png" alt="" />
                </Grid>
                <Grid item xs={6} className="name">
                    <h2>Jarif AL Sami</h2>
                    <h4>Hi Guys, Wassup!</h4>
                </Grid>
                <Grid item xs={3} className="button">
                    <button><AiOutlinePlus></AiOutlinePlus></button>
                </Grid>
            </Grid>




        </div>
    )
}

export default UserList