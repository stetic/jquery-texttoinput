/**
 * jQuery Text to Input Plugin
 *
 * Very simple plugin to transform text elements into an input text 
 * element on click and back to text on blur.
 *
 * @package     jQuery.textToInput
 * @copyright   Copyright (c) 2014 Nico Puhlmann <nico@puhlmann.com>
 * @license     Released under the MIT license: http://mths.be/mit
 */

(function($) {

  $.fn.textToInput = function(options) {

    options = options || {};

    return this.each( function () {
	
    	// set options for current element
    	var settings = $.extend({}, $.fn.textToInput.defaults, {
        select_text:      true, 
        css_class:        ''
    	}, options);
	
    	var $self = $(this);

      $(this).css('cursor', 'pointer');
  
      var toggle = function(e) {
    
        e.preventDefault();
        e.stopPropagation();
    
        var text = $(this).text(),
            default_html = $(this).html(),
            input_element = '<input value="' + text + '" class="' + settings.css_class + '">';
      
        $(this).data('default_html', default_html).unbind('click.texttoinput');
    
        $(this).html( input_element );
    
        if(settings.select_text === true) {
          $(this).find('input')[0].select();
        }
    
        $(this).find('input').first().bind('blur.texttoinput', function() {          
          $(this).unbind('blur.texttoinput');
          $(this).parent().html( $(this).parent().data('default_html') ).bind('click.texttoinput', toggle);
        });
    
      }
  
      $(this).bind('click.texttoinput', toggle);
    
  
    }); // this.each

  }; // $.fn.textToInput

  $.fn.textToInput.defaults = {
  	select_text: true, // whenever the input field should be selected with focus
  	css_class: ''      // css class of input element
  };
  
  $(function () {
    $('.texttoinput').textToInput();
  })

})(jQuery);
