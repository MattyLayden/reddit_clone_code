import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Notifications as NotificationsIcon, AddCircle as AddCircleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NotifDropdown from './notifDropdown';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../context/userContext';

import LogoutIcon from '@mui/icons-material/Logout';

import axios from 'axios'

import '../css/rhs-buttons.css'; 

import { useState, useRef } from 'react';

export default function RHSButtons() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [notifications, setNotifications] = useState([]); 
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notifLoginMessage, setNotifLoginMessage] = useState(null)


  const navigate = useNavigate();
  const { isAuthenticated, username, icon, logout } = useAuth();
  
  const anchorRefNotifications = useRef(null);
  const anchorRefSettings = useRef(null);

  const fetchNotifications = async () => {
    setNotificationsLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      if(token){
        const response = await axios.get(`/api/comment/notifbell`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setNotifications(response.data);
        console.log('Fetched notifications:', response.data);
        setNotifLoginMessage(false)
      }else{
        setNotifLoginMessage(true)
      }
      
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setNotificationsLoading(false);
    }
  };

  const createPostHandleClick = () => {

    {isAuthenticated ? navigate('/create-post') : navigate('/login') }
    
  };

  const handleLogin = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    if(logout){
      logout()
      navigate('/')
    }

  }

  const handleProfileClick = () => {
    navigate(`/user/${username}`)
  }

  const handleToggleNotifications = () => {
    setOpenNotifications((prevOpen) => {
      if (!prevOpen) {
        fetchNotifications(); 
      }
      return !prevOpen;
    });
  };

  const handleToggleSettings = () => {
    setOpenSettings((prevOpen) => !prevOpen);
  };

  const handleSeeAll = () => {
    navigate('/notifications');
  };

  const handleClose = () => {

    setOpenNotifications(false);
    setOpenSettings(false);
  };

  return (
    <Stack direction="row" className="button-stack" spacing={2} sx={{ padding: '10px' }}>
      <Button
        onClick={createPostHandleClick}
        className="button"
        alt="Create post"
      >
        <AddCircleIcon />
      </Button>

      <Button
        ref={anchorRefNotifications}
        className="button"
        onClick={handleToggleNotifications}
      >
        <NotificationsIcon />
      </Button>

      <Popper
        open={openNotifications}
        anchorEl={anchorRefNotifications.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper className="dropdown-paper">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openNotifications} id="notifications-menu"> 
                  {notificationsLoading ? ( 
                    <MenuItem>
                      <CircularProgress size={24} />
                    </MenuItem>
                  ) : notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <NotifDropdown key={index} notification={notification} handleClose={handleClose} />
                    ))
                  ) : (
                    <MenuItem>No notifications</MenuItem>
                  )}
                  <MenuItem onClick={handleSeeAll} sx={{ justifyContent: 'center' }}>
                      See All
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {isAuthenticated ? (
        <>
          <Button
  ref={anchorRefSettings} 
  className="button"
  onClick={handleToggleSettings} 
>
  <img 
    src={icon}
    alt="User Icon"
    style={{
      borderRadius: '50%',
      width: '32px',
      height: '32px',
    }}
  />
</Button>

<Popper
  open={openSettings} 
  anchorEl={anchorRefSettings.current} 
  role={undefined}
  placement="bottom-start"
  transition
  disablePortal
>
  {({ TransitionProps, placement }) => (
    <Grow
      {...TransitionProps}
      style={{
        transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
      }}
    >
      <Paper className="dropdown-paper">
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList autoFocusItem={openSettings} id="settings-menu">
            <MenuItem onClick={handleLogout}>
              <LogoutIcon style={{ marginRight: '8px' }} />
              Logout
            </MenuItem>
            <MenuItem onClick={handleProfileClick}>
              View Profile
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Paper>
    </Grow>
  )}
</Popper>
        </>
      ) : (
        <Button className="login" onClick={handleLogin}>
          Login
        </Button>
      )}
    </Stack>
  );
}
