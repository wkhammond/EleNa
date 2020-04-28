import React from 'react';
import QueryForm from '../../components/Query'
import CustomMap from '../../components/Map'
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import {
    Card,
    Fab,
    TextField
} from '@material-ui/core';

const styles = theme => ({
    // fab: {
    //     position: 'fixed',
    //     zIndex: 5,
    //     bottom: theme.spacing(2),
    //     right: theme.spacing(2),
    // }
})
export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            coords: []
        }
        this.setCoords = this.setCoords.bind(this)
    }

    setCoords(inCoords, startPos, destPos){
        this.setState({
            ...this.state,
            coords: inCoords,
            start: startPos,
            end: destPos 
        });
    }

    render() {
        const { classes } = this.props;
        console.log('creating main');
        return (
            <div>
                <CustomMap 
                    coords={this.state.coords} key={this.state.coords}
                    startPos={this.state.start} destPos={this.state.end}
                    />
                <QueryForm setCoords={this.setCoords} />
            </div>
        )
    }
}

// export default withStyles(styles)(Main);