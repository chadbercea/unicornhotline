var unicornTo = function(endingPoint) {
    var startingPoint = '169+11th+street,San+francisco,CA'; // Made for @BallmerPeak, DO NOT CHANGE! - Raimo
    var zoom = 13; // how to figure this out, dammit :D
    var url = 'http://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom='+zoom+'&size=512x512&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Ccolor:red%7Clabel:C%7C40.718217,-73.998284&sensor=false&path='+startingPoint+'|' + decodeURIComponent(endingPoint);

    return url;
};
$(function() {
    var getRide = function() {
        var imgUrl = unicornTo($('#address').val());
        var twitterAcco = $('#twitter_account').val();
        var homer = $('<img id="unicorn-customer" src="https://api.twitter.com/1/users/profile_image?screen_name='+twitterAcco+'&size=normal">');
        var ballmerPeak = $('<img id="unicorn-source" src="https://api.twitter.com/1/users/profile_image?screen_name=BallmerPeak&size=normal">');
        $('#main').hide();
        $('body').append('<img id="unicorn-map" src="' + imgUrl + '" />');
        $('body').append(ballmerPeak);
        $('body').append(homer);
        return false;
    };
    $('#unicornride').click(function() {
        var unicornride = this;
        $.get('_needs_unicorn.html', function(data) {
            var popup = $('<div />');
            popup.css('left', '50%');
            popup.css('margin-left', '-300px');
            popup.css('width', '600px');
            popup.css('heigth', '400px');
            popup.css('top', '200px');
            popup.css('position', 'absolute');
            popup.append(data);
            $('#main').append(popup);
            $('#get_the_ride').bind('submit', getRide);
            return false;
        });
    });

});
