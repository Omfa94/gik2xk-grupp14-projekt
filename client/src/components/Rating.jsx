import { Box, Container, Typography } from "@mui/material";

function Rating({rating}) {
    const formattedDate = new Intl.DateTimeFormat('sv-SE', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    }).format(new Date(rating.createdAt));

    return (
        <>
        <Container>
        {/* <Typography variant="h3">Betyg</Typography> */}

        <Box display="flex" flexWrap="wrap">
            <Typography>
            <h4>Betyg: {rating.rating}</h4>
            Skrivet den: {formattedDate} av{" "}
            {rating.author}
            </Typography>
            </Box>
            </Container>
        </>
    );
}

export default Rating;