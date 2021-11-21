import { ArrowBackOutlined } from '@material-ui/icons'
import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import './Watch.scss'

const Watch = () => {

    const location = useLocation()
    const { movie } = location

    return (
        <div className='watch'>
            <Link to='/'>
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video 
                src={movie.video}
                autoPlay
                progress
                controls
                className='video'
            />
        </div>
    )
}

export default Watch
