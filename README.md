# fragmentFocus

`fragmentFocus` is a userscript that improves the visibility and navigation of text fragments in You.com's Research Mode by generating a collapsible sidebar. This sidebar aggregates and highlights text fragments from the citation hyperlinks, facilitating the examination of these function of these fragments.

<img width="1016" alt="image" src="https://github.com/danielsgriffin/fragmentFocus/assets/6070690/77f5d87f-599f-4d7d-98d7-ae1923d3579e">

## Features

- **Dynamic Sidebar**: Creates a sidebar to aggregate text fragments from the page.
- **Highlighting Text Fragments**: Marks text fragments for straightforward identification and comparison.
- **Navigation Enhancement**: Simplifies navigating through text fragments and their sources.
- **Duplicate Detection**: Flags duplicate text fragments to identify repeated text or quotations.

## Installation

1. Install a userscript manager in your browser (Tampermonkey, Greasemonkey, etc.).
2. In your userscript manager, create a new script.
3. Paste the provided code into the script area.
4. Save and enable the script.
5. Visit a supported webpage on You.com to see the script in action.

## Usage

After installation, the script scans for links with text fragments (`:~:text=` in URLs), then:

- Compiles these fragments into a sidebar on the screen's right side.
- Highlights duplicates for comparison.
- Enhances fragment visibility when hovered over in the sidebar.

## Customization

You can adjust the sidebar and fragment highlight styles by editing the script's CSS properties.

## Compatibility

This script works on You.com and has been tested with Tampermonkey on the Brave browser.

## Support

For support or contributions, please open an issue on the GitHub project page.

## License

Released under the MIT License.
