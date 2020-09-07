module.exports =  function (srt) {
  let strArry = []
  let istrue = false
  for (let k in srt) {
    if (srt[k] === '.') {
      istrue = true
    }
    if (istrue) {
      strArry.push(srt[k])
    }
  }
  strArry.shift()
  strArry = strArry.join()
  strArry = strArry.replace(/\s+/g, ",")
  return strArry
}