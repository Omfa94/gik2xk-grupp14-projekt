import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOne } from "../sevices/ProductService";

function ProductEdit() {
    const {id}= useParams();

    const [product,setproduct]=useState(null);
    
    useEffect(()=>{
        if(id){
            getOne(id).then((product)=>setproduct(product));
        }else{
            setproduct(null);
        }
        
    },[id]);

    console.log(product)

    return ( <h2>ProductEdit</h2> );
}

export default ProductEdit;