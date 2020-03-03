import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import {loadGamesAction} from '../../actions';

import AddGameComponent from 'views/GameComponent/AddGameComponent.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Footer from 'components/Footer/Footer.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import QueueHavenHeader from 'components/Header/QueueHavenHeader.jsx';
import Parallax from 'components/Parallax/Parallax.jsx'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {confirmAlert} from 'react-confirm-alert';

import tableStyle from 'assets/jss/material-kit-react/views/gameComponent.jsx';
import 'react-confirm-alert/src/react-confirm-alert.css';

import GameService from 'services/GameService';

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
        loadGames: games => dispatch(loadGamesAction(games))
    };
};

class GameComponent extends React.Component {

    constructor() {
        super();

        this.state = {
          games: []
        };

        this.gameService = new GameService();
        this.loadGames();
    }

    loadGames = () => {
        this.gameService.getGames()
            .then(result => {
                this.props.loadGames(result.data);
                this.setState({ ...this.state, games: result.data });
            });
    };

    deleteGame = (gameName, gameId) => {
        confirmAlert({
            title: 'Are you sure?',
            message: `Delete Game: ${gameName}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    this.gameService.deleteGame(gameId)
                        .then(result => {
                            this.loadGames();
                        })
                }
              },
              {
                label: 'No',
                onClick: () => { }
              }
            ]
          });
    };

    render() {
        const {classes} = this.props;

        if (this.props.user == '') {
            return <Redirect push to="/"/>;
        }

        return (
            <div>
                <QueueHavenHeader/>
                <Parallax filter image={require('assets/img/bg1.png')} className={classes.short}>

                </Parallax>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <GridContainer alignItems="stretch" justify="center" spacing={40}>
                        <GridItem xs={12} sm={12} md={6}>
                            <Table className={classNames(classes.container)}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Min. # of Players</TableCell>
                                        <TableCell align="right">Max. # of Players</TableCell>
                                        <TableCell align="right">Genre</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.games.map(game => (
                                        <TableRow key={game.gameId}>
                                            <TableCell>{game.name}</TableCell>
                                            <TableCell align="right">{game.minNumOfPlayers}</TableCell>
                                            <TableCell align="right">{game.maxNumOfPlayers}</TableCell>
                                            <TableCell align="right">{game.genre}</TableCell>
                                            <TableCell align="right"><Button color="primary" onClick={() => this.deleteGame(game.name, game.gameId)} className={classes.boldButton}>Delete</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={6}>
                            <AddGameComponent/>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer/>
            </div>
        );
    }
}

const StatefulGameComponent = connect(mapStateToProps, mapDispatchToProps)(GameComponent)
export default withStyles(tableStyle)(StatefulGameComponent);