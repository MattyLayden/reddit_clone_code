import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SubredditContext = createContext();

// Provider component
export const SubredditProvider = ({ children }) => {
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    async function alphabeticalSubreddits(){
        try {
            const response = await axios.get(`/api/subreddit/searchbar`);
            setSubreddits(response.data)
          } catch (error) {
            console.log(`Error obtaining subreddits: ${error}`);
          }
        }
        alphabeticalSubreddits();
  }, []);

  return (
    <SubredditContext.Provider value={subreddits}>
      {children}
    </SubredditContext.Provider>
  );
};
 

export const useSubreddits = () => useContext(SubredditContext);
