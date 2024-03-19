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
            <h4>{rating.rating}</h4>
            <p>Skrivet den: {formattedDate}</p>
            <p>Skrivet av: {rating.author}</p>
        </>
    );
}

export default Rating;