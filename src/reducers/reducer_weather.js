import { FETCH_WEATHER } from '../actions/index'; 

export default function(state = [], action) {
    if(action && action.payload && action.payload.data) {
        switch (action.type) {
            case FETCH_WEATHER: 
                return state.concat([action.payload.data]);
        }
        return state;
    } else {
        return state.concat([]);;
    }
}