import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import CalendarComponent from "views/LandingComponent/CalendarComponent.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import QueueHavenHeader from "components/Header/QueueHavenHeader.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingStyle from "assets/jss/material-kit-react/views/landingComponent.jsx";

/**
* Takes the entire application state and returns only the subset of data this component needs.
* mapStateToProps is called each time the Redux state changes.
*/
function mapStateToProps(state) {
    return {
        user: state.user
    };
};

class LandingComponent extends React.Component {

    render() {
        const { classes } = this.props;

        return (
        <div>
            <QueueHavenHeader/>
            <Parallax filter image={require("assets/img/bg1.png")} className={ (this.props.user !== '' ? classes.short : '') }>
                <div className={classes.container}>
                    {
                        this.props.user === '' ?
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <div>
                                    <img className={classes.center} src={require("assets/img/queuehaven-logo.png")} alt='' />
                                    <h3 className={classes.title}>
                                        Step into the cutting edge world of queue management.
                                    </h3>
                                </div>
                            </GridItem>
                        </GridContainer> :
                        null
                    }
                </div>
            </Parallax>
            <div className={ classNames(classes.main, classes.mainRaised) }>
                {
                    this.props.user !== '' ?
                    <CalendarComponent/> :
                    null
                }
            </div>
            <Footer />
        </div>
        );
    }
}

const StatefulLandingComponent = connect(mapStateToProps, null)(LandingComponent)
export default withStyles(landingStyle)(StatefulLandingComponent);