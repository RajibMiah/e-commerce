import React, {useEffect, useMemo, useState} from "react";
import {Scrollbar} from "components/scrollbar/scrollbar";
import ConfirmDialog from "components/meterial-ui/ConfirmDialog";
import {
    DesktopView,
    ImageWrapper,
    ItemDetails,
    ItemName,
    ItemPrice,
    ItemSize,
    ItemWrapper,
    MobileView,
    OrderBox,
    OrderDetailsWrapper,
    OrderList,
    OrderListWrapper, QuantityInput, QuantityMeter, TableQuantityContainer,
    Title,
} from "./order.style";
import {openModal, closeModal} from '@redq/reuse-modal';
import OrderDetails, {STATIC_NUMBER} from "./order-details/order-details";
import OrderCard from "./order-card/order-card";
import OrderCardMobile from "./order-card/order-card-mobile";
import useComponentSize from "utils/useComponentSize";
import {FormattedMessage} from "react-intl";
import {useOrder} from "data/use-order";
import {CURRENCY} from "utils/constant";
import {LoaderBox} from "components/loader/loader.style";
import Loader from "components/loader/loader";
import AlertMessage from "components/alert-message/alert-message";
import {useSelector} from "react-redux";
import {AuthState} from "redux/auth/reducer";
import {useRouter} from "next/router";
import {useCart} from "contexts/cart/use-cart";
import MuiAlertBox from 'components/meterial-ui/alert-message/MuiAlert'
import useAutoScroll from "contexts/hooks/useAutoScroll";
import AddItems from "layouts/add-new-items/add-items";
import {EditBtnWrapper} from "./order-details/order-details.style";
import {Button, Snackbar} from "@material-ui/core";
import {AiFillDelete} from "react-icons/ai";

export const progressData = ["Order Received", "Order confirmed", "Order Processing", "Order Picked", ""]; ////"Delivered" ,"Canceled"

export const mapServerProgress = (status: number) => {
    switch (status) {
        case 1:
            //order received
            return 0;
        case 2:
            //order confirmed
            return 1;
        case 3:
            //order_canceled
            return 5;
        case 4:
            //complete order
            return 4
        case 5:
            //in_delivery
            return 3;
        case 6:
            //delivered or order_completed
            return 4;
        case 7:
            return 4;
        case 8:
            //READY_FOR_DELIVERY
            return 3;
    }
};

const STATIC_PROPS = {
    MINIMUM_ITEM: 1,
    NOT_LESS_THEN: 0,
    MINIMUM_INDEX: 0,
    MINIMUM_QUNTITIY: 0
}


export  type RootState = {
    auth: AuthState;
}

export interface ConfirmDialogue {
    isOpen: boolean;
    title: string;
    subTitle: string;
    onConfirm?: () => void;

}

