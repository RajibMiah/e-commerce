import React, {useEffect, useMemo, useState} from "react";
import {FormattedMessage} from "react-intl";
import RadioGroup from "components/radio-group/radio-group";
import RadioCard from "components/radio-card/radio-card";
import {CardHeader, ScheduleContainer} from "components/card-header/card-header";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {fetchTimeslots, setPrimaryTimeslot} from "redux/shipping/action";
import {ShippingState} from "redux/shipping/reducer";
import Loader from "components/loader/loader";
import AlertMessage from "components/alert-message/alert-message";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {CardNumTitle} from "components/payment-card/payment-card.style";
import {useMedia} from "utils/use-media";
import SimplePopover from "./time-schedule-filter";
import {mapServerProgress} from "../user-profile/order/order";
import {useCart} from "contexts/cart/use-cart";
import {AuthState} from "redux/auth/reducer";
import {OrderState} from "redux/order/reducer";

type RootState = {
    auth: AuthState;
    shipping: ShippingState;
}

interface Props {
    increment?: boolean;
}

interface Theme {
    palette: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    selectStyle: {
        '& .MuiFormControl-root': {
            width: '100%',
        },
        "& .MuiSelect-select": {
            border: '1px solid',
            borderColor: theme.palette.primary.main,
            minHeight: '2.5rem',
            paddingLeft: "1rem"
        },
        "& .MuiSelect-icon": {
            right: '13px'
        }

    }
}))


const Schedules = ({increment = false}: Props) => {
    const classes = useStyles()
    const {items} = useCart();
    const dispatch = useDispatch();
    const mobile = useMedia("(max-width: 580px)");
    const [today, setToday] = useState(true)
    const {timeslots} = useSelector((state: RootState) => state.shipping);
    const [sortedSlots, setSortedSlots] = useState([])
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const onSuccess = () => {
        setLoading(false)

    };


    const onError = (err) => {
        setLoading(false);
        setShowAlert(true);
        setAlertMessage({
            type: "error",
            text: "An error occurred while fetching available timeslots!"
        });
    };

    useMemo(()=>{
        const newArray = timeslots.filter((item) => item.is_tomorrow !== today)
        setSortedSlots(newArray)
    },[timeslots])

    useEffect(() => {
        setLoading(true);
        dispatch(fetchTimeslots(onSuccess, onError));
    }, [items, today]);

    const toTime = (timeStr) => moment(timeStr, "HH:mm:ss").format("h:mm A");

    // const handleChange = (event) => {
    //      dispatch(setPrimaryTimeslot(parseInt(event.target.value)))
    // };

    return (
        <>
            <CardHeader increment={increment}>
                <ScheduleContainer>
                    <FormattedMessage
                        id="deliverySchedule"
                        defaultMessage="Select Your Delivery Schedule"
                    />
                    <div>
                        <SimplePopover today={today} setToday={setToday}/>
                    </div>

                </ScheduleContainer>

            </CardHeader>

            {!loading ? (
                <RadioGroup
                    items={sortedSlots}
                    component={(item: any) => (
                        <RadioCard
                            id={item.id}
                            key={item.id}
                            isActive={item.is_active}
                            disabled={!item.is_active}
                            msgData={item?.inactive_for_variants}
                            title={item.is_tomorrow === true ? "Tomorrow" : "Today"}
                            content={`${toTime(item.start_time)} - ${toTime(item.end_time)}`}
                            name="schedule"
                            checked={item.type === "primary"}
                            data={item}
                            withActionButtons={false}
                            onChange={() => dispatch(setPrimaryTimeslot(item.id, item.is_tomorrow))}
                        />
                    )}
                />
                // mobile ?
                    // <div className={classes.selectStyle}>
                    //     <FormControl>
                    //         <Select name="schedule" native defaultValue={timeSlotsValue} id="grouped-native-select"
                    //                 value={timeSlotsValue} onChange={handleChange}>
                    //             <option aria-label="None" value="None">None</option>
                    //             {
                    //                 timeslots.map((slots, index) => {
                    //                     return (
                    //                         <option
                    //                             key={index}
                    //                             value={slots.id}
                    //                         >
                    //                             {slots.is_tomorrow === true ? "Tomorrow  " : "Today"}
                    //
                    //                             {`${toTime(slots.start_time)} - ${toTime(slots.end_time)}`}
                    //
                    //                         </option>
                    //                     )
                    //                 })
                    //             }
                    //         </Select>
                    //     </FormControl>
                    // </div>
                    // :

            ) : (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px"
                }}>
                    <Loader/>
                </div>
            )}

            <AlertMessage message={alertMessage} open={showAlert} setOpen={setShowAlert}/>
        </>
    );
};

export default Schedules;