import React from "react";
import {CloseIcon} from "assets/icons/CloseIcon";
import {PencilIcon} from "assets/icons/PencilIcon";
import {BsInfoCircle} from 'react-icons/bs'
import {openModal, closeModal} from "@redq/reuse-modal";
import InfoPopup from "./info-popup";
import {ActionButton, CardBadge, CardButtons, CardContent, CardInfo, CardTitle, CardWrapper} from "./radio-card.style";

type RadioCardProps = {
    id: string;
    name: string;
    title: string;
    msgData?: [];
    content: string;
    badgeContent?: string;
    isActive?: boolean;
    editIcon?: any;
    deleteIcon?: any;
    withActionButtons?: boolean;
    onEdit?: (event: React.MouseEvent<HTMLElement>) => void;
    onDelete?: () => void;
    hasEdit?: boolean;
    hasDelete?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    data?: []
    onChange: () => void;
};
const RadioCard: React.FC<RadioCardProps> = ({
                                                 id,
                                                 name,
                                                 title,
                                                 content,
                                                 badgeContent,
                                                 editIcon,
                                                 data,
                                                 deleteIcon,
                                                 msgData,
                                                 withActionButtons,
                                                 onEdit,
                                                 isActive,
                                                 onDelete,
                                                 hasEdit,
                                                 hasDelete,
                                                 disabled,
                                                 checked,
                                                 readOnly,
                                                 onChange,
                                             }) => {


    const handleOpenInfo = () => {

        disabled &&
        openModal({
            show: true,
            config: {
                className: 'cartPopup',
                width: "500px",
                height: 'auto',
                enableResizing: false,
                disableDragging: true,
                transition: {
                    tension: 360,
                    friction: 40,
                },
            },
            closeOnClickOutside: true,
            component: InfoPopup,
            closeComponent: () => <div/>,
            componentProps: {onCloseBtnClick: closeModal, msgData: msgData},
        });

    }
    return (
        <CardWrapper
            isActive={isActive}
            htmlFor={`${name}-${id}`}
            className={`label ${title ? 'item-has-title' : 'no_title'} ${checked ? 'active' : 'not_active'}`}
            onClick={handleOpenInfo}
        >
            <input
                type='radio'
                id={`${name}-${id}`}
                name={name}
                value={content}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
                readOnly={readOnly}
            />

            {
                !isActive && disabled &&
                <CardInfo>
                    <BsInfoCircle/>
                </CardInfo>
            }
            {title && <CardTitle>{title}</CardTitle>}
            {content && <CardContent>{content}</CardContent>}
            {badgeContent && <CardBadge>{badgeContent}</CardBadge>}

            {withActionButtons && (
                <CardButtons className='button-wrapper'>
                    {hasEdit && (
                        <ActionButton onClick={onEdit} className='edit-btn'>
                            {editIcon}
                        </ActionButton>
                    )}
                    {hasDelete && (
                        <ActionButton onClick={onDelete} className='delete-btn'>
                            {deleteIcon}
                        </ActionButton>
                    )}
                </CardButtons>
            )}
        </CardWrapper>
    );
};
RadioCard.defaultProps = {
    title: '',
    content: '',
    editIcon: <PencilIcon/>,
    deleteIcon: <CloseIcon/>,
    withActionButtons: true,
    hasEdit: true,
    hasDelete: true,
};
export default RadioCard;