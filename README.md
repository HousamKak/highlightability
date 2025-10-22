# Highlightability

A powerful VS Code extension to highlight code snippets with optional comments and advanced management features.

## Features

- **Highlight any selected text** with customizable colors (Yellow, Green, Pink, Cyan, Orange)
- **Keyboard shortcuts** for lightning-fast highlighting
- **Quick highlight mode** - instantly highlight with default color (no prompts!)
- **Add optional comments** to highlights (visible on hover)
- **Right-click context menu** integration for quick access
- **Persistent highlights** across sessions with workspace state
- **Dynamic range adjustment** - highlights adjust automatically when code is edited
- **Tree View sidebar** for managing all highlights in one place
- **Edit comments** on existing highlights without recreating them
- **Export/Import** highlights to share with your team or backup
- **Navigate quickly** to any highlight from the sidebar or command palette
- **Comprehensive logging** for debugging issues

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+H` (Mac: `Cmd+Shift+H`) | **Toggle Highlight** - Add or remove highlight on selected text |
| `Ctrl+Shift+C` (Mac: `Cmd+Shift+C`) | **Edit Comment** - Edit comment for highlight at cursor |

## Usage

### Toggle Highlight (Fast & Simple!)

The **Toggle** functionality is the main way to work with highlights:

**Using Keyboard:**
1. Select text
2. Press `Ctrl+Shift+H` (or `Cmd+Shift+H` on Mac)
3. Done!
   - If text is **not highlighted**, it will be highlighted with the default color
   - If text is **already highlighted**, the highlight will be removed

**Using Context Menu:**
1. Select text
2. Right-click and select **"Toggle Highlight"**
3. Toggles highlight on/off

### Add Highlight with Specific Color

Want to use a specific color instead of the default? Use the **Highlight Color** submenu:

**Using Context Menu:**
1. Select the text you want to highlight
2. Right-click → hover over **"Highlight Color"** →
3. Choose your color from the submenu:
   - Yellow
   - Green
   - Pink
   - Cyan
   - Orange
4. The text will be highlighted with your chosen color

**Note**: Each selection can only have ONE highlight at a time. No layering!

### Edit a Highlight Comment

1. Place your cursor on a highlighted area
2. Right-click and select **"Edit Highlight Comment"**
3. Update the comment in the input box

Or use the Tree View sidebar:
1. Click the edit icon (pencil) next to any highlight
2. Update the comment

### Remove a Highlight

1. Place your cursor on a highlighted area
2. Right-click and select **"Remove Highlight"**

Or use the Tree View sidebar:
1. Click the delete icon (trash) next to any highlight

### View All Highlights (Tree View)

1. Click the bookmark icon in the Activity Bar (left sidebar)
2. See all highlights organized by file
3. Click any highlight to jump to it
4. Expand/collapse files to see highlights within

### View All Highlights (Quick Pick)

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "List All Highlights"
3. Select a highlight from the list to jump to it

### Export/Import Highlights

**Export:**
1. Click the export icon in the Tree View title bar
2. Choose a location to save the JSON file
3. Share the file with your team

**Import:**
1. Click the import icon in the Tree View title bar
2. Select the JSON file to import
3. Choose to merge with existing or replace all highlights

### Clear Highlights

1. Open the Command Palette or click the clear icon in Tree View
2. Type "Clear All Highlights"
3. Choose to clear highlights from the current file or all files

## Commands

- `codeHighlighter.toggleHighlight` - Toggle highlight on/off for selected text (default color)
- `codeHighlighter.addHighlightYellow` - Add yellow highlight
- `codeHighlighter.addHighlightGreen` - Add green highlight
- `codeHighlighter.addHighlightPink` - Add pink highlight
- `codeHighlighter.addHighlightCyan` - Add cyan highlight
- `codeHighlighter.addHighlightOrange` - Add orange highlight
- `codeHighlighter.editHighlightComment` - Edit an existing highlight's comment
- `codeHighlighter.listHighlights` - List all highlights in Quick Pick
- `codeHighlighter.clearAllHighlights` - Clear highlights from current file or all files
- `codeHighlighter.exportHighlights` - Export all highlights to JSON file
- `codeHighlighter.importHighlights` - Import highlights from JSON file
- `codeHighlighter.refreshHighlights` - Refresh the Tree View
- `codeHighlighter.jumpToHighlight` - Jump to a specific highlight
- `codeHighlighter.showLogs` - Show extension logs for debugging

## Troubleshooting

If highlights aren't showing up or you're experiencing issues:

1. **View Logs**: Open Command Palette (`Ctrl+Shift+P`) and run **"Show Highlighter Logs"**
2. Check the output panel for detailed logging information
3. Look for error messages or warnings
4. The logs show:
   - When highlights are added/removed
   - File paths and line numbers
   - Decoration application status
   - Any errors that occur

Common issues:
- **Highlights not visible**: Check if the correct file is open and decorations are being applied (check logs)
- **Highlights disappeared after editing**: The extension automatically adjusts ranges, but check logs if issues persist
- **Extension not loading**: Check the logs for activation errors

## Configuration

You can customize the default highlight color and available colors in your settings:

```json
{
  "codeHighlighter.defaultColor": "#FFFF0066",
  "codeHighlighter.colors": [
    "#FFFF0066",
    "#00FF0066",
    "#FF00FF66",
    "#00FFFF66",
    "#FFA50066"
  ]
}
```

## Development

To run the extension in development mode:

1. Install dependencies: `npm install`
2. Compile: `npm run compile`
3. Press `F5` to open a new VS Code window with the extension loaded

## License

MIT
