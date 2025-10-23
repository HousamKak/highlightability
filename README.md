<h1 align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo/png/logo-dark/logo-dark-256x256.png">
    <source media="(prefers-color-scheme: light)" srcset="assets/logo/png/logo-light/logo-light-256x256.png">
    <img alt="Highlightability Logo" src="assets/logo/png/logo-light/logo-light-256x256.png" width="64" style="vertical-align: middle;">
  </picture>
  Highlightability
</h1>

<p align="center">
  <strong>Transform how you navigate and understand code</strong><br/>
  Lightning-fast code highlighting with comments, team collaboration, and intelligent persistence
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=housamkak.highlightability">
    <img src="https://img.shields.io/badge/VS%20Code-Extension-0078d7?style=for-the-badge&logo=visual-studio-code" alt="VS Code Extension">
  </a>
  <img src="https://img.shields.io/badge/version-0.1.1-4caf50?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/license-Proprietary-ff9800?style=for-the-badge" alt="License">
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-demo-videos">Demos</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-keyboard-shortcuts">Shortcuts</a>
</p>

---

## Why Highlightability?

Stop losing track of important code sections. Whether you're:
- **Code reviewing** - Mark sections for feedback and discussion
- **Debugging** - Track problem areas across multiple files
- **Learning** - Annotate unfamiliar code with notes
- **Refactoring** - Identify sections that need attention
- **Collaborating** - Share annotated code with your team

Highlightability keeps your focus where it matters most.

## 🚀 Quick Start

**Get highlighting in 3 seconds:**

1. Install the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=housamkak.highlightability)
2. Select any code
3. Press `Ctrl+Shift+Z` (Mac: `Cmd+Shift+Z`)

That's it! Your code is highlighted. Press the same shortcut to remove it.

---

## ✨ Features

### 🎯 Core Highlighting
- **One-click toggle** - `Ctrl+Shift+Z` to highlight/unhighlight instantly
- **5 color options** - Yellow, Green, Pink, Cyan, Orange for categorization
- **Zero friction** - No dialogs, no prompts, just highlight

### 📝 Smart Annotations
- **Attach comments** to any highlight (hover to view)
- **Edit anytime** - Update comments without recreating highlights
- **Persistent notes** - Your annotations survive edits and restarts

### 🔄 Intelligent Sync
- **Auto-adjusting ranges** - Highlights track code as you edit
- **Workspace persistence** - Highlights survive VS Code restarts
- **Multi-file support** - Manage highlights across your entire project

### 🤝 Team Collaboration
- **Export/Import** - Share highlighted code reviews via JSON
- **Merge or replace** - Flexible import options for team workflows
- **Version control friendly** - Keep highlights in sync with your codebase

