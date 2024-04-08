import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, Link as MuiLink } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <AppBar position="static" color="primary" className='sec-space footer'>
        <Toolbar>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" style={{ color: '#fff', paddingBottom: '15px' }}>Quick Links</Typography>
              <ul>
                <li>
                  <Link to="/" style={{ color: '#fff' }}>Home</Link>
                </li>
                <li>
                  <Link to="/products" style={{ color: '#fff' }}>Products</Link>
                </li>
                <li>
                  <Link to="/about" style={{ color: '#fff' }}>About Us</Link>
                </li>
              </ul>
            </Grid>

            <Grid item xs={12} sm={3} className='footer-column'>
              <Typography variant="h6" style={{ color: '#fff', paddingBottom: '15px' }}>Others Link</Typography>
              <ul>
                <li>
                  <Link to="/cart" style={{ color: '#fff' }}>Our Cart</Link>
                </li>
                <li>
                  <Link to="/wishlist" style={{ color: '#fff' }}>Wishlist</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={3} className='footer-column'>
              <Typography variant="h6" style={{ color: '#fff', paddingBottom: '15px' }}>Contact Us</Typography>
              <ul>
                <li>
                  <MuiLink component={NavLink} to="tel:9708636549" style={{ color: '#fff' }}>
                    <PhoneIcon style={{ fontSize: '16px', marginRight: '5px' }} />
                    9708636549
                  </MuiLink>
                </li>
                <li>
                  <MuiLink component={NavLink} to="mailto:himg87391@gmail.com" style={{ color: '#fff' }}>
                    <EmailIcon style={{ fontSize: '16px', marginRight: '5px' }} />
                    himg87391@gmail.com
                  </MuiLink>
                </li>
              </ul>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant="h6" style={{ color: '#fff', paddingBottom: '15px' }}>Follow Us</Typography>
              <div>
                <IconButton color="inherit" component="a" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon style={{ fontSize: '16px' }} />
                </IconButton>
                <IconButton color="inherit" component="a" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon style={{ fontSize: '16px' }} />
                </IconButton>
                <IconButton color="inherit" component="a" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon style={{ fontSize: '16px' }} />
                </IconButton>
                <IconButton color="inherit" component="a" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon style={{ fontSize: '16px' }} />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar position="static" className='bottom-footer'>
        <Toolbar>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <p style={{ color: '#fff', margin: 0 }} className='text-center'>Ecommerce ©️ 2024. All right reserved</p>
            </Grid>

           
          <Grid item xs={12} sm={6}  style={{ textAlign: 'end' }} className='text-center'>
            <p style={{ color: '#fff', margin: 0 }} className='text-center'>Developed By <Link to="https://himanshusharma-portfolio.netlify.app" className="footer-link">Himanshu Sharma</Link></p>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
