import React, { useEffect, useState } from 'react';

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


////////////////////////////////////////////////////////////////////////////

const path = require('path')

const subredditFunctionsPath = path.join(__dirname, '../../backend/fetch_functions/subredditPageFetchFunctions')

const {allSubredditsAlphabetical} = require(subredditFunctionsPath)



function imageUploadForm(){


    const [subreddits, setSubreddits] = useState('')
    const [selectedSubreddit, setSelectedSubreddit] = useState('')

    useEffect(() => {
        const fetchData = async() => {
            try{
                const subreddits = await allSubredditsAlphabetical()
                setSubreddits(subreddits)
                console.log(`Succesfully set alphabetical subreddit state.`)
            }catch(error){
                console.log(`Error retrieving subreddits for dropdown ${error}`)
            }
        }

        fetchData()

    }, [])





const handleSubredditChange = (subreddit) => {
    setSelectedSubreddit(subreddit);
  };


    return (
        <div>
        <SubredditSelect 
            subreddits={subreddits} 
            selectedSubreddit={selectedSubreddit}
            onSubredditChange={handleSubredditChange} 
        />
        
        <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}


////////////////////////////////////////////////////////////////////////////



// example of a subreddit 
// const subreddits = [
//  {name: 'World News', icon: 'https://s3.amazonaws.com/WorldNews/logo' }]



export default function subredditSelect(subreddits, selectedSubreddit, onSubredditChange) {

    



    // ensure that the selected subreddit does in fact exist
    

    function handleChange(event, newValue){
        onSubredditChange(newValue)
    }

  return (
    <Autocomplete
      id="subredditDropdown"
      sx={{ width: 300 }}
      // options = subreddits
      options={subreddits}
      value={selectedSubreddit}
      onchange={handleChange}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              src={option.icon}
              alt= ""
            />
            {option.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a subreddit"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', 
            },
          }}
        />
      )}
    />
  );
}

