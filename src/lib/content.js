function message(str) {
  $('#message').text(str);
}

(function() {
  $(function() {
    var ajax = $.ajax({
      url: 'http://reader.livedoor.com/subaccount'
    });

    ajax.then(
      function(data) {
        var welcome = $('#welcome');
        var forms = $('<div />').html(data).find('form[action="/account/switch"]');

        welcome.append(' ( ');
        forms.each(function() {
          var form = $(this);
          var a = $('<a />');
          a.text(form.find('input[name="switch_to"]').attr('value'));
          a.attr('href', '');
          a.click(function() {
            $.ajax({
              type: 'POST',
              url: form.attr('action'),
              data: {
                switch_to: form.find('input[name="switch_to"]').attr('value'),
                ApiKey: form.find('input[name="ApiKey"]').attr('value')
              }
            }).then(
              function() {
                location.reload();
              },
              function() {
                message('アカウントの切り替えに失敗しました');
              });
            return false;
          });
          welcome.append(a).append(' ');
        });
        welcome.append(')');
      },
      function(data) {
        message('サブアカウントの取得に失敗しました');
      });
  });
})(jQuery);
