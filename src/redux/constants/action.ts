import { CONSTANTS_PAYLOAD} from "./types";

export const persist_constant= (payload) => ({
    type: CONSTANTS_PAYLOAD,
    payload:payload
});


// export const alert_message = (payload) =>({
//     type: ALERT_MESSAGE,
//     payload:payload,
// })