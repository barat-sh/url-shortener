import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';

export default function History() {
    const { id } = useParams();
    const [ urls, setUrls ] = useState([]);

    useEffect(()=>{
      const fetchData = async() => {
        const url = "http://localhost:3005/urls/api/getAllUrls/f9d86b39-8e2a-4e80-983a-afc520258198"
        try {
          const response = await axios.get(url);
          console.log(response.data);
          setUrls(response.data?.urls);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData()
    },[])

    const handleClick = () => {
      console.log(urls)
    }

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
            variant="h4"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            All of your&nbsp;
            <Typography
              component="span"
              variant="h4"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              URL Collections
            </Typography>
          </Typography>
            <Paper>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ShortURL</TableCell>
                        <TableCell>LongURL</TableCell>
                        <TableCell>CreatedDate</TableCell>
                        <TableCell>Column 4</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <TableCell>Row 1, Col 1</TableCell>
                        <TableCell>Row 1, Col 2</TableCell>
                        <TableCell>Row 1, Col 3</TableCell>
                        <TableCell>Row 1, Col 4</TableCell>
                    </TableRow>

                    {/* Add more rows as needed */}
                    </TableBody>
                </Table>
            </Paper>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button variant="contained" color="primary" onClick={handleClick}>
              Generate
            </Button>
          </Stack>
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
