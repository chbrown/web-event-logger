/*jslint browser: true, devel: true */ /*globals $ */

var sentences = [
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

var logged_input = new LoggedInput();

var loadSentence = function() {
  var trial_i = Math.random() * sentences.length | 0;
  var sentence = sentences[trial_i];
  $('#sentence').text(sentence);
  $('.progress').text('Trial ' + trial_i + ' of ' + sentences.length);

  logged_input.reset();
};

var writeEventLog = function() {
  var lines = [];
  for (var i = 0; i < logged_input.events.length; i++) {
    var event = logged_input.events[i];
    lines.push(event.timestamp.toString() + '[' + event.key + ']');
  }
  var $pre = $('.log pre').text(lines.join('\n'));
};

$(function() {
  var sentence = loadSentence();
  var $input = $('.input');

  document.addEventListener('keydown', function(ev) {
    // pass over (ignore) all meta (super/command) keys; only intercept non-meta keys
    if (event.which == 13) {
      // enter/return key
      writeEventLog();
    }
    if (!ev.metaKey) {
      ev.preventDefault();
      logged_input.applyKey(ev.which, ev.shiftKey, ev.timeStamp);
      $input.text(logged_input.characters.join(''));
      // .children('span:last').remove();
      // $('<span></span>').text(string).appendTo($input);
    }
  });

});
