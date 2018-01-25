const SELECT_LINE = "SELECT_LINE"

export const selectLine = line => ({
    type: SELECT_INE,
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