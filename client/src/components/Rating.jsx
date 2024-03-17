function Rating({rating}) {
    return ( 
        <>
        <h4>{rating.rating}</h4>
        <p>Skrivet den: {rating.createdAt}</p>
        <p>Skrivet av: {rating.author}</p>
        </>
    );
}

export default Rating;