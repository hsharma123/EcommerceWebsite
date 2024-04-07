import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Rating } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import johnDoeImage from '../assets/Images/john-doe.jpg';
import janeSmithImage from '../assets/Images/jane-smith.jpg';
import danLangerImage from '../assets/Images/dan-langer.jpg';
import janeImage from '../assets/Images/jane.jpg';
import cuminsImage from '../assets/Images/cumins.jpg';
import smithImage from '../assets/Images/smith.jpg';

const CustomerReview = () => {
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      comment: 'Great product! I love it.',
      rating: 5,
      image: johnDoeImage,
    },
    {
      id: 2,
      name: 'Jane Smith',
      comment: 'Excellent service and fast delivery.',
      rating: 4,
      image: janeSmithImage,
    },
    {
      id: 3,
      name: 'Dan Langer',
      comment: 'Amazing service and fast delivery',
      rating: 5,
      image: danLangerImage,
    },
    {
      id: 4,
      name: 'Jane',
      comment: 'Customer service and support service are far better than others',
      rating: 3,
      image: janeImage,
    },
    {
      id: 5,
      name: 'Pat Cummins',
      comment: 'Products are amazing and awesome',
      rating: 5,
      image: cuminsImage,
    },
    {
      id: 6,
      name: 'Smith',
      comment: 'Excellent service and fast delivery.',
      rating: 4,
      image: smithImage,
    },
    // Add more reviews as needed
  ];


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
    <Box className='review-slider'>
      <Slider {...settings}>
        {reviews.map((review) => (
          <Box key={review.id} className="review">
            {review.image && <img src={review.image} alt={review.name} className='image-review'/>}
            <Typography variant="body1" paragraph>
              {review.comment}
            </Typography>
            <Rating
              name={`rating-${review.id}`}
              value={review.rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2">
              <strong>{review.name}</strong>
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CustomerReview;
