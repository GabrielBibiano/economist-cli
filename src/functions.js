exports.isPositive = (val) => {
    val = val.substr(0, 1);
    if(val == "+"){
        return true
    }else{
        return false
    }
}