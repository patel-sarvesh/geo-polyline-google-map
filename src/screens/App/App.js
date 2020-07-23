import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGeojson, setMaxElevationRange, setMinElevationRange,setPolylineOpacity } from './action';
import MapComponent from '../../components/mapComponent';
import Error from '../../components/Error';

class App extends React.Component {

  componentDidMount = () => {
    this.props.fetchGeojson();
  };

  handleMinRangeChange(event) {
    const maxRangeElevations = this.props.maxRangeElevations.filter(e => e > event.target.value);
    this.props.setMinElevationRange({ minElevation: +event.target.value, maxRangeElevations });
  }

  handleMaxRangeChange(event) {
    const minRangeElevations = this.props.minRangeElevations.filter(e => e > event.target.value);
    this.props.setMaxElevationRange({ maxElevation: +event.target.value, minRangeElevations });
  }

  handlePolylineOpacity(event) {
    this.props.setPolylineOpacity(event.target.value);
  }

  render() {
    const {
      errMessage,
      maxElevation, 
      minElevation, 
      minRangeElevations, 
      polylineOpacity, 
      geojson, 
      maxRangeElevations } = this.props;
      if (errMessage) {
        return <Error error={this.state.errMessage}/>
      }

    return (
    <>
      <div className="container">
      <section className="filters">
        <h4>Elevation Range</h4>
        <div className="row">
          <label>Min Elevation: </label>
          <select onChange={this.handleMinRangeChange.bind(this)} value={minElevation || ''}>
            {minRangeElevations.map(elevation => <option key={elevation} value={elevation}>{elevation}</option>)}
          </select>
        </div>
        <div className="row">
          <label>Max Elevation: </label>
          <select onChange={this.handleMaxRangeChange.bind(this)} value={maxElevation || ''}>
            { maxRangeElevations.map(elevation => <option key={elevation} value={elevation}>{elevation}</option>) }
          </select>
        </div>
      </section>

      <section className="filters">
        <h4>Polyline Opacity</h4>
        <div className="row">
          <input 
            className="slider"
            type="range" 
            min="1" max="10" 
            id="opacity"
            name="opacity"
            onChange={this.handlePolylineOpacity.bind(this)} 
            value={polylineOpacity} 
          />
        </div>
      </section>
      </div>

      { geojson.length ? (
        <MapComponent 
          data={geojson}
          maxElevation={maxElevation}
          minElevation={minElevation}
          strokeOpacity={polylineOpacity/10}
        />
      ) : null }
    </>
    )
  };
}

const mapStateToProps = (state) => {
  const {
    errMessage,
    maxElevation, 
    minElevation, 
    minRangeElevations, 
    polylineOpacity, 
    geojson, 
    maxRangeElevations
  } = state.appReducer;
  
  return { 
    errMessage,
    maxElevation, 
    minElevation, 
    minRangeElevations, 
    polylineOpacity, 
    geojson, 
    maxRangeElevations 
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ 
  fetchGeojson, setMaxElevationRange, setMinElevationRange, setPolylineOpacity }, dispatch);

App.defaultProps = {
  fetchGeojson: () => {},
  setMaxElevationRange: () => {},
  setMinElevationRange: () => {},
  setPolylineOpacity: () => {},
  geojson: [],
  errMessage: '',
  minElevation: null,
  maxElevation: null,
  minRangeElevations: [],
  maxRangeElevations: [],
  polylineOpacity: 10
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
