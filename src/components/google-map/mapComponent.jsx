import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Polyline, InfoWindow } from 'google-maps-react';
import './mapStyles.css';

const MapComponent = ({ google, data, maxElevation, minElevation, strokeOpacity }) => {
    const [selectedPolyline, setSelectedPolyline] = useState(null);

    // to get center to the map for zoom
    const center = { 
        lat: data[0].geometry.coordinates[0][1],
        lng: data[0].geometry.coordinates[0][0] 
    }

    // bound for the zoom with map extends
    const bound = new google.maps.LatLngBounds();

    //  to create polylines render object
    const displayPolyline = () => {
        return data.map(item => {
            const paths = setLatLng(item.geometry.coordinates);
            return <Polyline 
                path={paths}
                key={(maxElevation - minElevation) - (strokeOpacity + item.properties.Elevation + item.properties.ID)}
                geodesic={true}
                strokeColor={
                    ( minElevation <=item.properties.Elevation && item.properties.Elevation <= maxElevation ) ?
                    '#ff0000' : '#0000ff'
                }
                strokeOpacity={strokeOpacity}
                strokeWeight={2}
                onClick={(t, map, coord) => setSelectedPolyline(
                    { coord: {lat: coord.latLng.lat(), lng: coord.latLng.lng()},
                    property: item.properties
                })}
            >
            </Polyline>
        });
    };

    //  set lat lng for the polyline paths and bound
    const setLatLng = (coords) => {
        return coords.map(coord => {
            const [ lng, lat ] = coord;
            bound.extend({ lng, lat });
            return { lng, lat }
        });
    }

    return (
        <>
        <Map
            google={google}
            zoom={16}
            style={{ width: '100%', height: '100%' }}   
            initialCenter={center}
            bounds={bound}
        >
            {displayPolyline()}
            
            {selectedPolyline && (
            <InfoWindow
                visible={true}
                onCloseClick={() => {
                    setSelectedPolyline(null);
                }}
                position={selectedPolyline.coord}
            >
                <table className="info-window">
                    <tr>
                        <th>Id</th>
                        <th>Elevation</th>
                    </tr>
                    <tr>
                        <td>{selectedPolyline.property.ID}</td>
                        <td>{selectedPolyline.property.Elevation}</td>
                    </tr>
                </table>
            </InfoWindow>
            )}
        </Map>
        </>
    ); 
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9Rhupg0pQERp36FntAK5RLJ62RYJBWNs'
  })(MapComponent);