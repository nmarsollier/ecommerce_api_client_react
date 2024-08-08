import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "../styles.css";
import DangerLabel from "../system/components/DangerLabel";
import Form from "../system/components/Form";
import FormAcceptButton from "../system/components/FormAcceptButton";
import FormButton from "../system/components/FormButton";
import FormButtonBar from "../system/components/FormButtonBar";
import FormInput from "../system/components/FormInput";
import FormTitle from "../system/components/FormTitle";
import { useErrorHandler } from "../system/utils/ErrorHandler";
import { DefaultProps } from "../system/utils/Tools";
import OrderDetail from "./OrderDetail";

export default function SearchOrder(props: DefaultProps) {
    const params = useParams();

    const [text, setText] = useState("")
    const [orderId, setOrderId] = useState<string>()

    const errorHandler = useErrorHandler()
    const navigate = useNavigate();

    const search = () => {
        try {
            setOrderId(text);
        } catch (error: any) {
            errorHandler.processRestValidations(error);
        }
    }

    useEffect(() => {
        const id = params.orderId;
        if (id) {
            setOrderId(id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="global_content" >
            <FormTitle>Buscar Orden</FormTitle>

            <Form>
                <FormInput
                    label="Numero Orden"
                    name="text"
                    onChange={e => setText(e.target.value)}
                    errorHandler={errorHandler} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Buscar" onClick={search} />
                    <FormButton label="Cancelar" onClick={() => navigate("/")} />
                </FormButtonBar>
            </Form>

            <br />

            <OrderDetail orderId={orderId} />
        </div>
    );
}
