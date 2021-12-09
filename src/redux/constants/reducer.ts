import { CONSTANTS_PAYLOAD} from "./types";

const INITIAL_STATE: any = {
    data: null,
};

const constants = (state: any = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case CONSTANTS_PAYLOAD:
            return {...state, data: action.payload};
        // case ALERT_MESSAGE:
        //     return {
        //         ...state,
        //         alert_box: {
        //             ...state.alert_box,
        //             showAlert: action.payload.showAlert,
        //             setShowAlert: action.payload.setShowAlert
        //         }
        //     }
        default:
            return {...state};
    }

};

export default constants;
