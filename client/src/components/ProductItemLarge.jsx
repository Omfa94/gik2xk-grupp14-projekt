
function ProductItemLarge({product}) {
    const creationDate = new Date(product.createdAt);
    const formattedDate = creationDate.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return ( 
    <div>
        <h3>{product.title}</h3>
        <div>
            <p>Produkten skapades den:{formattedDate}</p>
        </div>
        <p>{product.description}</p>
        <div>{product.price}SEK</div>
        <img src={product.imageUrl} height="200"  alt="Bild på produkten" />
    </div> );
}

export default ProductItemLarge;