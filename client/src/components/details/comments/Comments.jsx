import { Box, Button, TextareaAutosize, Typography, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from './Comment';
import { useLocation, useSearchParams } from 'react-router-dom';

const Container = styled(Box)`
    margin-top: 100px;
    display:flex;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height:100px !important;
    width: 100%;
    margin: 0 20px;
`;

const initialValues = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}
const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValues);
    const [comments,setComments] = useState([]);
    const [toggle,setToggle] = useState(false);

    const { account } = useContext(DataContext);

    const location = useLocation();
    const id = location.pathname.split('/')[2];

    useEffect(()=>{
        const getData = async()=>{
            const response = await API.getAllComments({postId:id});
            if(response.isSuccess){
                setComments(response.data);
            } 
        }
        getData();
    },[toggle,post])

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async () => {
        const response = await API.newComment(comment);
        if (response.isSuccess) {
            setComment(initialValues);
            setToggle(prev => !prev);
        }
    }

    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    minRows={5}
                    placeholder="what's on your mind"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)}
                />
                <Button
                    variant='contained'
                    color='primary'
                    size='medium'
                    style={{ height: 40 }}
                    type='submit'
                    onClick={(e) => addComment(e)}>Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length>0 ? comments.map((comment) =>(
                        <Comment comment = {comment} setToggle={setToggle}/>
                    )): <Typography>No comments yet</Typography>
                }
            </Box>
        </Box>
    )
}

export default Comments;