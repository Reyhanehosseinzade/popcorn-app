import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  onSetRating: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.string,
  
};
export default function StarRating({
  maxRating = 5,
  color = "orange",
  size = 40,
  onSetRating,
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    if (onSetRating) {
        onSetRating(rating);
    }
  
  }
  return (
    <div className="flex items-center gap-1">
      <div className="flex ">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <div style={{ color: color, fontSize: size / 2 }}>
        {tempRating || rating || ""}
      </div>
    </div>
  );
}
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  return (
    <span
      role="button"
      onClick={onRate}
      style={{ fontSize: size + "px" }}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? <FaStar color={color} /> : <FaRegStar color={color} />}
    </span>
  );
}
