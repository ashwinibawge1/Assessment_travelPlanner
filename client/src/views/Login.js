import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { loginUser } from '../store/actions/userActions';
import ModalAlert from '../components/ModalAlert';
import { clearErrors } from '../store/actions/errActions';
import '../styles/login.css';
import AddTrip from '../components/AddTrip';

const styles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 250,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      modalState: false,
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email === '' || password === '') {
      await this.setState({ modalState: true });
    } else {
      this.props.loginUser({ email, password });
    }
  };

  handleCloseAlert = () => {
    if (this.props.error.status !== null) {
      this.props.clearErrors();
    } else if (this.state.modalState === true) {
      this.setState({ modalState: false });
    }
  };

  render() {
    const { classes, isAuthenticated, error } = this.props;
    if (isAuthenticated) {
      return <Redirect exact to='/addTrip' />
    } else {
      return (
        <div>
          {error.status !== null ? (
            <ModalAlert
              title={`Error ${error.status}: Cannot Login`}
              msg={error.msg}
              handleCloseAlert={this.handleCloseAlert}
            />
          ) : this.state.modalState ? (
            <ModalAlert
              title={'Cannot Login'}
              msg={'Please enter all fields'}
              handleCloseAlert={this.handleCloseAlert}
            />
          ) : null}
          <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                  Login
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='E-mail'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    onChange={this.handleChange}
                  />
                  <Button
                    fullWidth
                    variant='contained'
                    id='submit-button'
                    className={classes.submit}
                    onClick={(e) => this.handleSubmit(e)}>
                    Login
                  </Button>
                  <Grid container className='login-links'>
                    <Grid item xs>
                      <Link to='#' variant='body2' className='link'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to='registration' variant='body2' className='link'>
                        Don't have an account?
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isFetching: state.users.isFetching,
    error: state.errors,
  };
};

export default connect(mapStateToProps, { loginUser, clearErrors })(withStyles(styles)(Login));
