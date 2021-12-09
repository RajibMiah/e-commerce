import React from 'react';
import {Plus, Minus} from 'assets/icons/PlusMinus';
import {CounterBox, CounterButton, CounterValue} from './counter.style';

interface Props {
    onDecrement: (e: Event) => void;
    onIncrement: (e: Event) => void;
    value: number;
    variant?: string;
    className?: string;
    max_allocation?: number;
}

export const Counter: React.FC<Props> = ({
                                             onDecrement,
                                             onIncrement,
                                             value,
                                             max_allocation,
                                             variant,
                                             className,
                                         }) => {
    return (
        <CounterBox variant={variant} className={className}>
            <CounterButton onClick={onDecrement} variant={variant}>
                <Minus/>
            </CounterButton>
            <CounterValue>{value}</CounterValue>
            {
                max_allocation > value ?
                    <CounterButton onClick={onIncrement} variant={variant}>
                        <Plus/>
                    </CounterButton>
                    :
                    <CounterButton  variant={variant}>
                        <Plus style = {{opacity:"0.3"}} />
                    </CounterButton>
            }


        </CounterBox>
    );
}
;
