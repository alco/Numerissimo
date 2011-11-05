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
        return eval(expandMacros(rhs, mapping))
    }
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
