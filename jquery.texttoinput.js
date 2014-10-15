/**
 * jQuery Text to Input Plugin a.k.a. contenteditable fallback
 *
 * Very simple plugin to make elements editable on click. It will check 
 * if the browser does support the "contenteditable" feature. If not, 
 * an input field is generated.
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
      var settings = $.extend({}, $.fn.textToInput.defaults, {}, options),
          hasContentEditable = (settings.contenteditable === true) && "contentEditable" in document.documentElement;

      if(hasContentEditable) {
        $(this).attr('contentEditable', 'true');
      }

      var $self = $(this),

      toggle = function(e) {

        /* browser supports contenteditable */
        if(hasContentEditable) {

          select($(this));
          input_element = $(this);
          
        } else {

          e.preventDefault();
          e.stopPropagation();

          var text = $(this).text(),
              default_html = $(this).html(),
              input_html = '<input value="' + text + '" class="' + settings.css_class + '">',
              input_element = $(this).html( input_html ).find('input').first();

          $(this).data('default_html', default_html).unbind('click.texttoinput');

          select(input_element);
          
        }


        input_element.bind('blur.texttoinput', function() {          
          $(this).unbind('blur.texttoinput');
          change($(this));
          if(!hasContentEditable) {
            $(this).parent().html( $(this).parent().data('default_html') ).bind('click.texttoinput', toggle);
          }
        });
        
        if(settings.return_change === true) {
          input_element.bind('keydown.texttoinput', function(e) {
            e.preventDefault();
            $(this).unbind('keydown.texttoinput');
            if(e.which == 13) {
              $(this).blur();
            }
          });
          }

      },

      change = function(el) {
      
        if(typeof(settings.onChange) == 'function') {
          if(hasContentEditable) {
            el.val(el.text());
          }
          settings.onChange.apply(el[0], arguments)
        }
      },
      
      select = function (el) {

        if(settings.select_text !== true) {
          el.focus().val(el.val());
          return el;
        }

        var d = document,
            w = window,
            range,
            selection;

        el.focus();

        if(!hasContentEditable) {
          el.select();
        }
        else if (d.body.createTextRange) {
          var range = d.body.createTextRange();
          range.moveToElementText(el[0]);
          range.select();
        } else if (w.getSelection) {
          var selection = w.getSelection();        
          var range = d.createRange();
          range.selectNodeContents(el[0]);
          selection.removeAllRanges();
          selection.addRange(range);
        }

        return el;
      };

      $(this).bind('click.texttoinput', toggle);


    }); // this.each

  }; // $.fn.textToInput

  $.fn.textToInput.defaults = {
    select_text: true,     // whenever the input field should be selected with focus
    css_class: '',         // css class of input element
    contenteditable: true, // enable or disable contenteditable support
    onChange: null,        // onChange callback 
    return_change: true    // whenever onChange should be invoked when return key is pressed
  };
  
  $(function () {
    $('.texttoinput').textToInput();
  })

})(jQuery);
