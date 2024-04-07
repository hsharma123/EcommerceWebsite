import React, { useState, useEffect } from 'react';
import useApiData from '../customhooks/useApiData';
import { Box, Grid } from '@mui/material';
import CategoryFilter from '../components/CategoryFilter';
import Productlist from '../components/Productlist';
import PriceRangeFilter from '../components/PriceRangeFilter';

const ProductPage = () => {
  const { products, error, loading } = useApiData('https://dummyjson.com/products');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]); // Initial price range

  useEffect(() => {
    if (products.length > 0) {
      setSelectedCategory('All');
    }
  }, [products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Box className="section-space">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <CategoryFilter uniqueProducts={products} onCategoryChange={handleCategoryChange} />
          <PriceRangeFilter onPriceRangeChange={handlePriceRangeChange} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Productlist selectedCategory={selectedCategory} products={products} priceRange={priceRange} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
