import type {NextPage} from 'next'
import {solveSudoku} from "rudoku-wasm";
import {useState} from "react";
import {arrayToField, Field, fieldToArray} from "../lib/utils";
import styles from "../styles/index.module.css"


const easySudoku: Field = [
    [1, 0, 0, 4, 8, 9, 0, 0, 6],
    [7, 3, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 1, 2, 9, 5],
    [0, 0, 7, 1, 2, 0, 6, 0, 0],
    [5, 0, 0, 7, 0, 3, 0, 0, 8],
    [0, 0, 6, 0, 9, 5, 7, 0, 0],
    [9, 1, 4, 6, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 3, 7],
    [8, 0, 0, 5, 1, 2, 0, 0, 4],
]

const hardSudoku: Field = [
    [0, 2, 0, 5, 0, 1, 0, 9, 0],
    [8, 0, 0, 2, 0, 3, 0, 0, 6],
    [0, 3, 0, 0, 6, 0, 0, 7, 0],
    [0, 0, 1, 0, 0, 0, 6, 0, 0],
    [5, 4, 0, 0, 0, 0, 0, 1, 9],
    [0, 0, 2, 0, 0, 0, 7, 0, 0],
    [0, 9, 0, 0, 3, 0, 0, 8, 0],
    [2, 0, 0, 8, 0, 4, 0, 0, 7],
    [0, 1, 0, 9, 0, 7, 0, 6, 0],
];

const veryHard: Field = [
    [0, 0, 0, 0, 0, 3, 5, 0, 1],
    [0, 0, 0, 0, 0, 6, 0, 8, 7],
    [0, 8, 0, 0, 5, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 4, 0, 3],
    [0, 3, 8, 0, 0, 0, 2, 1, 0],
    [6, 0, 2, 0, 0, 9, 0, 0, 0],
    [0, 0, 0, 0, 9, 0, 0, 5, 0],
    [1, 2, 0, 5, 0, 0, 0, 0, 0],
    [7, 0, 4, 0, 6, 0, 0, 0, 0],
]

let extremelyHard: Field = [
    [0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 8, 0, 0, 0, 7, 0, 9, 0],
    [6, 0, 2, 0, 0, 0, 5, 0, 0],
    [0, 7, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 9, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 4, 0],
    [0, 0, 5, 0, 0, 0, 6, 0, 3],
    [0, 9, 0, 4, 0, 0, 0, 7, 0],
    [0, 0, 6, 0, 0, 0, 0, 0, 0],
];

const SudokuField = ({field}: { field?: Field }) => {
    return <div>
        {field && <div>
            {field.map((arr, i) => <div key={i} className={styles.row}>
                {arr.map((cell, j) => <div key={j} className={`${styles.value} c-${j}`}>
                    {cell}
                </div>)}
            </div>)}
        </div>}
    </div>
}


const Home: NextPage = () => {

    const [solved, setSolved] = useState<Field | undefined>(() => arrayToField(solveSudoku(fieldToArray(easySudoku))))
    const [solving, setSolving] = useState<Field>(easySudoku)

    const solve = (field: Field) => {
        setSolving(field)
        setSolved(undefined)

        setTimeout(() => {
            setSolved(arrayToField(solveSudoku(fieldToArray(field))))
        })

    }

    return (<>
        <button onClick={() => solve(easySudoku)}>Solve easy Sudoku</button>
        <button onClick={() => solve(hardSudoku)}>Solve hard Sudoku</button>
        <button onClick={() => solve(veryHard)}>Solve very hard Sudoku</button>
        <button onClick={() => solve(extremelyHard)}>Solve extremely hard Sudoku (Slow!)</button>

        <br/>

        Solving Field:
        <SudokuField field={solving}/>

        Result:
        <SudokuField field={solved}/>

    </>)
}

export default Home
