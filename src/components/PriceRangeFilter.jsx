import React, { useState } from 'react';
import { Typography, Slider, Box } from '@mui/material';

const PriceRangeFilter = ({ onPriceRangeChange }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]); 

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    onPriceRangeChange(newValue);
  };

  return (
    <div className="price-range-filter" >
      <Typography variant="h6" style={{marginBottom:'15px'}}>Price Range</Typography>
      <Box sx={{ width: 220 }}>
        <Slider  className='slider-range' 
            value={priceRange}
            onChange={handlePriceRangeChange}
            defaultValue={50}
            min={0}
                  max={10000}
                
            valueLabelDisplay="auto"
                  aria-label="Price range"
                  
                  sx={{
                    color: '#000',
                    '& .MuiSlider-thumb': {
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: 'none',
                      },
                    }
                  }}
        />
      </Box>
    </div>
  );
};

export default PriceRangeFilter;
