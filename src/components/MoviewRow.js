import React, { useState } from 'react';
import './MovieRow.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function MoviewRow({ title, items }) {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };


  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = items.results.length * 150;
    if ((window.innerWidth - listWidth) > x) {
      x = (window.innerWidth - listWidth) - 80;
    }
    setScrollX(x);
  };


  return (
    <div>
      {items.results.length > 0 &&
        <div className="movieRow">
          <h2>{title}</h2>
          <div className="movieRow--left" onClick={handleLeftArrow}>
            <KeyboardArrowLeftIcon style={{ fontSize: 50 }} />
          </div>
          <div className="movieRow--right" onClick={handleRightArrow}>
            <KeyboardArrowRightIcon style={{ fontSize: 50 }} />
          </div>
          <div className="movieRow--listarea">
            <div className="movieRow--list" style={{ width: items.results.length * 150, marginLeft: scrollX }}>
              {items.results.map((item, key) => (
                <div key={key} className="movieRow--item">
                  <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                </div>
              ))}
            </div>
          </div>
        </div>}
    </div>
  );
}

export default MoviewRow;
