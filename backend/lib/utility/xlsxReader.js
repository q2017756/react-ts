const xlsx = require('xlsx')
const debug = require('debug')('app.utility.xlsxReader')

exports.readFile = function (content) {
  return xlsx.readFile(content)
}

exports.readPresent = function ({sheet = '工作表1', column = 'A', content}) {
  debug('readPresent', sheet, column)
  const xlsxContent = xlsx.read(content)
  let presents = []
  if (sheet in xlsxContent.Sheets) {
    presents = Object.keys(xlsxContent.Sheets[sheet])
      .filter(function (n) {
        return n.indexOf(column) > -1
      })
      .map(function (n) {
        return xlsxContent.Sheets[sheet][n].v
      })
  } else {
    throw new Error(`${sheet} sheet not found.`)
  }

  return Promise.resolve(presents)
}

// const sheet = exports.readFile('example.xlsx').Sheets['工作表1']

// Object.keys(sheet).forEach(function(x) {
//   console.log('key', x)
//   if (/^A(\w+)$/.test(x)) {
//     console.log(sheet[x].v)
//   }
// })

