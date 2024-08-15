
const CheckEmail = (email)=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
    
}
const CheckPassword=(password) =>{
    const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}

const CheckName=(Name)=>{
    const nameRegex = /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/
    return nameRegex.test(Name)
}

const CheckPhoneNumber = (number)=>{
    const numberRegex = /^\+?[1-9]\d{1,14}$/
    return numberRegex.test(number)
}


// console.log(CheckPassword("anme@gmA1alcm"))

module.exports = {CheckEmail,CheckName,CheckPassword,CheckPhoneNumber}

