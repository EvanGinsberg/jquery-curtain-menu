/*
* A jQuery plugin template
* Basically used as personal reference
*
* Author: Andy Goh (hantu)
* Website: http://www.andygoh.net
*
* Revisions:
* 0.1 - Initial commit
*
* References:
* http://www.learningjquery.com/2007/10/a-plugin-development-pattern
* http://docs.jquery.com/Plugins/Authoring
*
* Notes:
* - Good idea to name your file jquery.pluginName.js
*/
(function($) {

// replace 'pluginName' with the name of your plugin
    $.fn.curtainMenu = function(options) {
			// plugin default options
        var defaults = {
					nav: "#nav",
					subnav: "#subnav"
        };

// extends defaults with options provided
        if (options) {
					$.extend(defaults, options);
				}
					
// iterate over matched elements
        return this.each(function() {
            // implementations
							console.log("init");
        });

    };

// public functions definition
$.fn.curtainMenu.functionName = function(foo) {
return this;
};

// private functions definition
function foobar() {}

})(jQuery);

