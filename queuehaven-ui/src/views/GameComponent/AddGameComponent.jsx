import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import {addGameAction} from '../../actions';

import GameService from 'services/GameService';

import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Danger from 'components/Typography/Danger.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import basicsStyle from 'assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx';

/**
 * Takes the entire application state and returns only the subset of data this component needs.
 * mapStateToProps is called each time the Redux state changes.
 */
function mapStateToProps(state) {
    return {
        user: state.user,
        games: state.games
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addGame: newGame => dispatch(addGameAction(newGame))
    };
};

class AddGameComponent extends React.Component {

    constructor() {
        super();

        this.state = {
            name: '',
            genre: '',
            minNumOfPlayers: 1,
            maxNumOfPlayers: 1,
            imagePath: '',
            badName: false,
            badNameMsg: '',
            badMinNumOfPlayers: false,
            badMinNumOfPlayersMsg: '',
            badMaxNumOfPlayers: false,
            badMaxNumOfPlayersMsg: '',
            badImagePath: false,
            badImagePathMsg: ''
        };

        // Bind event handling functions to their corresponding events:
        this.onSubmit = this.onSubmit.bind(this);

        this.mounted = false;

        this.gameService = new GameService();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const {name, genre, minNumOfPlayers, maxNumOfPlayers, imagePath} = this.state;
        this.setState({
            ...this.state,
            badName: false,
            badNameMsg: '',
            badMinNumOfPlayers: false,
            badMinNumOfPlayersMsg: '',
            badMaxNumOfPlayers: false,
            badMaxNumOfPlayersMsg: '',
            badImagePath: false,
            badImagePathMsg: '',
            redirect: false
        });

        const isBadName = await this.isBadName();
        const isBadMinNumOfPlayers = await this.isBadMinNumOfPlayers();
        const isBadMaxNumOfPlayers = await this.isBadMaxNumOfPlayers();
        const isBadImagePath = await this.isBadImagePath();

        if (isBadName || isBadMinNumOfPlayers || isBadMaxNumOfPlayers || isBadImagePath) {
            return;
        } else {
            this.gameService.createGame(this.buildGame()).then(result => {
                this.props.addGame(result.data);
            });
        }
    };

    isBadName = async () => {
        await this.setState({...this.state, badName: false, badNameMsg: ''});
        if (this.state.name.length < 1) {
            this.setState({...this.state, badName: true, badNameMsg: 'Name is too short.'});
            return true;
        } else {
            return false;
        }
    };

    isBadMinNumOfPlayers = async () => {
        await this.setState({...this.state, badMinNumOfPlayers: false, badMinNumOfPlayersMsg: ''});
        if (this.state.minNumOfPlayers == null || this.state.minNumOfPlayers < 1) {
            this.setState({...this.state, badMinNumOfPlayers: true, badMinNumOfPlayersMsg: 'Too few players.'});
            return true;
        } else {
            return false;
        }
    };

    isBadMaxNumOfPlayers = async () => {
        await this.setState({...this.state, badMaxNumOfPlayers: false, badMaxNumOfPlayersMsg: ''});
        if (this.state.maxNumOfPlayers == null || this.state.maxNumOfPlayers < 1) {
            this.setState({...this.state, badMaxNumOfPlayers: true, badMaxNumOfPlayersMsg: 'Too few players.'});
            return true;
        } else if (this.state.maxNumOfPlayers < this.state.minNumOfPlayers) {
            this.setState({...this.state, badMaxNumOfPlayers: true, badMaxNumOfPlayersMsg: 'Max players should exceed min.'});
            return true;
        } else {
            return false;
        }
    };

    isBadImagePath = async () => {
        await this.setState({...this.state, badImagePath: false, badImagePathMsg: ''});
        if (this.state.maxNumOfPlayers < 1) {
            this.setState({...this.state, badImagePath: true, badImagePathMsg: 'Invalid image path.'});
            return true;
        } else {
            return false;
        }
    };

    buildGame = () => {
        return {
            name: this.state.name,
            minNumOfPlayers: this.state.minNumOfPlayers,
            maxNumOfPlayers: this.state.maxNumOfPlayers,
            genre: this.state.genre,
            imagePath: this.state.imagePath
        };
    };

    onChange = event => {
        // Keep class state up-to-date by pulling values directly from HTML targets:
        if (this.mounted)
            this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {classes} = this.props;

        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }

        const isInvalid =
            this.state.name.length < 1 ||
            this.state.minNumOfPlayers < 1 ||
            this.state.maxNumOfPlayers < 1 ||
            this.state.maxNumOfPlayers < this.state.minNumOfPlayers ||
            this.state.imagePath.length < 1;

        return (
            <Card>
                <CardHeader className={classes.textCenter} color="danger">Add Game</CardHeader>

                <CardBody xs={6} sm={6} md={6}>
                    <form onSubmit={this.onSubmit}>

                        <GridContainer>

                            <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: 'name', // Required for the onChange event handler to work
                                        value: this.state.name,
                                        error: this.state.badName,
                                        onChange: this.onChange
                                    }}
                                />
                                {
                                    this.state.badName ?
                                        <Danger className={classes.textLeft}>
                                            {this.state.badNameMsg}
                                        </Danger> :
                                        null
                                }
                            </GridItem>

                        </GridContainer>

                        <GridContainer>

                            <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Min. Number of Players"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: 'minNumOfPlayers', // Required for the onChange event handler to work
                                        value: this.state.minNumOfPlayers,
                                        error: this.state.badMinNumOfPlayers,
                                        onChange: this.onChange
                                    }}
                                />
                                {
                                    this.state.badMinNumOfPlayers ?
                                        <Danger className={classes.textLeft}>
                                            {this.state.badMinNumOfPlayersMsg}
                                        </Danger> :
                                        null
                                }
                            </GridItem>

                        </GridContainer>

                        <GridContainer>

                            <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Max. Number of Players"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: 'maxNumOfPlayers', // Required for the onChange event handler to work
                                        value: this.state.maxNumOfPlayers,
                                        error: this.state.badMaxNumOfPlayers,
                                        onChange: this.onChange
                                    }}
                                />
                                {
                                    this.state.badMaxNumOfPlayers ?
                                        <Danger className={classes.textLeft}>
                                            {this.state.badMaxNumOfPlayersMsg}
                                        </Danger> :
                                        null
                                }
                            </GridItem>

                        </GridContainer>

                        <GridContainer>

                            <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Genre"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: 'genre', // Required for the onChange event handler to work
                                        value: this.state.genre,
                                        onChange: this.onChange
                                    }}
                                />
                            </GridItem>

                        </GridContainer>

                        <GridContainer>

                            <GridItem className={classes.textCenter} xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Image Path"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: 'imagePath', // Required for the onChange event handler to work
                                        value: this.state.imagePath,
                                        error: this.state.badImagePath,
                                        onChange: this.onChange
                                    }}
                                />
                                {
                                    this.state.badImagePath ?
                                        <Danger className={classes.textLeft}>
                                            {this.state.badImagePathMsg}
                                        </Danger> :
                                        null
                                }
                            </GridItem>

                        </GridContainer>

                        <GridContainer className={classes.textCenter}>

                            <GridItem xs={12} sm={12} md={12}>
                                <Button color="primary" type="submit" disabled={isInvalid}
                                        className={classes.boldButton}>Add Game</Button>
                            </GridItem>

                        </GridContainer>

                    </form>
                </CardBody>
            </Card>
        );
    }
}

const StatefulAddGameComponent = connect(mapStateToProps, mapDispatchToProps)(AddGameComponent);
export default withStyles(basicsStyle)(StatefulAddGameComponent);
