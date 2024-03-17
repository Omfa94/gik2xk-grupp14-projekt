import ProductItemLarge from "../components/ProductItemLarge";
import RatingForm from "../components/RatingForm";
import CustomRating from "../components/Rating";
import {Button,} from "@mui/material";
import {useNavigate} from "react-router-dom";

function ProductDetail() {
    const product= {
        "id": 3,
        "title": "En fin Volvo som är BMW",
        "description": "Om du kör den så kommer du tycka att du flyger.",
        "price": 1000,
        "imageUrl": "http://dimo.com",
        "createdAt": "2024-03-16T22:05:38.000Z",
        "updatedAt": "2024-03-16T22:05:38.000Z",
        "ratings": [
            {
                "rating": 5,
                "author": "Dimo Faroughi",
                "createdAt": "2024-03-16T22:07:36.000Z"
            }
        ]
    };

    const navigate=useNavigate();

    return (<div>
    <ProductItemLarge product={product}/>
    <Button onClick={()=>navigate(-1)}>Tillbaka</Button>
    <Button onClick={()=>navigate(`/products/${product.id}/edit`)}>Ändra</Button>
    <Button>Lägg till varokorg</Button>
    <RatingForm/>
    {product.ratings && product.ratings.map((rating,i)=> <CustomRating key={`rating_${i}`} rating={rating}/>)}
    </div>);
}

export default ProductDetail;