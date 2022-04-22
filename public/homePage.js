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

 ApiConnector.current(getInform =>{
    //  console.log(getInform)
     if(getInform.success == true){
        ProfileWidget.showProfile(getInform.data)//  как проверить, получилось ли?где эта кнопка?
     }
 })

 //Получение текущих курсов валюты

 let rateBoard = new RatesBoard;
 
function getStocks(){
    ApiConnector.getStocks(getRate => {
        // console.log(getRate)
        if(getRate.success == true){
            rateBoard.clearTable()
            rateBoard.fillTable(getRate.data)
        }
    })
}
getStocks();
setInterval(getStocks, 60000)

 // Операции с деньгами

 let money = new MoneyManager;
//  let profile = new ProfileWidget;

 money.addMoneyCallback = function(data){
     ApiConnector.addMoney(data, moneyRequest =>{
         console.log(moneyRequest); // не вижу ответного объекта в консоли
     if(moneyRequest.success == true){
        ProfileWidget.showProfile(moneyRequest.data)// ? правильно ли обращаться к ProfileWidget?
     }
     money.setMessage(moneyRequest.success, moneyRequest.error || "Операция успешно выполнена")// выводим сообщение из полученных данных
        })
 }
 
 money.conversionMoneyCallback = function(data){
     ApiConnector.convertMoney(data, convert =>{
         console.log(convert)
         if(convert.success == true){
            ProfileWidget.showProfile(convert.data)
         }
         money.setMessage(convert.success, convert.error || "Операция успешно выполнена")
     })
 }

 money.sendMoneyCallback = function(data){
     ApiConnector.transferMoney(data, trans =>{
         console.log(trans.data)
         if(trans.success == true){
            ProfileWidget.showProfile(trans.data)
         }
         money.setMessage(trans.success, trans.error || "Операция успешно выполнена")
     })
 }

 // Работа с избранным
 
 let favorList = new FavoritesWidget;

 ApiConnector.getFavorites(favor => {
     console.log(favor)
     if(favor.success == true){
         favorList.clearTable()
         favorList.fillTable(favor.data)
         money.updateUsersList(favor.data)
     }
 })

 favorList.addUserCallback = function(data){
     ApiConnector.addUserToFavorites(data, add =>{
         console.log(add)
         if(add.success == true){
            favorList.clearTable()
            favorList.fillTable(add.data)
            money.updateUsersList(add.data)
         }
         favorList.setMessage(add.success, add.error || "Операция успешно выполнена")
     })
 }
 favorList.removeUserCallback = function(id){
     ApiConnector.removeUserFromFavorites(id, delUser =>{
        console.log(delUser)
        if(delUser.success == true){
            favorList.clearTable()
            favorList.fillTable(delUser.data)
            money.updateUsersList(delUser.data)
        }
     })
 }