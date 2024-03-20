import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Hero() {
    const { id } = useParams();
    const [ longURL, setLongURL ] = useState("");
    const [ shortURL, setShortURL ] = useState("");
    const [ anchor, setAnchor ] = useState(false);

    const handleGenerate = async () => {
        const url = `http://localhost:3005/urls/api/shortUrl/${id}`;
        if (longURL !== " " && longURL !== "" && longURL.length > 4){
            const response = await axios.post(url, { LongUrl: longURL });
            // console.log('Response from server:', response.data);

            if (response.status == 200 && response.data?.shortenedUrl) {
                setAnchor(true);
                setShortURL(response.data?.shortenedUrl)
            }
        }
        console.log(shortURL)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortURL)
          .then(() => {
            console.log("Text copied to clipboard: " + shortURL);
          })
          .catch(err => {
            console.error('Failed to copy: ', err);
          });
    };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 30%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            Our latest&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              products
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Explore our cutting-edge dashboard, delivering high-quality solutions
            tailored to your needs. <br />
            Elevate your experience with top-tier features and services.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your long url"
              placeholder="Your long URL"
              onChange={(event)=>{setLongURL(event.target.value)}}
            />
            <Button variant="contained" color="primary" onClick={handleGenerate}>
              Generate
            </Button>
          </Stack>
          <Box>
            {anchor ? (
                <Box display={"flex"} mt={2} justifyContent={"center"}>
                    <LongURLBox shortURL = {shortURL} />
                    <Button size='small' variant='outlined' style = {{color: "#9e9e9e"}} onClick={copyToClipboard}>copy</Button>
                </Box>
            ) : null}
          </Box>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

interface LongURLBoxProps {
    shortURL: string;
}

const LongURLBox = (props: LongURLBoxProps) => {
    return (
        <Box width={'10rem'} display={'flex'}>
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your long url"
              placeholder="Your long URL"
              value={props.shortURL}
            />
        </Box>
    );
};