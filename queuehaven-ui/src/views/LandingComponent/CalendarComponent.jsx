import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import { loadEventsAction } from '../../actions';

import AddEventComponent from 'views/LandingComponent/AddEventComponent.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { confirmAlert } from 'react-confirm-alert';

import landingStyle from 'assets/jss/material-kit-react/views/landingComponent.jsx';
import 'react-big-scheduler/lib/css/style.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import EventService from 'services/EventService';

import moment from 'moment';

/**
* Takes the entire application state and returns only the subset of data this component needs.
* mapStateToProps is called each time the Redux state changes.
*/
function mapStateToProps(state) {
    return {
        user: state.user,
        events: state.events
    };
};

function mapDispatchToProps(dispatch) {
  return {
    loadEvents: events => dispatch(loadEventsAction(events))
  };
};

class CalendarComponent extends React.Component {

    constructor() {
        super();

        const config = {
            schedulerWidth: "80%"
        };

        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Month, false, false, config);

        schedulerData.setResources([
            {
                id: '0',
                name: 'Game Night'
            },
            {
                id: '1',
                name: 'Pathfinder'
            }
        ]);

        this.state = {
            events: [],
            schedulerView: schedulerData
        };

        this.eventService = new EventService();
        this.loadEvents();
    }

    loadEvents = () => {
        this.eventService.getEvents()
            .then(result => {
                this.props.loadEvents(result.data);
                this.setState({ ...this.state, events: result.data });
            });
    };

    render() {
        const { schedulerView } = this.state;
        schedulerView.setEvents(this.props.events);

        return (
        <GridContainer alignItems="center" justify="center">
            <GridItem xs={12} sm={12} md={12}>
                <Scheduler schedulerData={schedulerView}
                    prevClick={this.prevClick}
                    nextClick={this.nextClick}
                    eventItemClick={this.eventItemClick}
                    onViewChange={this.onViewChange} />
            </GridItem>

            <GridItem xs={3} sm={3} md={3}>
                <AddEventComponent/>
            </GridItem>
        </GridContainer>
        );
    }

     prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(this.state.events);
        this.setState({
            schedulerView: schedulerData
        })
    };

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(this.state.events);
        this.setState({
            schedulerView: schedulerData
        })
    };

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.state.events);
        this.setState({
            schedulerView: schedulerData
        })
    };

    eventItemClick = (schedulerData, event) => {
        schedulerData.setEvents(this.state.events);
        this.setState({
            schedulerView: schedulerData
        })

        confirmAlert({
              title: 'Are you sure?',
              message: 'Delete Event?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => this.deleteEvent(event)
                },
                {
                  label: 'No',
                  onClick: () => { }
                }
              ]
            });
    };

    deleteEvent = (event) => {
        this.eventService.deleteEvent(event.id)
            .then( () => {
                this.eventService.getEvents()
                    .then(result => {
                        this.props.loadEvents(result.data);
                        this.setState({ ...this.state, events: result.data });
                    });
            });
    };
}

const StatefulCalendarComponent = connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)
export default DragDropContext(HTML5Backend)(withStyles(landingStyle)(StatefulCalendarComponent));