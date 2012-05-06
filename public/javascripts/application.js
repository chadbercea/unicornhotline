var unicornTo = function(endingPoint) {
    var startingPoint = '169+11th+street,San+francisco,CA'; // Made for @BallmerPeak, DO NOT CHANGE! - Raimo
    var zoom = 13; // how to figure this out, dammit :D
    var url = 'http://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom='+zoom+'&size=512x512&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Ccolor:red%7Clabel:C%7C40.718217,-73.998284&sensor=false&path='+startingPoint+'|' + encodeURIComponent(endingPoint);

    return url;
};
var unicornAt = function(endingPoint) {
    var startingPoint = '169+11th+street,San+francisco,CA'; // Made for @BallmerPeak, DO NOT CHANGE! - Raimo
    var zoom = 15; // how to figure this out, dammit :D
    var url = 'http://maps.googleapis.com/maps/api/staticmap?center='+encodeURIComponent(endingPoint)+'&zoom='+zoom+'&size=512x512&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Ccolor:red%7Clabel:C%7C40.718217,-73.998284&sensor=false&path='+startingPoint+'|' + encodeURIComponent(endingPoint);

    return url;
};
$(function() {
    var getRide = function(e) {
        var valid = true;
        e.preventDefault();
        if (!($('#twitter_account').val().length > 0)) {
            $('#twitter_account').css('border', '5px solid red');
            valid = false;
        }
        if (!($('#address').val().length > 0)) {
            $('#address').css('border', '5px solid red');
            valid = false;
        }
        if (!valid) {return;}
        var canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = $(window).width();
        canvas.height = $(window).height();
        document.body.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        var img = new Image();  
        var unicornSprite = {
            x: 0,
            y: 0,
            angle: 1,
            angleBoost: 0,
            image: new Image()
        };
        var homeMap = new Image();
        homeMap.src = unicornAt($('#address').val());
        var twitterAcco = $('#twitter_account').val();
        var homer = new Image();
        homer.src = 'https://api.twitter.com/1/users/profile_image?screen_name='+twitterAcco+'&size=normal';
        var ballmerPeak = new Image();
        ballmerPeak.src = 'https://api.twitter.com/1/users/profile_image?screen_name=BallmerPeak&size=normal';
        var googleMap = new Image();
        googleMap.src = unicornTo($('#address').val());
        unicornSprite.image.src = 'img/unicorn.png'
        ctx.textAlign='center'
        ctx.font = "21pt Calibri";
        ctx.shadowOffsetX = 1.5;  
        ctx.shadowOffsetY = 1.5;  
        ctx.shadowBlur = 2;  
        ctx.shadowColor = "rgba(0, 0, 255, 0.7)"; 
        homeMap.onload = function () {
            homer.onload = function() {
                ballmerPeak.onload = function() {
                    googleMap.onload = function() {
                        unicornSprite.image.onload = function() {
                            $('#main').hide();
                            $('body').css('background-image', 'none');
                            $('body').css('background-color', 'black');
                            var ctx = document.getElementById('canvas').getContext('2d');
                            setInterval(function() {
                                  var homeJourney = unicornSprite.angle > 3.5;
                                  var arrivalOnGoing = unicornSprite.angle < 2;
                                  var broughtHome = unicornSprite.angle > 5.2;
                                  ctx.fillStyle = "rgb(0,0,0)";
                                  ctx.fillRect(0,0,canvas.width, canvas.height);
                                  if (homeJourney) {
                                      ctx.translate(canvas.width/2,0);
                                      ctx.scale(1.0*canvas.height / homeMap.height, 1.0 * canvas.height/homeMap.height);
                                      ctx.drawImage(homeMap, -homeMap.width/2, 0);
                                      ctx.scale( 1.0 * homeMap.height/canvas.height, 1.0 * homeMap.height/canvas.height);
                                      ctx.translate(-canvas.width/2,0);
                                  } else {
                                      ctx.translate(canvas.width/2,0);
                                      ctx.scale(1.0*canvas.height / googleMap.height, 1.0 * canvas.height/googleMap.height);
                                      ctx.drawImage(googleMap, -googleMap.width/2, 0);
                                      ctx.scale( 1.0 * googleMap.height/canvas.height, 1.0 * googleMap.height/canvas.height);
                                      ctx.translate(-canvas.width/2,0);
                                  }
                                  if (unicornSprite.angle >= 7) {
                                      ctx.fillStyle = "rgb(0,0,255)";
                                      ctx.fillText('Thank you for using Unicorn Hotline!',canvas.width/2,21+60);
                                      ctx.fillStyle = "rgb(255,0,0)";
                                      ctx.fillText('We hope to see you again!',canvas.width/2,3*21+60);
                                  }
                                  if (arrivalOnGoing) {
                                      ctx.fillText('Now just open new beer and watch you getting home!', -30 + canvas.width/2+30*unicornSprite.angle,21+60);
                                  }

                                  ctx.translate(canvas.width/2,canvas.height/2);
                                  if (!homeJourney) {
                                      ctx.drawImage(ballmerPeak,0,0);
                                  }

                                  if (arrivalOnGoing || broughtHome) {
                                      ctx.drawImage(homer,0,-10);
                                  }
                                  ctx.translate(-canvas.width/2,-canvas.height/2);

                                  ctx.translate(canvas.width/2,-canvas.height/2 + (homeJourney ? canvas.height*2.1 : 0));
                                  ctx.rotate(-unicornSprite.angle);
                                  ctx.translate(-canvas.width/2,-canvas.height/2);

                                  ctx.translate(unicornSprite.x,unicornSprite.y);
                                  ctx.rotate(unicornSprite.angle + (broughtHome ?  -unicornSprite.angleBoost : 0));
                                  ctx.drawImage(unicornSprite.image, -unicornSprite.image.width/2, -unicornSprite.image.height/2);
                                  if (!arrivalOnGoing && !broughtHome) {
                                      ctx.drawImage(homer,-homer.width/2 + 20,-homer.height/2 - 30);
                                  }
                                  ctx.rotate(-unicornSprite.angle + (broughtHome ? unicornSprite.angleBoost : 0));
                                  ctx.translate(-unicornSprite.x,-unicornSprite.y);

                                  ctx.translate(canvas.width/2,canvas.height/2);
                                  ctx.rotate(unicornSprite.angle);
                                  ctx.translate(-canvas.width/2,canvas.height/2 + (homeJourney ? -canvas.height*2.1 : 0));

                                  if (unicornSprite.angle < 7) {
                                      unicornSprite.angle+=0.015;
                                  } if (broughtHome) {
                                      unicornSprite.angleBoost += 0.1;
                                  }
                            }, 50);
                        };

                    };
                };
            };
        };
    };
    $('#unicornride').click(function(e) {
        e.preventDefault();
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
            $('#get_the_ride').submit(getRide);
            $('#get_the_ride').find('input').keypress(function(e) {
                if (e.keyCode === 13) {
                    $('#get_the_ride').submit();
                };
            });
            $('#confirm').click(getRide);
        });
    });

});