### 🎛️ Power User Tools
- **Tree View sidebar** - See all highlights at a glance, organized by file
- **Quick navigation** - Jump to any highlight from sidebar or command palette
- **Batch operations** - Clear highlights per file or across all files
- **Comprehensive logging** - Debug issues with detailed output

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+Shift+Z`<br/>(Mac: `Cmd+Shift+Z`) | **Toggle Highlight** | Add or remove highlight on selected text |
| `Ctrl+Shift+C`<br/>(Mac: `Cmd+Shift+C`) | **Edit Comment** | Edit comment for highlight at cursor |

> **Pro tip:** Use the toggle shortcut for instant highlighting with your default color. For specific colors, use the right-click context menu.

---

## 📖 Usage

### 🚀 Quick Highlight (Recommended)

The fastest way to highlight code:

1. **Select text** in your editor
2. **Press** `Ctrl+Shift+Z` (Mac: `Cmd+Shift+Z`)
3. **Done!** Text is highlighted with your default color

Press again to remove the highlight. No dialogs, no friction.

---

### 🎨 Choose a Specific Color

Need to categorize with colors?

1. **Select text**
2. **Right-click** → **Highlightability** → **Highlight Color**
3. **Choose**: Yellow, Green, Pink, Cyan, or Orange

Each selection can only have one highlight at a time.

---

### 💬 Add Comments to Highlights

Turn highlights into smart annotations:

**Add a comment:**
- Right-click highlighted text → **Edit Comment**
- Or use `Ctrl+Shift+C` (Mac: `Cmd+Shift+C`)

**View comments:**
- Hover over any highlight to see its comment

**Edit from sidebar:**
- Click the pencil icon next to any highlight in the Tree View

---

### 📂 Manage with Tree View

Access the **Highlights** sidebar (bookmark icon in Activity Bar):

- **Browse** all highlights organized by file
- **Click** any highlight to jump to its location
- **Edit** comments with the pencil icon
- **Delete** highlights with the trash icon
- **Export/Import** using the toolbar buttons

---

### 🔄 Export & Import

**Share highlights with your team:**

**Export:**
1. Click export icon in Tree View toolbar
2. Save JSON file to share

**Import:**
1. Click import icon in Tree View toolbar
2. Select JSON file
3. Choose to **merge** (add to existing) or **replace** (clear all first)

Perfect for code reviews and onboarding!

---

### 🧹 Clear Highlights

**Remove highlights quickly:**

- **Single highlight**: Right-click → **Remove Highlight**
- **All in file**: Command Palette → **Clear All Highlights** → **Current File**
- **All in workspace**: Tree View clear icon or Command Palette → **All Files**

---

## 📹 Demo Videos

### Quick Highlight Toggle
See highlighting in action - one keyboard shortcut to rule them all.

https://github.com/user-attachments/assets/your-video-id-here

### Color Options & Comments
Choose colors to categorize and add notes to stay organized.

https://github.com/user-attachments/assets/your-video-id-here

### Sidebar Management & Export
Manage all highlights from one place and share with your team.

https://github.com/user-attachments/assets/your-video-id-here

### Dynamic Range Adjustment
Highlights that intelligently track your code as you edit.

https://github.com/user-attachments/assets/your-video-id-here

---

## 🎯 All Commands

<details>
<summary>Click to expand full command list</summary>

Access these via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

**Highlighting:**
- `Toggle Highlight` - Add/remove highlight on selected text
- `Yellow` / `Green` / `Pink` / `Cyan` / `Orange` - Color-specific highlights

**Comments:**
- `Edit Comment` - Add or edit comment on highlight

**Navigation:**
- `List All Highlights` - Quick pick menu to jump to any highlight
- `Jump to Highlight` - Navigate to specific highlight

**Management:**
- `Clear All Highlights` - Remove highlights from current file or all files
- `Refresh Highlights` - Reload Tree View
- `Export Highlights` - Save to JSON
- `Import Highlights` - Load from JSON

**Debugging:**
- `Show Highlighter Logs` - View extension output logs

</details>

---

## ⚙️ Configuration

Customize colors and defaults in your VS Code settings:

```json
{
  "codeHighlighter.defaultColor": "#FFFF0066",
  "codeHighlighter.colors": [
    "#FFFF0066",  // Yellow
    "#00FF0066",  // Green
    "#FF00FF66",  // Pink
    "#00FFFF66",  // Cyan
    "#FFA50066"   // Orange
  ]
}
```

**Settings:**
- `codeHighlighter.defaultColor` - Color used by toggle shortcut (RGBA hex)
- `codeHighlighter.colors` - Available colors in the color picker menu

---

## 🔧 Troubleshooting

<details>
<summary>Click for troubleshooting guide</summary>

### View Logs
Command Palette → `Show Highlighter Logs` to see detailed debug information.

### Common Issues

**Highlights not visible:**
- Verify the correct file is open
- Check logs for decoration application status
- Try refreshing the Tree View

**Highlights disappeared after editing:**
- Extension auto-adjusts ranges - check logs if issues persist
- Try reloading the window (`Ctrl+Shift+P` → `Reload Window`)

**Extension not loading:**
- Check logs for activation errors
- Ensure VS Code version is 1.80.0 or higher

**Import not working:**
- Verify JSON file format is valid
- Check file paths in JSON match your workspace structure

### Getting Help
If issues persist, [open an issue](https://github.com/housamkak/highlightability/issues) with your logs attached.

</details>

## 🛠️ Development

<details>
<summary>Click for development setup</summary>

### Getting Started

```bash
# Clone the repository
git clone https://github.com/housamkak/highlightability.git
cd highlightability

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Open in VS Code and press F5 to launch Extension Development Host
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run compile` | Compile TypeScript to JavaScript |
| `npm run watch` | Watch mode for active development |
| `npm run lint` | Run ESLint for code quality |
| `npm run package` | Create `.vsix` package for distribution |

### Project Structure

```
highlightability/
├── src/
│   ├── extension.ts           # Main extension entry point
│   ├── highlightManager.ts    # Core highlighting logic
│   └── treeViewProvider.ts    # Sidebar Tree View
├── assets/
│   └── logo/                  # Extension logos and icons
├── out/                       # Compiled JavaScript output
└── package.json               # Extension manifest
```

### Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

</details>

---

## 📄 License

**Copyright © 2025 Housam Kak. All Rights Reserved.**

This software is proprietary and confidential. Unauthorized copying, distribution, modification, or use is strictly prohibited without express written permission.

**Licensing inquiries:** housam.kak20@gmail.com

---

## 🐛 Issues & Feature Requests

Found a bug or have a feature idea? [Open an issue on GitHub](https://github.com/housamkak/highlightability/issues)

We track:
- Bug reports
- Feature requests
- Performance issues
- Documentation improvements

---

## 💬 Support & Community

**Love Highlightability?**

- ⭐ [Star us on GitHub](https://github.com/housamkak/highlightability)
- 📝 [Leave a review on VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=housamkak.highlightability)
- 🐦 Share with your fellow developers
- 💡 Submit feature ideas and feedback

**Need Help?**
- Check the [Troubleshooting](#-troubleshooting) section
- Browse [existing issues](https://github.com/housamkak/highlightability/issues)
- Open a new issue with the `question` label

---

## 🚀 Roadmap

Upcoming features we're considering:
- [ ] Custom color palettes
- [ ] Highlight groups/categories
- [ ] Search/filter highlights
- [ ] Cloud sync for highlights
- [ ] Markdown export for documentation
- [ ] Code snippet generation from highlights

Have an idea? [Let us know!](https://github.com/housamkak/highlightability/issues/new)

---

<p align="center">
  <strong>Made with ❤️ for developers who love organized code</strong><br/>
  <sub>Built by <a href="https://github.com/housamkak">Housam Kak</a></sub>
</p>

<p align="center">
  <a href="#highlightability">⬆ Back to top</a>
</p>
