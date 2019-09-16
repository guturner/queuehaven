import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import AuthService from "services/AuthService";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from "components/Typography/Danger.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

/**
* Takes the entire application state and returns only the subset of data this component needs.
* mapStateToProps is called each time the Redux state changes.
*/
function mapStateToProps(state) {
  return {
    user: state.user
  };
};

class LoginComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      redirect: false,
      badUsername: false,
      badUsernameMsg: '',
      badPassword: false,
      badPasswordMsg: ''
    };

    // Bind event handling functions to their corresponding events:
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

  onSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    this.setState({ ...this.state, badUsername: false, badUsernameMsg: '', badPassword: false, badPasswordMsg: '' });

    this.authService.login(username, password).then(wasSuccessful => {
        if (wasSuccessful) {
            if (this.mounted)
                this.setState({ ...this.state, redirect: true });
        } else {
            if (this.mounted)
                this.setState({ ...this.state, badPassword: true, badPasswordMsg: 'Invalid login.' });
        }
    });
  };

  onChange = event => {
    // Keep class state up-to-date by pulling values directly from HTML targets:
    if (this.mounted)
        this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    const isInvalid =
      this.state.username === '' ||
      this.state.password === '';

    return (
      <Card>
        <CardHeader className={classes.textCenter} color="danger">Login</CardHeader>

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
                    name: "username", // Required for the onChange event handler to work
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

              <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
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
              </GridItem>
              <GridItem className={classes.textLeft}>
                {
                  this.state.badPassword ?
                  <Danger>
                    { this.state.badPasswordMsg }
                  </Danger> :
                  null
                }
              </GridItem>

            </GridContainer>

            <GridContainer className={classes.textCenter}>

              <GridItem xs={12} sm={12} md={12}>
                <Button color="primary" type="submit" disabled={isInvalid} className={classes.boldButton}>Login</Button>
              </GridItem>

            </GridContainer>

          </form>
        </CardBody>
      </Card>
    );
  }
}

const StatefulLoginComponent = connect(mapStateToProps, null)(LoginComponent);
export default withStyles(basicsStyle)(StatefulLoginComponent);
