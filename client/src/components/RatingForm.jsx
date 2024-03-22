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
        0.5: 'Oanvändbar-',
        1: 'Oanvändbar',
        1.5: 'Dålig-',
        2: 'Dålig',
        2.5: 'Okej',
        3: 'Okej+',
        3.5: 'Bra',
        4: 'Bra+',
        4.5: 'Utmärkt',
        5: 'Utmärkt+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <Box>
        <form>
            <h3>Betygsättning</h3>
            <Box sx={{ pb: 3}} >
            <Rating
                name="hover-feedback"
                value={ratingData.rating}
                precision={0.5}
                size='large'
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
            </Box>
            <Button variant="contained"  color='primary' sx={{ paddingInline: 3 }}  onClick={()=> onSave(ratingData)}>Skicka betyg</Button>
        </form>
        </Box>
    );
}

export default RatingForm;

// alternativ om hur man ska skicka data till databasen.
{/* <button type="button" onClick={() => yourSubmitFunction(ratingData)}>Skicka rating</button> */}
