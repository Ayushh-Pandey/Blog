import React, { useState } from 'react'
import { AppBar, Button, Toolbar, Typography, styled } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../service/api';
import { getAccessToken, getRefreshToken } from '../../utils/common-utils';

const Component = styled(AppBar)`
    background:#FFFFFF;
    color:#000;
`;

const Container = styled(Toolbar)`
    justify-content:center;
    &>a{
        padding:20px;
        color:inherit;
        text-decoration:none
    }
`;

const LogoutButton = styled(Button)`
    text-decoration:none;
    text-transform:none;
    color:black;
    border:none
    &>hover:{
        background-color:inherit;
    }
    
`;

const Header = () => {
    const [error,setError] = useState('')

    const navigate = useNavigate();

    let token = getAccessToken();

    const handleLogout = async()=>{
        try {
            const refreshToken = getRefreshToken().split(" ")[1]
            const response = await API.userLogout({token:refreshToken});
            console.log(response)
            if(response.status===204){
                sessionStorage.removeItem('accessToken')
                sessionStorage.removeItem('refreshToken')
                navigate('/')
            }
        } catch (error) {
            setError('Error occured, try again later')
        }
    }

    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                {token ?
                    <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
                    :
                    <Link to='/login'>LOGIN</Link>
                }
            </Container>
        </Component>
    )
}

export default Header