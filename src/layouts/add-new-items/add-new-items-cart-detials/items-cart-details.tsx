import React, {useEffect, useState} from 'react'
import {
    NewItemTextContainer, OrderTable,
    OrderTableWrapper, UpdateBtnContainer, UpdateBtnWrapper
} from "features/user-profile/order/order-details/order-details.style";
import Table from "rc-table";
import {Button} from "@material-ui/core";
import {MdCancel, MdUpdate} from "react-icons/md";
import {useCart} from "contexts/cart/use-cart";
import {RootState} from "features/user-profile/order/order";
import {useSelector} from "react-redux";
import Router from "next/router";
import {NoProductImg, NoProductMsg} from "features/checkouts/checkout-two/checkout-two.style";
import {NoCartBag} from "assets/icons/NoCartBag";
import {FormattedMessage} from "react-intl";

const components = {
    table: OrderTable,
};

const STATIC_PROPS = {
    MINIMUM_ITEM: 1
}

const ItemsCartDetails = ({newItemsTable, orderId, onCloseBtnClick, mutate}) => {
    const {newAddedItem, clearNewCart} = useCart();
    const [addedItems, setAddedItems] = useState([])
    const {access_token} = useSelector((state: RootState) => state.auth);
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: " ", type: ""});
    const [canceled, setIsCanceled] = useState(false)

    useEffect(() => {
        setAddedItems([])
        newAddedItem.map((newItem, index) => {
            if (newItem?.orderId === orderId) {
                setAddedItems((prev) => [...prev, newItem])
            }
        })


    }, [orderId, newAddedItem])

    const handleAddNewItems = async (orderId, items) => {
        const payload = {
            "order": orderId,
            "items": items
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/v1/order-items/add/`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Token ${access_token}`,
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                setIsCanceled(false)
                Router.replace('/order').then()
                setShowAlert({
                    isOpen: true,
                    msg: "Successfully added",
                    type: 'success'
                })
                // @ts-ignore
                // @ts-ignore
                clearNewCart(orderId)
                onCloseBtnClick()
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
    const handleClearCart = () => {
        clearNewCart(orderId)
        Router.replace('/order').then()
        onCloseBtnClick()
    }

    const handleUpload = () => {
        let modifiedItem = []
        let orderId;
        addedItems.map((item) => {
            orderId = item.orderId
            modifiedItem.push({
                "variant": item.id,
                "quantity": item.quantity
            })
        })
        handleAddNewItems(orderId, modifiedItem).then()
    }
    return (
        <div>
            <OrderTableWrapper>
                <NewItemTextContainer>
                    <span>{addedItems.length <= STATIC_PROPS.MINIMUM_ITEM ? "New Item " : "New Items "}</span>
                </NewItemTextContainer>
                {
                    addedItems.length >= STATIC_PROPS.MINIMUM_ITEM ?
                        <Table
                            columns={newItemsTable}
                            data={addedItems}
                            rowKey={(record) => record.id}
                            components={components}
                            className="orderDetailsTable"
                        />
                        :
                        <div style = {{padding:'17px'}}>
                            <NoProductImg>
                                <NoCartBag/>
                            </NoProductImg>
                            <NoProductMsg>
                                <FormattedMessage
                                    id='noProductFound'
                                    defaultMessage='No products found'
                                />
                            </NoProductMsg>
                        </div>
                }
            </OrderTableWrapper>

            <UpdateBtnWrapper>
                <UpdateBtnContainer>
                    <Button variant={"contained"} className={'edit-btn'}
                            onClick={handleClearCart}>
                        <MdCancel className={'btn-icon'}/>
                        <span className={'text'}>Cancel</span>
                    </Button>
                </UpdateBtnContainer>
                {
                    addedItems.length >= STATIC_PROPS.MINIMUM_ITEM &&
                    <UpdateBtnContainer>
                        <Button variant={"contained"} color='primary' className={'update-btn'}
                                onClick={handleUpload}>
                            <MdUpdate className={'update-icon'}/>
                            <span>Update</span>
                        </Button>
                    </UpdateBtnContainer>
                }

            </UpdateBtnWrapper>
        </div>
    )
}

export default ItemsCartDetails