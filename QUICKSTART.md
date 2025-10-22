# Quick Start Guide

## ✅ What's Done

Your Code Highlighter extension is now ready to use and publish!

### 1. Local Package Created ✓
- File: `code-highlighter-0.0.1.vsix`
- Location: `D:\dev\Playground For Testing\highlight extension\`

### 2. Files Added ✓
- ✅ `LICENSE` - MIT License
- ✅ `CHANGELOG.md` - Version history
- ✅ `PUBLISHING-GUIDE.md` - Complete publishing instructions
- ✅ `package.json` - Updated with publisher, keywords, and metadata

## 🚀 Install Your Extension Locally (Right Now!)

1. Open VS Code
2. Press `Ctrl+Shift+X` (Extensions view)
3. Click the **`...`** menu at top
4. Select **"Install from VSIX..."**
5. Choose: `D:\dev\Playground For Testing\highlight extension\code-highlighter-0.0.1.vsix`
6. Click **Reload** when prompted
7. Test it: Select some text and press `Ctrl+Shift+H`

## 📦 Publish to VS Code Marketplace

### Before Publishing - Update These:

1. **Open `package.json` and update:**
   - Line 6: Change `"publisher": "your-publisher-name"` to your actual publisher name
   - Lines 7-12: Update the repository URLs to your GitHub/GitLab repo (if you have one)

2. **Create Azure DevOps Account & Publisher:**
   - Follow the detailed steps in `PUBLISHING-GUIDE.md`
   - Create a Personal Access Token (PAT)
   - Create your publisher identity

3. **When Ready to Publish:**
   ```cmd
   vsce login <your-publisher-name>
   vsce publish
   ```

## 📝 TODO Before Publishing

- [ ] Update `package.json` publisher field
- [ ] Update repository URLs in `package.json` (or remove if no repo)
- [ ] Create Azure DevOps account at https://dev.azure.com
- [ ] Generate Personal Access Token with Marketplace permissions
- [ ] Create publisher: `vsce create-publisher <name>`
- [ ] (Optional) Add an icon (128x128 PNG) and add to package.json
- [ ] (Optional) Add screenshots or GIFs to README.md
- [ ] Test the .vsix locally
- [ ] Login: `vsce login <publisher-name>`
- [ ] Publish: `vsce publish`

## 🎯 Commands Reference

```cmd
# Package extension (creates .vsix)
vsce package

# Login to marketplace
vsce login <your-publisher-name>

# Publish (auto-increments version)
vsce publish

# Publish with version bump
vsce publish minor  # 0.0.1 → 0.1.0
vsce publish major  # 0.0.1 → 1.0.0
vsce publish 1.0.0  # Specific version

# Create new publisher
vsce create-publisher <name>
```

## 📚 Documentation

- **PUBLISHING-GUIDE.md** - Complete step-by-step publishing instructions
- **README.md** - User documentation (shown on marketplace)
- **CHANGELOG.md** - Version history

## 🎉 Next Steps

1. **Install locally now** to start using it!
2. When ready to share publicly, follow the publishing guide
3. Share the .vsix file with colleagues if you want to distribute privately

---

Need help? Check `PUBLISHING-GUIDE.md` for detailed instructions!
