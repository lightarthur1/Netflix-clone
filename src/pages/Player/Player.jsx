import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'

const Player = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    type: "",
    published_at: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzA0ZDEyYzcwYzFhZWI4Yjc2Y2NmYTA0NWEzNzIyMSIsIm5iZiI6MTc2MTQyOTk0NS4yMzIsInN1YiI6IjY4ZmQ0OWI5MmNiMjFmOTMwYWJiZWY4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xixB6JLAXWQi1xjO6YF1tWXCyGm3zwiocKt33uh10-k'
  }
};

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
})

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate('/')}}/>
      <iframe 
      width='90%'
      height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}` }
      title='trailer'
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      frameBorder="0"
      ></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.split('T')[0]}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player