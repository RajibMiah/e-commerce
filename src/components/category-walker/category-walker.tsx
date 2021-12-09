import React, {useState} from 'react';
import {
    WalkerWrapper,
    Category,
    NoCategory,
    CategoryWrapper, IconWrapper, BtnIconWrapper,
} from './category-walker.style';
import {Button} from 'components/button/button';
import SpringModal from 'components/spring-modal/spring-modal';
import {useRouter} from 'next/router';
import startCase from 'lodash/startCase';
import {IoMdArrowDropdown} from 'react-icons/io'

type WalkerProps = {
    parent?: string;
    child?: string;
    style?: any;
    isOpen?: boolean
    setOpen?: any,
    // onClick: () => void;
};

const CategoryWalker: React.FunctionComponent<WalkerProps> = ({
                                                                  children,
                                                                  isOpen,
                                                                  setOpen,
                                                                  style,
                                                              }) => {
    // const [isOpen, setOpen] = useState(false);
    const {query} = useRouter();
    return (
        <WalkerWrapper style={style}>
            <Button
                style={{
                    width: 'auto',
                    minWidth: '50%',
                    border: '1px solid',
                    margin: 'auto'
                }}
                variant="text"
                onClick={() => setOpen(true)}
            >
                <CategoryWrapper>
                    {query.category || query.parent__slug ? (
                        <Category>{startCase(query.category as string || query.parent__slug as string)}</Category>
                    ) : (
                        <Category>{startCase('popular')}</Category>
                        // <NoCategory> No Category Selected </NoCategory>
                    )}
                </CategoryWrapper>
                <BtnIconWrapper>
                    <IoMdArrowDropdown
                        style={{
                            border: "1px solid",
                            borderRadius: '25px'
                        }}
                    />
                </BtnIconWrapper>
            </Button>
            <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
                {children}
            </SpringModal>
        </WalkerWrapper>
    );
};

export default CategoryWalker;
