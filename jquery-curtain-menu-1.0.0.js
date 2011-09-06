//
// create closure
//
(function($) {
  //
  // plugin definition
  //
  $.fn.curtainMenu = function(options) {
    debug(this);
   // build main options before element iteration
   var opts = $.extend({}, $.fn.hilight.defaults, options);
 // iterate and reformat each matched element
 return this.each(function() {
   $this = $(this);
   // build element specific options
   var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
   // update element styles
   $this.css({
  backgroundColor: o.background,
  color: o.foreground
   });
   var markup = $this.html();
   // call our format function
   markup = $.fn.hilight.format(markup);
   $this.html(markup);
 });
  };
  //
  // private function for debugging
  //
  function debug($obj) {
    if (window.console && window.console.log)
      window.console.log('debug');
  };
  //
  // define and expose our format function
  //
  $.fn.curtainMenu.format = function(txt) {
    return '<strong>' + txt + '</strong>';
  };
  //
  // plugin defaults
  //
  $.fn.hilight.defaults = {
  nav: $('#nav'),
  navLevel01: $('#nav ul.level01'),
  navLevel02: $('#nav ul.level02'),
  curtain: $('#nav .curtain'),
  //curtain_defaultH: curtain.height(),
  menuActive: false,
  menuIntent: false,
  menuIntentItem: null,
  revealSpeed: 200,
  closeSpeed: 500,
  alterSpeed: 500
  //subMenu1: $('ul.level02', menuIntentItem)
};
//
// end of closure
//
})(jQuery);

