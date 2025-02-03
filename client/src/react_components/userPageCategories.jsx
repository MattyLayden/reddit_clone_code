import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function CategorySelect({category, onCategoryChange}) {
  
    // input of the category state and setting of state. Lifted into the parent component
    // and passed through.

  const handleChange = (event) => {
    onCategoryChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Sort by:</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={category}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value={'new'}>New</MenuItem>
          <MenuItem value={'top'}>Top</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}


export function TypeSelect({type, onTypeChange}) {
  
    // input of the category state and setting of state. Lifted into the parent component
    // and passed through.

  const handleChange = (event) => {
    onTypeChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Type of post:</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={type}
          label="Type of post"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'posts'}>Posts</MenuItem>
          <MenuItem value={'comments'}>Comments</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}

