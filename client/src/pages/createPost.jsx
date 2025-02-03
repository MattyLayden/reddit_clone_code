import React, { useState } from 'react';
import { ButtonGroup, Button } from '@mui/material';  
import '../css/create-post.css';

import CreateTextPost from '../react_components/createStringPost';
import CreatePhotoPost from '../react_components/createPhotoPost';
import CreateArticlePost from '../react_components/createArticlePost';


function BasicButtonGroup({ onSelectComponent, selectedButton }) {
    return (
        <ButtonGroup variant="contained" aria-label="Basic button group" className='button-group'>
            <Button 
                className={`custom-button ${selectedButton === 'text' ? 'selected' : ''}`}
                onClick={() => onSelectComponent('text')}
            >
                Text
            </Button>
            <Button 
                className={`custom-button ${selectedButton === 'photo' ? 'selected' : ''}`}
                onClick={() => onSelectComponent('photo')}
            >
                Photo
            </Button>
            <Button 
                className={`custom-button ${selectedButton === 'article' ? 'selected' : ''}`}
                onClick={() => onSelectComponent('article')}
            >
                Article
            </Button>
        </ButtonGroup>
    );
}

export default function CreatePostPage() {
    
    const [currentCreatePost, setCurrentCreatePost] = useState('text');

    const token = localStorage.getItem('jwtToken')
    
    const handleSelectComponent = (componentType) => {
        setCurrentCreatePost(componentType);
    };

    return (
        <div className="create-post-page">
            
            <BasicButtonGroup 
                selectedButton={currentCreatePost} 
                onSelectComponent={handleSelectComponent} 
            />

            <div className="component-container">
                {currentCreatePost === 'text' && <CreateTextPost />}
                {currentCreatePost === 'photo' && <CreatePhotoPost />}
                {currentCreatePost === 'article' && <CreateArticlePost />}
            </div>
        </div>
    );
}
