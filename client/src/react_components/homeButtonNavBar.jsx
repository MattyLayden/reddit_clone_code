import React from 'react';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function HomeButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');  
  };

  return (
    <IconButton onClick={handleClick} color='inherit'
    sx={{ 
      width: 48, 
      height: 48,
    }}
    >
      <HomeIcon />
    </IconButton>
  );
}

