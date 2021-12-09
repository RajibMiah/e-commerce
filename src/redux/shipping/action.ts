import * as types from "./types";
import {Timeslot} from "types/timeslot";
import {isBrowser} from "redux/utils";

export const fetchTimeslots = (onSuccess?, onError?) => async dispatch => {
    dispatch(setTimeslots([]));

    const url = `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/shipping/v2/timeslots/`; //v1 is parimary
    const response = await fetch(url, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("access_token")}`,
        },
    });

    // await delay(5000);

    if (!response.ok) {
        onError?.(response);
        return;
    }

    const timeslots: Timeslot[] = await response.json();
    if (isBrowser) dispatch(setTimeslots(timeslots));

    onSuccess?.(response);
};

export const setTimeslots = (timeslots: Timeslot[]) => ({
    type: types.SET_TIMESLOTS,
    payload: timeslots
});

export const setPrimaryTimeslot = (id: number , is_tomorrow) => ({
    type: types.SET_PRIMARY_TIMESLOT,
    payload: {id , is_tomorrow}
});