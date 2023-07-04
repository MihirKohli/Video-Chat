import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';



const getFormNotValidMessage = () => {
    return 'Enter correct email address and password should between 6-12 character';
}

const getFormValidMessage = () => {
    return 'Press to Log in';
}


const LoginPageFooter = ({ handleLogin, isFormValid }) => {
    const history = useNavigate();
    const handlerPushToRegisterPage = () => {
        history('/register');
    };


    return (
        <>
            <Tooltip
                title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
            >

                <div>
                    <CustomPrimaryButton
                        label='Log in'
                        additionalStyles={{ marginTop: '30px' }}
                        disabled={!isFormValid}
                        onClick={handleLogin}
                    />
                </div>

            </Tooltip>
                <RedirectInfo
                    text='Need an account? '
                    redirectText='Create an account'
                    additionalStyles={{ marginTop: '5px' }}
                    redirectHandler={handlerPushToRegisterPage}
                />

        </>
    );
};

export default LoginPageFooter;