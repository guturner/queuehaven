import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from "components/Typography/Danger.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhoneNumberInput from "components/CustomInput/PhoneNumberInput.jsx";
import Help from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

import AuthService from "services/AuthService";

function mapStateToProps(state) {
  return {
    user: state.user
  };
};

class SignUpComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      redirect: false,
      badUsername: false,
      badUsernameMsg: '',
      badPassword: false,
      badPasswordMsg: '',
      otp: '',
      badOtp: false,
      badOtpMsg: ''
    };

    this.onSubmit = this.onSubmit.bind(this);

    this.mounted = false;

    this.authService = new AuthService();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { username, password, otp } = this.state;
    this.setState({ ...this.state, badUsername: false, badUsernameMsg: '', badPassword: false, badPasswordMsg: '' });

    const isBadOTP = await this.isBadOTP();
    const isBadPassword = await this.isBadPassword();

    if (isBadOTP || isBadPassword) {
      return;
    } else {
        this.authService.signup(username, password, otp)
            .then(wasSuccessful => {
                if (wasSuccessful) {
                    if (this.mounted)
                        this.setState({ ...this.state, redirect: true });
                } else {
                    if (this.mounted)
                        this.setState({ ...this.state });
                }
            })
            .catch(error => {
                if (this.mounted)
                    this.setState({ ...this.state, badUsername: true, badUsernameMsg: 'Username taken.' });
            });
    }
  };

  onChange = event => {
    if (this.mounted)
        this.setState({ [event.target.name]: event.target.value });
  };

  // OTP = One-Time Password
  isBadOTP = async (): boolean => {
    await this.setState({ ...this.state, badOtp: false, badOtpMsg: '' });
    if (this.state.otp.length > 0 && this.state.otp.length < 6) {
      this.setState({ ...this.state, badOtp: true, badOtpMsg: 'Invalid Access Token.' });
      return true;
    } else if (this.state.otp.length > 6) {
      this.setState({ ...this.state, badOtp: true, badOtpMsg: 'Invalid Access Token.' });
      return true;
    } else {
      return false;
    }
  };

  isBadPassword = async (): boolean => {
      await this.setState({ ...this.state, badPassword: false, badPasswordMsg: '' });
      if (this.state.password.length > 0 && this.state.password.length < 6) {
        this.setState({ ...this.state, badPassword: true, badPasswordMsg: 'Insecure password.' });
        return true;
      } else {
        return false;
      }
    };

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    const isInvalid =
      this.state.username === '' ||
      this.state.password !== this.state.confirmPassword ||
      this.state.password === '' ||
      this.state.otp === '';

    return (
      <Card>
        <CardHeader className={classes.textCenter} color="danger">Sign Up</CardHeader>

        <CardBody xs={12} sm={12} md={12}>
          <form onSubmit={this.onSubmit}>

            <GridContainer>

              <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Username"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "username",
                    value: this.state.username,
                    error: this.state.badUsername,
                    onChange: this.onChange
                  }}
                />
              </GridItem>
              <GridItem className={classes.textLeft}>
                {
                  this.state.badUsername ?
                  <Danger>
                    { this.state.badUsernameMsg }
                  </Danger> :
                  null
                }
              </GridItem>

            </GridContainer>

            <GridContainer>

              <GridItem className={classes.textCenter} xs={6} sm={6} md={6}>
                <CustomInput
                  labelText="Password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "password",
                    type: "password",
                    value: this.state.password,
                    error: this.state.badPassword,
                    onChange: this.onChange
                  }}
                />
                {
                  this.state.badPassword ?
                  <Danger className={classes.textLeft}>
                    { this.state.badPasswordMsg }
                  </Danger> :
                  null
                }
              </GridItem>

              <GridItem className={classes.textCenter} xs={6} sm={6} md={6}>
                <CustomInput
                  labelText="Confirm Password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "confirmPassword",
                    type: "password",
                    value: this.state.confirmPassword,
                    onChange: this.onChange
                  }}
                />
              </GridItem>

            </GridContainer>

            <GridContainer>

              <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>

                  <CustomInput
                      labelText="Access Token"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "otp",
                        value: this.state.otp,
                        onChange: this.onChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              id="otpToolTip"
                              title="A one-time password given to you by an admin."
                              placement="left"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <Help />
                            </Tooltip>
                          </InputAdornment>
                        )
                      }}
                    />
                    {
                      this.state.badOtp ?
                      <Danger className={classes.textLeft}>
                        { this.state.badOtpMsg }
                      </Danger> :
                      null
                    }
                    
                  </GridItem>

              </GridContainer>

            <GridContainer>

              <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                <Button color="primary" type="submit" disabled={isInvalid} className={classes.boldButton}>Sign Up</Button>
              </GridItem>

            </GridContainer>

          </form>
        </CardBody>
      </Card>
    );
  }
}

const StatefulSignUpComponent = connect(mapStateToProps, null)(SignUpComponent);
export default withStyles(basicsStyle)(StatefulSignUpComponent);
