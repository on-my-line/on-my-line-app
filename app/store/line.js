const SELECT_LINE = "SELECT_LINE"

export const setLine = line => ({
    type: SELECT_LINE,
    line
})

export default function(line='', action) {
    switch(action.type) {
        case SELECT_LINE:
            return action.line
        default:
            return line
    }
}