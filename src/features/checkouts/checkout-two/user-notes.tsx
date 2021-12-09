import React, {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import {CardHeader} from "components/card-header/card-header";
import {TextFieldWrapper, TextFiledContainer} from "./checkout-two.style";
import {placeOrderNotes} from "redux/order/action";
import {useDispatch} from "react-redux";

interface Props {
    deviceType?: any;
    increment?: boolean;
}

const UserNotes = ({increment = true}: Props) => {
    const [noteText , setNoteText] = useState<string>('')
    const dispatch = useDispatch()
    const handleChange = (e) =>{
        setNoteText(e.target.value)
        dispatch(placeOrderNotes(e.target.value))
    }

    useEffect(()=>{
        setNoteText('')
        dispatch(placeOrderNotes(''))
    },[])

    return (
        <>
            <CardHeader increment={increment}>
                <FormattedMessage
                    id="orderNotes"
                    defaultMessage="Order Notes (Optional)"
                />
            </CardHeader>
            <TextFiledContainer>
                <TextFieldWrapper
                    variant="outlined"
                    color='primary'
                    placeholder='Do you have any notes...?'
                    multiline
                    rows={4}
                    value={noteText}
                    onChange={handleChange}
                />

            </TextFiledContainer>
        </>
    );
};

export default UserNotes;