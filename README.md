# jQuery Text to Input Plugin

This simple plugin enables you to transform text elements into an input text element on click and back on blur.
 
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
	select_text: true, 			// whenever the input field should be selected with focus
	css_class: 'myinputclass'   // css class of input element
});
```


## Installation

Just include the jquery.texttoinput.js script after the jQuery library.


## Version

The plugin is currently in beta.


## License

This plugin is available under [the MIT license](http://mths.be/mit).
