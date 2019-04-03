(function($) {
  var itemData = ['rock', 'scissors', 'paper'];
  var $btnPlayer =  $('.btn_item');
  var $btnStart = $('.btn_start');
  var $btnResetScore = $('.btn_reset');
  var $victoryPanel = $('.victory .txt_score');
  var $defeatPanel = $('.defeat .txt_score');
  var $drawPanel = $('.draw .txt_score');

  var victory = 0;
  var defeat = 0;
  var draw = 0;

  gameInit();
  console.log('');

  function gameInit() {
    $btnStart.css('background', '#fff');
    $btnStart.css('color', '#000');
    $btnPlayer.css('background', '#fff');
    $btnPlayer.css('color', '#000');
    $btnStart.on('click', loadingGame);
    $btnResetScore.on('click', resetScore);
  }

  function loadingGame() {
    $btnStart.css('background', 'blue');
    $btnStart.css('color', '#fff');
    $btnStart.off('click', loadingGame);
    $btnResetScore.off('click', resetScore);
    $btnPlayer.on('click', startGame);
  }

  function resetScore() {
    $btnResetScore.css('background', '#000');
    $btnResetScore.css('color', '#fff');
    $victoryPanel.html(victory = 0);
    $defeatPanel.html(defeat = 0);
    $drawPanel.html(draw = 0);
    setTimeout(function() {
      $btnResetScore.css('background', '#fff');
      $btnResetScore.css('color', '#000');
  }, 100);
  }

  console.log('here');
  function startGame(event) {
    if (!event) return false;
    $btnPlayer.off('click', startGame);

    var $playerBtn = $(event.currentTarget);
    var playerItem = parseInt($playerBtn.val());

    var itemCounter = 0;
    var intervalTimer = 100;
    var intervalItem;

    $playerBtn.css('background', 'red');
    $playerBtn.css('color', '#fff');

    intervalItem = setInterval(rouletteItems, intervalTimer);
    setTimeout(controllTimer, 3000);

    function rouletteItems(result) {
      var currentItem = result !== undefined ? result : itemCounter % 3;
      var itemImage = './assets/images/' + itemData[currentItem] + '.png';
      $('.item_computer').attr('src', itemImage);
      itemCounter++;
    }

    function controllTimer() {
      clearInterval(intervalItem);
      intervalTimer += 300;
      if (intervalTimer < 1000) {
        intervalItem = setInterval(rouletteItems, intervalTimer);
        setTimeout(controllTimer, 2000);
      } else {
        var computerResultItem = Math.floor(Math.random() * 3);
        rouletteItems(computerResultItem);
        setTimeout(function() {
          return checkResult(playerItem, computerResultItem), 100
        });
        $btnPlayer.off('click');
      }
    }

    function checkResult(player, computer) {
      if (player === computer) {
        alert('무승부!');
        $drawPanel.html(++draw);
      } else if (++player % 3 === computer) {
        alert('승리!');
        $victoryPanel.html(++victory);
      } else {
        alert('패배!');
        $defeatPanel.html(++defeat);
      }
      gameInit();
    }
  }

})(jQuery);

class Game {
  constructor(){

  }
}