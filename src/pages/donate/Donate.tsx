import { BaseLayoutOfPages } from '../../shared/layouts';
import {
  Button,
  Divider,
  Icon,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Paper,
  Theme,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';

import React from 'react';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FacebookShareButton } from 'react-share';

import donateImage from '../../images/donate.svg';

export const Donate: React.FC = () => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const theme = useTheme();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <BaseLayoutOfPages title="Contributions">
      <Divider variant="middle" sx={{ mx: 2 }} />
      <Card
        sx={{ width: '75%', margin: '30px auto' }}
        component={Paper}
        variant="outlined"
      >
        <CardHeader
          title="Support us"
          sx={{ textAlign: 'center' }}
        ></CardHeader>
        <Divider variant="middle" sx={{ margin: '10px 0' }} />
        <CardMedia
          sx={{
            objectFit: 'contain',
            filter: 'drop-shadow(5px 3px 4px #7b1fa2)',
          }}
          component="img"
          height="194"
          image={donateImage}
          alt="Donate background"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Contributions are what make the open source community such an
            amazing place to learn, inspire, and create. Any contributions you
            make are greatly appreciated.
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            maxWidth: '10px',
            margin: '0 auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link
            href="https://nubank.com.br/pagar/10x3bc/To0ksDFanP"
            target="_blank"
            underline="none"
            rel="noreferrer"
            sx={{ display: 'inline-block' }}
          >
            <Button
              sx={{
                minWidth: !mdDown ? '100px' : '',
                width: lgUp ? '25rem' : '5rem',
                padding: smDown ? '5px 20px' : lgUp ? '5px 55px' : '',
              }}
              color="primary"
              disableElevation
              variant={theme.palette.mode == 'light' ? 'outlined' : 'contained'}
              startIcon={<Icon sx={{ ml: 1 }}>monetization_on_icon</Icon>}
            >
              {!smDown && (
                <Typography
                  variant="button"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  Donate
                </Typography>
              )}
            </Button>
          </Link>
          <Link href="#" underline="none" sx={{ display: 'inline-block' }}>
            <FacebookShareButton
              url={'https://cities-two.vercel.app/donate'}
              quote={
                'Donate any amount to support the project. Click to learn more'
              }
              hashtag={'#cities'}
            >
              <Button
                sx={{
                  minWidth: !mdDown ? '100px' : '',
                  width: lgUp ? '25rem' : '5rem',
                  padding: smDown ? '5px 20px' : lgUp ? '5px 55px' : '',
                }}
                color="primary"
                disableElevation
                variant={
                  theme.palette.mode == 'light' ? 'outlined' : 'contained'
                }
                startIcon={<Icon sx={{ ml: 1 }}>facebook</Icon>}
              >
                {!smDown && (
                  <Typography
                    variant="button"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    Share
                  </Typography>
                )}
              </Button>
            </FacebookShareButton>
          </Link>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              marginLeft: lgUp ? '5px' : '',

              position: 'relative',
              left: '1rem',
            }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph fontWeight="600">
              How contributions help us:
            </Typography>
            <Typography paragraph color="text.secondary">
              Any and all donations will go to the project, with the goal of
              making it a scalable system that can reach a larger number of
              people.
            </Typography>
            <Typography paragraph color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. In a
              minima veritatis, doloremque commodi praesentium nesciunt? Magnam
              tenetur assumenda sit, ullam earum quam minus similique iste, aut,
              perspiciatis reiciendis laudantium! Nobis aut porro harum,
              aspernatur, sequi ducimus perspiciatis ipsum nisi provident
              corrupti quas modi. Voluptatum saepe deserunt temporibus,
              architecto ullam numquam unde dolores totam non ad. Ab culpa
              facilis distinctio. Delectus, earum culpa esse quasi enim animi
              eaque tempore id quidem est velit quam? Sint at debitis, itaque
              numquam exercitationem ducimus alias dignissimos autem labore
              aperiam voluptatum, vel suscipit hic? Possimus consequatur dolorum
              rem tenetur tempore sint dolores commodi libero aperiam temporibus
              ex iure error eaque minima qui aliquam ullam, debitis, fuga et
              perferendis! Consequatur illum mollitia perferendis sequi
              quisquam.
            </Typography>
            <Typography paragraph color="text.secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              minima inventore error dolore cupiditate assumenda porro ipsa
              exercitationem repellat vel nostrum quod suscipit officiis, nemo
              corrupti totam explicabo aspernatur recusandae? Dignissimos qui
              tempore nam deserunt minima excepturi. Obcaecati ex veniam nisi
              architecto cumque exercitationem, beatae optio debitis quo
              corporis rerum. Perspiciatis quae facilis consequuntur labore
              obcaecati harum iure officiis quam. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Hic minima quia labore ullam
              doloribus fugiat nam ipsam modi. Sint velit aspernatur eligendi
              cum ex tenetur totam exercitationem commodi quam mollitia.
            </Typography>
            <Typography color="text.secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              quis ipsam voluptatum eum veritatis? Sunt minus amet earum quasi
              inventore, laboriosam qui unde non, sit nostrum quia ipsum quidem
              dolore!
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </BaseLayoutOfPages>
  );
};
