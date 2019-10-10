import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import QueueElement from './QueueElement';

class QueueComponent extends Component {

    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        this.state = {
            games: ['Gloomhaven', 'Risk', 'Scythe'],
        };
    }

    handleDrop = (sourceQueueElement, targetQueueElement) => {
        const { games } = this.state;

        const nextGames = [];

        for (const game of games) {
            if (game == targetQueueElement) {
                nextGames.push(sourceQueueElement);
            }

            if (game != sourceQueueElement) {
                nextGames.push(game);
            }
        }

        this.setState({
            games: nextGames,
        });
    };

    createQueueElements = () => {
        const { games } = this.state;

        let queueElements = [];

        for (const game of games) {
            queueElements.push(<QueueElement gameTitle={game} onDrop={this.handleDrop} />);
        }

        return queueElements;
    };

    render() {
        return (
            <div>
                { this.createQueueElements() }
            </div>
        );
    }
}
export default DragDropContext(HTML5Backend)(QueueComponent);