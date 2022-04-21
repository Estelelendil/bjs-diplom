'use strict'
let obj = new UserForm;
// console.log(obj)

obj.loginFormCallback = function(data){
    console.log(data)
    ApiConnector.login(data, response => {
        console.log(response);
        if(response.success == false){
            this.setLoginErrorMessage(response.error)
        }
        else{
            location.reload();
        }
    })
    
}

obj.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        console.log(response)
        if(response.success == false){
            this.setRegisterErrorMessage(response.error)
        }
        else{
            location.reload();
        }
    })
}