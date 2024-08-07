import React,{useState,useContext} from 'react';
import {Box,TextField,Button,styled, Typography} from '@mui/material';
import { API } from '../../service/api';
import {DataContext} from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom';
import accountBanner from "./banner.avif"
const Component = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width:300,
    margin:'auto',
    display:'flex',
    padding:'25px 0 0',
    objectFit:'cover'
});

const Wrapper = styled(Box)`
    padding:0 25px 25px 25px;
    display:flex;
    flex:1;
    flex-direction:column;
    &> div,&>button,&>p{
        margin-top:20px
    }
`;

const LoginBUtton = styled(Button)`
    text-transform:none;
    background:#FB641B;
    color:#fff;
    height: 40px;
    border-radius:2px;
`;

const SignupButton = styled(Button)`
    text-transform:none;
    background:#fff;
    color:#2874f0
    height: 40px;
    border-radius:2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
    color:#878787;
    font-size: 16px
`;

const Error = styled(Typography)`
    font-size:14px;
    color:#ff6161;
    line-height: 0;
    margin-top:10px;
    font-weight:600;
    
`;

const signupInitialval ={
    name:'',
    username:'',
    password:''
}

const loginInitialval ={
    username: '',
    password: ''
}
const Login = ({isUserAuthenticated}) => {
    const [account,toggleAccount] = useState('login');
    const [signup,setSignup] = useState(signupInitialval);
    const [error,setError] = useState(null);
    const [login,setLogin] = useState(loginInitialval);

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = ()=>{
        account==='login'? toggleAccount('signup'):toggleAccount('login')
    }

    const onInputChange = (e)=>{
        setSignup({...signup,[e.target.name]:e.target.value});
    }
    
    const signupUser = async ()=>{
        try {
            let response = await API.userSignup(signup);
            if(response.isSuccess){
                // setError('');
                setSignup(signupInitialval);
                toggleAccount('login');
            }
            else{
                setError('Something went wrong: Please try again later')
            }
        } catch (error) {
            setError('Username already exist')
        }
    }

    const onValueChange = (e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const loginUser = async ()=>{
        try {
            let response = await API.userLogin(login);
            if(response.isSuccess){
                // setError('');
    
                sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
    
                setAccount({username: response.data.username , name: response.data.name});
                isUserAuthenticated(true);
                setLogin(loginInitialval);
                navigate('/');
            }
            else{
                setError('Wrong Username or password')
            }
        } catch (error) {
            setError('Wrong Username or password')
        }
    }


  return (

    <Component>
        <Box >
            <Image src={accountBanner} alt='login'/>
            {
                account==='login'?
                    <Wrapper>
                        <TextField variant='standard' value={login.username} onChange={(e)=>onValueChange(e)} name='username' label='Enter Username'/>
                        <TextField variant='standard' value={login.password} onChange={(e)=>onValueChange(e)} name='password' label='Enter Password'/>
                        {error && <Error>{error}</Error>}

                        <LoginBUtton variant='contained' onClick={()=>loginUser()}>Login</LoginBUtton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <SignupButton onClick={()=>toggleSignup()}>Create an account</SignupButton>
                    </Wrapper>
                :   <Wrapper>
                        <TextField variant='standard' value={signup.name} onChange={(e)=>onInputChange(e)} name='name' label='Enter Name'/>
                        <TextField variant='standard' value={signup.username} onChange={(e)=>onInputChange(e)} name='username' label='Enter Username'/>
                        <TextField variant='standard' value={signup.password} onChange={(e)=>onInputChange(e)} name='password' label='Enter Password'/>
                        {error && <Error>{error}</Error>}

                        <SignupButton onClick={()=>signupUser()}>Sign Up</SignupButton>
                        <Text style={{textAlign:'center'}}>OR</Text>
                        <LoginBUtton variant='contained' onClick={()=>toggleSignup()}>Already have an account</LoginBUtton>
                        
                    </Wrapper>
            }
            
        </Box>
    </Component>
  )
}

export default Login