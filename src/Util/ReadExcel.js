import XLSX from 'xlsx'

const ReadFile = (file) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onerror = reject
    fr.onload = function () {
      var inputFile = fr.result
      var workbook = XLSX.read(inputFile, { type: 'binary' })
      workbook.SheetNames.forEach(el => {
        resolve(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[el]))
      })
    }
    fr.readAsBinaryString(file)
  })
}

const s2ab = (s) => {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

const StudCSV = (ExcelJson) => {
  const InitJsonUploadPackage = ExcelJson
  const SccessArry = []
  const LogArry = []

  InitJsonUploadPackage.forEach((element) => {
    var size = Object.keys(element).length
    console.log(size)
    if (size === 7 && !(/[a-z]/gi.test(element.Price)) && !(/,/gi.test(element.Price)) && element.Price.toString().match(/\./gi).length <= 1) {
      SccessArry.push(element)
    } else if ((/,/gi.test(element.Price))) {
      element.price = parseFloat(element.Price.replace(/,/, '.'))
      SccessArry.push(element)
    } else {
      if (/[a-z]/gi.test(element.Price)) {
        element.Logs = 'Price In include letter in at'
      } else if (size > 8) {
        element.Logs = 'Overload column'
      } else if (size < 7) {
        element.Logs = 'Column indefin'
      } else if (element.Price.toString().match(/\./gi).length > 1) {
        element.Logs = 'Price Column Have more Dots'
      }
      LogArry.push(element)
    }
  })
  console.log(SccessArry)
  console.log(LogArry)

  return {
    SccessArray: SccessArry,
    LogArray: LogArry,
    TotalPa: InitJsonUploadPackage.length,
    TotaleSaccuss: SccessArry.length,
    TotalLogs: LogArry.length
  }
}

const GetTemplate = () => {
  var wb = XLSX.utils.book_new()
  wb.SheetNames.push('Template-V')
  var wsData = [['Referance', 'Customer_Name', 'Phone_Number', 'Prudoct', 'Price', 'City', 'Address']]
  var ws = XLSX.utils.aoa_to_sheet(wsData)
  wb.Sheets['Template-V'] = ws
  var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
  return new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
}

const GetLogs = (logs) => {
  var wb = XLSX.utils.book_new()
  wb.SheetNames.push('Template-V')
  var ws = XLSX.utils.json_to_sheet(logs)
  wb.Sheets['Template-V'] = ws
  var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
  return new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
}
export default { ReadFile, StudCSV, GetTemplate, GetLogs }
