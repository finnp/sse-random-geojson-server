var randomgeojson = require('random-geojson-stream')
var through = require('through2')
var http = require('http')
var port = process.env.PORT || 8080
http.createServer(function (req, res) {
  res.setHeader('content-type', 'text/event-stream')
  randomgeojson()
    .pipe(through.obj(function (feature, enc, next) {
      this.push('data:')
      this.push(JSON.stringify(feature))
      this.push('\n\n')
      next()
    }))
    .pipe(res)
}).listen(port)
console.log('Listening on ' + port)