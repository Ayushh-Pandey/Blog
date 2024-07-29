import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import ContactBackground from './ContactBackground.jpg'
import Header from '../header/Header';

const Banner = styled(Box)`
    background-image: url(${ContactBackground});
    width: 100%;
    height: 60vh;
    background-position: center;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Header/>
            <Banner />
            <Wrapper>
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5">
                    Reach out to me on
                    {/* <Link href="" color="inherit" target="_blank"> */}
                        <Instagram/>
                    {/* </Link> */}
                    or send me an Email 
                    {/* <Link href="" target="_blank" color="inherit"> */}
                        <Email />
                    {/* </Link>. */}
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;