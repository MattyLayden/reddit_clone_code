

import React from 'react';
import { AppBar, Toolbar, Stack} from '@mui/material';
import HomeButton from './homeButtonNavBar'
import AutocompleteHome from './searchBarHome'; 
import RHSButtons from './RHS_buttons';

import '../css/navbar.css'


export default function NavBar(){


  return(
    <AppBar className="appbar"
    sx={{ backgroundColor: '#383a3b', color: '#95999c' }
    }>
      <Toolbar>
        
        <HomeButton/>

        
        <Stack spacing={2} sx={{ flexGrow: 1, mx: 2 }}>
          <AutocompleteHome/>
        </Stack>

        <RHSButtons/>

      </Toolbar>
    </AppBar>
    
  )
}



