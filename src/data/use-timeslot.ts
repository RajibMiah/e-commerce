import useSWR from "swr";
import { Timeslot } from "types/timeslot";
import { useDispatch, useSelector } from "react-redux";
import { setTimeslots } from "redux/shipping/action";


const fetcher = (url) => fetch(url).then(async (res) => {
    return res.json();
});

// @ts-ignore
export default function useTimeslot() {
    const dispatch = useDispatch();
    const getUrl = () => {
        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/shipping/v1/timeslots/`;

    };

    const { data, mutate, error } = useSWR(getUrl, fetcher);

    const timeslots: Timeslot[] = data?.map((item, index) => {
        return index === 0
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" };
    });
    const isLoading = !data && !error;

    if (timeslots) dispatch(setTimeslots(timeslots))

    return {
        isLoading,
        data: timeslots,
        mutate,
        error,
    };
}

// @ts-ignore

export default function useUpdatedTimeSlot() {
    const dispatch = useDispatch();

    const getUrl = () => {
        return `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/shipping/v2/timeslots/`;

    };

    const { data, mutate, error } = useSWR(getUrl, fetcher);

    const timeslots: Timeslot[] = data?.map((item, index) => {
        return index === 0
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" };
    });
    const isLoading = !data && !error;

    if (timeslots) dispatch(setTimeslots(timeslots))

    return {
        isLoading,
        data: timeslots,
        mutate,
        error,
    };
}

