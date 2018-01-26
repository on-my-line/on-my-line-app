const SELECT_STOP = "SELECT_STOP"

export const setStop = stop => ({
    type: SELECT_STOP,
    stop
})

export default function(stop='', action) {
    switch(action.type) {
        case SELECT_STOP:
            return action.stop
        default:
            return stop
    }
}