import React, {useContext, useState, useRef, useEffect} from 'react';
import {ProfileContext} from 'contexts/profile/profile.context';
import {
    SettingsForm,
    SettingsFormContent,
    HeadingSection,
    Title,
    Row,
    Col,
} from './settings.style';
import {Button} from 'components/button/button';
import {Input} from 'components/forms/input';
import {FormattedMessage} from 'react-intl';
import {Label} from 'components/forms/label';
import Contact from 'features/contact/contact';
import Address from 'features/address/address';
import Payment from 'features/payment/payment';
import {useSelector, useDispatch} from 'react-redux';
import {editUserName} from "redux/auth/action";
import MuiAlert from "components/meterial-ui/alert-message/MuiAlert";
import {mutate} from "swr";
import * as Yup from "yup";

type SettingsContentProps = {
    deviceType?: {
        mobile: boolean;
        tablet: boolean;
        desktop: boolean;
    };
};
type RootState = {
    auth: any
}

const userNameValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim('').required("First name is required!").min(2 , 'First name must be at least 2 characters'),
    lastName: Yup.string().trim('').required("Last name is required").min(2, 'Last name must be at least 2 characters')

});


const SettingsContent: React.FC<SettingsContentProps> = ({deviceType}) => {
    const {state} = useContext(ProfileContext);
    const {email} = useSelector((state: RootState) => state.auth?.user) || 'null';
    const {first_name, last_name} = useSelector((state: RootState) => state.auth.user)|| 'null';
    const [userName, setUserName] = useState<any>({first_name, last_name})
    const [showAlert, setShowAlert] = useState({isOpen: false, msg: '', type: ''})
    const [edit, setEdit] = React.useState<boolean>(true)
    const {access_token} = useSelector((state: RootState) => state.auth)|| 'null';
    const {user} = useSelector((state: RootState) => state.auth)|| 'null';
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const handleChange = (e) => {
        const {value, name} = e.target;
        setUserName({
            ...userName,
            [name]: value
        })
        // dispatch({
        //     type: 'HANDLE_ON_INPUT_CHANGE',
        //     payload: {value, field: name},
        // });
    };

    const handleEdit = () => {
        setEdit(false)
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [edit])

    const handleSave = async (e) => {
        e.preventDefault()
        userNameValidationSchema
            .validate({
                firstName: userName.first_name,
                lastName: userName.last_name,
            })
            .then(async (value) => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/accounts/v1/user/`, {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Token ${access_token}`,
                        },
                        method: 'PATCH',
                        body: JSON.stringify({
                            first_name: userName.first_name,
                            last_name: userName.last_name,
                        })
                    })
                    if (response.ok) {
                        setEdit(true)
                        dispatch(editUserName(userName))
                        setShowAlert({
                            ...showAlert,
                            isOpen: true,
                            msg: 'user name updated successfully ',
                            type: 'success'
                        })
                        mutate(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/api/accounts/v1/user/`).then()
                    }
                } catch (error) {
                    setEdit(true)
                    setShowAlert({
                        ...showAlert,
                        isOpen: true,
                        msg: error,
                        type: 'error'
                    })

                }
            })
            .catch((err) => {
                setShowAlert({
                    ...showAlert,
                    isOpen: true,
                    msg: err.errors[0],
                    type: 'warning'
                })
            });
    };

    return (
        <>
            <SettingsForm>
                <SettingsFormContent>
                    <HeadingSection>
                        <Title>
                            <FormattedMessage
                                id='profilePageTitle'
                                defaultMessage='Your Profile'
                            />
                        </Title>
                        {/*<small>(Coming soon..)</small>*/}
                    </HeadingSection>

                    <Row style={{alignItems: 'flex-end', marginBottom: '50px'}}>
                        <Col xs={12} sm={12} md={5} lg={5}>
                            <Label>
                                <FormattedMessage
                                    id='profileFirstNameField'
                                    defaultMessage='First Name'
                                />
                            </Label>
                            <Input
                                ref={inputRef}
                                disabled={edit}
                                type='text'
                                label='First Name'
                                name='first_name'
                                value={userName.first_name}
                                onChange={handleChange}
                                backgroundColor='#F7F7F7'
                                height='48px'
                            />
                        </Col>
                        <Col xs={12} sm={12} md={5} lg={5}>
                            <Label>
                                <FormattedMessage
                                    id='profileLastNameFiled'
                                    defaultMessage='Last Name'
                                />
                            </Label>
                            <Input
                                ref={inputRef}
                                disabled={edit}
                                type='text'
                                label='Last Name'
                                name='last_name'
                                value={userName.last_name}
                                onChange={handleChange}
                                backgroundColor='#F7F7F7'
                                height='48px'
                            />
                        </Col>
                        <Col xs={12} sm={2} md={2} lg={2}>
                            {
                                edit ?
                                    <Button size='big' style={{width: '100%'}} onClick={handleEdit}>
                                        <FormattedMessage id='profileEditBtn' defaultMessage='Edit'/>
                                    </Button>
                                    :
                                    <Button size='big' style={{width: '100%'}} onClick={handleSave}>
                                        <FormattedMessage id='profileSaveBtn' defaultMessage='Save'/>
                                    </Button>
                            }
                        </Col>

                    </Row>
                    <Row style={{alignItems: 'flex-end', marginBottom: '50px'}}>
                        <Col xs={12} sm={5} md={5} lg={5}>
                            <Label>
                                <FormattedMessage
                                    id='profileEmailField'
                                    defaultMessage='Your Email'
                                />
                            </Label>
                            <Input
                                disabled
                                type='email'
                                name='email'
                                label='Email Address'
                                value={email}
                                onChange={handleChange}
                                backgroundColor='#F7F7F7'
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <SettingsFormContent>
                                <Contact/>
                            </SettingsFormContent>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} style={{position: 'relative'}}>
                            <SettingsFormContent>
                                <Address/>
                            </SettingsFormContent>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <SettingsFormContent>
                                <Payment deviceType={deviceType}/>
                            </SettingsFormContent>
                        </Col>
                    </Row>


                </SettingsFormContent>
            </SettingsForm>
            <MuiAlert
                showAlert={showAlert}
                setOpen={setShowAlert}
            />
        </>
    );
};

export default SettingsContent;