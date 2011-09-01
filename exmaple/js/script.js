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
    cufon: {
        init: function () {
            Cufon.replace('h1,h2, .h2');
            Cufon.replace('#footer h5');
        }
    },
    landing: {
        init: function () {
            $(document).ready(function () {
                $('#content ul.landing li').each(function () {
                    $(this).bind('mouseenter mouseleave', function (event) {

                    });
                });
            });
        }
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
    },
    listings: {
        init: function () {
            $('#content ul.listing li').live('click', function () {
                var link = $(this).find('a:first');
                if (link.length > 0) {
                    location.href = link.attr('href');
                }
                return false;
            });
        }
    },
    blog: {
        init: function () {
            $(document).ready(function () {
                var btnLoadMore = $('#loadMoreTrigger_Items');
                btnLoadMore.click(function () {
                    $(this).hide();
                    abaf.blog.getMoreBlogItems();
                    return false;
                });
            });
        },
        getMoreBlogItems: function () {
            $('#loadMoreAnimation').show();
            $.ajax({
                type: "POST",
                url: "/Services/cManagerService.asmx/GetPostsByTag",
                data: "{tag:'" + tag + "', month:" + month + ", year:" + year + ", startIndex:" + start + ", count:" + increment + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (html) {

                    $('#loadMoreAnimation').hide();

                    abaf.blog.applyItemsTemplate(html);
                    start = start + html.d.length;
                    $('#itemCount').html(start);
                    if (start >= count) {
                        $("#loadMoreTrigger_Items").hide();
                        $('#itemCount').html(count);
                    } else {
                        $('#loadMoreTrigger_Items').show();
                    }
                }
            });
        },
        applyItemsTemplate: function (sender) {
            for (var i = 0; i < sender.d.length; i++) {
                sender.d[i].Url = baseUrl + sender.d[i].UrlFriendlyTitle + ".html";
                sender.d[i].CssClass = "";
                blogIndex++;
                if (blogIndex > 3) {
                    var mod = (blogIndex - 3) % 4;
                    if (mod == 0)
                        sender.d[i].CssClass = "last";
                }
                else {
                    if (blogIndex == 3)
                        sender.d[i].CssClass = "last";
                }
            }
            var tpl = $.createTemplateURL('/Modules/Blog/ItemsListingJTemplate.htm?nocache=12', [], { filter_data: false });
            var html = $.processTemplateToText(tpl, sender, []);
            $(html).appendTo('#blogListing').fadeIn(800);
            // $('#blogsExtra .loading').remove();
        },
        submitComment: function (contentId) {



            var isValid = true;
            if ($('#name-' + contentId).val() == '') {
                isValid = false;
                $('#name-err-' + contentId).show();
            } else {
                $('#name-err-' + contentId).hide();
            }
            if ($('#email-' + contentId).val() == '') {
                isValid = false;
                $('#email-err-' + contentId).text('Please enter email');
                $('#email-err-' + contentId).show();
            } else if ($('#email-' + contentId).val() != '') {
                var emailRegex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\s)*/;
                if (emailRegex.test($('#email-' + contentId).val()) == false) {
                    isValid = false;
                    $('#email-err-' + contentId).text('Invalid email');
                    $('#email-err-' + contentId).show();
                } else {
                    $('#email-err-' + contentId).hide();
                }
            } else {
                $('#email-err-' + contentId).hide();
            }
            if ($('#comment-' + contentId).val().length == 0) {
                isValid = false;
                $('#comment-err-' + contentId).text('Please enter comment');
                $('#comment-err-' + contentId).show();
            } else if ($('#comment-' + contentId).val().length >= 1000) {
                isValid = false;
                $('#comment-err-' + contentId).text('Too long');
                $('#comment-err-' + contentId).show();
            } else {
                $('#comment-err-' + contentId).hide();
            }
            if (isValid) {
                $('#comments .formWorking').show();
                var jsonParams = "{contentId: '" + contentId + "', moduleName:'Blog', name:'" + $('#name-' + contentId).val().replace(/'/g, "\\'") + "', email:'" + $('#email-' + contentId).val().replace(/'/g, "\\'") + "', commentText:'" + $('#comment-' + contentId).val().replace(/'/g, "\\'") + "'}";
                $.ajax({
                    type: "POST",
                    url: "/Services/cManagerService.asmx/SubmitComment",
                    // Pass the "Count" parameter, via JSON object.
                    data: jsonParams,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        if (response.d == false) {
                            alert('Sorry, there has been a problem on submitting your comment, please try again later.');
                        } else {
                            $('#submit-' + contentId).html('<p><strong>Thanks ' + $('#name-' + contentId).val() + ', your comment is now awaiting approval before it will appear on this page.</strong></p>').show();
                            $('#comments').hide().find('.formWorking').hide();
                        }


                    }
                });
            }
        }
    },
    initDropDownList: function (sender) {
        $(document).ready(function () {

            sender = $(sender);

            var selected = sender.find("option[selected]");
            //var title = source.find("option:first");

            var options = $("option", sender);
            sender.after('<dl id="rmFilter_' + sender.attr('id') + '" class="pxDropdown"></dl>');
            var target = $('#rmFilter_' + sender.attr('id'));
            target.append('<dt><a href="#">' + selected.text() + '</a></dt>');
            target.append('<dd><ul></ul></dd>');

            sender.hide();


            options.each(function (i) {

                if ($(this).text() == selected.text()) {
                    var lineClass = "selected";
                } else {
                    var lineClass = "";
                }

                $("dd ul", target).append('<li class="' + lineClass + '"><a href="#"><span class="text">' +
                $(this).text() + '</span><span class="value">' +
                $(this).val() + '</span></a></li>');

            });

            $('dt a', target).bind('click', function () {
                $('ul', target).slideDown(200).css({ 'z-index': 100 });
                return false;
            });


            $(target).bind('mouseleave', function () {
                var timoutTarget = $('ul', target);
                var timoutTargetSrc = $('dt a', this);
                dropDowntimer = setTimeout(function () {
                    timoutTarget.fadeOut(300).css({ 'z-index': 50 });
                }, 500);

            });

            $('ul', target).bind('mouseenter', function () {
                if (typeof dropDowntimer != 'undefined')
                    clearTimeout(dropDowntimer);
            });


            $("dd ul li a", target).bind('click', function () {
                var text = $('.text', this).html();
                var parent = $(this).parent();

                $("dt a", target).html(text);
                $("dd ul", target).fadeOut(300, function () {
                    $("dd ul li.selected", target).removeClass('selected');
                    parent.addClass('selected');
                });
                sender.val($(this).find("span.value").html());
                sender.change();
                return false;
            });
        });
    },
    awards: {
        init: function () {
            $(document).ready(function () {
                var btnLoadMore = $('#loadMoreBtn');
                if (start >= count) {
                    start = count;
                    btnLoadMore.hide();
                }

                $('#totalCount').html(count);
                $('#itemCount').html(start);
                btnLoadMore.click(function () {
                    $(this).hide();
                    abaf.awards.getMoreItems();
                    return false;
                });

                abaf.listings.init();
            });
        },
        getMoreItems: function () {
            $('#loadMoreAnimation').show();
            $.ajax({
                type: "POST",
                url: "/Services/cManagerService.asmx/GetAwardsByCategory",
                data: "{primaryId:'" + PrimaryId + "', startIndex:" + start + ", count:" + increment + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (html) {
                    $('#loadMoreAnimation').hide();
                    abaf.awards.applyItemsTemplate(html);
                    start = start + html.d.length;
                    $('#itemCount').html(start);
                    if (start >= count) {
                        $("#loadMoreBtn").hide();
                        $('#itemCount').html(count);
                    } else {
                        $("#loadMoreBtn").show();
                    }
                }
            });
        },
        applyItemsTemplate: function (sender) {
            for (var i = 0; i < sender.d.length; i++) {
                sender.d[i].Url = baseUrl + sender.d[i].UrlFriendlyTitle + ".html";
                sender.d[i].CssClass = "";
                awardIndex++;
                if (awardIndex > 3) {
                    var mod = (awardIndex - 3) % 4;
                    if (mod == 0)
                        sender.d[i].CssClass = "last";
                }
                else {
                    if (awardIndex == 3)
                        sender.d[i].CssClass = "last";
                }
            }
            var tpl = $.createTemplateURL('/Modules/Awards/ItemsListingJTemplate.htm?nocache=12', [], { filter_data: false });
            var html = $.processTemplateToText(tpl, sender, []);
            $(html).appendTo('#awardsListing').fadeIn(800);
        }
    },
    artistProjects: {
        init: function () {
            $(document).ready(function () {
                var btnLoadMore = $('#loadMoreBtn');
                start = $('#awardsListing > li:not(.blank)').length;

                if (start >= count) {
                    start = count;
                    btnLoadMore.hide();
                }

                $('#totalCount').html(count);
                $('#itemCount').html(start);
                btnLoadMore.click(function () {
                    $(this).hide();
                    abaf.artistProjects.getMoreProjectItems();
                    return false;
                });



                $('#filters .input-text').bind('focus blur', function (event) {
                    if (event.type == "focus") {
                        if ($(this).attr("title") == $(this).val()) {
                            $(this).val("");
                        }
                    }
                    if (event.type == "blur") {
                        if ($(this).val() == "") {
                            $(this).val($(this).attr("title"));
                        }
                    }
                });

                abaf.listings.init();
            });
        },
        getMoreProjectItems: function () {
            $('#loadMoreAnimation').show();
            $.ajax({
                type: "POST",
                url: "/Services/cManagerService.asmx/GetArtisitProjectsByCategory",
                data: "{primaryId:'" + PrimaryId + "', secondaryId:'" + SecondaryId + "', firstname:'" + FirstName + "', lastname:'" + LastName + "', company:'" + Company + "', startIndex:" + start + ", count:" + increment + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (html) {
                    $('#loadMoreAnimation').hide();
                    abaf.artistProjects.applyItemsTemplate(html);
                    start = start + html.d.length;
                    $('#itemCount').html(start);
                    if (start >= count) {
                        $("#loadMoreBtn").hide();
                        $('#itemCount').html(count);
                    } else {
                        $("#loadMoreBtn").show();
                    }
                }
            });
        },
        applyItemsTemplate: function (sender) {
            for (var i = 0; i < sender.d.length; i++) {
                sender.d[i].Url = baseUrl + sender.d[i].UrlFriendlyTitle + ".html";
                sender.d[i].CssClass = "";
                artistPIndex++;
                if (artistPIndex > 3) {
                    var mod = (artistPIndex - 3) % 4;
                    if (mod == 0)
                        sender.d[i].CssClass = "last";
                }
                else {
                    if (artistPIndex == 3)
                        sender.d[i].CssClass = "last";
                }
            }
            var tpl = $.createTemplateURL('/Modules/ArtistProject/ItemsListingJTemplate.htm?nocache=12', [], { filter_data: false });
            var html = $.processTemplateToText(tpl, sender, []);
            $(html).appendTo('#awardsListing').fadeIn(800);
        }
    },
    casestudy: {
        init: function () {
            $(document).ready(function () {
                var btnLoadMore = $('#loadMoreBtn');
                if (start >= count) {
                    start = count;
                    btnLoadMore.hide();
                }

                $('#totalCount').html(count);
                $('#itemCount').html(start);
                btnLoadMore.click(function () {
                    $(this).hide();
                    abaf.casestudy.getMoreCaseStudyItems();
                    return false;
                });

                abaf.listings.init();
            });
        },
        getMoreCaseStudyItems: function () {
            $('#loadMoreAnimation').show();
            $.ajax({
                type: "POST",
                url: "/Services/cManagerService.asmx/GetCaseStudiesByCategory",
                data: "{primaryId:'" + PrimaryId + "', secondaryId:'" + SecondaryId + "', artformId:'" + ArtformId + "', startIndex:" + start + ", count:" + increment + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (html) {
                    $('#loadMoreAnimation').hide();
                    abaf.casestudy.applyItemsTemplate(html);
                    start = start + html.d.length;
                    $('#itemCount').html(start);
                    if (start >= count) {
                        $("#loadMoreBtn").hide();
                        $('#itemCount').html(count);
                    } else {
                        $("#loadMoreBtn").show();
                    }
                }
            });
        },
        applyItemsTemplate: function (sender) {
            for (var i = 0; i < sender.d.length; i++) {
                sender.d[i].Url = baseUrl + sender.d[i].UrlFriendlyTitle + ".html";
                sender.d[i].CssClass = "";
                caseStudyIndex++;
                if (caseStudyIndex > 3) {
                    var mod = (caseStudyIndex - 3) % 4;
                    if (mod == 0)
                        sender.d[i].CssClass = "last";
                }
                else {
                    if (caseStudyIndex == 3)
                        sender.d[i].CssClass = "last";
                }
            }
            var tpl = $.createTemplateURL('/Modules/CaseStudy/ItemsListingJTemplate.htm?nocache=12', [], { filter_data: false });
            var html = $.processTemplateToText(tpl, sender, []);
            $(html).appendTo('#awardsListing').fadeIn(800);
        }
    },
    news: {
        init: function () {
            $(document).ready(function () {
                var btnLoadMore = $('#loadMoreBtn');
                if (start >= count) {
                    start = count;
                    btnLoadMore.hide();
                }


                $('#totalCount').html(count);
                $('#itemCount').html(start);
                btnLoadMore.click(function () {
                    abaf.news.getMoreNewsItems();
                    return false;
                });

                abaf.listings.init();
            });
        },
        getMoreNewsItems: function () {
            $.ajax({
                type: "POST",
                url: "/Services/cManagerService.asmx/GetNewsByCategory",
                data: "{primaryId:'" + PrimaryId + "', stateId:'" + StateId + "', startIndex:" + start + ", count:" + increment + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (html) {
                    abaf.news.applyItemsTemplate(html);
                    start = start + html.d.length;
                    $('#itemCount').html(start);
                    if (start >= count) {
                        $("#loadMoreBtn").hide();
                        $('#itemCount').html(count);
                    }
                }
            });
        },
        applyItemsTemplate: function (sender) {
            for (var i = 0; i < sender.d.length; i++) {
                sender.d[i].Url = baseUrl + sender.d[i].UrlFriendlyTitle + ".html";
                sender.d[i].CssClass = "";
                newsIndex++;
                if (newsIndex > 3) {
                    var mod = (newsIndex - 3) % 4;
                    if (mod == 0)
                        sender.d[i].CssClass = "last";
                }
                else {
                    if (newsIndex == 3)
                        sender.d[i].CssClass = "last";
                }
            }
            var tpl = $.createTemplateURL('/Modules/News/ItemsListingJTemplate.htm?nocache=12', [], { filter_data: false });
            var html = $.processTemplateToText(tpl, sender, []);
            $(html).appendTo('#newsListing').fadeIn(800);
        }
    },
    workshops: {
        init: function () {
            $(document).ready(function () {
                var btnLoadMore = $('#loadMoreBtn');
                if (start >= count) {
                    start = count;
                    btnLoadMore.hide();
                }


                $('#totalCount').html(count);
                $('#itemCount').html(start);
                btnLoadMore.click(function () {
                    $(this).hide();
                    abaf.workshops.getMoreWorkshopItems();
                    return false;
                });

                abaf.listings.init();
            });
        },
        getMoreWorkshopItems: function () {
            $('#loadMoreAnimation').show();
            $.ajax({
                type: "POST",
                url: "/Services/cManagerService.asmx/GetWorkshopsByCategory",
                data: "{webtype: '" + webtype + "', state:'" + State + "', startIndex:" + start + ", count:" + increment + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (html) {
                    $('#loadMoreAnimation').hide();
                    abaf.workshops.applyItemsTemplate(html);
                    start = start + html.d.length;
                    $('#itemCount').html(start);
                    if (start >= count) {
                        $("#loadMoreBtn").hide();
                        $('#itemCount').html(count);
                    } else {
                        $("#loadMoreBtn").show();
                    }
                }
            });
        },
        applyItemsTemplate: function (sender) {
            for (var i = 0; i < sender.d.length; i++) {
                sender.d[i].Url = baseUrl + sender.d[i].UrlFriendlyTitle + ".html";
                sender.d[i].CssClass = "";
                listingIndex++;
                if (listingIndex > 3) {
                    var mod = (listingIndex - 4) % 4;
                    if (mod == 0)
                        sender.d[i].CssClass = "last";
                }
                else {
                    if (listingIndex == 3)
                        sender.d[i].CssClass = "last";
                }
            }
            var tpl = $.createTemplateURL('/Modules/Event/ItemsListingJTemplate.htm?nocache=12', [], { filter_data: false });
            var html = $.processTemplateToText(tpl, sender, []);
            $(html).appendTo('#workshopListing').fadeIn(800);
            // $('#blogsExtra .loading').remove();
        }
    },
    forms: {
        init: function () {
            $(document).ready(function () {
                //Using Pixelchild pxForm plugin
                $('#abafForm').pxForm();
            });
        }
    },
    faqs: {
        init: function () {
            $(document).ready(function () {

                $('#faqsListing > li').each(function () {
                    if ($('.answerTrunc', this).html().length < 200) {
                        $('a.details', this).hide();
                    }
                });

                start = $('#faqsListing > li:not(.blank)').length;

                var btnLoadMore = $('#loadMoreBtn');
                if (start >= count) {
                    start = count;
                    btnLoadMore.hide();
                }


                $('#totalCount').html(count);
                $('#itemCount').html(start);
                btnLoadMore.click(function () {
                    $(this).hide();
                    abaf.faqs.getMoreItems();
                    return false;
                });

                //abaf.listings.init();


                $('#faqsListing > li a.details').live('click', function () {
                    if ($(this).html() == "Details") {
                        $(this).html("Hide Details");
                        $(this).siblings('.answerTrunc').toggle();
                        $(this).siblings('.answer').toggle().css({ display: 'block' });
                    } else {
                        $(this).html("Details");
                        $(this).siblings('.answerTrunc').toggle();
                        $(this).siblings('.answer').toggle();
                    }
                    return false;
                });
            });
        },
        getMoreItems: function () {
            $('#loadMoreAnimation').show();
            $.ajax({
                type: "POST",
                url: "/Services/cManagerService.asmx/GetFaqsByCategory",
                data: "{primaryId:'" + PrimaryId + "', startIndex:" + start + ", count:" + increment + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (html) {
                    $('#loadMoreAnimation').hide();
                    abaf.faqs.applyItemsTemplate(html);
                    start = start + html.d.length;
                    $('#itemCount').html(start);
                    if (start >= count) {
                        $("#loadMoreBtn").hide();
                        $('#itemCount').html(count);
                    } else {
                        $("#loadMoreBtn").show();
                    }
                }
            });
        },
        applyItemsTemplate: function (sender) {
            for (var i = 0; i < sender.d.length; i++) {
                sender.d[i].Url = baseUrl + sender.d[i].UrlFriendlyTitle + ".html";
                faqIndex++;
                console.log(sender.d);
            }
            var tpl = $.createTemplateURL('/Modules/FAQ/ItemsListingJTemplate.htm?nocache=12', [], { filter_data: false });
            var html = $.processTemplateToText(tpl, sender, []);
            $(html).appendTo('#faqsListing').fadeIn(800);
            Cufon('#faqsListing .h2');
            $('#faqsListing > li').each(function () {
                if ($('.answerTrunc', this).html().length < 200) {
                    $('a.details', this).hide();
                }
            });
        }
    }
};

abaf.init();

