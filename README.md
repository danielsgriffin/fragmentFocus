# fragmentFocus

`fragmentFocus` is a userscript that improves the visibility and navigation of text fragments in You.com's Research Mode by generating a collapsible sidebar. This sidebar aggregates and highlights text fragments from the citation hyperlinks, facilitating the examination of these fragments and consider their function.

<img width="1016" alt="image" src="https://github.com/danielsgriffin/fragmentFocus/assets/6070690/77f5d87f-599f-4d7d-98d7-ae1923d3579e">

## Features

- **Dynamic Sidebar**: Creates a sidebar to aggregate text fragments from the page.
- **Highlighting Text Fragments**: Marks text fragments for straightforward identification and comparison.
- **Navigation Enhancement**: Simplifies navigating through text fragments and their sources.
- **Duplicate Detection**: Flags duplicate text fragments to identify repeated text or quotations.

## Screen recording
https://github.com/danielsgriffin/fragmentFocus/assets/6070690/54b2f3eb-1284-480b-a2da-87301b135bb8

```
00:00:00,000 --> 00:00:06,000
Here is fragmentFocus, a userscript enhancing text fragment navigation on You.com's Research Mode.

2
00:00:07,000 --> 00:00:16,000
This sidebar, collapsible via a button, organizes and emphasizes text fragments from citations for clearer analysis.

3
00:00:16,000 --> 00:00:21,000
Text fragments, a feature supported by Chrome, allow URLs to highlight specific text portions.

4
00:00:21,000 --> 00:00:23,000
visible on the linked page, when navigating to it.

5
00:00:25,000 --> 00:00:30,000
fragmentFocus enriches this by making fragments more accessible and interactive on You.com.

6
00:00:31,000 --> 00:00:36,000
Upon loading, the sidebar presents cited sources and their corresponding text fragments.

7
00:00:36,000 --> 00:00:43,000
Hovering over a sidebar entry scrolls to and highlights the corresponding citation in the generated response

8
00:00:43,000 --> 00:00:47,000
and vice versa.

9
00:00:47,000 --> 00:00:54,000
For more details visit the GitHub page
```

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
