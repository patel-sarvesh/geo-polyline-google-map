import { REQUEST, MAP_ACTION } from './types';

const initialState = {
    geojson: [],
    errMessage: '',
    minElevation: null,
    maxElevation: null,
    minRangeElevations: [],
    maxRangeElevations: [],
    polylineOpacity: 10
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST.LOADING:
            return { ...state, isLoading: true };
        case REQUEST.SUCCESS:
            const elevationsRange = [ ...new Set(action.payload.map( item => item.properties.Elevation))].sort((a, b) => a-b);
            return { 
                ...state, 
                geojson: action.payload, 
                minRangeElevations: elevationsRange, 
                maxRangeElevations: elevationsRange,
                maxElevation: elevationsRange[elevationsRange.length - 1],
                minElevation: elevationsRange[0],
                errMessage: ''
            };
        case REQUEST.FAILED:
            return { ...state, errMessage: action.payload };
        case MAP_ACTION.SET_MIN_RANGE:
            return { 
                ...state, 
                minElevation: action.payload.minElevation, 
                maxRangeElevations: action.payload.maxRangeElevations 
            };
        case MAP_ACTION.SET_MAX_RANGE:
            return { 
                ...state,
                maxElevation: action.payload.maxElevation, 
                minRangeElevations: action.payload.minRangeElevations 
            };
            case MAP_ACTION.SET_POLYLINE_OPACITY:
                return { ...state, polylineOpacity: action.payload };
        default:
            return state;
    }
}