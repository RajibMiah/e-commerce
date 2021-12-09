import React from 'react';
import {Counter} from 'components/counter/counter';
import {CloseIcon} from 'assets/icons/CloseIcon';
import {CURRENCY} from 'utils/constant';
import {
    ItemBox,
    Image,
    Information,
    Name,
    Price,
    Weight,
    Total,
    RemoveButton,
} from './cart-item.style';

interface Props {
    data: any;
    onDecrement: () => void;
    onIncrement: () => void;
    onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
                                              data,
                                              onDecrement,
                                              onIncrement,
                                              onRemove,
                                          }) => {
    const {title, images, original_price, max_allocation, sale_price, measurement, quantity, discount} = data;
    const displayPrice = sale_price ? sale_price : original_price;
    return (
        <ItemBox>
            <Counter
                value={quantity}
                max_allocation={max_allocation}
                onDecrement={onDecrement}
                onIncrement={onIncrement}
                variant="lightVertical"
            />
            <Image src={images[0]?.thumbnail || "/no-image-available.webp"}/>
            <Information>
                <Name>{title}</Name>
                <Price>
                    {CURRENCY}
                    {displayPrice}
                </Price>
                {
                    discount > 0 &&
                    <Price style={{margin: "0", color: '#77798c'}}>
                        <s>
                            {CURRENCY}
                            {original_price}
                        </s>
                    </Price>
                }

                <Weight>
                    {quantity} x {measurement}
                </Weight>
            </Information>
            <Total>
                {CURRENCY}
                {(quantity * displayPrice).toFixed(2)}
            </Total>
            <RemoveButton onClick={onRemove}>
                <CloseIcon/>
            </RemoveButton>
        </ItemBox>
    );
};