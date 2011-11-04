var questionsData = {
  'checkbox-1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'checkbox-2': [11, 12, 13, 14, 15, 16, 17, 18, 19],
  'checkbox-3': [20, 30, 40, 50, 60, 70, 80, 90],
  'checkbox-4': [100, 200, 300, 400, 500, 600, 700, 800, 900],
  'checkbox-5': [1000, 5000, 1e4, 1e5, 1e6, 1e8, 1e9]
}

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
          <input class="answer-field" type="text" id="input-{{.}}"/> \
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

function expandRange(range) {
  var result = new Set()
  var limit = range[1];
  for (var i = range[0]; i <= limit; ++i)
    result.add(i)
  return result
}

$(function() {
  console.log(window.location);

  var userAnswerCount
  var totalAnswerCount
  var testCount
  var testRange

  var showingBorders = false
  $('#show-borders-button').click(function() {
    if (showingBorders)
      $('div').removeClass('bordered')
    else
      $('div').addClass('bordered')
    showingBorders = !showingBorders
  })

  $('#start-test-button').click(function() {
    testData.questions = new Set()
    var selectedCheckboxCount = 0
    var allNumberTestSelected = false
    testCount = $('#number-of-tests-switch').val()
    $('input[type="checkbox"]').each(function() {
      if (this.checked) {
        ++selectedCheckboxCount;
        questions = questionsData[this.id]
        if (questions !== undefined) {
          testData.questions.join(new Set(questions))
        } else {
          allNumberTestSelected = true
          var range = [0, 0]
          if (this.id == 'checkbox-6')
            range = [20, 99]
          else if (this.id == 'checkbox-7')
            range = [100, 999]
//          else
//            range = [1000, 1e9]
          testData.questions.join(expandRange(range))
        }
      }
    })
    if (selectedCheckboxCount) {
      console.log('All questions = ' + testData.questions.items())
      if (allNumberTestSelected) {
        var questions = []
        for (var i = 0; i < testCount; ++i)
          questions.push(testData.questions.pick())
        console.log('testRange = ' + testRange + ';questions = ' + questions)
        testData.questions = questions
      } else {
        testData.questions = testData.questions.items()
      }
      userAnswerCount = 0
      totalAnswerCount = testData.questions.length
      $('#test-container').replaceWith(Mustache.to_html(testTemplate, testData))
      $('#no-test-selected-tip').addClass('hidden')
    } else {
      $('#no-test-selected-tip').removeClass('hidden')
    }
  })

  $('#finish-test-button').live('click', function() {
    $('input.answer-field').each(function() {
      var elem = $(this);
      elem.focusin(function() {
        $(this).removeClass('wrong-answer')
      })

      var parent = elem.parent();
      var val = elem.val().trim().toLowerCase();
      var id = elem.attr('id');
      var num = id.split('-').pop();
      var spelledNum = spellNumber(num);
      if (val.length === 0) {
        // no answer = no action
      } else if (val == spelledNum || (spelledNum.constructor === Array && spelledNum.indexOf(val) >= 0)) {
        parent.replaceWith('<p class="answer">' + val + ' <span class="tick">✓</span></p>');
        ++userAnswerCount
      } else {
        elem.addClass('wrong-answer')
        if (parent.children('.xmark').length === 0) {
          parent.append('<span class="xmark">✗</span>')
          //parent.append('<button class="answerBut" secret="' +id + '">Show answer</button>');
        }
      }
    })

    if (userAnswerCount == totalAnswerCount) {
      $('#showAnswersBut').trigger('click')
    }
  })

  $('#showAnswersBut').live('click', function() {
    $('#finish-test').replaceWith('<p>Well done</p>')
    $('input.answer-field').each(function() {
      var elem = $(this);
      var parent = elem.parent();
      var val = elem.val().trim();
      var id = elem.attr('id');
      var num = id.split('-').pop();
      var spelledNum = spellNumber(num);
      if (val.length === 0) {
        parent.replaceWith('<p class="correctedAnswer">' + spelledNum + '</p>');
      } else if (val == spelledNum || (spelledNum.constructor === Array && spelledNum.indexOf(val) >= 0)) {
        parent.replaceWith('<p class="answer">' + val + ' <span class="tick">✓</span></p>');
      } else {
        parent.replaceWith('<p class="correctedAnswer">' + spelledNum + '</p><p class="crossed-out-answer">' + val + '</p>');
      }
    })
  })

}) // end of jQuery
