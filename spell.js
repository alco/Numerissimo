var numberData = {
    'numbers': {
        0: ['zero', 'nought'],
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
        17: 'seventeen',
        18: 'eighteen',
        19: 'nineteen',
        20: 'twenty',
        30: 'thirty',
        40: 'forty',
        50: 'fifty',
        60: 'sixty',
        70: 'seventy',
        80: 'eighty',
        90: 'ninety'
    },

    'ordinals': {
        0: 'zeroth',
        1: 'first',
        2: 'second',
        3: 'third',
//      4: 'fourth',
        5: 'fifth',
//      6: 'sixth',
//      7: 'seventh',
        8: 'eighth',
        9: 'ninth',
//      10: 'tenth',
//      11: 'eleventh',
        12: 'twelfth',
//      13: 'thirteenth',
//      14: 'fourteenth',
//      15: 'fifteenth',
//      16: 'sixteenth',
//      17: 'seventeenth',
//      18: 'eighteenth',
//      19: 'nineteenth',
        20: 'twentieth',
        30: 'thirtieth',
        40: 'fortieth',
        50: 'fiftieth',
        60: 'sixtieth',
        70: 'seventieth',
        80: 'eightieth',
        90: 'ninetieth'
    },

    'ranks': ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion',
              'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion',
              'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion']
}

var numbers = numberData.numbers, ranks = numberData.ranks

function spellNumber(num, rank) {
    if (num == 0)
        return (rank === undefined ? numbers[0] : "")

    rank = rank || 0;

    var obj = parseNumber(num);
    if (obj)
        return $.trim(obj + " " + ranks[rank]);

    var quotient = Math.floor(num / 1000);      // integral division
    var remainder = num - quotient * 1000;
    if (quotient === 0)
        assert(null, "How did it happen? Number = " + num);

    var leftPart = spellNumber(quotient, rank+1);
    var rightPart = spellNumber(remainder, rank);
    return $.trim(leftPart + " " + rightPart);
}

var spellingRules = [
    'xy= spellNumber(x0) + "-" + spellNumber(y)',
    'x00= spellNumber(x) + " hundred"',
    'xyy= spellNumber(x) + " hundred " + spellNumber(y)'
]
function parseNumber(num) {
    var lookup = numbers[num]
    if (lookup)
        return lookup

    var numString = num.toString()
    var matchingRule = bestMatch(numString, spellingRules)
    if (matchingRule) {
        var ruleComponents = matchingRule.split("=")
        var lhs = ruleComponents[0]
        var rhs = ruleComponents[1]
        mapping = matchPattern(lhs, numString)
        return evalRule(expandMacros(rhs, mapping))
    }
}

// TODO: rewrite this function to support nicely formatted rules
//
// Ideally, rules will look as follows
// ab = {a0}-{b}
// a00 = {a} hundred
// axx = {a} hundred [and] {x}
//
// Can we get rid of the second rule? Yes if we allow spelling zero if and only if it goes all by itself
// and not as part of a larger number
function evalRule(rule) {
    return eval(rule)
}

function matchPattern(pattern, numString) {
    mapping = {}
    $.each(pattern, function(index, variable) {
        mapping[variable] = getDefault(mapping, variable, 0) * 10 + parseInt(numString[index])
    })
    return mapping
}

function expandMacros(string, mapping) {
    var result = string
    $.each(mapping, function(key, val) {
        result = result.replace(key, val)
    })
    return result
}

// TODO: refactor bestMatch
function bestMatch(numString, rules) {
    var candidates = [];
    for (var i = 0; i < rules.length; ++i) {
        var lhs = rules[i].split("=")[0];
        if (lhs.length === numString.length)
            candidates.push(rules[i]);
    }

    if (candidates.length === 0)
        return;

    var candidate;
    var max_index = 0;
    if (candidates.length > 1) {
        var max_count = 0;
        for (var i = 0; i < candidates.length; ++i) {
            var candidate = candidates[i].split('=')[0];
            var count = 0;
            var skip_this_index = false;
            for (var char = 0; char < candidate.length; ++char) {
                var parsed = parseInt(candidate[char]);
                if (parsed === parsed && candidate[char] !== numString[char]) {
                    skip_this_index = true;
                    break;
                }
                if (candidate[char] === numString[char])
                    ++count;
            }
            if (skip_this_index) {
                ++max_index;
                continue;
            }
            if (count > max_count) {
                max_count = count;
                max_index = i;
            }
        }
    }
    return candidates[max_index];
}

function getDefault(dict, key, defaultVal) {
    var result = dict[key]
    if (result)
        return result
    return defaultVal
}
