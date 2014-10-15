# jQuery Text to Input Plugin a.k.a. contenteditable fallback

This simple plugin enables you to make elements editable on click. It will check if the browser does support
the "contenteditable" feature. If not, an input field is generated.
 
## Example Usage

### Markup

To quickly add the functionality to any element just add class="texttoinput".


```html
<span class="texttoinput">This text should be transformed into an input field.</span>
```

### Javascript

Call the function via Javascript:

```js
$('span').textToInput();
```


## Options

You can set the following options if you call the plugin via Javascript:

```js
$('span').textToInput({
	select_text: true, 			  // Whenever the input field should be selected with focus. Default: true.
	css_class: 'myinputclass',    // Css class of input element. Default: ''.
	contenteditable: true,        // Enable or disable contenteditable support. Default: true.
	onChange: function() {
	  console.log($(this).val());
	},
	return_change: true           // Whenever onChange should be invoked when return key is pressed.
});
```


## Installation

Just include the jquery.texttoinput.js script after the jQuery library.


## Version

The plugin is currently in beta.


## License

This plugin is available under [the MIT license](http://mths.be/mit).
