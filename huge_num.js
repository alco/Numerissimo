var testData = {
  pretty_print: function() {
    return function(text, render) {
      var result = render(text).trim()
      if (result.length >= 5) {
        result = '10<sup>' + (result.length - 1)  + '</sup>'
      }
      return result
    }
  }
}

var testTemplate = ' \
<div id="test-container"> \
  <ul> \
    {{#questions}} \
    <li> \
      <div class="test-entry"> \
        <div class="test-number">{{#pretty_print}} {{.}} {{/pretty_print}}</div> \
        <div class="test-input"> \
          <input class="answer-field" type="text" id="input-{{.}}"> \
        </div> \
      </div> \
    </li> \
    {{/questions}} \
  </ul> \
  <div id="finish-test"> \
    <button id="finish-test-button">Check answers</button> \
    <button id="showAnswersBut">Show answers</button> \
  </div> \
</div>';

var testNum

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
    testNum = "138456323"
    $('#test-number').replaceWith('<div id="test-number" class="test-number">' + testNum + '</div>')
    $('#no-test-selected-tip').addClass('hidden')
  })

  $('#finish-test-button').live('click', function() {
    var elem = $('#test-input');
    elem.focusin(function() {
      $(this).removeClass('wrong-answer')
    })

    var parent = elem.parent();
    var val = elem.val().trim().toLowerCase();
    var spelledNum = spellNumber(testNum);
    if (val.length === 0) {
      // no answer = no action
    } else if (val == spelledNum || (spelledNum.constructor === Array && spelledNum.indexOf(val) >= 0)) {
      parent.replaceWith('<p class="answer">' + val + ' <span class="tick">✓</span></p>');
    } else {
      elem.addClass('wrong-answer')
      if (parent.children('.xmark').length === 0) {
        parent.append('<span class="xmark">✗</span>')
      }
    }
//    if (userAnswerCount == totalAnswerCount) {
//      $('#showAnswersBut').trigger('click')
//    }
  })

  $('#showAnswersBut').live('click', function() {
    $('#finish-test').replaceWith('<p>Well done</p>')
    var elem = $('#test-input')
    var parent = elem.parent();
    var val = elem.val().trim();
    var spelledNum = spellNumber(testNum);
    if (val.length === 0) {
      parent.replaceWith('<p class="correctedAnswer">' + spelledNum + '</p>');
    } else if (val == spelledNum || (spelledNum.constructor === Array && spelledNum.indexOf(val) >= 0)) {
      parent.replaceWith('<p class="answer">' + val + ' <span class="tick">✓</span></p>');
    } else {
      parent.replaceWith('<p class="correctedAnswer">' + spelledNum + '</p><p class="crossed-out-answer">' + val + '</p>');
    }
  })

}) // end of jQuery
