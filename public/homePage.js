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
     this.setMessage(moneyRequest.success)// выводим сообщение из полученных данных
        })
 }
 
 money.conversionMoneyCallback = function(data){
     ApiConnector.convertMoney(data, convert =>{
         console.log(convert)
         if(convert.success == true){
            ProfileWidget.showProfile(convert.data)
         }
         this.setMessage(convert.success)
     })
 }

 money.sendMoneyCallback = function(data){
     ApiConnector.transferMoney(data, trans =>{
         console.log(trans.data)
         if(trans.success == true){
            ProfileWidget.showProfile(trans.data)
         }
         this.setMessage(trans.success)
     })
 }

 // Работа с избранным
 
 let favorList = new FavoritesWidget;

 ApiConnector.getFavorites(favor => {
     console.log(favor)
     if(favor.success == true){
         rateBoard.clearTable()
         rateBoard.fillTable(favor.data)
         money.updateUsersList(favor.data)
     }
 })

 favorList.addUserCallback = function(data){
     ApiConnector.addUserToFavorites(data, add =>{
         console.log(add)
         if(add.success == true){
            rateBoard.clearTable()
            rateBoard.fillTable(add.data)
            money.updateUsersList(add.data)
         }
         this.setMessage(add.success)
     })
 }
 favorList.removeUserCallback = function(id){
     ApiConnector.removeUserFromFavorites(id, delUser =>{
        console.log(delUser)
        if(delUser.success == true){
            rateBoard.clearTable()
            rateBoard.fillTable(delUser.data)
            money.updateUsersList(delUser.data)
        }
     })
 }