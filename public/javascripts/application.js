$(function() {
    /* jQuery stuff */
    $('[data-twitter-account]').each(function() {
        var img = $('<img src='+'https://api.twitter.com/1/users/profile_image?screen_name='+$(this).attr('data-twitter-account')+'&size=normal'+'>');
        $(this).html(img);
    });
});
