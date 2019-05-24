function add_auth_to_params_string(params) {
    var API_KEY = "544f49d886fd734c2fecf91b2c88e2a1";
    var API_TOKEN = "e591a416e52271378bb7302fbd5e703d7bc04f39c9932f19c2431e4d437ae8db";

    return params + "&key=" + API_KEY + "&token=" + API_TOKEN;
}

function create_new_board(board_name) {
    // debugger;
    var url = "https://api.trello.com/1/boards";
    board_name = board_name.split(' ').join('%20');
    var Lable = "" 
    var params = "name=" + board_name + "&defaultLabels=false&defaultLists=false&keepFromSource=none&prefs_permissionLevel=private&prefs_voting=disabled&prefs_comments=members&prefs_invitations=members&prefs_selfJoin=true&prefs_cardCovers=true&prefs_background=blue&prefs_cardAging=regular";
    params = add_auth_to_params_string(params);

    var response = UrlFetchApp.fetch(url, {
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        payload: params
    });
    //Logger.log(response.getContentText());
};

function add_lists_to_board_request() {

}

function conect_volunteers(task_profesion){
   var ss = SpreadsheetApp.openByUrl( 'https://docs.google.com/spreadsheets/d/1ebuu1s3uUHa6KdBgwEuwmYaeWu79g0KQzL3s-9n7fAo/edit?usp=sharing');
   Logger.log(ss.getName());
   var sheet = ss.getActiveSheet();
   var search_string = task_profesion
   var textFinder = sheet.createTextFinder(search_string)
   
   var search_row = textFinder.findNext().getRow()
   
   var currentRow = sheet.getRange(search_row,2) 
   var current_volunteer = currentRow.getValues()
   
  Logger.log('the next volunteer with  profession of "%s" is "%s"',search_string,search_row)
  Logger.log('the volunteer details are: "%s"',current_volunteer)
}
 

function delete_old_responses(){
   var form = FormApp.getActiveForm();
  var formResponses = form.deleteAllResponses(); 
}





 function onFormSubmit() {
   
  Logger.clear()
  
  //var head_manneger = {name:'Gibor', email: 'Gibori.shoa@gmail.com'}
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
   
  Logger.log('number of all Giborim %s"',formResponses.length);
    
  var last_response_index = form.getResponses().length-1
   
   var formResponse_desc = (formResponses[last_response_index]);
   
   var itemResponses = formResponse_desc.getItemResponses();
   
   Logger.log('Form Responses desc  %s"',formResponse_desc.getItemResponses());
        
   for (var j = 0; j < itemResponses.length; j++) 
	{ //loop on all answers
      var item_desc = itemResponses[j];  
	  Logger.log('Response #%s to the question "%s" was "%s"',
	  (j + 1).toString(),
	  item_desc.getItem().getTitle(),
	   item_desc.getResponse());
    

    }   //loop on all answers
   
   var name = itemResponses[0]
   var phone = itemResponses[1]
   var region =itemResponses[3]
   
    conect_volunteers("ניהול פרוייקט - אדריכלים, מעצבים, קבלנים, שיפוצניקים.")
    create_new_board("surviver name23")
}
 