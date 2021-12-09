import { Address } from "types/address";

export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    is_phone_verified: boolean;
    avatar: string | null;
    default_billing_address: Address | null;
    default_shipping_address: Address | null;
};

export type Req_variant_id = []