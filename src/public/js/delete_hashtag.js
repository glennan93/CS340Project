// This file was adapted from CS340's node starter app repo

function deleteHashtag(hashtag_id) {
    let link = '/delete-hashtag-ajax/';
    let data = {
      id: hashtag_id
    };
  
    console.log(data);
    
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(hashtag_id);
      }
    });
  }
  
  function deleteRow(hashtag_id) {
    let table = document.getElementById("hashtag-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("id") === "hashtag-" + hashtag_id) {
        table.deleteRow(i);
        break;
      }
    }
  }
  

