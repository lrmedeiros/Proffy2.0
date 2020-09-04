import React from 'react';
import {
  Grid,
  makeStyles,
  Theme,
  CssBaseline,
  Paper,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

const theme = createMuiTheme({});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  image: {},
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" className={classes.root}>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        ></Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
      </Grid>
    </ThemeProvider>
  );
}

export default App;
