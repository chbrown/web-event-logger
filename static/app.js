/*jslint browser: true, devel: true */ /*globals $ */

var keys = {
  32: {"string":" ","shift":" "},
  48: {"string":"0","shift":")"},
  49: {"string":"1","shift":"!"},
  50: {"string":"2","shift":"@"},
  51: {"string":"3","shift":"#"},
  52: {"string":"4","shift":"$"},
  53: {"string":"5","shift":"%"},
  54: {"string":"6","shift":"^"},
  55: {"string":"7","shift":"&"},
  56: {"string":"8","shift":"*"},
  57: {"string":"9","shift":"("},
  65: {"string":"a","shift":"A"},
  66: {"string":"b","shift":"B"},
  67: {"string":"c","shift":"C"},
  68: {"string":"d","shift":"D"},
  69: {"string":"e","shift":"E"},
  70: {"string":"f","shift":"F"},
  71: {"string":"g","shift":"G"},
  72: {"string":"h","shift":"H"},
  73: {"string":"i","shift":"I"},
  74: {"string":"j","shift":"J"},
  75: {"string":"k","shift":"K"},
  76: {"string":"l","shift":"L"},
  77: {"string":"m","shift":"M"},
  78: {"string":"n","shift":"N"},
  79: {"string":"o","shift":"O"},
  80: {"string":"p","shift":"P"},
  81: {"string":"q","shift":"Q"},
  82: {"string":"r","shift":"R"},
  83: {"string":"s","shift":"S"},
  84: {"string":"t","shift":"T"},
  85: {"string":"u","shift":"U"},
  86: {"string":"v","shift":"V"},
  87: {"string":"w","shift":"W"},
  88: {"string":"x","shift":"X"},
  89: {"string":"y","shift":"Y"},
  90: {"string":"z","shift":"Z"},
  186: {"string":";","shift":":"}, // WebKit
  59:  {"string":";","shift":":"}, // Mozilla
  187: {"string":"=","shift":"+"}, // WebKit
  61:  {"string":"=","shift":"+"}, // Mozilla
  188: {"string":",","shift":"<"},
  189: {"string":"-","shift":"_"}, // WebKit
  173: {"string":"-","shift":"_"}, // Mozilla
  190: {"string":".","shift":">"},
  191: {"string":"/","shift":"?"},
  192: {"string":"`","shift":"~"},
  219: {"string":"[","shift":"{"},
  220: {"string":"\\","shift":"|"},
  221: {"string":"]","shift":"}"},
  222: {"string":"'","shift":"\""},
};

var keyboardEventToString = function(ev) {
  var key = keys[ev.which];
  if (key) {
    if (ev.shiftKey) {
      return key.shift;
    }
    else {
      return key.string;
    }
  }
  else {
    return '';
  }
};


var prototypes = [
  // pangrams from Wikipedia: http://en.wikipedia.org/wiki/List_of_pangrams
  "Go, lazy fat vixen; be shrewd, jump quick",
  "Five hexing wizard bots jump quickly",
  "Five quacking zephyrs jolt my wax bed",
  "The five boxing wizards jump quickly",
  "Jackdaws love my big sphinx of quartz",
  "Pack my box with five dozen liquor jugs",
  "The quick brown fox jumps over the lazy dog",
  "The jay, pig, fox, zebra and my wolves quack",
  "Quizzical twins proved my hijack-bug fix",
  "Fix problem quickly with galvanized jets",
  "When zombies arrive, quickly fax judge Pat",
  "Sympathizing would fix Quaker objectives",
];

var loadPrototype = function() {
  var trial_i = Math.random() * prototypes.length | 0;

  var prototype = prototypes[trial_i];
  $('#prototype').text(prototype);

  $('.progress').text('Trial ' + trial_i + ' of ' + prototypes.length);
};

var events = [];
var writeEventLog = function() {
  var lines = [];
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    lines.push(event.ms.toString() + '[' + event.key + ']');
  }
  var $pre = $('.log pre').text(lines.join('\n'));
};


var listen_jq = function() {
  var $input = $('#input');

  $(document).on('keydown', function(ev) {
    var ms = ev.timeStamp;

    // short-circuit all non-keyboard shortcut keys
    if (!ev.metaKey) {
      ev.preventDefault();
    }
    else {
      return;
    }

    if (ev.which == 8) {
      // backspace/delete key
      $input.children('span:last').remove();
      events.push({ms: ms, key: 'backspace'});
    }
    else if (ev.which == 13) {
      // enter/return key
      console.log('Ignoring return');
      writeEventLog();
    }
    else {
      var string = keyboardEventToString(ev);
      if (string.length > 0) {
        events.push({ms: ms, key: string});
        $('<span></span>').text(string).appendTo($input);
      }
      else {
        console.log('Ignoring key that evaluates to empty string', ev);
      }
    }
  });
};

$(function() {
  loadPrototype();
  listen_jq();
});
