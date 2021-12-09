import React, {useEffect, useMemo, useState} from "react";
import Table from "rc-table";
import Collapse, {Panel} from "rc-collapse";
import Progress from "components/progress-box/progress-box";

import {
    OrderListHeader,
    TrackID,
    Status,
    OrderMeta,
    Meta,
    CardWrapper,
    OrderDetail,
    DeliveryInfo,
    DeliveryAddress,
    Address,
    CostCalculation,
    PriceRow,
    Price,
    ProgressWrapper,
    OrderTable,
    OrderTableMobile,
} from "./order-card.style";

import {CURRENCY} from "utils/constant";
import moment from "moment";
import {
    Cancelation,
    DiscountPrice,
    MuiButton,
    OrderEditOptionBtnWrapper,
    OrderEditOptionContainer
} from "../order-details/order-details.style";
import {FormattedMessage} from "react-intl";
import {Button} from "@material-ui/core";
import {FaEdit} from "react-icons/fa";
import {GoDiffAdded} from "react-icons/go";
import {STATIC_NUMBER} from "../order-details/order-details";
import {MdCancel, MdUpdate} from "react-icons/md";
import {useCart} from "contexts/cart/use-cart";
import {Quantity} from "../../../checkouts/checkout-two/checkout-two.style";

type MobileOrderCardProps = {
    orderId?: any;
    onClick?: (e: any) => void;
    className?: any;
    status?: any;
    date?: any;
    deliveryTime?: any;
    amount?: number;
    tableData?: any;
    columns?: any;
    progressData?: any;
    progressStatus?: any;
    address?: string;
    subtotal?: number;
    discount?: number;
    deliveryFee?: number;
    grandTotal?: number;
    orders?: any;
    updateOrderItem: any;
    setUpdateOrderItem: any
    handleQtyUpdate: (orderId: number, items: any) => void;
    handleAddItems?: (orderId: number) => void;
    handleCancelOrder?: (id: number) => number | void;
    handleReOrder?: (id: number) => number | void;
    mapServerProgress?: any;
};

const components = {
    table: OrderTable,
};
type StaticProps = {
    ORDER_CANCELED: number,
    ORDER_COMPLETE: number,
    MINIMUM_QUNTITIY: number,

}


const STATIC_PROPS: StaticProps = {
    ORDER_CANCELED: 3,
    ORDER_COMPLETE: 6,
    MINIMUM_QUNTITIY: 0
}

