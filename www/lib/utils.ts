import {solveSudoku} from "rudoku-wasm";

export type Field = number[][];


export const arrayToField = (array: Uint8Array): Field => {
    return array.reduce((acc, number, i) => {
        const row = Math.floor(i / 9)
        acc[row] = acc[row] || []
        acc[row][i % 9] = number
        return acc
    }, [] as Field)
}

export function fieldToArray(field: Field): Uint8Array {
    return new Uint8Array(field.flat())
}
