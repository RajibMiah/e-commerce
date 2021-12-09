import React from "react";

import {
    SingleOrderList,
    OrderListHeader,
    TrackID,
    Status,
    OrderMeta,
    Meta,
} from "./order-card.style";
import {FormattedMessage} from "react-intl";

import {CURRENCY} from "utils/constant";
import moment from "moment";

type OrderCardProps = {
    orderId?: any;
    onClick?: (e: any) => void;
    className?: any;
    status?: any;
    date?: any;
    deliveryTime?: any;
    amount?: number;
    item?: any;
    ref?: any,
    statusCode: number
};

const progressData = ["Order Received", "Order confirmed", "Order Processing", "Order Picked", "Delivered", "Canceled"];

const mapServerProgress = (status: number) => {
    switch (status) {
        case 1:
            return progressData[0];
        case 2:
            return progressData[1];
        case 3:
            return progressData[5];
        case 4:
            return progressData[4];
        case 5:
            return progressData[3];
        case 6:
            return progressData[4];
        case 7:
            return progressData[4];
        case 8:
            return progressData[3]; //READY_FOR_DELIVERY
    }
};

const OrderCard: React.FC<OrderCardProps> = React.forwardRef(({
                                                                  orderId,
                                                                  onClick,
                                                                  className,
                                                                  status,
                                                                  date,
                                                                  deliveryTime,
                                                                  amount,
                                                                  item,
                                                                  statusCode
                                                              }, ref: any) => {
    const toTime = (timeStr) => moment(timeStr, "HH:mm:ss").format("h:mm A");
    const toDateTime = (timeStr) => moment(timeStr).format("MMM DD, YYYY hh:mm A");
    const toDate = (dateStr) => moment(dateStr).format("MMM DD, YYYY")
    return (
        <>
            <SingleOrderList ref={ref} onClick={onClick} className={className}>
                <OrderListHeader>
                    <TrackID>
                        <FormattedMessage
                            id="intlOrderCardTitleText"
                            defaultMessage="Order"
                        />
                        <span>#{orderId}</span>
                    </TrackID>
                    <Status>{mapServerProgress(statusCode)}</Status>
                </OrderListHeader>

                <OrderMeta>
                    <Meta>
                        <FormattedMessage
                            id="intlOrderCardDateText"
                            defaultMessage="Order Date"
                        />
                        : <span>{toDateTime(item.created_date)}</span>
                    </Meta>
                    <Meta>
                        <FormattedMessage
                            id="intlOrderCardDateText1"
                            defaultMessage="Delivery date"
                        />
                        : <span>{toDate(item.delivery_date)}</span>
                    </Meta>

                    <Meta>
                        <FormattedMessage
                            id="deliveryTimeText"
                            defaultMessage="Delivery Time"
                        />
                        : <span>{`${toTime(item.timeslot.start_time)} - ${toTime(item.timeslot.end_time)}`}</span>
                    </Meta>
                    <Meta className="price">
                        <FormattedMessage
                            id="intlOrderCardTotalText"
                            defaultMessage="Total Price"
                        />
                        :
                        <span>{CURRENCY}{item.total_net_amount}</span>
                    </Meta>
                </OrderMeta>
            </SingleOrderList>
        </>
    );
})

export default OrderCard;