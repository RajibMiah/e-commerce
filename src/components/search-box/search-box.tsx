import React from 'react';
import {
    StyledForm,
    StyledInput,
    StyledCategoryName,
    StyledSearchButton,
} from './search-box.style';
import {SearchIcon} from 'assets/icons/SearchIcon';
import {useMedia} from "../../utils/use-media";

interface Props {
    onEnter: (e: React.SyntheticEvent) => void;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    name: string;
    minimal?: boolean;
    className?: string;
    showButtonText?: boolean;
    shadow?: string;

    [key: string]: unknown;
}

export const SearchBox: React.FC<Props> = ({
                                               onEnter,
                                               onChange,
                                               value,
                                               name,
                                               minimal,
                                               categoryType,
                                               buttonText,
                                               className,
                                               showButtonText = true,
                                               shadow,
                                               ...rest
                                           }) => {
    const mobile = useMedia("(max-width: 580px)");
    return (
        <StyledForm
            onSubmit={onEnter}
            className={className}
            boxShadow={shadow}
            minimal={minimal}
        >
            {minimal ? (
                <>
                    <SearchIcon style={{marginLeft: 16, marginRight: 16}}/>
                    <StyledInput
                        type='search'
                        onChange={onChange}
                        value={value}
                        name={name}
                        {...rest}
                    />
                </>
            ) : (
                <>
                    {!mobile && <StyledCategoryName>{categoryType}</StyledCategoryName>}
                    <StyledInput
                        type='search'
                        onChange={onChange}
                        value={value}
                        name={name}
                        {...rest}
                    />
                    {
                        !mobile &&
                        <StyledSearchButton>
                            <SearchIcon style={{marginRight: 10}}/>
                            {showButtonText && buttonText}
                        </StyledSearchButton>
                    }

                </>
            )}
        </StyledForm>
    );
};
