import React, { useContext, useEffect, useState } from 'react'
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material'
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../service/api'
import { DataContext } from '../../context/DataProvider'
import axios from 'axios';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
    width:100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &: focus-visble {
        outline:none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState("");
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';


    const handleFile = (e)=>{
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }
    
    useEffect(() => {
        const getImage = async () => {
            setLoading(true)
            try {
                if (file) {
                    const data = new FormData();
                    data.append('file', file);
                    data.append("upload_preset", "blog_app");
                    data.append("cloud_name", "dsgy1uji7");
                    
                    //API call
                    const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dsgy1uji7/image/upload", data);
                    post.picture = uploadRes.data.url.toString()
                    setPost((prevPost) => ({ ...prevPost, picture: uploadRes.data.url.toString() }));
                }
            } catch (error) {
                setError('error uploading file')
            } finally {
                setLoading(false);
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file])

    const savePost = async ()=>{
        setLoading(true);
        try {
            const response = await API.createPost(post);
            navigate('/');
        } catch (error) {
            setError('error creating post, Try choosing a different title');
        }finally{
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input 
                    type="file"
                    name="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                />

                <InputTextField onChange={(e) => handleChange(e)} placeholder='Title' name='title' />
                <Button  onClick={()=>savePost()}variant='contained'  color='primary'>Publish</Button>
            </StyledFormControl>
            <TextArea minRows={5} placeholder='Tell your story...' name='description' onChange={(e) => handleChange(e)}  />
            {loading && <p>Loading...</p>}
            {error && <p style={{color:'red', display:'flex', alignItems:'center' , justifyContent:'center'}}>{error}</p>}
        </Container>
    )
}

export default CreatePost;