//This file was adapted from CS340's nodejs starter app repo.

function deletePost(post_id) {
    let link = '/delete-post-ajax/';
    let data = {
      id: post_id
    };
  
    console.log(data);
    
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(post_id);
      }
    });
  }
  
  function deleteRow(post_id){
      let table = document.getElementById("post-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == post_id) {
              table.deleteRow(i);
              break;
         }
      }
  }