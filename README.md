<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/housamkak/highlightability/raw/HEAD/assets/logo/png/logo-dark/logo-dark-256x256.png">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/housamkak/highlightability/raw/HEAD/assets/logo/png/logo-light/logo-light-256x256.png">
    <img alt="Highlightability Logo" src="https://github.com/housamkak/highlightability/raw/HEAD/assets/logo/png/logo-light/logo-light-256x256.png" width="400">
  </picture>
</p>

<h1 align="center">Highlightability</h1>

<p align="center">
  A powerful VS Code extension to highlight code snippets with optional comments and advanced management features.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/VS%20Code-Extension-blue?logo=visual-studio-code" alt="VS Code Extension">
  <img src="https://img.shields.io/badge/version-0.0.2-green" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-orange" alt="License">
</p>

---

## 📹 Demo Videos

### Quick Highlight Toggle
> *Video: See how to instantly highlight and unhighlight code with a single keyboard shortcut*

https://github.com/user-attachments/assets/your-video-id-here

**What you'll see:**
- Press `Ctrl+Shift+Z` to toggle highlights on selected text
- Instant highlighting with default color - no dialogs!
- Remove highlights just as quickly with the same shortcut

---

### Multiple Color Options
> *Video: Choose from 5 different colors to organize your highlights*

https://github.com/user-attachments/assets/your-video-id-here

**What you'll see:**
- Right-click context menu with color picker
- Yellow, Green, Pink, Cyan, and Orange highlights
- Perfect for categorizing different types of code

---

### Add Comments to Highlights
> *Video: Attach notes and reminders to your highlighted code*

https://github.com/user-attachments/assets/your-video-id-here

**What you'll see:**
- Add comments when creating highlights
- Edit comments on existing highlights
- Hover over highlights to see comments instantly

---

### Sidebar Management
> *Video: Manage all your highlights from the dedicated Tree View sidebar*

https://github.com/user-attachments/assets/your-video-id-here

**What you'll see:**
- View all highlights organized by file
- Click to jump to any highlight
- Edit or delete highlights directly from the sidebar
- Refresh, export, and import buttons for easy management

---

### Export & Import Highlights
> *Video: Share your highlights with your team or back them up*

https://github.com/user-attachments/assets/your-video-id-here

**What you'll see:**
- Export highlights to JSON file
- Import highlights from teammates
- Merge or replace existing highlights
- Perfect for team collaboration and code reviews

---

### Dynamic Range Adjustment
> *Video: Highlights automatically adjust when you edit code*

https://github.com/user-attachments/assets/your-video-id-here

**What you'll see:**
- Add or remove lines above highlights
- Highlights stay synchronized with your code
- Edit inside highlighted sections
- Persistent across file saves and VS Code restarts

---

## ✨ Features

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

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+Z` (Mac: `Cmd+Shift+Z`) | **Toggle Highlight** - Add or remove highlight on selected text |
| `Ctrl+Shift+C` (Mac: `Cmd+Shift+C`) | **Edit Comment** - Edit comment for highlight at cursor |

## 📖 Usage

### Toggle Highlight (Fast & Simple!)

The **Toggle** functionality is the main way to work with highlights:

**Using Keyboard:**
1. Select text
2. Press `Ctrl+Shift+Z` (or `Cmd+Shift+Z` on Mac)
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

## 🎯 Commands

All available commands (accessible via Command Palette):

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

## 🔧 Troubleshooting

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

## ⚙️ Configuration

You can customize the default highlight color and available colors in your VS Code settings:

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

## 🛠️ Development

To run the extension in development mode:

1. Clone the repository
2. Install dependencies: `npm install`
3. Compile: `npm run compile`
4. Press `F5` to open a new VS Code window with the extension loaded

### Build Commands

```bash
npm install          # Install dependencies
npm run compile      # Compile TypeScript
npm run watch        # Watch mode for development
npm run lint         # Run ESLint
npm run package      # Create .vsix package
```

---

## 📄 License

**Copyright © 2025 Housam Kak. All Rights Reserved.**

This software and associated documentation files (the "Software") are proprietary and confidential. Unauthorized copying, distribution, modification, or use of this Software, via any medium, is strictly prohibited without express written permission from the copyright holder.

For licensing inquiries, please contact: housam.kak20@gmail.com

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/housamkak/highlightability/issues).

---

## 💬 Feedback

Love Highlightability? Consider:
- ⭐ Starring the repo on GitHub
- 📝 Leaving a review on the VS Code Marketplace
- 🐦 Sharing with your fellow developers

---

<p align="center">Made with ❤️ for developers who love organized code</p>
