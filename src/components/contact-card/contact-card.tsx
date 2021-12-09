import React, {useEffect} from "react";
import styled from "styled-components";
import {themeGet} from "@styled-system/theme-get";
import * as Yup from "yup";
import {ErrorMessage, Form, Formik, FormikProps} from "formik";
import MaskedInput from "react-text-mask";
import {Button} from "components/button/button";
import {FieldWrapper, Heading} from "./contact-card.style";
import {FormattedMessage} from "react-intl";
import {Contact} from "types/contact";
import firebase from "utils/firebase/firebase-config";
import OtpPopup from "../cart-popup/otp-popup";
import {handleModal} from "../../features/checkouts";


// Shape of form values
type FormValues = {
    id?: number | string | null;
    number?: string;
};

type FormProps = {
    item?: Contact | null;
};

const ContactValidationSchema = Yup.object().shape({
    number: Yup.string()
        .required("Number is required")
        .transform(value => value.replace(/[^\d]/g, ""))
        .length(13, "Enter a valid mobile number"),
});

const CreateOrUpdateContact: React.FC<FormProps> = ({item}) => {
    const initialValues = {
        id: item.id || null,
        number: item.number || "",
    };

    const handleSubmit = async (values: FormValues, {setSubmitting}: any) => {
        // @ts-ignore
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = values.number
        try {
            // @ts-ignore
            const confirmationResult = await firebase.auth().signInWithPhoneNumber(
                phoneNumber,
                appVerifier
            );
            // @ts-ignore
            window.confirmationResult = confirmationResult;
            const contactValue: Contact = {
                id: values.id,
                type: item.type,
                number: values.number,
                isVerified: true,
            };
            const props = {
                contactValue,
                setSubmitting
            }
            handleModal(OtpPopup,props)
        } catch (err) {
            console.log(err)
            // @ts-ignore
            if (window.captchaWidgetId) {
                // @ts-ignore
                window.grecaptcha.reset(window.captchaWidgetId);
            } else {
                // @ts-ignore
                window.recaptchaVerifier
                    .render()
                    .then(function (widgetId) {
                        // @ts-ignore
                        window.captchaWidgetId = widgetId;
                        // @ts-ignore
                        window.grecaptcha.reset(widgetId);
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        }


    };

    useEffect(() => {
        // @ts-ignore
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            'captchaContainer',
            {
                size: 'invisible',
                callback: () => {
                    // ...
                }
            }
        );
    }, [])

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={ContactValidationSchema}
            >
                {({
                      values,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                  }: FormikProps<FormValues>) => (
                    <Form>
                        <Heading>
                            {item && item.id ? "Edit Contact" : "Add New Contact"}
                        </Heading>
                        <FieldWrapper>
                            <MaskedInput
                                mask={[
                                    // +88 01684-409866
                                    "+",
                                    "8",
                                    "8",
                                    " ",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    "-",
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/
                                ]}
                                className="form-control"
                                placeholder="Enter a phone number"
                                guide={false}
                                id="my-input-id"
                                value={values.number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="number"
                                render={(ref: any, props: {}) => (
                                    <StyledInput ref={ref} {...props} />
                                )}
                            />
                        </FieldWrapper>
                        <ErrorMessage name="number" component={StyledError}/>

                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            style={{width: "100%", height: "44px"}}
                        >
                            <FormattedMessage
                                id="savedContactId"
                                defaultMessage="Save Contact"
                            />
                        </Button>
                        <div id="captchaContainer"/>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateOrUpdateContact;

const StyledInput = styled.input`
  width: 100%;
  height: 54px;
  border-radius: ${themeGet("radii.base", "6px")};
  font-family: ${themeGet("fonts.body", "Lato, sans-serif")};
  border: 1px solid ${themeGet("colors.gray.700", "#e6e6e6")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  font-size: 16px;
  line-height: 19px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  padding: 0 18px;
  box-sizing: border-box;
  transition: border-color 0.25s ease;

  &:hover,
  &:focus {
    outline: 0;
  }

  &:focus {
    border-color: ${themeGet("colors.primary.regular", "#009e7f")};
  }

  &::placeholder {
    color: ${themeGet("colors.text.regular", "#77798C")};
  }
`;

const StyledError = styled.div`
  color: red;
  padding-bottom: 10px;
  margin-top: -5px;
`;