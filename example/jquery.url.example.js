(function($) {
  $(document).ready(function() {
    $('.current-search').html($.getCurrentSearch());

    $('.test-value').html($.getUrlParameter($.getCurrentSearch(), 'test'));
    $('.test2-value').html($.getUrlParameter($.getCurrentSearch(), 'test2'));

    $('.change-test').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test', '11'));
    $('.change-test2').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test2', '22'));
    $('.change-test3').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test3', '33'));
  });
})(jQuery);
