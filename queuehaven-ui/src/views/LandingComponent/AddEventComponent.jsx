import React from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import { addEventAction } from "../../actions";

import AuthService from "services/AuthService";
import EventService from "services/EventService";

import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Danger from "components/Typography/Danger.jsx";
import DateTimePicker from "react-datetime-picker";
import DateTimePickerInput from "components/CustomInput/DateTimePickerInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

import moment from "moment";

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
    addEvent: newEvent => dispatch(addEventAction(newEvent))
  };
};

class AddEventComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      eventTitle: '',
      eventDate: new Date(),
      redirect: false,
      badEventTitle: false,
      badEventTitleMsg: '',
      badEventDate: false,
      badEventDateMsg: ''
    };

    // Bind event handling functions to their corresponding events:
    this.onSubmit = this.onSubmit.bind(this);

    this.mounted = false;

    this.authService = new AuthService();
    this.eventService = new EventService();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { eventTitle, eventDate } = this.state;
    this.setState({ ...this.state, badEventTitle: false, badEventTitleMsg: '', badEventDate: false, badEventDateMsg: '' });

    const isBadEventTitle = await this.isBadEventTitle();
    const isBadEventDate = await this.isBadEventDate();

    if (isBadEventTitle || isBadEventDate) {
        return;
    } else {
        this.eventService.createEvent(this.buildEvent()).then(result => {
            this.props.addEvent(result.data);
        });
    }
  };

  isBadEventTitle = async (): boolean => {
      await this.setState({ ...this.state, badEventTitle: false, badEventTitleMsg: '' });
      if (this.state.eventTitle.length < 1) {
        this.setState({ ...this.state, badEventTitle: true, badEventTitleMsg: 'Invalid event title.' });
        return true;
      } else {
        return false;
      }
    };

  isBadEventDate = async (): boolean => {
      await this.setState({ ...this.state, badEventDate: false, badEventDateMsg: '' });
      if (this.state.eventDate == null) {
        this.setState({ ...this.state, badEventDate: true, badEventDateMsg: 'Invalid event date.' });
        return true;
      } else {
        return false;
      }
    };

  buildEvent = () => {
     const dateString = this.formatDate(this.state.eventDate);

     return {
        title: this.state.eventTitle,
        start: dateString,
        end: this.datePlus3Hours(dateString)
     };
  };

  formatDate = (date) => {
    const dateStringComponents = date.toLocaleString().split(' ');

    if (dateStringComponents[2] === 'PM') {
        const timeComponents = dateStringComponents[1].split(':');

        let newHour = timeComponents[0];
        if (newHour != '12') {
            newHour = new String(new Number(newHour) + 12);
        }
        return dateStringComponents[0] + ' ' + newHour.padStart(2, '0') + ":" + timeComponents[1] + ":" + timeComponents[2];
    } else {
        const timeComponents = dateStringComponents[1].split(':');

        let newHour = timeComponents[0];
        if (newHour == '12') {
            newHour = '0';
        }
        return dateStringComponents[0] + " " + newHour.padStart(2, '0') + ":" + timeComponents[1] + ":" + timeComponents[2];
    }
  }

  datePlus3Hours = (dateString) => {
    return this.formatDate(moment(dateString).add(3, 'h').toDate());
  }

  onChange = event => {
    // Keep class state up-to-date by pulling values directly from HTML targets:
    if (this.mounted)
        this.setState({ [event.target.name]: event.target.value });
  };

  onChangeDateTime = (dateTime) => {
    if (this.mounted)
        this.setState({ eventDate: dateTime });
  };
  
  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    const isInvalid =
      this.state.eventTitle === '' ||
      this.state.eventDate === '';

    return (
      <Card>
        <CardHeader className={classes.textCenter} color="danger">Add Event</CardHeader>

        <CardBody xs={6} sm={6} md={6}>
          <form onSubmit={this.onSubmit}>

            <GridContainer>

              <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Event Title"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "eventTitle", // Required for the onChange event handler to work
                    value: this.state.eventTitle,
                    error: this.state.badEventTitle,
                    onChange: this.onChange
                  }}
                />
              </GridItem>
              <GridItem className={classes.textLeft}>
                {
                  this.state.badEventTitle ?
                  <Danger>
                    { this.state.badEventTitleMsg }
                  </Danger> :
                  null
                }
              </GridItem>

            </GridContainer>

            <GridContainer>

              <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                <DateTimePickerInput
                  labelText="Event Date"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    name: "eventDate",
                    value: this.state.eventDate,
                    error: this.state.badEventDate,
                    onChange: this.onChangeDateTime
                  }}
                />
              </GridItem>
              <GridItem className={classes.textLeft}>
                {
                  this.state.badEventDate ?
                  <Danger>
                    { this.state.badEventDateMsg }
                  </Danger> :
                  null
                }
              </GridItem>

            </GridContainer>

            <GridContainer className={classes.textCenter}>

              <GridItem xs={12} sm={12} md={12}>
                <Button color="primary" type="submit" disabled={isInvalid} className={classes.boldButton}>Add Event</Button>
              </GridItem>

            </GridContainer>

          </form>
        </CardBody>
      </Card>
    );
  }
}

const StatefulAddEventComponent = connect(mapStateToProps, mapDispatchToProps)(AddEventComponent);
export default withStyles(basicsStyle)(StatefulAddEventComponent);
