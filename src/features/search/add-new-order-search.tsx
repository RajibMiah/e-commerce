import React, {useEffect, useState} from "react";
import {SearchBox} from "components/search-box/search-box";
import {useAppDispatch} from "contexts/app/app.provider";
import {useRouter} from "next/router";
import {useIntl} from "react-intl";
import {useDispatch} from "react-redux";
import {isChildren} from "redux/category/action";


interface Props {
    minimal?: boolean;
    showButtonText?: boolean;
    onSubmit?: () => void;
    onCloseBtnClick:()=>void;
    [key: string]: unknown;
}

const AddNewOrderSearch: React.FC<Props> = ({onSubmit,onCloseBtnClick, ...props}) => {
    const [searchTerm, setSearchTerm] = useState<any>("");
    const [searchDelay, setSearchDelay] = useState<number>(800) // 1000 ms for 1s
    const dispatch = useAppDispatch();
    const rdDispatch = useDispatch()
    const router = useRouter();
    const intl = useIntl();
    const {query} = router;

    const onSearch = (e) => {
        e.preventDefault()
        const {type, ...rest} = query;
        if (type) {
            router.push(
                {
                    pathname: '/order',
                    query: {text: searchTerm},
                },
                {
                    pathname: `/${type}`,
                    query: {text: searchTerm},
                }
            ).then();
        } else {
            router.push({
                pathname: "/order",
                query: {text: searchTerm},
            }).then();

        }
        dispatch({type: "SET_SEARCH_TERM", payload: ""});
        rdDispatch(isChildren())
        if (onSubmit) onSubmit();
    };

    const onAutoSearch = () =>{
        const {type, ...rest} = query;
        if (type) {
            router.push(
                {
                    pathname: '/order',
                    query: {text: searchTerm},
                },
                {
                    pathname: `/${type}`,
                    query: {text: searchTerm},
                }
            ).then();
        } else {
            router.push({
                pathname: "/order",
                query: {text: searchTerm},
            }).then();

        }
        dispatch({type: "SET_SEARCH_TERM", payload: ""});
        rdDispatch(isChildren())
        if (onSubmit) onSubmit();
    }

    useEffect(() => {
        let handler
        if(searchTerm.length) {
            handler = setTimeout((event) => {
                onAutoSearch()
            }, searchDelay)
        }
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm])

    return (
        <SearchBox
            onEnter={onSearch}
            onChange={(e) => {
                setSearchTerm(e.target.value)
            }}
            value={searchTerm}
            name="search"
            placeholder={intl.formatMessage({
                id: "searchPlaceholder",
                defaultMessage: "Search your products from here",
            })}
            categoryType={query.type || "grocery"} //|| "restaurant"
            buttonText={intl.formatMessage({
                id: "searchButtonText",
                defaultMessage: "Search",
            })}
            {...props}
        />
    );
};


export default AddNewOrderSearch;