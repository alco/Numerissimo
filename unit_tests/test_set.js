module("Set")

test("set:add", function() {
  var set = new Set()
  for (var i = 0; i < 100; ++i) {
    set.add(i)
  }
  equal(set.length, 100, "Set must have exactly 100 elements")
  ok(set.contains(99), "99 must be in the set")
  ok(!set.contains(100), "100 must not be in the set")

  for (var i = 50; i < 101; ++i) {
    set.add(i)
  }
  equal(set.length, 101, "Now the set has 101 elements")
  ok(set.contains(100), "100 is now in the set")
  ok(!set.contains(101), "101 is not yet in the set")
})

test("set:remove", function() {
  var set = new Set([1, 2, 3, 3, 3, 4, 5, 6, 7, 8, 8, 9, 10, 10])
  equal(set.length, 10, "Set length must be 10")

  ok(set.contains(3), "3 is in the set")
  set.remove(3)
  equal(set.length, 9, "One element less")
  ok(!set.contains(3), "3 is not in the set")

  set.remove(3)
  equal(set.length, 9, "The same length")
  ok(!set.contains(3), "3 is not here already")
})

test("set:join", function() {
  var set = new Set([1,2,3,4,5])
  var second_set = new Set([3,4,5,6,7,8,9])
  
  var joined = set.splice(second_set)
  for (var i = 1; i < 10; ++i)
    ok(joined.contains(i), "Joined must contain " + i)
  equal(joined.length, 9, "It must have exactly 9 elements")
  same(joined.items(), ["1","2","3","4","5","6","7","8","9"])
  equal(set.length, 5, "First set is left intact")
  equal(second_set.length, 7, "Second set as well")
})


test("set:pick", function() {
  var set = new Set([1,2,3,4,5,6])
  
  equal(set.length, 6)
  var failCounter = 10
  var iterCounter = 0
  while (!set.isEmpty()) {
    ++iterCounter
    console.log(set.pick())
    if (--failCounter == 0) break
  }
  equal(iterCounter, 6, "Exactly 6 iterations expected")
  equal(set.length, 0)
})
