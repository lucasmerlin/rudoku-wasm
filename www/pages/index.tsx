import type { NextPage } from 'next';
import { useState } from 'react';
import { solveSudoku } from 'rudoku-wasm';
import { arrayToField, Field, fieldToArray } from '../lib/utils';
import styles from '../styles/index.module.css';

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
];

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
];

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

const SudokuField = ({ field }: { field?: Field }) => {
    return <div>
        {field && <div>
            {field.map((arr, i) => <div key={i}
                                        className={styles.row}>
                {arr.map((cell, j) => <div key={j}
                                           className={styles.value}>
                    {((cell == 0) ? " " : cell)}
                </div>)}
            </div>)}
        </div>}
    </div>;
};

const Home: NextPage = () => {

    const [solved, setSolved] = useState<Field | undefined>(() => arrayToField(solveSudoku(fieldToArray(easySudoku))));
    const [solving, setSolving] = useState<Field>(easySudoku);

    const [customSudoku, setCustomSudoku] = useState<string>(easySudoku.map(arr => arr.join(',')).join(',\n'));

    const solve = (field: Field) => {
        setSolving(field);
        setSolved(undefined);

        setTimeout(() => {
            setSolved(arrayToField(solveSudoku(fieldToArray(field))));
        });

    };

    return (<>
        <h1 className={styles.h1}>Rudoku</h1>
        <div className={styles.pageWrapper}>
            <div className={styles.buttonWrapper}>
                <button className={styles.button}
                        onClick={() => solve(easySudoku)}>Solve easy Sudoku</button>
                <button className={styles.button}
                        onClick={() => solve(hardSudoku)}>Solve hard Sudoku</button>
                <button className={styles.button}
                        onClick={() => solve(veryHard)}>Solve very hard Sudoku</button>
                <button className={styles.button}
                        onClick={() => solve(extremelyHard)}>Solve extremely hard Sudoku (Slow!)</button>
            </div>

            <br />

            <div className={styles.fieldWrapper}>
                <div className={styles.sudokuFieldAndTitleWrapper}>
                    <h2>Solving Field:</h2>
                    <SudokuField field={solving} />
                </div>

                {!solved &&
                <div>
                    <div>Solving...</div>
                </div>
                }

                <div className={styles.sudokuFieldAndTitleWrapper}>
                    <h2>Result:</h2>
                    <SudokuField field={solved} />
                </div>

            </div>


            <h2>Custom Sudoku</h2>
            <textarea value={customSudoku}
                      onChange={e => setCustomSudoku(e.target.value)}
                      rows={9}
                      className={styles.textarea}/>
            <br />
            <button className={styles.button}
                    onClick={() => {
                        const field = arrayToField(new Uint8Array(customSudoku.split(',').map(str => parseInt(str, 10))));
                        solve(field);
                    }}>Solve
            </button>

        </div>
        </>);
};

export default Home;
