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
    Typography,
    Slider,
    ExpansionPanelSummary,
    ExpansionPanel,
    ExpansionPanelDetails,
} from '@material-ui/core';
import width from '@material-ui/system';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import {withLeaflet} from 'react-leaflet';

const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    slider: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(1.5),
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
            setCoords: props.setCoords
        }
    }

    sendquery() {
        // var start = document.getElementById("origin").value;
        // var end = document.getElementById("destination").value;
        // var importance = 50;
        // var url = "http://54.172.173.217:8000/?start=" + start + "&end=" + end + "&elev=" + importance;
        // var finalurl = encodeURI(url)
        // axios.get(finalurl).then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // });
        this.state.setCoords([
            {
                from_lat: "42.360051",
                from_long: "-71.060512",
                id: "132512",
                to_lat: "42.358571",
                to_long: "-71.062269",
            },
            {
                from_lat: "42.358571",
                from_long: "-71.062269",
                id: "132513",
                to_lat: "42.356271",
                to_long: "-71.062269",
            }
        ])
    }

    render() {
        console.log("bai")
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <div className={classes.root}>
                    <InputBase
                        id="origin"
                        className={classes.input}
                        placeholder="Enter your origin"
                        inputProps={{ 'aria-label': 'enter your origin' }}
                    />
                </div>
                <div className={classes.root}>
                    <InputBase
                        id="destination"
                        className={classes.input}
                        placeholder="Enter your destination"
                        inputProps={{ 'aria-label': 'enter your destination' }}
                    />
                    <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={() => this.sendquery()}>
                        <DirectionsIcon />
                    </IconButton>
                </div>
                <div>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading} style={{ textAlign: "right" }}>{"How important are elevation changes?"}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Slider
                                className={classes.slider}
                                defaultValue={0.50}
                                aria-label="How important are elevation changes?"
                                step={0.25}
                                marks
                                min={0}
                                max={1}
                                valueLabelDisplay="auto"
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Card>
        );
    }
}

export default withStyles(styles)(QueryForm); //This is a function which allows the const styles to be applied to the component