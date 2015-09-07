require('should')

// durationStringToMilliseconds
var hMM2ms = require('./src/pages/PlayScreen/hMM-to-ms.js')
hMM2ms('01:00:00').should.eql(3600000)
hMM2ms('00:15:27').should.eql(927000)

// millisecondsToDurationString
var ms2hMM = hMM2ms.reverse
ms2hMM(3600000).should.eql('01:00:00')
ms2hMM(917000).should.eql('00:15:17')
