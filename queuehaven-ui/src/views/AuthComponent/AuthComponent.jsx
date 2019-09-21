import React from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import QueueHavenHeader from "components/Header/QueueHavenHeader.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import LoginComponent from "./LoginComponent.jsx";
import SignUpComponent from "./SignUpComponent.jsx";

import authStyle from "assets/jss/material-kit-react/views/authComponent.jsx";

function mapStateToProps(state) {
    return {
        user: state.user
    };
};

class AuthComponent extends React.Component {

    render() {
        const { classes } = this.props;

        if (this.props.user !== '') {
            return <Redirect push to="/" />
        }

        return (
        <div>
            <QueueHavenHeader/>
            <Parallax filter image={require("assets/img/bg1.png")} className={classes.short}>

            </Parallax>
            <div className={ classNames(classes.main, classes.mainRaised) }>

                <GridContainer spacing={40}>

                    <GridItem xs={12} sm={12} md={6}>
                        <LoginComponent />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>
                        <SignUpComponent />
                    </GridItem>

                </GridContainer>

            </div>
            <Footer />
        </div>
        );
    }
}

const StatefulAuthComponent = connect(mapStateToProps, null)(AuthComponent)
export default withStyles(authStyle)(StatefulAuthComponent);