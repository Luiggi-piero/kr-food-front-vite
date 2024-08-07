import { useEffect, useState } from 'react';
import Map from '../../components/Map/Map.jsx';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList.jsx';
import PaypalButtons from '../../components/PaypalButtons/PaypalButtons.jsx';
import Title from '../../components/Title/Title.jsx';
import { getNewOrderForCurrentUser } from '../../services/orderService.js';
import classes from './paymentPage.module.css';

function PaymentPage() {

    const [order, setOrder] = useState();

    useEffect(() => {
        getNewOrderForCurrentUser().then(data => setOrder(data));
    }, []);

    if (!order) return;

    return (
        <>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title='Order Form' fontSize='1.6rem' />
                    <div className={classes.summary}>
                        <div>
                            <h3>Name: </h3>
                            <span>{order.name}</span>
                        </div>
                        <div>
                            <h3>Address: </h3>
                            <span>{order.address}</span>
                        </div>
                    </div>
                    <OrderItemsList order={order} />
                </div>

                <div className={classes.map}>
                    <Title title='Your location' fontSize='1.6rem' />
                    <Map location={order.addressLatLng} readonly={true} />
                </div>

                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <PaypalButtons order={order} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage