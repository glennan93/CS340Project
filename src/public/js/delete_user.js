//This file was adapted from CS340's nodejs starter app repo.

function deleteUser(user_id) {
    let link = '/delete-user-ajax/';
    let data = {
      id: user_id
    };
  
    console.log(data);
    
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(user_id);
      }
    });
  }
  
  function deleteRow(user_id){
      let table = document.getElementById("user-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == user_id) {
              table.deleteRow(i);
              break;
         }
      }
  }