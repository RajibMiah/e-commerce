import {NOTIFICATION_PAYLOAD} from "./types";


const INITIAL_STATE:any = {
     data: null
};

const  categories = (state:any = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case NOTIFICATION_PAYLOAD:
            return { ...state, data:action.payload};
        default:
            return { ...state };
    }

};

export default categories;
