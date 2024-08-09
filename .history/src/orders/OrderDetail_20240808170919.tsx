import { useEffect, useState } from "react";
import FormAcceptButton from "../system/components/FormAcceptButton";
import FormButtonBar from "../system/components/FormButtonBar";
import FormLabel from "../system/components/FormLabel";
import FormTitle from "../system/components/FormTitle";
import { useErrorHandler } from "../system/utils/ErrorHandler";
import { DefaultProps } from "../system/utils/Tools";
import AddPayment from "./AddPayment";
import { getOrder, IOrder, IPayment } from "./OrdersApi";

interface OrderDetailProps extends DefaultProps {
    orderId?: string;
}

export default function OrderDetail(props: OrderDetailProps) {
    const [time, setTime] = useState(new Date().getTime())
    const [order, setOrder] = useState<IOrder>()
    const [payment, setPayment] = useState<IPayment>()

    const errorHandler = useErrorHandler()

    const cancelPayment = () => {
        setPayment(undefined);
    }

    useEffect(() => {
        try {
            if (!props.orderId) {
                return
            }
            getOrder(props.orderId).then((orderResult) => {
                setOrder(orderResult);
            }).catch(() => {});
            ;
        } catch (error: any) {
            errorHandler.processRestValidations(error);
        }
    }, [props.orderId, errorHandler])

    const addPayment = () => {
        try {
            setPayment({
                amount: 0,
                method: "",
            })
        } catch (error: any) {
            errorHandler.processRestValidations(error);
        }
    }

    if (!order) {
        return null
    }

    let total = 0
    order.articles?.forEach((value) => {total+=value.unitaryPrice*value.quantity}) 
    let paymentTotal = 0
    order.payment?.forEach((value) => {paymentTotal+=value.amount}) 

    return (
        <div className="global_content">
            <FormTitle>Detalle de Orden : {order.id}</FormTitle>

            <div>
                <FormLabel label="Cart Id" text={order.cartId} />
                <FormLabel label="Estado" text={order.status} />
                <FormLabel label="Importe Total" text={total.toFixed(2)} />
                <FormLabel label="Pago Total" text={paymentTotal.toFixed(2)} />
                <FormLabel label="Creada" text={order.created} />
                <FormLabel label="Actualizada" text={order.updated} />
            </div>

            <table id="articles" className="table">
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Cantidad </th>
                        <th> Precio Unit. </th>
                        <th> Valido </th>
                        <th> Validado </th>
                    </tr>
                </thead>
                <tbody>
                    {(order && order.articles) ?
                        order.articles!.map((article, i) => {
                            return (
                                <tr key={i}>
                                    <td>{article.id}</td>
                                    <td>{article.quantity}</td>
                                    <td>{article.unitaryPrice}</td>
                                    <td>{article.valid}</td>
                                    <td>{article.validated}</td>
                                </tr>
                            );
                        }) : null
                    }
                </tbody>
            </table>

            <br />
            <h4>Pagos</h4>
            <table>
                <thead>
                    <tr>
                        <th> Método </th>
                        <th> Import </th>
                    </tr>
                </thead>
                <tbody>
                    {(order && order.payment) ?
                        order.payment!.map((pay, i) => {
                            return (
                                <tr key={i}>
                                    <td>{pay.method}</td>
                                    <td>{pay.amount}</td>
                                </tr>
                            );
                        }) : null
                    }
                </tbody>
            </table>

            <br />
            <FormButtonBar>
                <FormAcceptButton label="Agregar Pago" onClick={addPayment} />

            </FormButtonBar>

            <br />
            {(payment) ?
                <AddPayment
                    orderId={order!.id}
                    payment={payment!}
                    onPaymentAdded={cancelPayment} />
                : null
            }
        </div>
    )
}