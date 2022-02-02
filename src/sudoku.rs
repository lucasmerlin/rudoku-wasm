type Row<T> = [T; 9];

type Field<T> = [Row<T>; 9];

pub type GameField = Field<u8>;

type PossibleValueField = Field<Vec<u8>>;

fn check_row_array_for_number(row: Row<u8>, i: u8) -> bool {
    row.iter().any(|&x| x == i)
}

fn column_to_array(column: usize, field: GameField) -> Row<u8> {
    return field.map(|row| row[column]);
}

fn square_to_array(row: usize, column: usize, field: GameField) -> Row<u8> {
    let x = row / 3;
    let y = column / 3;
    let mut square: Row<u8> = [0; 9];
    for i in 0..3 {
        for j in 0..3 {
            square[i * 3 + j] = field[x * 3 + i][y * 3 + j];
        }
    }
    return square;
}

fn is_in_row(i: u8, row: usize, field: GameField) -> bool {
    return check_row_array_for_number(field[row], i);
}

fn is_in_column(i: u8, column: usize, field: GameField) -> bool {
    return check_row_array_for_number(column_to_array(column, field), i);
}

fn is_in_square(i: u8, row: usize, column: usize, field: GameField) -> bool {
    return square_to_array(row, column, field).iter().any(|&x| x == i);
}

fn possible_positions_in_row(i: u8, row: usize, field: GameField) -> [bool; 9] {
    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(|column| field[row][column] == 0 && !is_in_column(i, column, field) && !is_in_square(i, row, column, field))
}

fn possible_positions_in_column(i: u8, column: usize, field: GameField) -> [bool; 9] {
    [0, 1, 2, 3, 4, 5, 6, 7, 8].map(|row| field[row][column] == 0 && !is_in_row(i, row, field) && !is_in_square(i, row, column, field))
}

fn possible_positions_in_square(i: u8, row: usize, column: usize, field: GameField) -> [[bool; 3]; 3] {
    return [0, 1, 2].map(|x| [0, 1, 2].map(|y| field[x + row][y + column] == 0 && !is_in_row(i, x + row, field) && !is_in_column(i, y + column, field)));
}

pub fn solve_sudoku(field: GameField, depth: usize) -> (GameField, bool) {
    let mut field = field;
    let mut last_field: GameField = [[0; 9]; 9];

    while field != last_field {
        last_field = field;
        for row in 0..9 {
            for i in 1..10 {
                if is_in_row(i, row, field) {
                    continue;
                }

                let positions = possible_positions_in_row(i, row, field);
                let position_count = positions.iter().filter(|&&x| x).count();

                let indexes = positions.iter().enumerate().filter(|&(_, &x)| x).map(|(index, _)| index).collect::<Vec<usize>>();

                if position_count == 1 {
                    field[row][indexes[0]] = i;
                } else if depth < 2 {
                    for index in indexes {
                        let mut try_field = field.clone();
                        try_field[row][index] = i;
                        let (result, success) = solve_sudoku(try_field, depth + 1);
                        if success {
                            return (result, true);
                        }
                    }
                }
            }
        }
    }

    return (field, field.iter().flatten().all(|&x| x != 0));
}
