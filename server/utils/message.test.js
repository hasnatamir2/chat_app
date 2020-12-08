var expect = require('expect')
var {generateMessage} = require('./message')

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var from = 'Jen'
        var text = 'some message'
        var message = generateMessage( from, text )

        // expect(message.createAt).any(Number)
        // expect(message).toBeCalledWith(expect.objectContaining({ from, text }))
    })
})