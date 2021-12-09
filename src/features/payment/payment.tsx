import React from "react";
import { FormattedMessage } from "react-intl";
import { CardHeader } from "components/card-header/card-header";
import RadioCard from "components/radio-card/radio-card";
import RadioGroup from "components/radio-group/radio-group";

interface Props {
    deviceType: any;
    increment?: boolean;
}

const Payment = ({ deviceType, increment = false }: Props) => {
    return (
        <>
            <CardHeader increment={increment}>
                <FormattedMessage
                    id="selectPaymentText"
                    defaultMessage="Select Payment Option"
                />
            </CardHeader>
            <RadioGroup
                items={[
                    {
                        id: 1,
                        title: null,
                        content: "Cash on Delivery",
                        badgeContent: null,
                        type: "primary"
                    },
                    {
                        id: 2,
                        title: null,
                        content: "bKash",
                        badgeContent: "COMING SOON",
                        type: "secondary"
                    }
                ]}
                component={(item: any) => (
                    <RadioCard
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        content={item.content}
                        badgeContent={item.badgeContent}
                        name="payment"
                        checked={item.id === 1}
                        readOnly={true}
                        withActionButtons={false}
                        onChange={null}
                    />

                )}
            />
        </>
    );
};

export default Payment;