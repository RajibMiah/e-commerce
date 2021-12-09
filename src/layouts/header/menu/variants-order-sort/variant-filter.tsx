import React, {useEffect, useState} from 'react';
import {Box, SelectedItem, Flag, MenuItem, PlayStore,DropIconStyle} from "./variant-filter.style";
import VariantPopover from 'components/popover/variantpopover';
import {FormattedMessage} from 'react-intl';
import { openModal } from "@redq/reuse-modal";
import {filter_menu} from "../../../../site-settings/site-navigation";
import {useRouter} from "next/router";
import {BiFilterAlt} from 'react-icons/bi'
import {IoIosArrowDropdown} from 'react-icons/io'
import {toggleSignInForm} from "redux/auth/action";
import AuthenticationForm from "features/authentication-form";

// const FlagIcon = ({name}) => {
//     const TagName = flagIcons[name];
//     return !!TagName ? <TagName/> : <p>Invalid icon {name}</p>;
// };

const handleJoin = () => {
    openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: true,
        component: AuthenticationForm,
        closeComponent: "",
        config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: 458,
            height: "auto",
            animationFrom: { opacity: "0" }, // react-spring <Spring from={}> props value
            animationTo: { opacity: "1" }, //  react-spring <Spring to={}> props value
            transition: {
                delay: 500,
            },
            withRnd: false,
        },
    });
};


const FilterMenu = ({onClick}) => {
    return (
        <>
            {filter_menu.map((item) => (
                <MenuItem
                    onClick={() => {
                        onClick(item.href)
                    }}
                    key={item.id}
                    value={item.id}
                >
                      <span>
                         <BiFilterAlt/>
                      </span>
                    <FormattedMessage id={item.id} defaultMessage={item.defaultMessage}/>
                </MenuItem>
            ))}
        </>
    );
};

const textSwitch = (text) => {
    switch (text) {
        case "original_price":
            return 'Price - Low to High'
        case "-original_price":
            return 'Price - High to Low'
        case "-rating":
            return 'Rating - High to Low'
        default:
            return "Filter"
    }

}

const VariantFilter: React.FC<{}> = () => {
    const router = useRouter()
    const [text, setText] = useState('filter')
    const {pathname, query} = router
    const {type, ...rest} = query;

    const variantFilterHandler = (href) => {
        if (href !== 'default') {
            router.push(
                {
                    pathname,
                    query: {...rest, ordering: href},
                },
                {
                    pathname: `/${type}`,
                    query: {...rest, ordering: href},
                }
            );
        } else {
            let storeQuery = query.text ? {text: query.text} : {category: query.category}
            router.push(
                {
                    pathname,
                    query: storeQuery,
                },
                {
                    pathname: `/${type}`,
                    query: storeQuery,
                }
            );
        }
    };

    useEffect(() => {
        setText(textSwitch(query.ordering))
    }, [query.ordering])

    return (
        <>
            <Box>
                {
                    (query.category || (query.type === "grocery" && !query.category && !query.categories && !query.parent__slug)) ?
                        <VariantPopover
                            className="right"
                            handler={
                                <SelectedItem>
                                    <Flag>
                                        <BiFilterAlt/>
                                    </Flag>
                                    <span>
                                      <FormattedMessage
                                          id={filter_menu[0]?.id}
                                          defaultMessage={text}
                                      />
                                    </span>
                                    <DropIconStyle>
                                        <IoIosArrowDropdown
                                            style ={{
                                                position: 'absolute',
                                                right: 'calc(100% - 98%)',
                                                fontSize:'1.5rem'
                                            }}

                                        />
                                    </DropIconStyle>
                                </SelectedItem>
                            }
                            content={<FilterMenu onClick={variantFilterHandler}/>}
                        />
                        : null
                }
            </Box>
        </>
    );
}

export default VariantFilter;
