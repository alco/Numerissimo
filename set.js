function Set() {
  this._items = {}
  this.length = 0


  this.isEmpty = function() {
    return this.length === 0
  }

  this.items = function() {
    var result = []
    for (var item in this._items)
      result.push(item)
    return result
  }

  this.add = function(item) {
    if (!this.contains(item))
      ++this.length
    this._items[item] = true
  }

  this.remove = function(item) {
    if (this.contains(item))
      --this.length
    delete this._items[item]
  }

  this.pick = function() {
    var items = this.items()

    var rand_num = Math.round(Math.random() * (this.length - 1))
    var result = items[rand_num]
    this.remove(result)
    return result
  }

  this.contains = function(item) {
    return this._items[item] !== undefined
  }

  this.join = function(set) {
    for (var item in set._items)
      this.add(item)
  }

  this.splice = function(set) {
    var new_set = new Set()
    new_set.join(this)
    new_set.join(set)
    return new_set
  }

  // initialization

  var list = arguments[0]
  if (list && list.constructor === Array) {
    var len = list.length
    for (var i = 0; i < len; ++i)
      this.add(list[i])
  }
}
