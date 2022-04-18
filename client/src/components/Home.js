import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { domain } from '../repository/repository';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: { xs: '100%', md: '80%' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: { sm: 10, xs: 4 },
          justifyContent: 'space-evenly',
          alignItems: 'center',
          textAlign: 'justify',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
        }}
      >
        <Card sx={{ width: { md: '25%', sm: '100%' } }}>
          <CardActionArea>
            <CardMedia
              component={'img'}
              image={`${domain}/public/data_structures.webp`}
            />
            <Typography
              gutterBottom
              variant={'h5'}
              component={'div'}
              sx={{ px: 1 }}
            >
              Data structures
            </Typography>
            <Typography
              variant={'body2'}
              color={'text.secondary'}
              sx={{ px: 1 }}
            >
              Checkout our data structures problems that we have provided for
              you
            </Typography>
          </CardActionArea>
          <CardActions>
            <Button size={'small'} color={'primary'}>
              Click here
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ width: { md: '25%', sm: '100%' } }}>
          <CardActionArea>
            <CardMedia
              component={'img'}
              image={`${domain}/public/sql-card.jpg`}
            />
            <Typography
              gutterBottom
              variant={'h5'}
              component={'div'}
              sx={{ px: 1 }}
            >
              SQL
            </Typography>
            <Typography
              variant={'body2'}
              color={'text.secondary'}
              sx={{ px: 1 }}
            >
              Checkout our SQL problems that we have provided for you
            </Typography>
          </CardActionArea>
          <CardActions>
            <Button size={'small'} color={'primary'}>
              Click here
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ width: { md: '25%', sm: '100%' } }}>
          <CardActionArea>
            <CardMedia
              component={'img'}
              image={`${domain}/public/coding-interview-questions.png`}
            />
            <Typography
              gutterBottom
              variant={'h5'}
              component={'div'}
              sx={{ px: 1 }}
            >
              Interview examples
            </Typography>
            <Typography
              variant={'body2'}
              color={'text.secondary'}
              sx={{ px: 1 }}
            >
              Checkout our Interview problems that we have provided for you from
              various companies like Google, Amazon etc.
            </Typography>
          </CardActionArea>
          <CardActions>
            <Button size={'small'} color={'primary'}>
              Click here
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          p: { xs: 3, md: 15 },
          color: 'white',
          backgroundImage: `url(${domain}/public/contest-background.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* <Typography variant={'h5'}>Contests</Typography> */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: { xs: 3, md: 10 },
          }}
        >
          <Typography
            sx={{
              borderRight: 1,
              borderRightColor: 'divider',
              fontWeight: { xs: 400, md: 700 },
              fontSize: { xs: 15, md: 30 },
              flex: 1,
            }}
          >
            You want to participate in coding challenges agains other people?
            <br /> We are performing a contest every week <br />
          </Typography>
          <Typography sx={{ flex: 1 }}>
            <Button size={'large'} variant={'contained'}>
              <Link
                to="/contests"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Contests
              </Link>
            </Button>
          </Typography>
        </Box>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 10,
        }}
      >
        <Typography variant={'body1'} sx={{ fontWeight: 700 }}>
          Join our community by creating an account on our site
        </Typography>
        <Button>
          <Link
            to={'/register'}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Register
          </Link>
        </Button>
        <Typography variant={'caption'}>
          Already have an account? <Link to={'/login'}>Click here</Link>
        </Typography>
      </Box>
    </Box>
  );
}
