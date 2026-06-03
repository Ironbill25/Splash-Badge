# Splash-Badge
A small badge to put on your website, customizable with different text to show. It randomly chooses text from configuration each time the page is visited.

## How to Use
Download `splashbadge.js` to your website.  
Then, put a \<div\> in your page along with the script:
```html
<div class="splash-badge" data-path="path/to/splashbadge/config"></div>
<script src="path/to/splashbadge.js"></script>
```
Lastly, make the config file. It can be any file format but we recommend `.txt` for best compatibility.  
Example config:  
```plaintext
# Config options go here
show-change-button: true # If you want to allow users to refresh the splash text to see another random one.
---
# This is where you put the splash text. Each line is a separate item.
This is some example text...
More example text...
Some more text...
```
After you have made the configuration, change the `data-path` attribute on the `<div>` to the path to the config file.

## Config variables

Variables are placed above the `---` divider. They should use `key:value` or `key: value` format.  
Variables starting with `css-` are interpreted as CSS variables to apply to the badge.  
Below is a table of supported variables:

| Variable             | Description                                     |
| -------------------- | ----------------------------------------------- |
| `show-change-button` | If the user should be able to refresh the text. |
| `css-background`     | Badge background color.                         |
| `css-color`          | Badge text color.                               |
| `css-border`         | Badge border color.                             |
| `css-font-size`      | Badge font size.                                |
| `css-button-bg`      | Refresh button background color.                |
| `css-button-color`   | Refresh button text color.                      |