import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import queueHavenStyle from "assets/jss/material-kit-react/components/queueHavenStyle.jsx";

import { Link } from "react-router-dom";

class QueueHavenHeader extends React.Component {
 
  render() {
    const { classes, ...rest } = this.props;

    return (
      <Header
        color="transparent"
        rightLinks={
          <HeaderLinks />
        }
        brand={
          <Link className={classes.headerLink} to="/">Queue Haven</Link>
        }
        fixed
        { ...rest }
      />
    );
  }
}

export default withStyles(queueHavenStyle)(QueueHavenHeader);
