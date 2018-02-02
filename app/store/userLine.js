const SET_USER_LINE = "SET_USER_LINE"

export const setUserLine = line => ({
    type: SET_USER_LINE,
    line
})

export default function(line='', action) {
    switch(action.type) {
        case SET_USER_LINE:
            return action.line
        default:
            return line
    }
}