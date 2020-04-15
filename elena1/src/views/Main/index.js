import React from 'react';
import QueryForm from '../../components/Query'
import CustomMap from '../../components/Map'
import { withStyles } from '@material-ui/core/styles';
import {
    Grid
} from '@material-ui/core';

const styles = theme => ({
    // root: {
    //     flexGrow: 1,
    // },
    // gridItem: {
    //     padding: theme.spacing(3),
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },
})
class Main extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root} style={{width: "100%",height: "100%"}}>
                <CustomMap />
                {/* <div>
                    <QueryForm />
                </div> */}
            </div>
        )
    }
}

export default withStyles(styles)(Main);