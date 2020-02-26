$(function(){
  function buildHTML(message){
    if ( message.image ) {
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
          <%= image_tag message.image.url, class: 'lower-message__image' if message.image.present? %>
        </div>`
      return html;
    } else {
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
      return html;
    };
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
});