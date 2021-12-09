import React from 'react'
import {
    BtnContainer, BtnWrapper,
    InactiveMessage,
    InactiveVariantContainer, InactiveVariantTitle, InactiveVariantWrapper,
    InfoPopupContainer,
    InfoPopupSubtitle,
    InfoPopupTitle,
    InfoPopupWrapper
} from "./radio-card.style";
import {Scrollbar} from "components/scrollbar/scrollbar";

const InfoPopup = ({onCloseBtnClick, msgData}) => {

    return (
        <InfoPopupContainer>
            <InfoPopupWrapper>
                <InfoPopupTitle>
                    <span>Time slot is not available</span>
                </InfoPopupTitle>
                <InfoPopupSubtitle>
                    <span>This timeslot is not active. You can remove the following product(s) to order in this timeslot.</span>
                </InfoPopupSubtitle>
                <InactiveVariantContainer>
                    <Scrollbar className='cart-scrollbar'>
                        {
                            msgData.map((msgList , index) => {
                                return (
                                    <InactiveVariantWrapper key={index}>
                                        <InactiveVariantTitle>
                                            <span>{msgList.title}</span>
                                        </InactiveVariantTitle>

                                        <InactiveMessage>
                                            <span>{msgList.message}</span>
                                        </InactiveMessage>
                                    </InactiveVariantWrapper>
                                )
                            })
                        }
                    </Scrollbar>


                </InactiveVariantContainer>

                <BtnContainer>
                    <BtnWrapper onClick={() => onCloseBtnClick()}>
                        OK
                    </BtnWrapper>
                </BtnContainer>
            </InfoPopupWrapper>
        </InfoPopupContainer>
    )
}

export default InfoPopup