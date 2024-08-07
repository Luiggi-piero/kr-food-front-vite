import { Link, useParams } from 'react-router-dom';
import classes from './orderTrackPage.module.css';
import { useEffect, useState } from 'react';
import { getAllStatus, trackOrderById, updateStatus } from '../../services/orderService.js';
import NotFound from '../../components/NotFound/NotFound.jsx';
import DateTime from '../../components/DateTime/DateTime.jsx';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList.jsx';
import Title from '../../components/Title/Title.jsx';
import Map from '../../components/Map/Map.jsx';
import { useAuth } from '../../hooks/useAuth.jsx';
import { toast } from 'react-toastify';

function OrderTrackPage() {

    const { orderId } = useParams();
    const [order, setOrder] = useState();
    const [status, setStatus] = useState([])
    const { user } = useAuth();

    useEffect(() => {
        getAllStatus()
            .then(status => setStatus(status))
            .catch(e => console.log(e))

        orderId &&
            trackOrderById(orderId)
                .then(order => { setOrder(order) })
                .catch(() => setOrder(null))
    }, []);

    const changeStatus = async (newState) => {
        const updatedOrder = { ...order, status: newState }
        await updateStatus(updatedOrder)
            .then(uOrder => {
                setOrder(uOrder);
                toast.success('Order updated successfully');
            })
            .catch(e => console.log(e));
    }

    if (!orderId || !order) {
        return <NotFound message='Order not found' linkText='Go to home page' />
    }

    return (
        order &&
        <div className={classes.container}>
            <div className={classes.content}>
                <h1>Order #{order.id}</h1>
                <div className={classes.header}>
                    <div>
                        <strong>Date</strong>
                        <DateTime date={order.createdAt} />
                    </div>

                    <div>
                        <strong>Name</strong>
                        {order.name}
                    </div>
                    <div>
                        <strong>Address</strong>
                        {order.address}
                    </div>
                    {
                        !user.isAdmin && (
                            <div>
                                <strong>State</strong>
                                {order.status}
                            </div>
                        )
                    }
                    {
                        user.isAdmin && (
                            <div className={classes.container_select}>
                                <strong>State</strong>
                                <select
                                    value={order.status}
                                    onChange={(e) => changeStatus(e.target.value)}
                                >
                                    {
                                        status.length > 0 && (
                                            status.map(s => <option key={s}>{s}</option>)
                                        )
                                    }
                                </select>
                            </div>
                        )
                    }

                    {
                        order.paymentId && (
                            <div>
                                <strong>Payment ID</strong>
                                {order.paymentId}
                            </div>
                        )
                    }
                </div>

                <OrderItemsList order={order} />
            </div>

            <div className={
                !(order.status === 'NEW' && (!user.isAdmin || order.user === user.id)) ? classes.container_map : ''
            }>
                <Title title='Your location' fontSize='1.6rem' />
                <Map location={order.addressLatLng} readonly={true} />
            </div>

            {
                // order.status === 'NEW' && (
                (order.status === 'NEW' && (!user.isAdmin || order.user === user.id)) && (
                    <div className={classes.payment}>
                        <Link to='/payment'>Go to payment</Link>
                    </div>
                )
            }
        </div>
    )
}

export default OrderTrackPage