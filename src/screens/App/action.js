import { REQUEST, MAP_ACTION } from './types';
import http from '../../apiClient/apiClient';
import { GEOJSON } from '../../apiClient/apiConstants';

const getGeojsonRequest = () => ({
    type: REQUEST.LOADING
});

const getGeojsonSuccess = (data) => ({
    type: REQUEST.SUCCESS,
    payload: data
});

const getGeojsonFailed = (data) => ({
    type: REQUEST.FAILED,
    payload: data
});

const fetchGeojson = () => (dispatch) => {
    dispatch(getGeojsonRequest());
    http.get(GEOJSON)
        .then((resp) => {
            dispatch(getGeojsonSuccess(resp.data.features));
        })
        .catch((err) => {
            dispatch(getGeojsonFailed(err));
        })
};

const setMinElevationRange = (value) => ({
    type: MAP_ACTION.SET_MIN_RANGE,
    payload: value
});

const setMaxElevationRange = (value) => ({
    type: MAP_ACTION.SET_MAX_RANGE,
    payload: value
});

const setPolylineOpacity = (value) => ({
    type: MAP_ACTION.SET_POLYLINE_OPACITY,
    payload: value
});

export { fetchGeojson, setMinElevationRange, setMaxElevationRange, setPolylineOpacity };