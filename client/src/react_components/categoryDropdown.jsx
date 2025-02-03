import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({category, onCategoryChange}) {
  
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
          <MenuItem value={'topToday'}>Top today</MenuItem>
          <MenuItem value={'topWeek'}>Top this week</MenuItem>
          <MenuItem value={'topMonth'}>Top this month</MenuItem>
          <MenuItem value={'topAllTime'}>Top all time</MenuItem>


        </Select>
      </FormControl>
    </Box>
  );
}