$(function(){
  var buildHTML = function(message) {
    if ( message.content && message.image ) {
      var html =
       `<div class="chat-main__message-list__box" data-message-id=${message.id}>
          <div class="chat-main__message-list__box__file">
            <div class="chat-main__message-list__box__file__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__box__file__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__box__comment">
            <p class="lower-message__content">
              ${message.content}
            </p>
            <img src="` + message.image + `" class="lower-message__image" >
          </div>
        </div>`
    } else if (message.content){
      var html =
       `<div class="chat-main__message-list__box" data-message-id=${message.id}>
          <div class="chat-main__message-list__box__file">
            <div class="chat-main__message-list__box__file__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__box__file__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__box__comment">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
    } else if (message.image) {
      var html =
       `<div class="chat-main__message-list__box" data-message-id=${message.id}>
          <div class="chat-main__message-list__box__file">
            <div class="chat-main__message-list__box__file__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__box__file__time">
              ${message.created_at}
            </div>
          </div>  
          <div class="chat-main__message-list__box__comment">
            <img src="` + message.image + `" class="lower-message__image" >
          </div>
        </div>`    
    };
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var url = $(this).attr('action');
    var formdata = new FormData(this);
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false      
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});    
      $('.submit-btn').prop('disabled', false);
      $('form')[0].reset();
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.chat-main__message-list__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});