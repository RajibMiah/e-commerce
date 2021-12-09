import React from "react";
import { FormattedMessage } from "react-intl";
import RadioGroup from "components/radio-group/radio-group";
import RadioCard from "components/radio-card/radio-card";
import { Button } from "components/button/button";
import CreateOrUpdateAddress from "components/address-card/address-card";
import { handleModal } from "features/checkouts";
import { CardHeader } from "components/card-header/card-header";
import { ButtonGroup } from "components/button-group/button-group";
import { Box } from "components/box";
import { Plus } from "assets/icons/PlusMinus";
import { useDispatch, useSelector } from "react-redux";
import { AuthState as AuthState } from "redux/auth/reducer";
import { Address as AddressType } from "types/address";
import { deleteAddress, setPrimaryAddress } from "redux/auth/action";

interface Props {
    increment?: boolean;
    icon?: boolean;
    buttonProps?: any;
    flexStart?: boolean;
}

type RootState = {
    auth: AuthState;
}

const Address = ({
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
    const { addresses } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <CardHeader increment={increment}>
                <FormattedMessage
                    id='checkoutDeliveryAddress'
                    defaultMessage='Select Your Delivery Address'
                />
            </CardHeader>
            <ButtonGroup flexStart={flexStart}>
                <RadioGroup
                    items={addresses}
                    component={(item: AddressType) => (
                        <RadioCard
                            id={item.id.toString()}
                            key={item.id}
                            title={item.name}
                            content={item.address}
                            name='address'
                            checked={item.type === "primary"}
                            onChange={() => dispatch(setPrimaryAddress(item.id))}
                            onEdit={(event: React.MouseEvent<HTMLElement>) => {
                                event.preventDefault();
                                handleModal(CreateOrUpdateAddress, item);
                            }}
                            onDelete={() => dispatch(deleteAddress(item.id))}
                        />
                    )}
                    secondaryComponent={
                        <Button
                            {...buttonProps}
                            onClick={() => handleModal(CreateOrUpdateAddress, "add-address-modal")}
                            style={{ borderStyle: "dashed" }}
                        >
                            {icon && (
                                <Box mr={2}>
                                    <Plus width='10px'/>
                                </Box>
                            )}
                            <FormattedMessage
                                id='addAddressBtn'
                                defaultMessage='Add Address'
                            />
                        </Button>
                    }
                />
            </ButtonGroup>
        </>
    );
};

export default Address;