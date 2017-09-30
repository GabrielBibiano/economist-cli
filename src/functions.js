exports.isPositive = (val) => {
    val = val.substr(0, 1);
    if(val == "+"){
        return true
    }else{
        return false
    }
}

exports.thisTime = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return `Checked at: ${hours}:${minutes}:${minutes}`
}