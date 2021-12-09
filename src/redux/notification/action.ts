import {NOTIFICATION_PAYLOAD} from "./types";


export const storeNotificationPayload = (payload) => ({
    type: NOTIFICATION_PAYLOAD,
    payload:payload
});