var expect = require("expect");
var {generateMessage, generateLocationMessage} = require("./../utils/message");
describe("generateMessage", ()=>{
    it("should generate correct message object", ()=>{
        var from = "daniel"; 
        var text = "test text";

        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');

    });
});

describe("generateLocationMessage", ()=>{
    it("should generate a location message", ()=>{
        var from = "daniel";
        var lat = 20;
        var long = 20;
        var url = `https://www.google.com/maps?q=${lat},${long}`;

        var message = generateLocationMessage(from, lat, long);
        expect(message.url).toBe(url);
    });
});