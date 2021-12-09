import React from "react";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import { closeModal } from "@redq/reuse-modal";
import TextField from "components/forms/text-field";
import { Button } from "components/button/button";
import { FieldWrapper, Heading } from "./address-card.style";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import {addOrUpdateAddress, setPrimaryAddress} from "redux/auth/action";
import { Address } from "types/address";
import {v4 as uuidV4} from "uuid";

// Shape of form values
interface FormValues {
    id?: number | string | null;
    name?: string;
    address?: string;
}

interface FormProps {
    item?: Address | null;
}

const AddressValidationSchema = Yup.object().shape({
   name: Yup.string().trim('').required("Title is required!").min(3),
   address:Yup.string().trim('').required("Address is required").min(10)
});

const CreateOrUpdateAddress: React.FC<FormProps> = ({ item }) => {
    const dispatch = useDispatch();

    const initialValues = {
        id: item.id || null,
        name: item.name || "",
        address: item.address || "",
    };

    const handleSubmit = (values, { setSubmitting}: any) => {
        const addressValue: Address = {
            id: values.id || uuidV4(),
            type: item.type,
            name: values.name,
            address: values.address,
        };
        dispatch(addOrUpdateAddress(addressValue));
        dispatch(setPrimaryAddress(addressValue.id))
        closeModal() || setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={AddressValidationSchema}
        >
            {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                isSubmitting,
            }: FormikProps<FormValues>) => (
                <Form>
                    <Heading>{item && item.id ? "Edit Address" : "Add New Address"}</Heading>
                    <FieldWrapper>
                        <TextField
                            id="name"
                            type="text"
                            placeholder="ex-home"
                            error={touched.name && errors.name}
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FieldWrapper>

                    <FieldWrapper>
                        <TextField
                            id="address"
                            as="textarea"
                            placeholder="Enter Address"
                            error={touched.address && errors.address}
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FieldWrapper>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        style={{ width: "100%", height: "44px" }}
                    >
                        <FormattedMessage id="savedAddressId" defaultMessage="Save Address"/>
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default CreateOrUpdateAddress;