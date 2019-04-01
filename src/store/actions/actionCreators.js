import * as actionTypes from './actionTypes';

export const step = () => {
    return {
        type: actionTypes.STEP
    }
}

export const start = () => { 
    return {
        type: actionTypes.START
    }
}

export const stop = () => {
    return {
        type: actionTypes.STOP
    }
}

export const regen = () => {
    return {
        type: actionTypes.REGEN
    }
}

/*
let timer = null;

export const start = () => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000); // this.state.stepDelay
  dispatch({ type: actionTypes.START });
  dispatch(tick())
}

const tick = () => { type: actionTypes.STEP };

export const stop = () => {
  clearInterval(timer);
  return { type: actionTypes.STOP };
}
*/