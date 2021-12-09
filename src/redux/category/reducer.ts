import {SUB_CATEGORIES, IS_SUBCATEGORY, BY_NETWORK, SEARCH_INIT} from "./type";



const INITIAL_STATE:any = {
    isSearching: true,
    hasChildren: true,
    child:[]
};

const  categories = (state:any = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SUB_CATEGORIES:
            return { ...state, child: action.payload.children , hasChildren: action.payload.is_leaf};
        case BY_NETWORK:{
            return { ...state, child: action.payload, hasChildren: false};
        }
        case IS_SUBCATEGORY:
            return {...state , hasChildren:true }
        // case SEARCH_INIT:
        //     return {...state, isSearching: !state.isSearching}
        default:
            return { ...state };
    }

};

export default categories;
