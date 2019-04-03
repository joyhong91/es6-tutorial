/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./practice/game/assets/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./practice/game/assets/js/app.js":
/*!****************************************!*\
  !*** ./practice/game/assets/js/app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function ($) {
  var itemData = ['rock', 'scissors', 'paper'];
  var $btnPlayer = $('.btn_item');
  var $btnStart = $('.btn_start');
  var $btnResetScore = $('.btn_reset');
  var $victoryPanel = $('.victory .txt_score');
  var $defeatPanel = $('.defeat .txt_score');
  var $drawPanel = $('.draw .txt_score');
  var victory = 0;
  var defeat = 0;
  var draw = 0;
  gameInit();

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
    setTimeout(function () {
      $btnResetScore.css('background', '#fff');
      $btnResetScore.css('color', '#000');
    }, 100);
  }

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
        setTimeout(function () {
          return checkResult(playerItem, computerResultItem), 100;
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

/***/ })

/******/ });
//# sourceMappingURL=game.bundle.js.map