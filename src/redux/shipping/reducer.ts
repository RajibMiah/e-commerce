import * as types from "./types";
import { AnyAction } from "redux";
import { Timeslot } from "types/timeslot";

export type ShippingState = {
    timeslots: Timeslot[]
}

const INITIAL_STATE: ShippingState = {
    timeslots: []
};

const shippingReducer = (state: ShippingState = INITIAL_STATE, action: AnyAction) => {
    switch (action.type) {
        case types.SET_TIMESLOTS: {
            return {
                ...state,
                timeslots: action.payload.map(item =>{
                    return {
                        ...item,
                        type:'secondary'
                    }
                })
            };
        }
        case types.SET_PRIMARY_TIMESLOT: {
            return {
                ...state,
                timeslots: state.timeslots.map((item) =>
                    (item.id === action.payload.id  && item.is_tomorrow === action.payload.is_tomorrow)
                        ? { ...item, type: "primary" }
                        : { ...item, type: "secondary" }
                )
            };
        }


        default:
            return state;
    }
};

export default shippingReducer;