const OrderCard: React.FC<MobileOrderCardProps> = ({
                                                       onClick,
                                                       className,
                                                       columns,
                                                       progressData,
                                                       orders,
                                                       handleQtyUpdate,
                                                       updateOrderItem,
                                                       setUpdateOrderItem,
                                                       handleAddItems,
                                                       handleCancelOrder,
                                                       handleReOrder,
                                                       mapServerProgress
                                                   }) => {
    const {setQuantities, newAddedItem ,Qty} = useCart();
    const toTime = (timeStr) => moment(timeStr, "HH:mm:ss").format("h:mm A");
    const toDateTime = (timeStr) => moment(timeStr).format("MMM DD, YYYY hh:mm A");
    const [itemData, setItemData] = useState([])
    const handleUpdate = () => {
        let modifiedItem = []
        Qty.map((item) => {
            modifiedItem.push({
                "item_id": item.id,
                "quantity": item.quantity
            })
        })
        handleQtyUpdate(Qty?.[STATIC_NUMBER.ZERO_NO_INDEX]?.order, modifiedItem)
    }
    useEffect(() => {
        // NOTE:: THIS ITERATION FILTER OR REMOVE THE ITEM WHOSE QUANTITY IS ZERO, FROM THE NESTED ARRAY LIST ITEMS

        let filteredArray = orders.map((arrayItems) => {
            arrayItems.items = arrayItems.items.filter((item) => item.quantity > STATIC_PROPS.MINIMUM_QUNTITIY)
            return arrayItems
        })
        setItemData(filteredArray)
        setQuantities(filteredArray)
    }, [])
    return (
        <>
            <Collapse
                accordion={true}
                className={`accordion ${className}`}
                defaultActiveKey="active"
            >
                {itemData.map((order: any) => (
                        <Panel

                            header={
                                <CardWrapper onClick={() => onClick(order)}>
                                    <OrderListHeader>
                                        <TrackID>
                                            Order <span>#{order.id}</span>
                                        </TrackID>
                                        <Status>{progressData[mapServerProgress(order.status)]}</Status>
                                    </OrderListHeader>

                                    <OrderMeta>
                                        <Meta>
                                            Order Date: <span>{toDateTime(order.created_date)}</span>
                                        </Meta>
                                        <Meta>
                                            Delivery
                                            Time: <span>{`${toTime(order.timeslot.start_time)} - ${toTime(order.timeslot.end_time)}`}</span>
                                        </Meta>
                                        <Meta className="price">
                                            Total Price: <span>{CURRENCY}{order.total_net_amount}</span>
                                        </Meta>
                                    </OrderMeta>
                                </CardWrapper>
                            }
                            headerClass="accordion-title"
                            key={order.id}
                        >
                            <OrderDetail>
                                <ProgressWrapper>
                                    <Progress data={progressData} status={mapServerProgress(order.status)}/>
                                </ProgressWrapper>
                                {
                                    order.status <= STATIC_NUMBER.ORDER_CONFIRM_STATUS_CODE &&
                                    <OrderEditOptionContainer>
                                        <OrderEditOptionBtnWrapper>
                                            <Button
                                                variant={'contained'}
                                                color={'primary'}
                                                className={'add-more-btn'}
                                                onClick={() => handleAddItems(order?.items[STATIC_NUMBER.ZERO_NO_INDEX]?.order)}
                                            >
                                                <GoDiffAdded className={'btn-icon'}/>
                                                <span>Add items</span>
                                            </Button>
                                        </OrderEditOptionBtnWrapper>
                                        <OrderEditOptionBtnWrapper>
                                            <Button
                                                variant={'contained'}
                                                color={'primary'}
                                                className={'edit-btn'}
                                                onClick={() => setUpdateOrderItem(true)}
                                            >
                                                <FaEdit className={'btn-icon'}/>
                                                <span>Edit order items</span>
                                            </Button>
                                        </OrderEditOptionBtnWrapper>
                                    </OrderEditOptionContainer>
                                }
                                <OrderTableMobile>
                                    <Table
                                        columns={columns}
                                        data={order.items}
                                        rowKey={(record) => record.id}
                                        components={components}
                                        scroll={{x: 450}}
                                        // scroll={{ y: 250 }}
                                    />
                                </OrderTableMobile>
                                {
                                    updateOrderItem && order.status <= STATIC_NUMBER.ORDER_CONFIRM_STATUS_CODE &&
                                    <OrderEditOptionContainer style={{justifyContent: 'center'}}>
                                        <OrderEditOptionBtnWrapper>
                                            <Button
                                                variant={'contained'}
                                                className={'edit-btn'}
                                                onClick={() => setUpdateOrderItem(false)}
                                            >
                                                <MdCancel className={'btn-icon'}/>
                                                <span>Cancel Update</span>
                                            </Button>
                                        </OrderEditOptionBtnWrapper>
                                        <OrderEditOptionBtnWrapper>
                                            <Button
                                                variant={'contained'}
                                                color={'primary'}
                                                className={'update-btn'}
                                                onClick={handleUpdate}
                                            >
                                                <MdUpdate className={'btn-icon'}/>
                                                <span>Update Items</span>
                                            </Button>
                                        </OrderEditOptionBtnWrapper>
                                    </OrderEditOptionContainer>
                                }
                            </OrderDetail>
                            <DeliveryInfo>
                                <DeliveryAddress>
                                    <h3>Delivery Address</h3>
                                    <Address>{order.shipping_address?.address}</Address>
                                </DeliveryAddress>

                                <CostCalculation>
                                    <PriceRow>
                                        <FormattedMessage id="subTotal" defaultMessage="Sub total"/>
                                        <Price>{CURRENCY}{order.total_gross_amount}</Price>
                                    </PriceRow>
                                    <PriceRow>
                                        <FormattedMessage
                                            id="intlOrderDetailsDiscount"
                                            defaultMessage="Discount"
                                        />
                                        <DiscountPrice> - {CURRENCY}{order.discount}</DiscountPrice>
                                    </PriceRow>

                                    <PriceRow>
                                        <FormattedMessage
                                            id="intlOrderDetailsWallet"
                                            defaultMessage="Charged from wallet"
                                        />
                                        <DiscountPrice> - {CURRENCY}{order.wallet_amount_used}</DiscountPrice>
                                    </PriceRow>
                                    <PriceRow>
                                        <FormattedMessage
                                            id="intlOrderDetailsDelivery"
                                            defaultMessage="Delivery Fee"
                                        />
                                        <Price>
                                            {
                                                order.is_delivery_free ?
                                                    <span>
                                        Free
                                        <s style={{color: '#ff5b60', paddingLeft: "3px"}}>
                                            ( {CURRENCY}
                                            {order.delivery_charge})
                                        </s>
                                    </span>
                                                    : <span>{CURRENCY}{order.delivery_charge}</span>
                                            }
                                        </Price>
                                    </PriceRow>
                                    <PriceRow className="grandTotal">
                                        <FormattedMessage id="totalText" defaultMessage="Total"/>
                                        <Price>{CURRENCY}{order.total_net_amount}</Price>
                                    </PriceRow>
                                </CostCalculation>

                            </DeliveryInfo>


                            {
                                (order.status !== STATIC_PROPS.ORDER_CANCELED && order.status !== STATIC_PROPS.ORDER_COMPLETE) ?
                                    <Cancelation>
                                        <MuiButton
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleCancelOrder(order.id)}
                                        >
                                            Cancel Order
                                        </MuiButton>
                                    </Cancelation>
                                    :
                                    <Cancelation>
                                        <MuiButton
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                color: 'white'
                                            }}
                                            onClick={() => handleReOrder(order.id)}
                                        >
                                            Re-Order
                                        </MuiButton>
                                    </Cancelation>
                            }
                        </Panel>
                    )
                )}
            </Collapse>
        </>
    );
};

export default OrderCard;