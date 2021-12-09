export type Timeslot = {
    id: number;
    type?: string;
    start_time: string;
    end_time: string;
    request_prior_seconds: number;
    is_tomorrow: boolean;
};