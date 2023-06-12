//This file was adapted from CS340's nodejs starter app repo.

function deletePostHashtag(post_hash_id) {
    let link = '/delete-post-hashtag-ajax/';
    let data = {
      id: post_hash_id
    };
  
    console.log(data);
    
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(post_hash_id);
        location.reload();
      }
    });
  }
  
  function deleteRow(post_hash_id){
      let table = document.getElementById("posts_hashtags-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == post_hash_id) {
              table.deleteRow(i);
              break;
         }
      }
  }