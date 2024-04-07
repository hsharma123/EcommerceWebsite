import React, { useState } from 'react';
import { useCombinedContext } from '../cartcontext/CombinedContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  styled,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import theme from '../style/theme';

const drawerWidth = 300;

const DrawerContainer = styled('div')(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerPaper = styled('div')({
  width: drawerWidth,
});

const Header = () => {
  const { cartItems, wishlistItems, wishlistCount } = useCombinedContext();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
 
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Products', link: '/products' },
    { text: 'About Us', link: '/about' },
    { text: 'Best Seller', link: '/best-seller' },
  ];

  return (
    <AppBar position='sticky' className='navbar'>
      <Toolbar className='main-header'>
        <Typography variant='h6' component={Link} style={{ color: theme.palette.primary.main }} to='/'>
          Ecommerce App
        </Typography>
        <div style={{ margin: 'auto', display: 'flex', columnGap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Hidden mdDown>
            {menuItems.map((item) => (
              <Typography
                key={item.text}
                variant='body2'
                className='navlink'
                component={NavLink}
                to={item.link}
              >
                {item.text}
              </Typography>
            ))}
          </Hidden>
          <div className='dp-view' >
              <ul style={{ display: 'flex', columnGap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                <li>
                  <Link to="/wishlist">
                    <Badge badgeContent={wishlistCount} color="primary" showZero>
                      <FavoriteBorderIcon className='header-icon' />
                    </Badge>
                  </Link>
                </li>
                <li>
                  <Link to="/cart" style={{marginRight: '30px'}}>
                    <Badge badgeContent={cartItems.length} color="primary" showZero>
                      <AddShoppingCartIcon className='header-icon' />
                    </Badge>
                  </Link>
                </li>
              </ul>
            </div>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              aria-label="menu"
              edge="end"
              onClick={toggleDrawer(true)}
              style={{ color: theme.palette.primary.main, marginRight: '0', border: '1px solid #1976d2', borderRadius: '5px' }}
            >
              <MenuIcon />
            </IconButton>
          
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
              container={() => document.body}
              ModalProps={{
                keepMounted: true,
              }}
              style={{ width: drawerWidth }}
            >
              <DrawerContainer>
                <div className="d-flex">
                  <Typography variant='h6' component={Link} style={{ color: theme.palette.primary.main, padding:'30px 15px 0' }} to='/'>
                      Ecommerce App
                 </Typography>
                  <IconButton 
                    color="inherit" 
                    aria-label="close"
                    edge="end"
                    onClick={toggleDrawer(false)}
                    style={{ position: 'absolute', right: '15px', top: '0' }} // Position close icon
                  >
                    <CloseIcon />
                  </IconButton>
                </div> 
                <List>
                  {menuItems.map((item) => (
                    <ListItem
                      button
                      key={item.text}
                      component={NavLink}
                      to={item.link}
                      onClick={toggleDrawer(false)}
                      style={{ minWidth: '200px' }}
                    >
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                  <ListItem
                    button
                    component={NavLink}
                    to='/signup'
                    onClick={toggleDrawer(false)}
                    style={{ minWidth: '200px' }}
                  >
                    <ListItemText primary='Signup' />
                  </ListItem>
                  <ListItem
                    button
                    component={NavLink}
                    to='/login'
                    onClick={toggleDrawer(false)}
                    style={{ minWidth: '200px' }}
                  >
                    <ListItemText primary='Login' />
                  </ListItem>
                </List>
              </DrawerContainer>
            </Drawer>
          </Hidden>
        </div>
        <div style={{ display: 'flex', columnGap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <ul className='mb-view' style={{ display: 'flex', columnGap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <li>
              <Link to="/wishlist">
                <Badge badgeContent={wishlistCount} color="primary" showZero>
                  <FavoriteBorderIcon className='header-icon' />
                </Badge>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <Badge badgeContent={cartItems.length} color="primary" showZero>
                  <AddShoppingCartIcon className='header-icon' />
                </Badge>
              </Link>
            </li>
          </ul>
          <Button variant="outlined" className='btn btn-primary mb-view'  component={NavLink} to='/signup'>
            Signup
          </Button>
          <Button variant='outlined' className='btn btn-primary mb-view'  component={NavLink} to='/login'>
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
