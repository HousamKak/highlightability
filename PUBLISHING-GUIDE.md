# Publishing Guide for Highlightability Extension

## Prerequisites Checklist

Before publishing to the VS Code Marketplace, complete these steps:

### 1. Create Azure DevOps Account
- [ ] Go to https://dev.azure.com
- [ ] Sign in or create a Microsoft account
- [ ] Create an organization (if you don't have one)

### 2. Generate Personal Access Token (PAT)
- [ ] In Azure DevOps, click your profile picture (top right)
- [ ] Select **"Personal access tokens"**
- [ ] Click **"+ New Token"**
- [ ] Configure the token:
  - **Name**: VS Code Extension Publishing
  - **Organization**: All accessible organizations
  - **Expiration**: 90 days (or custom)
  - **Scopes**: Custom defined → **Marketplace** → Check **Acquire** & **Manage**
- [ ] Click **"Create"**
- [ ] **IMPORTANT**: Copy the token immediately (you won't see it again!)
- [ ] Save it securely (e.g., password manager)

### 3. Create a Publisher
A publisher is your identity on the VS Code Marketplace.

```cmd
vsce create-publisher <your-publisher-name>
```

You'll be prompted for:
- Publisher name (lowercase, no spaces, e.g., "john-doe-extensions")
- Display name (friendly name shown in marketplace)
- Email
- Personal Access Token (from step 2)

**Or** create it via web:
- Go to https://marketplace.visualstudio.com/manage
- Sign in with your Azure DevOps account
- Create a new publisher

### 4. Login with vsce
```cmd
vsce login <your-publisher-name>
```
Enter your Personal Access Token when prompted.

### 5. Update package.json
- [ ] Replace `"publisher": "your-publisher-name"` with your actual publisher name
- [ ] Update repository URL if you have a GitHub repo
- [ ] Add an icon (optional but recommended):
  ```json
  "icon": "images/icon.png"
  ```
  - Icon should be 128x128 pixels minimum
  - PNG format recommended

### 6. Add a LICENSE File
- [ ] Create a LICENSE file (we suggest MIT license)
- [ ] This is required for marketplace publishing

### 7. Create a CHANGELOG.md (Optional but Recommended)
- [ ] Document version history
- [ ] List features, fixes, and changes

### 8. Test Your Extension
- [ ] Install the .vsix locally and test all features
- [ ] Fix any bugs or issues
- [ ] Test on Windows, Mac, and Linux if possible

## Publishing Commands

### Publish to Marketplace
```cmd
vsce publish
```

This will:
1. Increment the patch version (0.0.1 → 0.0.2)
2. Package the extension
3. Publish to the marketplace

### Publish with Version Bump
```cmd
vsce publish minor  # 0.0.1 → 0.1.0
vsce publish major  # 0.0.1 → 1.0.0
vsce publish 1.0.0  # Specific version
```

### Unpublish (Use with Caution!)
```cmd
vsce unpublish <publisher>.<extension-name>
```

## After Publishing

- Your extension will appear at: `https://marketplace.visualstudio.com/items?itemName=<publisher>.highlightability`
- It may take a few minutes to appear in VS Code's extension search
- Monitor the "Q & A" section for user questions
- Check reviews and ratings

## Updating Your Extension

1. Make your code changes
2. Update the version in package.json (or let vsce do it)
3. Update CHANGELOG.md with changes
4. Run: `vsce publish`

## Tips

- **Versioning**: Follow semantic versioning (major.minor.patch)
- **Description**: Keep it clear and concise (shows in search results)
- **README**: Make it comprehensive (shows on marketplace page)
- **Tags**: Add relevant keywords to categories in package.json
- **Screenshots**: Consider adding GIFs/images to README
- **Changelog**: Keep users informed of changes

## Troubleshooting

### "Publisher not found"
- Make sure you've created a publisher with `vsce create-publisher`
- Verify the publisher name in package.json matches exactly

### "PAT is invalid"
- Create a new token with correct scopes (Marketplace: Acquire + Manage)
- Login again with `vsce login <publisher-name>`

### "LICENSE file is required"
- Add a LICENSE file to the root of your project

## Useful Links

- [Publishing Extensions Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Azure DevOps](https://dev.azure.com)
- [Marketplace Management Portal](https://marketplace.visualstudio.com/manage)
- [Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)
