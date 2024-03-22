import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const StarRating = ({ rating, totalRatings, averageRating, onChange, disabled }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    if (!disabled) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  const handleClick = (index) => {
    if (!disabled) {
      onChange(index);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className="fa fa-star"
          style={{ color: (index <= (hoverRating || rating)) ? 'yellow' : 'gray', cursor: disabled ? 'default' : 'pointer' }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => handleClick(index)}
        ></span>
      ))}
      <span>({totalRatings} ratings, Average: {averageRating})</span>
    </div>
  );
};

export default StarRating;
