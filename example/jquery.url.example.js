(function($) {
  $(document).ready(function() {
    // Show current search.
    $('.current-search').html($.getCurrentSearch());

    // Show current values.
    $('.test-value').html($.getUrlParameter($.getCurrentSearch(), 'test'));
    $('.test2-value').html($.getUrlParameter($.getCurrentSearch(), 'test2'));
    $('.test3-value').html($.getUrlParameter($.getCurrentSearch(), 'test3'));

    // Change values in links.
    $('.change-test').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test', '11'));
    $('.change-test2').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test2', '22'));
    $('.change-test3').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test3', '33'));

    // Set to no value in links.
    $('.change-test-no-value').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test', ''));
    $('.change-test2-no-value').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test2', ''));
    $('.change-test3-no-value').attr('href', $.changeUrlParameter($.getCurrentSearch(), 'test3', ''));

    // Remove value in links.
    $('.remove-test').attr('href', $.removeUrlParameter($.getCurrentSearch(), 'test'));
    $('.remove-test2').attr('href', $.removeUrlParameter($.getCurrentSearch(), 'test2'));
    $('.remove-test3').attr('href', $.removeUrlParameter($.getCurrentSearch(), 'test3'));

    // Trimming slashes.
    var trimTest = '///test///';
    $('.trim-leading').html($.trimLeadingSlashes(trimTest));
    $('.trim-trailing').html($.trimTrailingSlashes(trimTest));
    $('.trim-all').html($.trimSlashes(trimTest));
  });
})(jQuery);
