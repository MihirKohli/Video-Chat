import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';



const getFormNotValidMessage = () => {
    return 'Username should contains between 3-12 characters and password should contains between 6-12 characters';
};

const getFormValidMessage = () => {
    return 'Press to register';
};


const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
    const history = useNavigate();
    const handlerPushToLoginPage = () => {
        history('/login');
    };


    return (
        <>
            <Tooltip
                title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
            >

                <div>
                    <CustomPrimaryButton
                        label='Register'
                        additionalStyles={{ marginTop: '30px' }}
                        disabled={!isFormValid}
                        onClick={handleRegister}
                    />
                </div>

            </Tooltip>
            <RedirectInfo
                text='Already have an account? '
                redirectText='Login'
                additionalStyles={{ marginTop: '5px' }}
                redirectHandler={handlerPushToLoginPage}
            />

        </>
    );
};

export default RegisterPageFooter;