import React from 'react';

import { makeStyles, Theme, Grid } from '@material-ui/core';

import introImg from '../../assets/images/Intro.svg';
import backgroundImg from '../../assets/images/Background.svg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    background: theme.palette.primary.main,
    paddingBottom: theme.spacing(1),
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resize: 'both',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      height: '100vh',
      padding: theme.spacing(2, 2),
    },
  },
  backgroundImage: {
    width: '90%',
    height: '90%',
  },
  intro: {
    position: 'absolute',
    marginTop: theme.spacing(1.5),
    height: '20%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));

const Banner: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid component="div" className={classes.root}>
      <img
        src={backgroundImg}
        alt="Imagem de fundo"
        className={classes.backgroundImage}
      />

      <img
        src={introImg}
        alt="Proffy sua plataforma de estudos online."
        className={classes.intro}
      />
    </Grid>
  );
};
export default Banner;
