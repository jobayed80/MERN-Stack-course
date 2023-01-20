import React from 'react'
import {TextField} from '@mui/material'
import {BsSearch} from 'react-icons/bs'
import {TbDotsVertical} from 'react-icons/tb'
import './Search.css'


const Search = () => {
  return (
    <div className='search'>
        <input type="text" placeholder='Search' />
        <div className="searchIcon">
            <BsSearch></BsSearch>
        </div>
        <div className="searchDots">
            <TbDotsVertical></TbDotsVertical>
        </div>
    </div>
  )
}

export default Search