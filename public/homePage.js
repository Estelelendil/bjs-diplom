'use strict'
// Выход из личного кабинета
 let btnLogout = new LogoutButton;
 btnLogout.action = function logout(){
    ApiConnector.logout(request =>{
        // console.log(request)
        if(request.success == true){
            location.reload()
        }
    })
 }

 // Получение информации о пользователе
 ApiConnector.current(callback =>{
    //  console.log(callback)
     if(callback.success == true){
        ProfileWidget.showProfile(callback.data)//  как проверить, получилось ли?где эта кнопка?
     }
 })

 //Получение текущих курсов валюты

 let rateBoard = new RatesBoard;
 
function getStocks(){
    ApiConnector.getStocks(getRate => {
        console.log(getRate)
        if(getRate.success == true){
            rateBoard.clearTable()
            rateBoard.fillTable(getRate.data)
        }
    })
}
getStocks();
setInterval(getStocks, 60000)

 // Операции с деньгами
 