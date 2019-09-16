import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import QueueHavenHeader from "components/Header/QueueHavenHeader.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import landingStyle from "assets/jss/material-kit-react/views/landingComponent.jsx";
import 'react-big-scheduler/lib/css/style.css';

import moment from 'moment';

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

    constructor() {
        super();

        const config = {
            schedulerWidth: "80%"
        };

        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Month, false, false, config);

        schedulerData.setResources([{
            id: '0',
            name: 'Game Night'
        }]);

        this.state = {
            schedulerView: schedulerData
        };
    }

    render() {

        const { classes } = this.props;
        const { schedulerView } = this.state;

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
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <div>
                                <Scheduler schedulerData={schedulerView}
                                    prevClick={this.prevClick}
                                    nextClick={this.nextClick}
                                    onSelectDate={this.onSelectDate}
                                    onViewChange={this.onViewChange} />
                            </div>
                        </GridItem>
                    </GridContainer> :
                    null
                }

            </div>
            <Footer />
        </div>
        );
    }

     prevClick = (schedulerData)=> {
        schedulerData.prev();
        //schedulerData.setEvents(DemoData.events);
        this.setState({
            schedulerView: schedulerData
        })
    };

    nextClick = (schedulerData)=> {
        schedulerData.next();
        //schedulerData.setEvents(DemoData.events);
        this.setState({
            schedulerView: schedulerData
        })
    };

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        //schedulerData.setEvents(DemoData.events);
        this.setState({
            schedulerView: schedulerData
        })
    };

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        //schedulerData.setEvents(DemoData.events);
        this.setState({
            schedulerView: schedulerData
        })
    };
}

const StatefulLandingComponent = connect(mapStateToProps, null)(LandingComponent)
export default DragDropContext(HTML5Backend)(withStyles(landingStyle)(StatefulLandingComponent));