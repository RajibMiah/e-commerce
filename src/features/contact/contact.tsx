import React from "react";
import { FormattedMessage } from "react-intl";
import RadioGroup from "components/radio-group/radio-group";
import RadioCard from "components/radio-card/radio-card";
import { Button } from "components/button/button";
import { handleModal } from "features/checkouts";
import CreateOrUpdateContact from "components/contact-card/contact-card";
import { CardHeader } from "components/card-header/card-header";
import { ButtonGroup } from "components/button-group/button-group";
import { Box } from "components/box";
import { Plus } from "assets/icons/PlusMinus";
import { useDispatch, useSelector } from "react-redux";
import { AuthState as AuthState } from "redux/auth/reducer";
import { Contact as ContactType } from "types/contact";
import { deleteContact, setPrimaryContact } from "redux/auth/action";

interface Props {
    increment?: boolean;
    flexStart?: boolean;
    icon?: boolean;
    buttonProps?: any;
}

type RootState = {
    auth: AuthState;
}

const Contact = ({
    increment = false,
    flexStart = false,
    icon = false,
    buttonProps = {
        size: "big",
        variant: "outlined",
        type: "button",
        className: "add-button",
    },
}: Props) => {
    const dispatch = useDispatch();
    const { contacts } = useSelector((state: RootState) => state.auth);
    return (
        <>
            <CardHeader increment={increment}>
                <FormattedMessage
                    id='contactNumberText'
                    defaultMessage='Select Your Contact Number'
                />
            </CardHeader>
            <ButtonGroup flexStart={flexStart}>
                <RadioGroup
                    items={contacts}
                    component={(item: ContactType) => (
                        <RadioCard
                            id={item.id.toString()}
                            key={item.id}
                            title={item.type}
                            content={item.number}
                            checked={item.type === "primary"}
                            onChange={()=>dispatch(setPrimaryContact(item.id))}
                            name='contact'
                            onEdit={(event: React.MouseEvent<HTMLElement>) => {
                                event.preventDefault();
                                handleModal(CreateOrUpdateContact, item);
                            }}
                            onDelete={() => dispatch(deleteContact(item.id))}
                        />
                    )}
                    secondaryComponent={
                        <Button
                            {...buttonProps}
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                                event.preventDefault();
                                handleModal(CreateOrUpdateContact);
                            }}
                        >
                            {icon && (
                                <Box mr={2}>
                                    <Plus width='10px'/>
                                </Box>
                            )}
                            <FormattedMessage
                                id='addContactBtn'
                                defaultMessage='Add Contact'
                            />
                        </Button>
                    }
                />
            </ButtonGroup>
        </>
    );
};

export default Contact;