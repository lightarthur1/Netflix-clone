import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';


const TitleCards = ({ title, category }) => {

  const cardsRef = useRef(null);
  const [apiData, setApiData] = useState([]);

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY + event.deltaX;
    }
  };

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzA0ZDEyYzcwYzFhZWI4Yjc2Y2NmYTA0NWEzNzIyMSIsIm5iZiI6MTc2MTQyOTk0NS4yMzIsInN1YiI6IjY4ZmQ0OWI5MmNiMjFmOTMwYWJiZWY4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xixB6JLAXWQi1xjO6YF1tWXCyGm3zwiocKt33uh10-k'
  }
};

  useEffect(() => {

fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


    const ref = cardsRef.current;
    if (!ref) return;

    const handleMouseEnter = () => {
   
      window.addEventListener('wheel', handleWheel, { passive: false });
    };

    const handleMouseLeave = () => {
     
      window.removeEventListener('wheel', handleWheel);
    };

    
    ref.addEventListener('mouseenter', handleMouseEnter);
    ref.addEventListener('mouseleave', handleMouseLeave);

  
    return () => {
      ref.removeEventListener('mouseenter', handleMouseEnter);
      ref.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.title} />
            <p>{card.title}</p>
          </Link>;
        }
        )}
      </div>
    </div>
  );
};

export default TitleCards;
