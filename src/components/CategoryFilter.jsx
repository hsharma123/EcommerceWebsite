import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Checkbox, Slider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CategoryFilter = ({ uniqueProducts, onCategoryChange }) => {
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); 


  useEffect(() => {
    if (uniqueProducts && uniqueProducts.length > 0) {
      const uniqueCategoriesSet = new Set(['All', ...uniqueProducts.map(item => item.category)]); 
      setUniqueCategories(Array.from(uniqueCategoriesSet));
      setSelectedCategory('All'); 
    }
  }, [uniqueProducts]);

  const handleCheckboxChange = (category) => {
    setSelectedCategory(category === selectedCategory ? 'All' : category);
    onCategoryChange(category === selectedCategory ? 'All' : category);
  };

  if (!uniqueProducts || uniqueProducts.length === 0) {
    return null;
  }

  return (
    <Box>
      <Accordion defaultExpanded className='bx-shadow'>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header" style={{marginTop:'0px'}}
        >
          <Typography variant="h6"><b>Category</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            {uniqueCategories.map((category, index) => (
              <li key={index}>
                <Checkbox
                  checked={selectedCategory === category}
                  onChange={() => handleCheckboxChange(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
     
    </Box>
  );
};

export default CategoryFilter;
