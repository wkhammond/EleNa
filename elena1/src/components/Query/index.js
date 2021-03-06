import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    IconButton,
    InputBase,
    Typography,
    Slider,
    ExpansionPanelSummary,
    ExpansionPanel,
    ExpansionPanelDetails,
} from '@material-ui/core';
import DirectionsIcon from '@material-ui/icons/Directions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'

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

// Query component that handles taking input from the user and calling the API
class QueryForm extends React.Component {
    constructor(props) {
        super(props); // This line is always required to be the first line
        this.state = {
            setCoords: props.setCoords,
            sliderValue: 50
        }
    }

    updateSliderValue(newVal){
        this.setState({
            ...this.state,
            sliderValue: newVal * 100
        })
    }

    async sendquery() {
        const start = document.getElementById("origin").value;
        const end = document.getElementById("destination").value;
        const importance = this.state.sliderValue;
        // Change this URL to localhost or new IP if/when the AWS server goes offline
        const url = "http://54.172.173.217:8000/?start=" + start + "&end=" + end + "&elev=" + importance;
        const finalurl = encodeURI(url);
        let nodes = [];
        nodes = await axios.get(finalurl);
        nodes = nodes.data;
        let startPos = [parseFloat(nodes[0].x), parseFloat(nodes[0].y)];
        let destPos = [parseFloat(nodes[nodes.length-1].x), parseFloat(nodes[nodes.length-1].y)];
        let newCoords = [];
        for (let i = 0; i < nodes.length - 1; i++){
            let node = {}
            node["from_lat"] = parseFloat(nodes[i].x);
            node['from_long'] = parseFloat(nodes[i].y);
            node["id"] = i;
            node["to_lat"] = parseFloat(nodes[i + 1].x);
            node["to_long"] = parseFloat(nodes[i + 1].y);
            newCoords[i] = node;
        }
        this.state.setCoords(newCoords, startPos, destPos);
    }

    render() {
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
                                onChange={(event, val) => this.updateSliderValue(val)}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Card>
        );
    }
}

export default withStyles(styles)(QueryForm); //This is a function which allows the const styles to be applied to the component