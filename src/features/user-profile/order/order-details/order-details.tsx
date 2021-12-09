import React, {useEffect, useMemo, useState} from "react";
import Table from "rc-table";
import {
    DeliveryInfo,
    DeliveryAddress,
    Address,
    CostCalculation,
    PriceRow,
    Price,
    ProgressWrapper,
    OrderTableWrapper,
    OrderTable,
    Cancelation,
    MuiButton,
    DiscountPrice,
    OrderEditOptionContainer,
    OrderEditOptionBtnWrapper,
} from "./order-details.style";
import Progress from "components/progress-box/progress-box";
import {CURRENCY} from "utils/constant";
import {FormattedMessage} from "react-intl";
import {Button} from "@material-ui/core";
import {GoDiffAdded} from 'react-icons/go'
import {useCart} from "contexts/cart/use-cart";
import {FaEdit} from "react-icons/fa";
import {MdCancel, MdUpdate} from "react-icons/md";

type OrderDetailsProps = {
    tableData?: any;
    columns?: any;
    order_status_code?: number;
    progressData?: any;
    progressStatus?: any;
    address?: string;
    subtotal?: number;
    discount?: number;
    deliveryFee?: number;
    grandTotal?: number;
    item?: any;
    updateOrderItem: any;
    setUpdateOrderItem: any
    handleQtyUpdate: (orderId: number, items: any) => void;
    handleAddItems?: (orderId: number) => void;
    handleCancelOrder?: (id: number) => number | void;
    handleReOrder?: (id: number) => number | void;
};

const components = {
    table: OrderTable,
};

export const STATIC_NUMBER = {
    LIMIT_LENGTH: 1,
    ZERO_NO_INDEX: 0,
    ORDER_RECEIVED_STATUS_CODE: 1,
    ORDER_CONFIRM_STATUS_CODE: 2,
    MINIMUM_QTY: 0
}

type StaticProps = {
    ORDER_CANCELED: number,
    ORDER_COMPLETE: number
}


const STATIC_PROPS: StaticProps = {
    ORDER_CANCELED: 3,
    ORDER_COMPLETE: 6
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
                                                       tableData,
                                                       columns,
                                                       address,
                                                       order_status_code,
                                                       progressStatus,
                                                       progressData,
                                                       subtotal,
                                                       discount,
                                                       deliveryFee,
                                                       grandTotal,
                                                       item,
                                                       handleQtyUpdate,
                                                       updateOrderItem,
                                                       setUpdateOrderItem,
                                                       handleAddItems,
                                                       handleCancelOrder,
                                                       handleReOrder,
                                                   }) => {
    const {setQuantities, newAddedItem, Qty} = useCart();
    const [itemData, setItemData] = useState([])
    useEffect(() => {
        const newArray = item?.items.filter((item) => item.quantity > STATIC_NUMBER.MINIMUM_QTY)
        setItemData(newArray)
        setQuantities(newArray)
    }, [item, newAddedItem , updateOrderItem])

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

    return (
        <>
            <ProgressWrapper>
                <Progress data={progressData} status={progressStatus}/>
            </ProgressWrapper>
            {
                order_status_code <= STATIC_NUMBER.ORDER_CONFIRM_STATUS_CODE &&
                <OrderEditOptionContainer>
                    <OrderEditOptionBtnWrapper>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            className={'add-more-btn'}
                            onClick={() => handleAddItems(item?.items[STATIC_NUMBER.ZERO_NO_INDEX]?.order)}
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

            <OrderTableWrapper>
                <Table
                    columns={columns}
                    data={updateOrderItem ? Qty : itemData}
                    rowKey={(record) => record.id}
                    components={components}
                    className="orderDetailsTable"
                />
            </OrderTableWrapper>
            {
                updateOrderItem && order_status_code <= STATIC_NUMBER.ORDER_CONFIRM_STATUS_CODE &&
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
                            onClick={handleUpdate}
                        >
                            <MdUpdate className={'btn-icon'}/>
                            <span>Update Items</span>
                        </Button>
                    </OrderEditOptionBtnWrapper>
                </OrderEditOptionContainer>
            }
            <DeliveryInfo>
                <DeliveryAddress>
                    <h3>
                        <FormattedMessage
                            id="deliveryAddressTitle"
                            defaultMessage="Delivery Address"
                        />
                    </h3>
                    <Address>{item.shipping_address?.address}</Address>
                </DeliveryAddress>

                <CostCalculation>
                    <PriceRow>
                        <FormattedMessage id="subTotal" defaultMessage="Sub total"/>
                        <Price>{CURRENCY}{item.total_gross_amount}</Price>
                    </PriceRow>

                    <PriceRow>
                        <FormattedMessage
                            id="intlOrderDetailsDelivery"
                            defaultMessage="Delivery Fee"
                        />
                        <Price>
                            {
                                item.is_delivery_free ?
                                    <span>
                                        Free
                                        <s style={{color: '#ff5b60', paddingLeft: "3px"}}>
                                            ( {CURRENCY}
                                            {item.delivery_charge})
                                        </s>
                                    </span>
                                    :
                                    <span>
                                         {CURRENCY}
                                        {item.delivery_charge}
                                    </span>
                            }
                        </Price>
                    </PriceRow>

                    <PriceRow>
                        <FormattedMessage
                            id="intlOrderDetailsDiscount"
                            defaultMessage="Discount"
                        />
                        <DiscountPrice> - {CURRENCY}{item.discount}</DiscountPrice>
                    </PriceRow>

                    <PriceRow>
                        <FormattedMessage
                            id="intlOrderDetailsWallet"
                            defaultMessage="Charged from wallet"
                        />
                        <DiscountPrice> - {CURRENCY}{item.wallet_amount_used}</DiscountPrice>
                    </PriceRow>


                    <PriceRow className="grandTotal">
                        <FormattedMessage id="totalText" defaultMessage="Total"/>
                        <Price>{CURRENCY}{item.total_net_amount}</Price>
                    </PriceRow>
                </CostCalculation>
            </DeliveryInfo>
            {
                (item.status !== STATIC_PROPS.ORDER_CANCELED && item.status !== STATIC_PROPS.ORDER_COMPLETE) ?
                    <Cancelation>
                        <MuiButton
                            variant="contained"
                            color="secondary"
                            onClick={() => handleCancelOrder(item.id)}
                        >
                            Cancel order
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
                            onClick={() => handleReOrder(item.id)}
                        >
                            Re-order
                        </MuiButton>
                    </Cancelation>
            }

        </>
    );
}
export default OrderDetails;


