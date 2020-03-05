import React, {Component} from 'react';
import flow from 'lodash/flow';

import { DragSource, DropTarget } from 'react-dnd';
import { PropTypes } from 'prop-types';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';

class QueueElement extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { gameTitle, isDragging, connectDragSource, connectDropTarget } = this.props;

        return connectDragSource(connectDropTarget(
            <div>
                <Card
                    style={{
                        opacity: isDragging ? 0.25 : 1,
                    }}>
                    <CardHeader  color="danger">{gameTitle}</CardHeader>

                    <CardBody xs={6} sm={6} md={6}>

                    </CardBody>
                </Card>
            </div>
        ));
    }
}

QueueElement.propTypes = {
    gameTitle: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
}

const queueElementSource = {
    beginDrag(props) {
        const { gameTitle } = props;

        return ({
            gameTitle,
        });
    },
    endDrag(props, monitor) {
        if (!monitor.didDrop()) {
            return;
        }

        const { gameTitle, onDrop } = props;
        const targetGameTitle = monitor.getDropResult().gameTitle;

        onDrop(gameTitle, targetGameTitle);
    },
};

const queueElementTarget = {
    drop(props) {
        const { gameTitle } = props;
        return ({
            gameTitle,
        });
    }
};

export default flow(
    DropTarget('QUEUE_ELEMENT', queueElementTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    })),
    DragSource('QUEUE_ELEMENT', queueElementSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }))
)(QueueElement)