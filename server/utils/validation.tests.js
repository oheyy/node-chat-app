var expect = require("expect");
var {isRealString} = require("./validation");

describe("Validation isRealString", ()=>{
    it("Should reject non string values", ()=>{
        var string = 98;
        var validation = isRealString(string);
        expect(validation).toBe(false);
    });

    it("Should reject strings with null spaces", ()=>{
        var data= " ";
        var validation = isRealString(data);
        expect(validation).toBe(false);

    });

    it("Should allow string with non-space characters", ()=>{
        var data = "     Daniel      ";
        var validation = isRealString(data);
        expect(validation).toBe(true);
    });
});
