# Publishing Guide

This extension is automatically published to the VS Code Marketplace using GitHub Actions when you create a new release.

## One-Time Setup

### 1. Create a Personal Access Token (PAT) for VS Code Marketplace

1. Go to https://dev.azure.com/housamkak (replace with your Azure DevOps organization)
   - If you don't have one, create it at https://aex.dev.azure.com/signup/
2. Click on your profile icon (top right) → **Personal access tokens**
3. Click **+ New Token**
4. Fill in:
   - **Name**: `VS Code Marketplace - Highlightability`
   - **Organization**: Select your organization
   - **Expiration**: Custom defined (set to 1 year or max allowed)
   - **Scopes**: Click **Show all scopes** → Find and check **Marketplace** → Check **Manage**
5. Click **Create**
6. **IMPORTANT**: Copy the token immediately (you won't see it again!)

### 2. Add the PAT to GitHub Secrets

1. Go to your GitHub repository: https://github.com/housamkak/highlightability
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Fill in:
   - **Name**: `VSCE_PAT`
   - **Secret**: Paste the token you copied from step 1
5. Click **Add secret**

### 3. Install dependencies

Run this once to install the new `@vscode/vsce` package:

```bash
npm install
```

## Publishing a New Version

### Quick Steps (After Setup)

1. **Commit all changes** (npm version requires clean git):
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Bump the version** (this updates package.json and creates a git tag):
   ```bash
   npm run version:patch  # 0.0.1 → 0.0.2 (bug fixes)
   # OR
   npm run version:minor  # 0.0.1 → 0.1.0 (new features)
   # OR
   npm run version:major  # 0.0.1 → 1.0.0 (breaking changes)
   ```

3. **Push to GitHub**:
   ```bash
   git push && git push --tags
   ```

4. **Create a GitHub Release**:
   - Visit: https://github.com/housamkak/highlightability/releases/new
   - **Choose a tag**: Select the tag you just pushed (e.g., `v0.0.2`)
   - **Release title**: Enter the version (e.g., `v0.0.2`)
   - **Description**: Add release notes:
     ```
     ## What's Changed
     - Fixed bug with X
     - Added feature Y
     - Updated documentation
     ```
   - Click **Publish release**

5. **Done!** GitHub Actions will automatically:
   - Run tests and linting
   - Build the extension
   - Publish to VS Code Marketplace
   - Check progress at: https://github.com/housamkak/highlightability/actions

### Method 2: Manual version bump

1. **Manually update version** in [package.json](package.json)
2. **Commit and tag**:
   ```bash
   git add package.json
   git commit -m "chore: bump version to 0.0.2"
   git tag v0.0.2
   git push && git push --tags
   ```
3. Create a GitHub Release (see step 3 above)

## Monitoring

- Check the workflow progress at: https://github.com/housamkak/highlightability/actions
- If the workflow fails, check the logs for errors
- Common issues:
  - Invalid or expired `VSCE_PAT` token
  - Version number already published (must bump version)
  - Build/lint errors

## Manual Publishing (Emergency)

If GitHub Actions is down, you can publish manually:

```bash
npm install
npm run compile
npm run lint
npm run publish
```

You'll be prompted for your PAT token.
