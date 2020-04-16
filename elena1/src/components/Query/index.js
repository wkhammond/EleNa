import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    IconButton,
    Divider,
    InputBase,
    Paper,
    TextField,
    Slider,
} from '@material-ui/core';
import width from '@material-ui/system';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    card: {
        position: 'fixed',
        zIndex: 5,
        top: theme.spacing(2),
        left: theme.spacing(2),
    },
    field: {
        margin: theme.spacing(1)
    }
})

class QueryForm extends React.Component {
    constructor(props) {
        super(props); // This line is always required to be the first line
        this.state = {
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <div className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Enter your origin"
                        inputProps={{ 'aria-label': 'enter your origin' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={() => console.log("I'm finding your destination! (but no....)")}>
                        <SearchIcon />
                    </IconButton>
                </div>
                <div className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Enter your destination"
                        inputProps={{ 'aria-label': 'enter your destination' }}
                    />
                    <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={() => console.log("I'm routing! (Not really)")}>
                        <DirectionsIcon />
                    </IconButton>
                </div>
                <div> How important are elevation changes?</div>
                <div className={classes.root}>
                    <Slider
                        defaultValue={0.50}
                        aria-label="How important are elevation changes?"
                        step={0.25}
                        marks
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                        />
                    </div>
            </Card>
        );
    }
}

export default withStyles(styles)(QueryForm); //This is a function which allows the const styles to be applied to the component