var turnCheck = -1;
var board = {};
var currentPlayer = '';
var turns = 0;
var victor = '';
var lightUp = [];
var score = {
  O: 0,
  X: 0
}

var determinePlayerTurn = function() {
  turnCheck++
  if (turnCheck % 2 === 0) {
    currentPlayer = 'O';
    return 'O';
  } else {
    currentPlayer = 'X';
    return 'X';
  }
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
    var $O = score.O;
    var $X = score.X;
    $('#winCount').html('O wins: <strong>' + score.O + '</strong> - ' + 'X wins: <strong>' + score.X + '</strong>');
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
restartGame();