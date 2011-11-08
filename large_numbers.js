var testData = {
  pretty_print: function() {
    return function(text, render) {
      var result = render(text).trim()
      if (result.length >= 5) {
        var digits = result.split('')
        var len = digits.length
        var limit = Math.floor((len - 1) / 3);  // integral divison
        for (var i = 0; i < limit; ++i) {
          digits.splice(len - (i+1)*3, 0, " ")
        }
        result = digits.join('')
      }
      return result
    }
  }
}

var testTemplate = ' \
<div id="test-container"> \
  <div class="large-test-entry"> \
    <div class="test-number" id="test-number">{{#pretty_print}} {{num}} {{/pretty_print}}</div> \
    <div class="test-input"> \
      <input class="answer-field" type="text" id="test-input"> \
    </div> \
  </div> \
  <div id="finish-test"> \
    <button id="finish-test-button">Check answer</button> \
    <button id="showAnswersBut">Show answer</button> \
  </div> \
</div>';

$(function() {
  var showingBorders = false
  $('#show-borders-button').click(function() {
    if (showingBorders)
      $('div').removeClass('bordered')
    else
      $('div').addClass('bordered')
    showingBorders = !showingBorders
  })

  $('#start-test-button').click(function() {
    testData.num = Math.round(1000000 + Math.random() * 1000000000000)
    $('#test-container').replaceWith(Mustache.to_html(testTemplate, testData))
    $('#no-test-selected-tip').addClass('hidden')
  })

  $('#finish-test-button').live('click', function() {
    var elem = $('#test-input');
    elem.focusin(function() {
      $(this).removeClass('wrong-answer')
    })

    var parent = elem.parent();
    var val = elem.val().trim().toLowerCase();
    var spelledNum = spellNumber(testData.num);
    if (val.length === 0) {
      // no answer = no action
    } else if (val == spelledNum || (spelledNum.constructor === Array && spelledNum.indexOf(val) >= 0)) {
      parent.replaceWith('<p class="answer">' + val + ' <span class="tick">✓</span></p>');
      $('#showAnswersBut').trigger('click')
    } else {
      elem.addClass('wrong-answer')
      if (parent.children('.xmark').length === 0) {
        parent.append('<span class="xmark">✗</span>')
      }
    }
  })

  $('#showAnswersBut').live('click', function() {
    $('#finish-test').replaceWith('<p>Well done</p>')
    var elem = $('#test-input')
    var parent = elem.parent();
    var val = elem.val().trim();
    var spelledNum = spellNumber(testData.num);
    if (val.length === 0) {
      parent.replaceWith('<p class="correctedAnswer">' + spelledNum + '</p>');
    } else if (val == spelledNum || (spelledNum.constructor === Array && spelledNum.indexOf(val) >= 0)) {
      parent.replaceWith('<p class="answer">' + val + ' <span class="tick">✓</span></p>');
    } else {
      parent.replaceWith('<p class="correctedAnswer">' + spelledNum + '</p><p class="crossed-out-answer">' + val + '</p>');
    }
  })

}) // end of jQuery
