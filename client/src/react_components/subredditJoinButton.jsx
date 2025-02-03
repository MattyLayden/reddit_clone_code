
// if user is subscribed  - > button will display (you are subscribed, hover over 
// = change to unsubscribe)


// if user is not subscribed, the button will display join, and this will post a subscribe
// this will then change to "you are subscribed"


// input is the state userSubscribed. userSubscribed ? (then text says unsubscribe) : (text says join)

import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

import '../css/sub-join-button.css';

export default function SubredditJoinButton({ userSubscribed, subredditName, onSubscriptionChange, token }) {
    
    async function handleClick() {
        try {
            if (userSubscribed) {
                const response = await axios.post(
                    `/api/user/${subredditName}/unsubscribe`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (response.status === 200) {
                    onSubscriptionChange(false);
                    console.log(response.data);
                } else if (response.status === 401) {
                    console.log(response.data);
                }
            } else {
                const response = await axios.post(
                    `/api/user/${subredditName}/subscribe`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (response.status === 200) {
                    onSubscriptionChange(true);
                    console.log(response.data);
                } else if (response.status === 401) {
                    console.log(response.data);
                }
            }
        } catch (error) {
            console.log('Error subscribing/unsubscribing:', error);
        }
    }

    return (
        <Button
            variant="contained"
            className="button-join"
            onClick={handleClick}
        >
            {userSubscribed ? 'Unsubscribe' : 'Join Subreddit'}
        </Button>
    );
}