const OrdersContent: React.FC<any> = () => {

        const [targetRef, size] = useComponentSize();
        const {qtyItemPrice, setQuantities, reOrder, Qty} = useCart()
        const [updateOrderItem, setUpdateOrderItem] = useState<boolean>(false)
        const router = useRouter()
        const [pageSize, setPageSize] = useState<number>(10)
        const {isLoading, isReachingEnd, isRefreshing, data, error, fetchMore, mutate} = useOrder({page_size: pageSize});
        const {observerRef} = useAutoScroll({isLoading, isReachingEnd, fetchMore})
        const [selection, setSelection] = useState(null);
        const {access_token} = useSelector((state: RootState) => state.auth);
        const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});
        const [canceled, setIsCanceled] = useState(false)
        const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogue | undefined>({
            isOpen: false,
            title: '',
            subTitle: ''
        })

        useEffect(() => {
            data?.length && data.find((value, index) => index === 0 && setSelection(value))
        }, [data.length, isRefreshing]);

        const handleCancelOrder: any = async (orderId: number) => {
            setConfirmDialog({
                ...confirmDialog,
                isOpen: false, subTitle: "", title: ""
            })
            setIsCanceled(true)

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/v1/orders/${orderId}/`, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Token ${access_token}`,
                    },
                    method: 'PUT',
                    body: JSON.stringify({"status": mapServerProgress(5)})
                })
                if (response.ok) {
                    setIsCanceled(false)
                    // @ts-ignore
                    await mutate(null, false)
                    await mutate()
                }
            } catch (error) {
                setIsCanceled(false)
                setShowAlert({
                    isOpen: true,
                    msg: error.msg,
                    type: 'error'
                })

            }
        }

        const handleReOrder: any = (orderId: number) => {
            let targetItem: any = []
            let filteredItem: any = []

            data.map(async (value) => {
                if (value.id === orderId) {
                    targetItem.push(value)
                    filteredItem = targetItem.map(item => {
                        return item.items.filter(item => ((item.variant.max_allocation >= item.quantity && item.quantity > STATIC_PROPS.MINIMUM_QUNTITIY)))
                    })

                    if (filteredItem[STATIC_PROPS.MINIMUM_INDEX].length < 1) {
                        setShowAlert({
                            isOpen: true,
                            msg: "No Data is found",
                            type: 'error'
                        })
                    } else {

                        /*
                        NOTE::has sleep the router  push method   for showing error message ,  if any  item is out of stock for order id response.
                         */
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        reOrder(filteredItem[STATIC_PROPS.MINIMUM_INDEX]);
                        router.push("/checkout").then()

                    }
                }

            })
        }

        const handleConfirmDialogue: any = (orderId: number) => {

            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure you want to cancel this order?',
                subTitle: 'You can\'t undo this operation',
                onConfirm: () => handleCancelOrder(orderId)
            })
        }


        const handleItemQtyUpdate = async (orderId, items, text: string = ' Successful ') => {

            let uploadedItem = selection.items.map((item) => {
                if (Qty.find((qtyItem) => qtyItem.id === item.id)) {
                    return {
                        "item_id": item.id,
                        "quantity": item.quantity
                    }
                } else {
                    return {
                        "item_id": item.id,
                        "quantity": 0
                    }
                }
            })


            const payload = {
                "order": orderId,
                "items": uploadedItem
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/v1/order-items/update/`, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Token ${access_token}`,
                    },
                    method: 'POST',
                    body: JSON.stringify(payload)
                })
                if (response.ok) {
                    setUpdateOrderItem(false)
                    setShowAlert({
                        isOpen: true,
                        msg: text,
                        type: 'success'
                    })
                    // @ts-ignore
                    await mutate(null, false)
                    await mutate()
                }
            } catch (error) {
                setUpdateOrderItem(false)
                setIsCanceled(false)
                setShowAlert({
                    isOpen: true,
                    msg: "Sorry  can\'t update quantity of  the item",
                    type: 'error'
                })

            }
        }

        const handleAddItems = (orderId) => {
            setUpdateOrderItem(false)
            openModal({
                show: true,
                config: {
                    className: 'cartPopup',
                    width: '100%',
                    height: '100%',
                    enableResizing: {
                        left: true,
                        top: true,
                    },
                    disableDragging: true,
                    animationFrom: {transform: 'scale(1)'},
                    animationTo: {transform: 'scale(1)'},
                    transition: {
                        tension: 360,
                        friction: 40,
                    },
                },
                closeOnClickOutside: false,
                component: AddItems,
                closeComponent: () => <div/>,
                componentProps: {onCloseBtnClick: closeModal, scrollbarHeight: 330, orderId, mutate: mutate},
            });
        };

        const removedItemFromCart = async (data, index) => {
            setConfirmDialog({
                ...confirmDialog,
                isOpen: false, subTitle: "", title: ""
            })
            let newArray = Qty.filter((fakeCartItem) => data.id !== fakeCartItem.id)
            setQuantities(newArray)
        }

        const RenderAction = (data, row, index) => {
            return <EditBtnWrapper>
                <Button variant={"contained"} className={'edit-btn'}
                        disabled={!(selection.status <= STATIC_NUMBER.ORDER_CONFIRM_STATUS_CODE && updateOrderItem && Qty.length > STATIC_PROPS.MINIMUM_ITEM)}
                        onClick={() => removedItemFromCart(data, index)}>
                    <AiFillDelete className={'btn-icon'}/>
                </Button>
            </EditBtnWrapper>
        }

        const orderTableColumns = [
            {
                title: <FormattedMessage id='cartItems' defaultMessage='Items'/>,
                dataIndex: "",
                key: "items",
                width: 250,
                ellipsis: true,
                render: (text, record) => {
                    return (
                        record.quantity !== STATIC_PROPS.MINIMUM_QUNTITIY &&
                        <ItemWrapper>
                            <ImageWrapper>
                                <img
                                    src={record.variant.images?.[STATIC_PROPS.MINIMUM_INDEX]?.thumbnail || '/no-image-available.webp'}
                                    alt={record.title}/>
                            </ImageWrapper>

                            <ItemDetails>
                                <ItemName>{record.variant.title}</ItemName>
                                <ItemSize>{record.variant.measurement}</ItemSize>
                                <ItemPrice>{CURRENCY}{record.unit_price_net_amount}</ItemPrice>
                                {
                                    record.discount > STATIC_PROPS.NOT_LESS_THEN &&
                                    <ItemPrice style={{margin: "0", color: '#77798c'}}>
                                        <s>{record.variant.original_price}</s>
                                    </ItemPrice>
                                }
                            </ItemDetails>
                        </ItemWrapper>
                    );
                },
            },
            {
                title: (
                    <FormattedMessage id='intlTableColTitle2' defaultMessage='Quantity'/>
                ),
                dataIndex: "quantity",
                key: "quantity",
                align: "center",
                width: 100,
                render: (text, record, index) => {
                    return updateOrderItem && selection.status <= STATIC_NUMBER.ORDER_CONFIRM_STATUS_CODE ?
                        record.quantity !== STATIC_PROPS.MINIMUM_QUNTITIY && increaseQtyVolume({record, index, selection})

                        :
                        record.quantity !== STATIC_PROPS.MINIMUM_QUNTITIY && <p>{record.quantity}</p>
                },
            },
            {
                title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price'/>,
                dataIndex: "",
                key: "price",
                align: "right",
                width: 100,
                render: (text, record, index) => {
                    return updateOrderItem ?
                        (record.quantity !== STATIC_PROPS.MINIMUM_QUNTITIY && <p>{CURRENCY}{qtyItemPrice(index)}</p>)
                        :
                        (record.quantity !== STATIC_PROPS.MINIMUM_QUNTITIY &&
                            <p>{CURRENCY}{record.total_price_net_amount}</p>)
                },
            },
            {
                // title: <FormattedMessage id='intlTableColTitle4' defaultMessage='Option'/>,
                dataIndex: "",
                key: "option",
                align: "right",
                width: 100,
                render: RenderAction
            }
        ];


        if (canceled || !data) return <LoaderBox><Loader/></LoaderBox>;

        if (error) {
            const alertMessage = {
                type: "error",
                text: error.message
            };
            return <AlertMessage message={alertMessage} open={showAlert} setOpen={setShowAlert}/>;
        }


        return (
            <>
                {data.length !== STATIC_PROPS.MINIMUM_INDEX ? (
                    <OrderBox>
                        <DesktopView>
                            <OrderListWrapper style={{height: size.height}}>
                                <Title style={{padding: "0 20px"}}>
                                    <FormattedMessage
                                        id='intlOrderPageTitle'
                                        defaultMessage='My Order'
                                    />
                                </Title>

                                <Scrollbar className='order-scrollbar'>
                                    <OrderList>
                                        {data.map((current: any, index) => {
                                            if (data.length === index + 1) {
                                                return (
                                                    <OrderCard
                                                        ref={observerRef}
                                                        key={current.id}
                                                        orderId={current.id}
                                                        className={current.id === selection?.id ? "active" : ""}
                                                        statusCode={current.status}
                                                        status={progressData[mapServerProgress(current.status)]}
                                                        date={current.date}
                                                        deliveryTime={current.deliveryTime}
                                                        amount={current.amount}
                                                        onClick={() => setSelection(current)}
                                                        item={current}
                                                    />
                                                )
                                            } else {
                                                return (
                                                    <OrderCard
                                                        ref={null}
                                                        key={current.id}
                                                        orderId={current.id}
                                                        className={current.id === selection?.id ? "active" : ""}
                                                        statusCode={current.status}
                                                        status={progressData[mapServerProgress(current.status)]}
                                                        date={current.date}
                                                        deliveryTime={current.deliveryTime}
                                                        amount={current.amount}
                                                        onClick={() => setSelection(current)}
                                                        item={current}
                                                    />
                                                )
                                            }
                                        })}
                                    </OrderList>
                                </Scrollbar>

                            </OrderListWrapper>

                            <OrderDetailsWrapper ref={targetRef}>
                                <Title style={{padding: "0 20px"}}>
                                    <FormattedMessage
                                        id='orderDetailsText'
                                        defaultMessage='Order Details'
                                    />
                                </Title>
                                {selection && (
                                    <OrderDetails
                                        progressStatus={mapServerProgress(selection.status)}
                                        order_status_code={selection.status}
                                        progressData={progressData}
                                        address={selection.deliveryAddress}
                                        subtotal={selection.subtotal}
                                        discount={selection.discount}
                                        deliveryFee={selection.deliveryFee}
                                        grandTotal={selection.amount}
                                        tableData={selection.products}
                                        columns={orderTableColumns}
                                        item={selection}
                                        updateOrderItem={updateOrderItem}
                                        setUpdateOrderItem={setUpdateOrderItem}
                                        handleQtyUpdate={handleItemQtyUpdate}
                                        handleAddItems={handleAddItems}
                                        handleCancelOrder={handleConfirmDialogue}
                                        handleReOrder={handleReOrder}
                                    />
                                )}
                            </OrderDetailsWrapper>
                        </DesktopView>

                        <MobileView>
                            <OrderList>
                                <OrderCardMobile
                                    orders={data}
                                    progressData={progressData}
                                    mapServerProgress={mapServerProgress}
                                    columns={orderTableColumns}
                                    onClick={setSelection}
                                    updateOrderItem={updateOrderItem}
                                    setUpdateOrderItem={setUpdateOrderItem}
                                    handleQtyUpdate={handleItemQtyUpdate}
                                    handleAddItems={handleAddItems}
                                    handleCancelOrder={handleConfirmDialogue}
                                    handleReOrder={handleReOrder}
                                />
                            </OrderList>
                        </MobileView>
                    </OrderBox>
                ) : (
                    <LoaderBox><Loader/></LoaderBox>
                )}
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfimDialog={setConfirmDialog}

                />
                <MuiAlertBox
                    showAlert={showAlert}
                    setOpen={setShowAlert}/>
            </>
        );
    }
;

export default OrdersContent;


const increaseQtyVolume = ({record, index, selection}) => {
    const {inputQtyVolume, incrementQty, decrementQty, Qty} = useCart()
    const [inputVolume, setInputVolume] = useState<number>(null)
    const [maxAllocation, setMaxAllocation] = useState(selection.items[index].quantity + selection.items[index].variant.max_allocation)

    useMemo(() => {
        setInputVolume(Qty[index].quantity)
    }, [incrementQty, decrementQty])


    const handleSetVolume = () => {
        setInputVolume(Qty[index].quantity)
        inputQtyVolume(record.id, inputVolume)
    }


    return (
        <TableQuantityContainer>
            <QuantityMeter onClick={() => decrementQty(record.id)}>
                -
            </QuantityMeter>
            <span>
                  <QuantityInput
                      type="number"
                      value={inputVolume}
                      onChange={(e) => setInputVolume(parseInt(e.target.value))}
                      onBlur={handleSetVolume}
                  />
            </span>
            <QuantityMeter onClick={() => incrementQty(record.id, maxAllocation)} isStockOut={Qty[index]?.isStockOut}>
                +
            </QuantityMeter>
        </TableQuantityContainer>
    )
}