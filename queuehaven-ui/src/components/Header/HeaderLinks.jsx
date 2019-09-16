import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import AuthService from "services/AuthService";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

/**
* Takes the entire application state and returns only the subset of data this component needs.
* mapStateToProps is called each time the Redux state changes.
*/
function mapStateToProps(state) {
  return {
    user: state.user
  };
};

class HeaderLinks extends React.Component {
  
  constructor() {
    super();

    this.state = {
      redirect: false,
      redirectPath: ''
    }

    this.authService = new AuthService();

    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSignIn = () => {
    this.setState({ redirect: true, redirectPath: '/auth' }, () => {
      setTimeout(() => { if (this.mounted) this.setState({ redirect: false, redirectPath: '' }) }, 0);
    });
  }

  handleSignOut = () => {
    this.setState({ redirect: true, redirectPath: '/' }, () => {
      setTimeout(() => {
        if (this.mounted) {
            this.setState({ redirect: false, redirectPath: '' });
            this.authService.logout();
        }
      }, 0);
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirectPath} />;
    }

    return (
      this.props.user === '' ?

      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button color="primary" onClick={this.handleSignIn} className={classes.boldButton}>
            Login / Signup
          </Button>
        </ListItem>
      </List>
      :
      <CustomDropdown
          noLiPadding
          buttonText={this.props.user.username}
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link to="/roster" className={classes.dropdownLink}>
              Roster
            </Link>,
            <Link to="/" onClick={this.handleSignOut} className={classes.dropdownLink}>
              Signout
            </Link>
          ]}
        />
  )};
}

const StatefulHeaderLinks = connect(mapStateToProps, null)(HeaderLinks);
export default withStyles(headerLinksStyle)(StatefulHeaderLinks);
