import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Stack, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSubreddits } from '../context/subredditContext.js';

import '../css/autocomplete-home.css'

export default function AutocompleteHome() {
  const [inputValue, setInputValue] = useState(''); 
  const [filteredSubreddits, setFilteredSubreddits] = useState([]); 

  const navigate = useNavigate();
  
  const alphabeticalSubs = useSubreddits();

  
  useEffect(() => {
    const filtered = alphabeticalSubs.filter(subreddit =>
      subreddit.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSubreddits(filtered); 
  }, [inputValue, alphabeticalSubs]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue); 
  };

  const handleOptionChange = (event, newValue) => {
    if (newValue) {
      navigate(`/subreddit/${newValue.name}`);
    } else if (inputValue) {
      navigate(`/search/${inputValue}`);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 500 }}>
      <Autocomplete
        id="searchbar_autocomplete"
        options={filteredSubreddits} 
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleOptionChange}
        renderOption={(props, option) => (
          <ListItem {...props}>
            <ListItemIcon>
              <Avatar
                src={option.icon}
                alt={option.name}
                sx={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            <ListItemText primary={option.name} />
          </ListItem>
        )}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}
