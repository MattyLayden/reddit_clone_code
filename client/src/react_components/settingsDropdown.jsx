import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';



import {useNavigate } from 'react-router-dom';

import { useAuth } from '../context/userContext';

//view profile (icon and username)
//settings
// log out

export default function SettingsDropdown() {

  const navigate = useNavigate()

  const {isAuthenticated, username, icon, logout} = useAuth();
  
  const handleLogoutClick = () => {
    logout();
  }

  return (
    
    <Paper className='dropdown-paper'>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
          <img
              src={icon}
              alt={`User Icon missing.`}
              style={{ width: 24, height: 24, borderRadius: '50%' }}
            />
          </ListItemIcon>
          <ListItemText>Hello, {username}</ListItemText>
          <ListItemText>View profile</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={handleLogoutClick}>Log out</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
