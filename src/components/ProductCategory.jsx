import React from 'react';
import useApiData from '../customhooks/useApiData';
import { Skeleton, Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductCategory = () => {
  const { products, error, loading } = useApiData('https://dummyjson.com/products');

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (error) {
    return <Typography variant="body2">Error: {error.message}</Typography>;
  }

  const uniqueCategories = new Set();
  const uniqueProducts = products.filter((item) => {
    if (!uniqueCategories.has(item.category)) {
      uniqueCategories.add(item.category);
      return true;
    }
    return false;
  });

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
            arrows:false,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
              arrows: false,
              dots: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
              arrows: false,
              dots: true,
          }
          }
    ]
  };

  return (
    <Box>
      <Slider {...settings}>
        {Array.isArray(uniqueProducts) &&
          uniqueProducts.map((item, index) => (
            <div key={index}>
              {item.images && item.images[0] && (
                <img
                  src={item.images[0]}
                  alt=''
                  width='100%' style={{height: '200px'}}
                />
              )}
              <Typography variant='body2' align='center' style={{marginTop: '10px'}}>
                <b>{item.category}</b>
              </Typography>
            </div>
          ))}
      </Slider>
    </Box>
  );
};

export default ProductCategory;
