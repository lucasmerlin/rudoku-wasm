mod utils;
mod sudoku;

use wasm_bindgen::prelude::*;
use crate::sudoku::{GameField, solve_sudoku};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
   // fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(n: f64, m: f64) -> f64 {
    return n + m
}

#[wasm_bindgen]
pub fn solveSudoku(field: Vec<u8>) -> Vec<u8> {

    let mut gameField: GameField = [[0; 9]; 9];

    for i in 0..9 {
        for j in 0..9 {
            gameField[i][j] = field[i*9 + j];
        }
    }

    return solve_sudoku(gameField, 0).0.iter().fold(Vec::new(), |mut acc, x| {
        for val in x {
            acc.push(*val);
        }
        acc
    });
}
