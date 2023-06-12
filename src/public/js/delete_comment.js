// This file was adapted from CS340's node starter app repo

function deleteComment(comment_id) {
    let link = '/delete-comment-ajax/';
    let data = {
      id: comment_id
    };
  
    console.log(data);
    
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(comment_id);
      }
    });
  }
  
  function deleteRow(comment_id){
      let table = document.getElementById("comments-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == comment_id) {
              table.deleteRow(i);
              break;
         }
      }
  }