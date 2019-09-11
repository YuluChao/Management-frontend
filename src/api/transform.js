export default{
  install (Vue, options) {
    Vue.prototype.base64ToFile = function (base64Data, tempfilename) {
      var contentType = base64Data.split(';')[0].split(':')[1]
      var sliceSize = 1024
      var byteCharacters = window.atob(base64Data.split(',')[1])
      var bytesLength = byteCharacters.length
      var slicesCount = Math.ceil(bytesLength / sliceSize)
      var byteArrays = new Array(slicesCount)
      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize
        var end = Math.min(begin + sliceSize, bytesLength)
        var bytes = new Array(end - begin)
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0)
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes)
      }
      var file = new File(byteArrays, tempfilename, { type: contentType })
      return file
    }
    Vue.prototype.getBase64Image = function (img) {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var dataURL = canvas.toDataURL('image/png')
      return dataURL
    }
  }
}
