import './OrderDetails.css';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api/axios';

export default function OrderDetails({products}) {
    const { id } = useParams();

    const [error, setError] = useState("");

    const getProductById = (id) => {
        //console.log("products", products);
        const name =  products?.find((prod) => {
            console.log("prodid", prod.products.id);
            console.log('id', id);
            return prod.products.id == id;
        });
        return name.products.name;
    }

    useEffect(async () => {
        await axios.get(`http://localhost:3001/orders/${id}`)
            .then((res) => {
                console.log("res", res.data);
                setSingleOrder(res.data);
                //
            })
            .catch((err) => {
                setError("Failed to fetch data.");
            });
        //
    }, []);
    return (
        <div className="order-view">
            <h1 className="order-id">{`Order #${id}`}</h1>
            <div className="orderCard">
                <div className="order-info">
                    <p className="order-name">Name: {singleOrder.name}</p>
                    <p className="order-email">Email: {singleOrder.email}</p>
                    <p className="shopping-cart-stuff">Shopping Cart</p>
                    {singleOrder.order?.map((o) => {
                        //single order is a single array
                        //console.log("single", singleOrder);
                        //console.log("0",o.itemId);
                        return <p>{getProductById(o.itemId) } | 
                                Quantity: {o.quantity}</p>
                    })}
                </div>
            </div>
        </div>
    )
}