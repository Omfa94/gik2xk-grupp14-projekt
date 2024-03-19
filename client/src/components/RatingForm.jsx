import React, { useState } from 'react';
import { Box, Button, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function RatingForm({onSave}) {
    // Anta att vi vill inkludera både en rating och userId i state
    const [ratingData, setRatingData] = useState({
        userId: 1 ,// Behåller userId
        rating: 0
    });
    const [hover, setHover] = useState(-1);

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <Box>
        <form>
            <h3>RatingForm</h3>
            <Rating
                name="hover-feedback"
                value={ratingData.rating}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(_event, newValue) => {
                    setRatingData(prev => ({ ...prev, rating: newValue }));
                }}
                onChangeActive={(_event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {ratingData.rating !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : ratingData.rating]}</Box>
            )}
            <Button onClick={()=> onSave(ratingData)}>Skicka Feedback</Button>
        </form>
        </Box>
    );
}

export default RatingForm;

// alternativ om hur man ska skicka data till databasen.
{/* <button type="button" onClick={() => yourSubmitFunction(ratingData)}>Skicka rating</button> */}
