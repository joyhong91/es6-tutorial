// (function($) {
//   var itemData = ['rock', 'scissors', 'paper'];
//   var $btnPlayer =  $('.btn_item');
//   var $btnStart = $('.btn_start');
//   var $btnResetScore = $('.btn_reset');
//   var $victoryPanel = $('.victory .txt_score');
//   var $defeatPanel = $('.defeat .txt_score');
//   var $drawPanel = $('.draw .txt_score');
//
//   var victory = 0;
//   var defeat = 0;
//   var draw = 0;
//
//   gameInit();
//   console.log('');
//
//   function gameInit() {
//     $btnStart.css('background', '#fff');
//     $btnStart.css('color', '#000');
//     $btnPlayer.css('background', '#fff');
//     $btnPlayer.css('color', '#000');
//     $btnStart.on('click', loadingGame);
//     $btnResetScore.on('click', resetScore);
//   }
//
//   function loadingGame() {
//     $btnStart.css('background', 'blue');
//     $btnStart.css('color', '#fff');
//     $btnStart.off('click', loadingGame);
//     $btnResetScore.off('click', resetScore);
//     $btnPlayer.on('click', startGame);
//   }
//
//   function resetScore() {
//     $btnResetScore.css('background', '#000');
//     $btnResetScore.css('color', '#fff');
//     $victoryPanel.html(victory = 0);
//     $defeatPanel.html(defeat = 0);
//     $drawPanel.html(draw = 0);
//     setTimeout(function() {
//       $btnResetScore.css('background', '#fff');
//       $btnResetScore.css('color', '#000');
//   }, 100);
//   }
//
//   console.log('here');
//   function startGame(event) {
//     if (!event) return false;
//     $btnPlayer.off('click', startGame);
//
//     var $playerBtn = $(event.currentTarget);
//     var playerItem = parseInt($playerBtn.val());
//
//     var itemCounter = 0;
//     var intervalTimer = 100;
//     var intervalItem;
//
//     $playerBtn.css('background', 'red');
//     $playerBtn.css('color', '#fff');
//
//     intervalItem = setInterval(rouletteItems, intervalTimer);
//     setTimeout(controllTimer, 3000);
//
//     function rouletteItems(result) {
//       var currentItem = result !== undefined ? result : itemCounter % 3;
//       var itemImage = './assets/images/' + itemData[currentItem] + '.png';
//       $('.item_computer').attr('src', itemImage);
//       itemCounter++;
//     }
//
//     function controllTimer() {
//       clearInterval(intervalItem);
//       intervalTimer += 300;
//       if (intervalTimer < 1000) {
//         intervalItem = setInterval(rouletteItems, intervalTimer);
//         setTimeout(controllTimer, 2000);
//       } else {
//         var computerResultItem = Math.floor(Math.random() * 3);
//         rouletteItems(computerResultItem);
//         setTimeout(function() {
//           return checkResult(playerItem, computerResultItem), 100
//         });
//         $btnPlayer.off('click');
//       }
//     }
//
//     function checkResult(player, computer) {
//       if (player === computer) {
//         alert('무승부!');
//         $drawPanel.html(++draw);
//       } else if (++player % 3 === computer) {
//         alert('승리!');
//         $victoryPanel.html(++victory);
//       } else {
//         alert('패배!');
//         $defeatPanel.html(++defeat);
//       }
//       gameInit();
//     }
//   }
//
// })(jQuery);

class Game {
  constructor() {
    this.draw = 0;
    this.victory = 0;
    this.defeat = 0;
  }

  setPlayerItem(value) {
    this.player = parseInt(value);
    this.setComputerItem();
    return this;
  }

  setComputerItem() {
    this.computer = Math.floor(Math.random() * 3);
    this.checkResult();
    return this;
  }

  checkResult() {
    console.log(`사용자가 낸거 ==> ${this._printItem(this.player)} / 컴퓨터가 낸거 ==> ${this._printItem(this.computer)}`);
    let result = '';

    if (this.player === this.computer) {
      this.draw++;
      result = this._printResult(0);
    } else if(++this.player % 3 === this.computer ){
      this.victory++;
      result = this._printResult(1);
    } else {
      this.defeat++;
      result = this._printResult(2);
    }

    console.log(`결과는!!!!!!!!${result}`);
  }

  _printItem(value){
    if(value === 0) {
      return '주먹';
    } else if(value === 1){
      return '가위';
    } else {
      return '보';
    }
  }

  _printResult(result){
    if(result === 0) {
      return '무승부';
    } else if(result === 1){
      return '승리';
    } else {
      return '패배';
    }
  }
}

const game = new Game();
game.setPlayerItem('1');
