import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardHeader,
    Button,
    TextField,
} from '@material-ui/core';

const styles = theme => ({
    card: {
        minWidth: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
})

class QueryForm extends React.Component {
    constructor(props) {
        super(props); // This line is always required to be the first line
        this.state = {
        }
    }

    render() {
        return (
            <Card>
                <form>
                    <TextField
                        id="test-field"
                        label="TEST LABEL"
                        variant="outlined"
                    />
                </form>
            </Card>
        );
    }
}

export default withStyles(styles)(QueryForm); //This is a function which allows the const styles to be applied to the component