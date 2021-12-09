import {SUB_CATEGORIES, IS_SUBCATEGORY, BY_NETWORK, SEARCH_INIT} from "./type";

export const storeChildren = (children) => ({
    type: SUB_CATEGORIES,
    payload:children
});
export const storeChildrenByNetworkCall = (children) => ({
    type: BY_NETWORK,
    payload:children
});
export const isChildren = () =>({
    type: IS_SUBCATEGORY,
})
// export const isSearching = ()=>({
//     type:SEARCH_INIT
// })