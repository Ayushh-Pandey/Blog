import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

import AboutBackground from './AboutBackground.jpg'
import Header from '../header/Header';

const Banner = styled(Box)`
    background-image: url(${AboutBackground});
    width: 100%;
    height: 50vh;
    background-position: center;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 35px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Header/>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Technology Is Moving Fast</Typography>
                <Text variant="h5">I'm a Software Engineer based in India. 
                    I've built websites, desktop applications.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Ayushh-Pandey" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        {/* <Link href="" color="inherit" target="_blank"> */}
                            <Instagram />
                        {/* </Link> */}
                    </Box>  
                        or send me an Email 
                        {/* <Link href="" target="_blank" color="inherit"> */}
                            <Email />
                        {/* </Link>. */}
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;