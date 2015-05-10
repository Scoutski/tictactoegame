// Project needs to accept user inputs and mark spaces on a webpage to play the tic tac toe game.
// Project needs to determine when a win condition has been met and when no winning condition is left in the game so it can end
// Project needs to be able to reset and clear all current moves
// Nice feature to have would be able to undo last move.
// Project will need functions for:
// - Start Game
// - Determining which players turn it is
// - Processing Player Input
// - Placing player specific markers on the board
// - Checking the board state

// Determining the winner is a giant pain in the ass. There are 8 different victory conditions (3 rows, 3 columns + 2 diagonals. Comparing the value of these squares is not a very good way to do it without making a huge mess of code)
// I could try make a nested array 3x3 and do comparisons that way but that would still just be a massive block of if statements as far as I can tell, or it would be a bloated for loop, probably nested for loops
// I could assign a value to each square for win conditions and check if variables meet each total.
// Okay, magic square does not work because it's possible to make a solution with 4 different non-sequential values (01,11,12,22 = 15).


var turnCheck = -1;
// var oTotal = 0;
// var xTotal = 0;
// var boardPoints = [
//   [8, 1, 6],
//   [3, 5, 7],
//   [4, 9, 2]
// ];
// Magic square doesn't work, had to google number combination for success
var board = {};
//Values will be assigned as required

var currentPlayer = '';
var turns = 0;
var victor = '';
var lightUp = [];
var score = {
  O: 0,
  X: 0
}

// var determineVictor = function() {
//   This function is disgusting and I hate it. Unfortunately it causes an issue because it counts empty squares as wins.
//   if ($('table th#topleft').text() === $('table th#topmid').text() && $('table th#topleft').text() === $('table th#topright').text()) {
//     console.log('winner');
//   } else if ($('table th#midleft').text() === $('table th#middle').text() && $('table th#midleft').text() === $('table th#midright').text()) {
//     console.log('winner');
//   } else if ($('table th#botleft').text() === $('table th#botmid').text() && $('table th#botright').text() === $('table th#botleft').text()) {
//     console.log('winner');
//   }
// };

// Abandoning this function and going to try use magic square method to find solution.

var determinePlayerTurn = function() {
  turnCheck++
  if (turnCheck % 2 === 0) {
    currentPlayer = 'O';
    return 'O';
  } else {
    currentPlayer = 'X';
    return 'X';
  }
  // This function basically just works out who's turn it is and marks the square with the corresponding character.
};

var addMark = function(position) {
  switch (position) {
    case 'topleft':
      board.pos0 = currentPlayer;
      break;
    case 'topmid':
      board.pos1 = currentPlayer;
      break;
    case 'topright':
      board.pos2 = currentPlayer;
      break;
    case 'midleft':
      board.pos3 = currentPlayer;
      break;
    case 'middle':
      board.pos4 = currentPlayer;
      break;
    case 'midright':
      board.pos5 = currentPlayer;
      break;
    case 'botleft':
      board.pos6 = currentPlayer;
      break;
    case 'botmid':
      board.pos7 = currentPlayer;
      break;
    case 'botright':
      board.pos8 = currentPlayer;
      break;
    default:
      break;
  }
}


var determineVictor = function() {
  var win = false;
  if (board.pos0 === board.pos1 && board.pos0 === board.pos2 && board.pos0 !== undefined) {
    win = true;
    lightUp = [0, 1, 2];
  }
  if (board.pos3 === board.pos4 && board.pos3 === board.pos5 && board.pos3 !== undefined) {
    win = true;
    lightUp = [3, 4, 5];
  }
  if (board.pos6 === board.pos7 && board.pos6 === board.pos8 && board.pos6 !== undefined) {
    win = true;
    lightUp = [6, 7, 8];
  }

  //vertical checks
  if (board.pos0 === board.pos3 && board.pos0 === board.pos6 && board.pos0 !== undefined) {
    win = true;
    lightUp = [0, 3, 6];
  }
  if (board.pos1 === board.pos4 && board.pos1 === board.pos7 && board.pos1 !== undefined) {
    win = true;
    lightUp = [1, 4, 7];
  }
  if (board.pos2 === board.pos5 && board.pos2 === board.pos8 && board.pos2 !== undefined) {
    win = true;
    lightUp = [2, 5, 8];
  }

  //diagonal checks
  if (board.pos0 === board.pos4 && board.pos0 === board.pos8 && board.pos0 !== undefined) {
    win = true;
    lightUp = [0, 4, 8];
  }
  if (board.pos2 === board.pos4 && board.pos2 === board.pos6 && board.pos2 !== undefined) {
    win = true;
    lightUp = [2, 4, 6];
  }
  //win actions
  if (win === true) {
    lightUpBoard();
    $('#status').html('<p>The ' + currentPlayer + "'s are the winner!</p>");
    $('.boardSquare').off();
    if (currentPlayer === 'X') {
      score.X++;
    } else {
      score.O++;
    }
  }
};

var lightUpBoard = function() {
  for (var i = 0; i < lightUp.length; i++) {
    switch (lightUp[i]) {
      case 0:
        $('table td#topleft').addClass('winningsquare');
        break;
      case 1:
        $('table td#topmid').addClass('winningsquare');
        break;
      case 2:
        $('table td#topright').addClass('winningsquare');
        break;
      case 3:
        $('table td#midleft').addClass('winningsquare');
        break;
      case 4:
        $('table td#middle').addClass('winningsquare');
        break;
      case 5:
        $('table td#midright').addClass('winningsquare');
        break;
      case 6:
        $('table td#botleft').addClass('winningsquare');
        break;
      case 7:
        $('table td#botmid').addClass('winningsquare');
        break;
      case 8:
        $('table td#botright').addClass('winningsquare');
        break;
      default:
        break;
    }
  }
  $('.winningsquare').css('background-color', 'green');
}

var stalemate = function() {
  $('.boardSquare').css("background-color", "grey");
  $('#status').html("<p>Unfortunately it's a stalemate! Nobody wins.</p>");
}

var restartGame = function() {
  $('#status').html("<p>Player 1 (the 0's), click on any square to begin!</p>");
  turnCheck = -1;
  currentPlayer = '';
  turns = 0;
  $('td').html('');
  lightUp.length = 0;
  board = {};
  victor = '';
  $('.winningsquare').css('background-color', 'white');
  $('td').removeClass('winningsquare');
  $('.boardSquare').on('click', function() {
    if ($(this).html() === "") {
      $('#status').html('');
      $(this).html(determinePlayerTurn());
      var position = $(this).attr('id');
      addMark(position);
      determineVictor();
      turns++;
      if (turns === 9 && victor === '') {
        stalemate();
      }
    }
  });
}

$('#restart').on('click', restartGame)
  // One is a similar method to on but only allows the event to occur once.

restartGame();

// Test cases:
// 8 win conditions for 0
// 8 win conditions for X
// no winner

// Didn't work as there are ways to get to 15 with 4 numbers
