import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import AvatarMenu from './AvatarMenu';
import ExploreIcon from '@material-ui/icons/Explore';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 0,
  },
  title: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  menu: {
    backgroundColor: '#282c3e',
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: 'auto',
  },
  link: {
    display: 'inherit',
  },
  link__item: {
    padding: '0 5px',
  },
});

class NavTop extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.menu} position='fixed'>
          <Toolbar>
            <Grid container spacing={3} className={classes.title}>
              <Link to='/' className={classes.link}>
                <Grid item className={classes.link__item}>
                  <ExploreIcon fontSize='large' />
                </Grid>
                <Grid item>
                  <Typography variant='h4'>Travel Planner</Typography>
                </Grid>
              </Link>
            </Grid>

            <AvatarMenu edge='end' />
            {/* <IconButton edge='end' className={classes.menuButton} color='inherit' aria-label='menu'>
              <MenuDropDown />
            </IconButton> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavTop);
