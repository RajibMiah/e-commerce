import React from 'react'
import {openModal, closeModal} from '@redq/reuse-modal';
import AddOrderVariantList from "components/product-grid/add-order-product-list/add-order-variant-list";
import AddNewOrderSearch from "features/search/add-new-order-search";
import {AiFillCloseCircle} from 'react-icons/ai'
import {
    AddItemRootContainer,
    AddItemSearchWrapper,
    AddItemVariantWrapper, CloseBtnWrapper,
    CloseContainer, DoneContainer, DoneWrapper, HeaderContainer,
} from "./add-items.style";
import ItemsCartDetails from "layouts/add-new-items/add-new-items-cart-detials/items-cart-details";
import {FormattedMessage} from "react-intl";
import {
    ImageWrapper,
    ItemDetails,
    ItemName, ItemPrice,
    ItemSize,
    ItemWrapper
} from "features/user-profile/order/order.style";
import {CURRENCY} from "utils/constant";
import Router from "next/router";

const newItemsTable = [
    {
        title: <FormattedMessage id='cartItems' defaultMessage='Items'/>,
        dataIndex: "items",
        key: "items",
        width: 250,
        ellipsis: true,
        render: (text, record) => {
            return (
                record.quantity !== 0 &&
                <ItemWrapper>
                    <ImageWrapper>
                        <img src={record.images?.[0]?.thumbnail || '/no-image-available.webp'} alt={record.title}/>
                    </ImageWrapper>

                    <ItemDetails>
                        <ItemName>{record.title}</ItemName>
                        <ItemSize>{record.measurement}</ItemSize>
                        <ItemPrice>{CURRENCY}{record.sale_price}</ItemPrice>
                        {
                            record.discount > 0 &&
                            <ItemPrice style={{margin: "0", color: '#77798c'}}>
                                <s>{record.original_price}</s>
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
        render: (text, record) => {
            return record.quantity !== 0 && <p>{record.quantity}</p>
        },
    },
    {
        title: <FormattedMessage id='intlTableColTitle3' defaultMessage='Price'/>,
        dataIndex: "price",
        key: "price",
        align: "right",
        width: 100,
        render: (text, record) => {
            return record.quantity !== 0 && <p>{CURRENCY}{record.sale_price * record.quantity}</p>
        },
    },
]

const AddItems = ({onCloseBtnClick, orderId, mutate}) => {
    const PAGE_TYPE = "grocery";

    const handleClosePopup = (orderId) => {
        openModal({
            show: true,
            config: {
                className: 'cartPopup',
                width: '75%',
                height: 'auto',
                enableResizing: false,
                disableDragging: true,
                animationFrom: {transform: 'scale(1)'},
                animationTo: {transform: 'scale(1)'},
                transition: {
                    tension: 360,
                    friction: 40,
                },
            },
            closeOnClickOutside: false,
            component: ItemsCartDetails,
            closeComponent: () => <div/>,
            componentProps: {
                onCloseBtnClick: closeModal,
                scrollbarHeight: 330,
                newItemsTable: newItemsTable,
                orderId,
                mutate: mutate
            },
        });
    }

    return (
        <AddItemRootContainer>
            <HeaderContainer>
                <CloseContainer>
                    <CloseBtnWrapper onClick={() => {
                        Router.replace('/order').then()
                        onCloseBtnClick()
                    }}>
                        <AiFillCloseCircle className={'close-icon'}/>
                    </CloseBtnWrapper>
                </CloseContainer>

                <AddItemSearchWrapper>
                    <AddNewOrderSearch minimal={false} onCloseBtnClick={onCloseBtnClick} className="headerSearch"/>
                </AddItemSearchWrapper>
            </HeaderContainer>

            <AddItemVariantWrapper>
                <AddOrderVariantList
                    type={PAGE_TYPE}
                    fetchLimit={10}
                    orderId={orderId}
                />
                <DoneContainer>
                    <DoneWrapper onClick={() => handleClosePopup(orderId)}>
                        Done
                    </DoneWrapper>
                </DoneContainer>
            </AddItemVariantWrapper>


        </AddItemRootContainer>
    )
}
export default AddItems