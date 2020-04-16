import React from 'react';
import QueryForm from '../../components/Query'
import CustomMap from '../../components/Map'
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import {
    Fab,
} from '@material-ui/core';

const styles = theme => ({
    fab: {
        position: 'fixed',
        zIndex: 5,
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
})
class Main extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CustomMap />
                <Fab variant="extended" className={classes.fab}>
                    <NavigationIcon className={classes.extendedIcon} />
                    Navigate
                </Fab>
            </div>
        )
    }
}

export default withStyles(styles)(Main);