$(document).ready(function () {
nav = $('#nav');
navLevel01 = $('#nav ul.level01');
navLevel02 = $('#nav ul.level02');
curtain = $('#nav .curtain');
curtain_defaultH = curtain.height();
menuActive = false;
menuIntent = false;
menuIntentItem = null;
revealSpeed = 200;
closeSpeed = 500;
alterSpeed = 500;


nav.bind('mouseleave', function () {
    curtain.animate({ height: curtain_defaultH }, { duration: closeSpeed, queue: false, complete: function () { $('.state-active', navLevel01).removeClass('state-active'); } });
    menuActive = false;
    if (typeof intentTimer != 'undefined')
        clearTimeout(intentTimer);
});




/* Level 1 */
$('ul.level01 > li', nav).hover(function () {
    menuIntentItem = $(this);
    if (!menuActive) {
        intentTimer = setTimeout(function () {
            abaf.navigation.showMenu();
        }, 300);
    } else {
        abaf.navigation.showMenu();
    }
}, function () {
    if (subMenu1.length != 0) {
        curtain.animate({ height: minHeight }, { easing: easingMethod, duration: revealSpeed, queue: false });
    }
});


/* Level 2 */
$('#nav ul.level02 > li').hover(function () {
    $('.state-active', navLevel02).removeClass('state-active');
    $('> a', this).addClass('state-active');


    subMenu3 = $('ul.level03', this);
    subMenu3Size = $('> li', subMenu3).size();


    if (subMenu3.height() + 60 > minHeight) {
        subMenu1.height(subMenu3.height() + 80);
        curtain.animate({ height: subMenu3.height() + 80 }, { easing: easingMethod, duration: alterSpeed, queue: false });
    } else {
        subMenu1.height(minHeight);
        curtain.animate({ height: minHeight }, { easing: easingMethod, duration: closeSpeed, queue: false });
    }


    subMenu3.stop(true, true).fadeIn(300);
}, function () {
    $('> a', this).removeClass('state-active');
    subMenu3.stop(true, true).fadeOut(300);
    curtain.animate({ height: minHeight }, { easing: easingMethod, duration: closeSpeed, queue: false });
});



});

},

showMenu: function () {

menuActive = true;

subMenu1 = $('ul.level02', menuIntentItem);



if (!$('> a', menuIntentItem).hasClass('state-active')) {
$('.state-active', navLevel01).removeClass('state-active');
$('> a', menuIntentItem).addClass('state-active');
navLevel02.stop(true, true).fadeOut(300);

} else {
$('.state-active', navLevel02).removeClass('state-active');

}



if (subMenu1.length != 0) {
var subMenu1Size = $('> li', subMenu1).size();
minHeight = (subMenu1Size * 30) + 80;
curtain.animate({ height: minHeight }, { easing: easingMethod, duration: alterSpeed, queue: false });
subMenu1.stop(true, true).fadeIn(300);

} else {
curtain.animate({ height: curtain_defaultH }, { easing: easingMethod, duration: closeSpeed, queue: false });

}

}

},