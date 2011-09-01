/// <reference path="/msbuild/jquery-1.3.2-vsdoc2.js" />

/*
* EASING
*/
var easingMethod = 'easeInOutCubic';
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
});

var nav,
    navLevel01,
    navLevel02,
    curtain,
    curtain_defaultH,
    menuActive,
    menuIntent,
    menuIntentItem,
    revealSpeed,
    closeSpeed, 
    alterSpeed,
    addthis_config;

abaf = {
    init: function () {
        $(document).ready(function () {

            listingItems = $('#body ul.listing li:not(.blank), #body ul.blogListing li');
            listingItems.live('mouseenter mouseleave', function (event) {
                if (event.type == 'mouseenter') {
                    $(this).addClass('state-active');
                    if ($(this).parent().hasClass('landing')) {
                        $('.rotateOn', this).show();
                        $('.rotateOff', this).hide();
                    }
                } else {
                    $(this).removeClass('state-active');
                    if ($(this).parent().hasClass('landing')) {
                        $('.rotateOn', this).hide();
                        $('.rotateOff', this).show();
                    }
                }


            });

            $("body").addClass("jsEnabled");

            var txtSearch = $('#searchBox .input-text-search');
            txtSearch.focus(function () { if ($(this).val() == 'Search AbaF') $(this).val(''); })
                     .blur(function () { if ($(this).val() == '') $(this).val('Search AbaF'); });

            addthis_config = {
                ui_offset_top: 189,
                ui_offset_left: 0,
                ui_cobrand: "AbaF",
                ui_click: true
            }

            abaf.breadcrumbs.init();
        });

        //abaf.cufon.init();
        abaf.navigation.init();
    },


    breadcrumbs: {
        init: function () {
            var $breadcrumbs = $('#container div.breadcrumbs ul li');

            if ($breadcrumbs.length > 0) {
                $breadcrumbs.each(function () {
                    if ($(this).width() > 194) {
                        $(this).width(388);
                    }
                });
            }
        }
    },
    promotionScroller: { init: function () {
        $(document).ready(function () {
            var currentPosition = 0;
            var slideWidth = 969;
            var slides = $('#promo > .slide');
            var numberOfSlides = slides.length;
            var animateSpeed = 900;

            // Remove scrollbar with JS
            $('#promo').css('overflow', 'hidden');
            slides.width(slideWidth);
            slides.wrapAll('<div id="slideInner"></div>').css({ 'float': 'left', 'width': slideWidth });
            $('#slideInner').css('width', slideWidth * numberOfSlides);
            $('#promo').after('<ul id="controlsList"></ul>');
            slides.each(function (i) { $('#controlsList').append('<li><a href="#" id="' + i + '" class="slideTH">' + (i + 1) + '</a></li>'); })
            $('#controlsList li:first a').addClass('active');

            //Auto Scroll
            function sessTimer() {
                slideTimer = window.setInterval(function () {
                    // Determin new position
                    currentPosition = $('#controlsList li a.active').attr('id');
                    if (parseInt(currentPosition) + 2 > numberOfSlides) { currentPosition = 0 } else { currentPosition = parseInt(currentPosition) + 1 };
                    $('#slideInner').animate({ 'marginLeft': -(slideWidth * currentPosition) }, { easing: easingMethod, duration: animateSpeed });
                    $('#controlsList li a.active').removeClass('active');
                    $('#' + currentPosition).addClass('active');
                }, 10000);
            }

            sessTimer();

            $('.slideTH').bind('click', function () {
                $('#controlsList li a').removeClass('active');
                $(this).addClass('active');
                currentPosition = $(this).attr('id');
                $('#slideInner').animate({ 'marginLeft': slideWidth * (-currentPosition) }, { easing: easingMethod, duration: animateSpeed });
                clearInterval(slideTimer);
                sessTimer();
                return false;
            });
        });
    }
    },
    navigation: {
        init: function () {
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
    }
};

abaf.init();

