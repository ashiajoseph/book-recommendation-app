import { useState } from 'react';
import { Box } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

interface StarRatingProps {
  value: number; // Current rating (0-5)
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

const StarRating = ({
  value,
  onChange,
  readOnly = false,
  size = 'medium',
}: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState<number>(0);

  const displayValue = hoverValue || value;
  const iconSize = {
    small: 24,
    medium: 32,
    large: 40,
  }[size];

  const handleClick = (rating: number) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readOnly) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          cursor: readOnly ? 'default' : 'pointer',
        }}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <Box
            key={rating}
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': readOnly ? {} : {
                transform: 'scale(1.2)',
              },
            }}
          >
            {rating <= displayValue ? (
              <Star
                sx={{
                  fontSize: iconSize,
                  color: '#ffc107',
                }}
              />
            ) : (
              <StarBorder
                sx={{
                  fontSize: iconSize,
                  color: '#ffc107',
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StarRating;
