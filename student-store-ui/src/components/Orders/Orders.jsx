import './Orders.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Orders({ orders }) {
    console.log("orders", orders);
    return (
        <div className="order-table">
            <h1 className="order-title">Orders</h1>
            <div className="header-row">
                <span className="flex-2">Name</span>
                <span className="center">Email</span>
                <span className="center">Total</span>
            </div>
            {orders?.map((order) => {
                if (order.purchase.name != "" || order.purchase.name != null) {
                    return <OrderRow id={order.purchase.id} name={order.purchase.name} email={order.purchase.email} total={order.purchase.total} />
                }
            })}
        </div>
    )
}

export function OrderRow({ id, name, email, total}) {
    const navigate = useNavigate();
    function handleRowClick() {
        navigate(`/orders/${id}`);
    }

    return (
        <div className="order-row" onClick={handleRowClick}>
            <span className="flex-2 order-name">{name}</span>
            <span className="center order-email">{email}</span>
            <span className="center order-total">{total}</span>
            {/* <button className="details">Details</button> */}
        </div>
    )
}