import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useEffect } from "react";
import { useLoading } from "../../hooks/useLoading.jsx";
import { useCart } from "../../hooks/useCart.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { pay } from "../../services/orderService.js";

function PaypalButtons({ order }) {
    // clientId: id del cliente que recibe el pago
    return (
        <PayPalScriptProvider options={{
            clientId: 'AUBI6XRDErKJVNAxsluTPuJuO2R5kaKIETNyb62lyBYPL2hWmX-1fIgB2I-kf5cuqwresI2stS4nedBa'
        }}>
            <Buttons order={order} />
        </PayPalScriptProvider>
    )
};

function Buttons({ order }) {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const [{ isPending }] = usePayPalScriptReducer();
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        isPending ? showLoading() : hideLoading();
    });

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: order.totalPrice
                    }
                }
            ]
        })
    };

    const onApprove = async (data, actions) => {
        try {
            const payment = await actions.order.capture(); // Captura el pago de la orden
            const orderId = await pay(payment.id);
            clearCart();
            toast.success('Payment saved successfully', 'Success');
            navigate('/track/' + orderId);
        } catch (error) {
            console.log(error);
            toast.error('Payment save failed', 'Error');
        }
    };

    const onError = err => {
        console.log(err);
        toast.error('Payment failed', 'Error');
    };

    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
        />
    )

}

export default PaypalButtons;