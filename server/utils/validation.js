var isRealString = (str)=>{
    //Check if string is type string and that it is not a null string values i.e. "      "
    return typeof(str) == "string" && str.trim().length > 0;
}

module.exports = {isRealString};