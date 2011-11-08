module("Spelling")

test("1 to 99", function() {
  var answers = {
    1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight',
    9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen',
    15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
    21: 'twenty-one', 22: 'twenty-two', 23: 'twenty-three', 24: 'twenty-four', 25: 'twenty-five',
    26: 'twenty-six', 27: 'twenty-seven', 28: 'twenty-eight', 29: 'twenty-nine', 30: 'thirty',
    31: 'thirty-one', 32: 'thirty-two', 33: 'thirty-three', 34: 'thirty-four', 35: 'thirty-five',
    36: 'thirty-six', 37: 'thirty-seven', 38: 'thirty-eight', 39: 'thirty-nine', 40: 'forty',
    41: 'forty-one', 42: 'forty-two', 43: 'forty-three', 44: 'forty-four', 45: 'forty-five',
    46: 'forty-six', 47: 'forty-seven', 48: 'forty-eight', 49: 'forty-nine', 50: 'fifty',
    51: 'fifty-one', 52: 'fifty-two', 53: 'fifty-three', 54: 'fifty-four', 55: 'fifty-five',
    56: 'fifty-six', 57: 'fifty-seven', 58: 'fifty-eight', 59: 'fifty-nine', 60: 'sixty',
    61: 'sixty-one', 62: 'sixty-two', 63: 'sixty-three', 64: 'sixty-four', 65: 'sixty-five',
    66: 'sixty-six', 67: 'sixty-seven', 68: 'sixty-eight', 69: 'sixty-nine', 70: 'seventy',
    71: 'seventy-one', 72: 'seventy-two', 73: 'seventy-three', 74: 'seventy-four', 75: 'seventy-five',
    76: 'seventy-six', 77: 'seventy-seven', 78: 'seventy-eight', 79: 'seventy-nine', 80: 'eighty',
    81: 'eighty-one', 82: 'eighty-two', 83: 'eighty-three', 84: 'eighty-four', 85: 'eighty-five',
    86: 'eighty-six', 87: 'eighty-seven', 88: 'eighty-eight', 89: 'eighty-nine', 90: 'ninety',
    91: 'ninety-one', 92: 'ninety-two', 93: 'ninety-three', 94: 'ninety-four', 95: 'ninety-five',
    96: 'ninety-six', 97: 'ninety-seven', 98: 'ninety-eight', 99: 'ninety-nine'
  }
  testSpelling(answers)
})

test("100 to 999", function() {
  var answers = {
    100: 'one hundred',
    101: 'one hundred one',
    102: 'one hundred two',
    109: 'one hundred nine',
    110: 'one hundred ten',
    120: 'one hundred twenty',
    121: 'one hundred twenty-one',
    198: 'one hundred ninety-eight',
    199: 'one hundred ninety-nine',
    200: 'two hundred',
    203: 'two hundred three',
    204: 'two hundred four',
    211: 'two hundred eleven',
    212: 'two hundred twelve',
    232: 'two hundred thirty-two',
    299: 'two hundred ninety-nine',
    300: 'three hundred',
    400: 'four hundred',
    500: 'five hundred',
    600: 'six hundred',
    700: 'seven hundred',
    800: 'eight hundred',
    900: 'nine hundred',
    999: 'nine hundred ninety-nine'
  }
  testSpelling(answers)
})

test("1000 to 1000000", function() {
  var answers = {
    1000: 'one thousand',
    2000: 'two thousand',
    3000: 'three thousand',
    10000: 'ten thousand',
    13000: 'thirteen thousand',
    90000: 'ninety thousand',
    30000: 'thirty thousand',

    1346: 'one thousand three hundred forty-six',
    11482: 'eleven thousand four hundred eighty-two',
    13851: 'thirteen thousand eight hundred fifty-one',
    23016: 'twenty-three thousand sixteen',
    100000: 'one hundred thousand',
    750000: 'seven hundred fifty thousand',
    934756: 'nine hundred thirty-four thousand seven hundred fifty-six',

    1000000: 'one million',
    143000000: 'one hundred forty-three million',
    143007000: 'one hundred forty-three million seven thousand',
    2408701047: 'two billion four hundred eight million seven hundred one thousand forty-seven',
    10680040002031: 'ten trillion six hundred eighty billion forty million two thousand thirty-one'
  }
  testSpelling(answers)
})

function testSpelling(dict) {
  $.each(dict, function(number, answer) {
    equal(spellNumber(number), answer, "Spelling for both numbers must be equal.")
  })
}
