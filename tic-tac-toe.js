document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div');
    const display = document.getElementById('display');
    var turnCount = 0;

    squares.forEach(square => { square.addEventListener('click', clickOutcome) });
    var currentPlayer = 'PlayerX';

    function clickOutcome(e) {
        const squareArray = Array.from(squares);
        const index = squareArray.indexOf(e.target);
        //если ход игрока и данная ячейка пустая то ставим Х
        if (currentPlayer === 'PlayerX' && squares[index].classList.length === 0) {
            squares[index].classList.add('PlayerX');
            turnCount++;
            currentPlayer = 'PlayerO'; //разрешаем ходить компьютеру
            gameOver();
            aiTurn();
        }
    }
    //ход компьютера
    function aiTurn() {
        if (currentPlayer != 'PlayerO') return;
        //проверяем нет ли шансов выиграть сделав 3 в ряд
        if (Look_for_3inRow('PlayerO') != 10) {
            squares[Look_for_3inRow('PlayerO')].classList.add('PlayerO')
            gameOver();
            currentPlayer = 'PlayerX'; //разрешаем ход игрока
            return;
        }
        //проверяем не хочет ли игрок сделать 3 в ряд и мешаем ему
        if (Look_for_3inRow('PlayerX') != 10) {
            squares[Look_for_3inRow('PlayerX')].classList.add('PlayerO')
            gameOver();
            currentPlayer = 'PlayerX'; //разрешаем ход игрока
            return;
        }
        //ходим оптимально если ничего не грозит
        if (Look_for_turn() != 10) {
            squares[Look_for_turn()].classList.add('PlayerO');
        }

        currentPlayer = 'PlayerX'; //разрешаем ход игрока
        gameOver();

    }

    //алгоритм поиска компьютером выигрышного хода
    function Look_for_3inRow(player) {
        //Horizontal seek
        if ((squares[0].classList.contains(player)) && (squares[1].classList.contains(player)) && (squares[2].classList.length === 0)) return 2;
        if ((squares[0].classList.contains(player)) && (squares[1].classList.length === 0) && (squares[2].classList.contains(player))) return 1;
        if ((squares[0].classList.length === 0) && (squares[1].classList.contains(player)) && (squares[2].classList.contains(player))) return 0;

        if ((squares[3].classList.contains(player)) && (squares[4].classList.contains(player)) && (squares[5].classList.length === 0)) return 5;
        if ((squares[3].classList.contains(player)) && (squares[4].classList.length === 0) && (squares[5].classList.contains(player))) return 4;
        if ((squares[3].classList.length === 0) && (squares[4].classList.contains(player)) && (squares[5].classList.contains(player))) return 3;

        if ((squares[6].classList.contains(player)) && (squares[7].classList.contains(player)) && (squares[8].classList.length === 0)) return 8;
        if ((squares[6].classList.contains(player)) && (squares[7].classList.length === 0) && (squares[8].classList.contains(player))) return 7;
        if ((squares[6].classList.length === 0) && (squares[7].classList.contains(player)) && (squares[8].classList.contains(player))) return 6;
        //Vertical seek
        if ((squares[0].classList.contains(player)) && (squares[3].classList.contains(player)) && (squares[6].classList.length === 0)) return 6;
        if ((squares[0].classList.contains(player)) && (squares[3].classList.length === 0) && (squares[6].classList.contains(player))) return 3;
        if ((squares[0].classList.length === 0) && (squares[3].classList.contains(player)) && (squares[6].classList.contains(player))) return 0;

        if ((squares[1].classList.contains(player)) && (squares[4].classList.contains(player)) && (squares[7].classList.length === 0)) return 7;
        if ((squares[1].classList.contains(player)) && (squares[4].classList.length === 0) && (squares[7].classList.contains(player))) return 4;
        if ((squares[1].classList.length === 0) && (squares[4].classList.contains(player)) && (squares[7].classList.contains(player))) return 1;

        if ((squares[2].classList.contains(player)) && (squares[5].classList.contains(player)) && (squares[8].classList.length === 0)) return 8;
        if ((squares[2].classList.contains(player)) && (squares[5].classList.length === 0) && (squares[8].classList.contains(player))) return 5;
        if ((squares[2].classList.length === 0) && (squares[5].classList.contains(player)) && (squares[8].classList.contains(player))) return 2;
        // Diagonal seek
        if ((squares[0].classList.contains(player)) && (squares[4].classList.contains(player)) && (squares[8].classList.length === 0)) return 8;
        if ((squares[0].classList.contains(player)) && (squares[4].classList.length === 0) && (squares[8].classList.contains(player))) return 4;
        if ((squares[0].classList.length === 0) && (squares[4].classList.contains(player)) && (squares[8].classList.contains(player))) return 0;

        if ((squares[6].classList.contains(player)) && (squares[4].classList.contains(player)) && (squares[2].classList.length === 0)) return 2;
        if ((squares[6].classList.contains(player)) && (squares[4].classList.length === 0) && (squares[2].classList.contains(player))) return 4;
        if ((squares[6].classList.length === 0) && (squares[4].classList.contains(player)) && (squares[2].classList.contains(player))) return 6;
        return 10;
    }

    //алгоритм поиска компьютером оптимального хода
    function Look_for_turn() {
        //1) look for center
        if (squares[4].classList.length === 0) return 4;
        //2) look for opposite corner
        if (squares[0].classList.contains('PlayerO')) {
            if (squares[2].classList.length === 0) return 2;
            if (squares[8].classList.length === 0) return 8;
            if (squares[6].classList.length === 0) return 6;
        }
        if (squares[2].classList.contains('PlayerO')) {
            if (squares[0].classList.length === 0) return 0;
            if (squares[8].classList.length === 0) return 8;
            if (squares[6].classList.length === 0) return 6;
        }
        if (squares[6].classList.contains('PlayerO')) {
            if (squares[0].classList.length === 0) return 0;
            if (squares[8].classList.length === 0) return 8;
            if (squares[2].classList.length === 0) return 2;
        }
        if (squares[8].classList.contains('PlayerO')) {
            if (squares[0].classList.length === 0) return 0;
            if (squares[2].classList.length === 0) return 2;
            if (squares[6].classList.length === 0) return 6;
        }
        //3) look for any space corner
        if (squares[0].classList.length === 0) return 0;
        if (squares[8].classList.length === 0) return 8;
        if (squares[2].classList.length === 0) return 2;
        if (squares[6].classList.length === 0) return 6;
        //4) Look for any space cell
        for (var i = 0; i < 9; i++)
            if (squares[i].classList.length === 0) return i;

        return 10;
    }

    //проверяем не пора ли закончить игру
    function gameOver() {
        //выигрыш компютера
        if (checkWin('PlayerO')) {
            display.innerHTML = 'Вы проиграли!';
            squares.forEach(square => { square.removeEventListener('click', clickOutcome) });
        }
        //выигрыш игрока
        if (checkWin('PlayerX')) {
            display.innerHTML = 'Вы выиграли!';
            currentPlayer = 'PlayerX';
            squares.forEach(square => { square.removeEventListener('click', clickOutcome) });
        }
        //ничья
        if (turnCount === 5) {
            display.innerHTML = 'НИЧЬЯ!';
            squares.forEach(square => { square.removeEventListener('click', clickOutcome) });
        }
    }

     //проверяем есть ли собранный ряд
    function checkWin(player) {
        if ((squares[0].classList.contains(player)) && (squares[1].classList.contains(player)) && (squares[2].classList.contains(player))) return true;
        if ((squares[3].classList.contains(player)) && (squares[4].classList.contains(player)) && (squares[5].classList.contains(player))) return true;
        if ((squares[6].classList.contains(player)) && (squares[7].classList.contains(player)) && (squares[8].classList.contains(player))) return true;
        // check vertical rows
        if ((squares[0].classList.contains(player)) && (squares[3].classList.contains(player)) && (squares[6].classList.contains(player))) return true;
        if ((squares[1].classList.contains(player)) && (squares[4].classList.contains(player)) && (squares[7].classList.contains(player))) return true;
        if ((squares[2].classList.contains(player)) && (squares[5].classList.contains(player)) && (squares[8].classList.contains(player))) return true;
        // check diagonals rows
        if ((squares[0].classList.contains(player)) && (squares[4].classList.contains(player)) && (squares[8].classList.contains(player))) return true;
        if ((squares[6].classList.contains(player)) && (squares[4].classList.contains(player)) && (squares[2].classList.contains(player))) return true;
        return false;
    }



















});