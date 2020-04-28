import React from 'react';
import QueryForm from '../../components/Query'
import CustomMap from '../../components/Map'

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