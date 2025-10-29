# 🚀 CI/CD & Publishing Pipeline

**Version:** 1.0
**Last Updated:** January 2025
**Status:** Active

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [CI/CD Pipeline Architecture](#cicd-pipeline-architecture)
3. [Continuous Integration (CI)](#continuous-integration-ci)
4. [Continuous Deployment (CD)](#continuous-deployment-cd)
5. [Publishing Setup](#publishing-setup)
6. [Release Process](#release-process)
7. [Environment Management](#environment-management)
8. [Monitoring & Rollback](#monitoring--rollback)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This document describes the complete CI/CD and publishing pipeline for Highlightability, covering automated testing, building, and deployment to the VS Code Marketplace.

### Pipeline Goals:
- ✅ Automated testing on every commit
- ✅ Consistent builds across platforms
- ✅ Safe, repeatable releases
- ✅ Quick rollback capability
- ✅ Quality gates before production
- ✅ Zero-downtime deployments

### Pipeline Stages

```
[Code Push] → [CI: Build & Test] → [Quality Gates] → [CD: Release] → [Publish to Marketplace]
     ↓              ↓                      ↓               ↓                    ↓
  Trigger       Validate              Approve          Deploy             Verify
```

---

## 🏗️ CI/CD Pipeline Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Developer Machine                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Code Write │→ │ Local Test │→ │ Git Commit │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│                        GitHub Repository                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ PR Created │  │ Push to    │  │ Tag Created│            │
│  │            │  │ main/dev   │  │            │            │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘            │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ↓                ↓                ↓
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions (CI)                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Lint       │→ │ Build      │→ │ Test       │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│         │                                  │                 │
│         ↓                                  ↓                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Type Check │  │ Security   │  │ Coverage   │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                     ┌────────────────┴────────────────┐
                     ↓ (on release)                    ↓ (on PR)
┌───────────────────────────────┐    ┌──────────────────────────┐
│   GitHub Actions (CD)         │    │   Quality Report         │
│  ┌────────────┐               │    │  - Test Results          │
│  │ Package    │→ Publish      │    │  - Coverage              │
│  │ Extension  │  to Market    │    │  - Lint Results          │
│  └────────────┘               │    │  - Security Scan         │
└───────────────────────────────┘    └──────────────────────────┘
```

---

## 🔄 Continuous Integration (CI)

### GitHub Actions Workflow: CI

**File:** `.github/workflows/ci.yml`

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  workflow_dispatch:

jobs:
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: TypeScript type check
        run: npx tsc --noEmit

      - name: Check formatting
        run: npx prettier --check "src/**/*.ts"

  build:
    name: Build Extension
    needs: lint
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    runs-on: ${{ matrix.os }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Compile TypeScript
        run: npm run compile

      - name: Package extension
        run: npx vsce package

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: vsix-${{ matrix.os }}
          path: '*.vsix'

  test:
    name: Test Suite
    needs: build
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        vscode-version: [stable, insiders]
    runs-on: ${{ matrix.os }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration
        env:
          VSCODE_VERSION: ${{ matrix.vscode-version }}

      - name: Generate coverage report
        if: matrix.os == 'ubuntu-latest' && matrix.vscode-version == 'stable'
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        if: matrix.os == 'ubuntu-latest' && matrix.vscode-version == 'stable'
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-${{ matrix.os }}

  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=moderate

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  quality-gate:
    name: Quality Gate
    needs: [lint, build, test, security]
    runs-on: ubuntu-latest
    steps:
      - name: All checks passed
        run: echo "✅ All quality checks passed!"
```

### CI Triggers

| Trigger | When | Purpose |
|---------|------|---------|
| **Push to main** | Code merged to main | Full CI pipeline |
| **Push to develop** | Code pushed to develop | Full CI pipeline |
| **Pull Request** | PR opened or updated | Validate before merge |
| **Manual (workflow_dispatch)** | On-demand | Debug or test CI |

### Quality Gates

All checks must pass before code can be merged:

| Check | Tool | Pass Criteria |
|-------|------|--------------|
| **Linting** | ESLint | 0 errors |
| **Type Safety** | TypeScript | No type errors |
| **Build** | tsc | Successful compilation |
| **Unit Tests** | Mocha | 100% passing |
| **Integration Tests** | VS Code Test | 100% passing |
| **Coverage** | NYC | ≥80% coverage |
| **Security** | npm audit | No high/critical vulnerabilities |

---

## 🚢 Continuous Deployment (CD)

### GitHub Actions Workflow: CD (Publish)

**File:** `.github/workflows/publish.yml`

```yaml
name: Publish to Marketplace

on:
  release:
    types: [published]
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to publish (e.g., 0.1.2)'
        required: true

jobs:
  publish:
    name: Publish Extension
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Compile TypeScript
        run: npm run compile

      - name: Package extension
        run: npx vsce package

      - name: Publish to VS Code Marketplace
        run: npx vsce publish -p ${{ secrets.VSCE_PAT }}

      - name: Upload VSIX to release
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ github.event.release.upload_url }}
          asset_path: ./highlightability-${{ github.event.release.tag_name }}.vsix
          asset_name: highlightability-${{ github.event.release.tag_name }}.vsix
          asset_content_type: application/octet-stream

      - name: Notify on success
        if: success()
        run: echo "✅ Successfully published to marketplace!"

      - name: Notify on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🚨 Publishing failed',
              body: 'Automated publishing failed. Check the workflow logs.'
            });
```

### CD Triggers

| Trigger | When | Action |
|---------|------|--------|
| **GitHub Release** | Release published | Auto-publish to marketplace |
| **Manual Trigger** | workflow_dispatch | Manual publish (emergency) |

---

## ⚙️ Publishing Setup

### One-Time Setup

#### 1. Create VS Code Marketplace Publisher Account

1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft account
3. Create a publisher:
   - **Publisher ID**: `housamkak`
   - **Display Name**: `Housam Kak`
   - **Email**: housam.kak20@gmail.com

#### 2. Create Personal Access Token (PAT)

1. Go to https://dev.azure.com/housamkak (or create at https://aex.dev.azure.com/signup/)
2. Click profile icon → **Personal access tokens**
3. Click **+ New Token**
4. Configure:
   - **Name**: `VS Code Marketplace - Highlightability`
   - **Organization**: Your organization
   - **Expiration**: 1 year
   - **Scopes**: Marketplace → **Manage**
5. Click **Create**
6. **IMPORTANT:** Copy token immediately!

#### 3. Add PAT to GitHub Secrets

1. Go to https://github.com/housamkak/highlightability/settings/secrets/actions
2. Click **New repository secret**
3. Add:
   - **Name**: `VSCE_PAT`
   - **Secret**: Paste your PAT
4. Click **Add secret**

#### 4. Install Publishing Tools

```bash
npm install --save-dev @vscode/vsce
```

---

## 📦 Release Process

### Standard Release Flow

#### Step 1: Prepare Release

```bash
# Ensure you're on main branch
git checkout main
git pull origin main

# Ensure clean working directory
git status

# Run tests locally
npm test
```

#### Step 2: Update Documentation

1. Update [CHANGELOG.md](CHANGELOG.md) with changes
2. Update version in [README.md](README.md) if needed
3. Review [FEATURES.md](FEATURES.md) for completed features

#### Step 3: Bump Version

```bash
# For bug fixes (0.1.2 → 0.1.3)
npm run version:patch

# For new features (0.1.2 → 0.2.0)
npm run version:minor

# For breaking changes (0.1.2 → 1.0.0)
npm run version:major
```

This will:
- Update `package.json` version
- Create a git commit
- Create a git tag

#### Step 4: Push Changes

```bash
# Push commits and tags
git push && git push --tags
```

#### Step 5: Create GitHub Release

1. Go to https://github.com/housamkak/highlightability/releases/new
2. Select the tag you just pushed (e.g., `v0.1.3`)
3. Title: `v0.1.3`
4. Description (from CHANGELOG):
   ```markdown
   ## 🎉 What's New
   - Added feature X
   - Improved feature Y

   ## 🐛 Bug Fixes
   - Fixed issue with Z

   ## 📚 Documentation
   - Updated setup guide

   **Full Changelog**: https://github.com/housamkak/highlightability/compare/v0.1.2...v0.1.3
   ```
5. Click **Publish release**

#### Step 6: Monitor Deployment

1. Check GitHub Actions: https://github.com/housamkak/highlightability/actions
2. Wait for "Publish to Marketplace" workflow to complete
3. Verify on marketplace: https://marketplace.visualstudio.com/items?itemName=housamkak.highlightability

#### Step 7: Verify Installation

```bash
# Install from marketplace
code --install-extension housamkak.highlightability

# Verify version
code --list-extensions --show-versions | grep highlightability
```

### Release Checklist

Before creating a release:

- [ ] All tests passing locally
- [ ] CI pipeline green
- [ ] CHANGELOG.md updated
- [ ] Version bumped appropriately
- [ ] Documentation updated
- [ ] No known critical bugs
- [ ] Security scan clean
- [ ] Breaking changes documented
- [ ] Migration guide (if needed)

---

## 🌍 Environment Management

### Environments

| Environment | Purpose | Branch | Deployment |
|-------------|---------|--------|------------|
| **Development** | Active development | `develop` | Manual |
| **Staging** | Pre-release testing | `main` | Auto on merge |
| **Production** | Live marketplace | `main` (tags) | Auto on release |

### Environment Configuration

**GitHub Environments:**
1. Go to Repository → Settings → Environments
2. Create `production` environment
3. Add protection rules:
   - ✅ Required reviewers (yourself)
   - ✅ Wait timer (5 minutes)
   - ✅ Deployment branches (only tags)

---

## 📊 Monitoring & Rollback

### Monitoring Release Health

#### 1. Marketplace Analytics

Check at: https://marketplace.visualstudio.com/manage/publishers/housamkak

Monitor:
- Install count
- Ratings and reviews
- Download trends
- Active users

#### 2. Error Reporting

If you implement telemetry (opt-in):
- Extension activation failures
- Command execution errors
- Crash reports

#### 3. User Feedback

Monitor:
- GitHub Issues
- Marketplace reviews
- Email reports

### Rollback Procedure

If a release has critical issues:

#### Method 1: Unpublish Latest Version (Emergency)

```bash
# Unpublish current version
npx vsce unpublish housamkak.highlightability@0.1.3

# Publish previous stable version
npx vsce publish -p YOUR_PAT
```

#### Method 2: Hotfix Release

```bash
# Create hotfix branch from previous tag
git checkout -b hotfix/0.1.4 v0.1.2

# Apply fix
# ... make changes ...

# Commit and version
git add .
git commit -m "fix: critical bug"
npm version patch

# Push and release
git push origin hotfix/0.1.4
git push --tags

# Create GitHub release (triggers CD)
```

#### Method 3: Revert and Re-release

```bash
# Revert the problematic commit
git revert <commit-hash>

# Bump patch version
npm version patch

# Push and release
git push && git push --tags
```

### Rollback Checklist

- [ ] Identify the issue
- [ ] Determine severity (critical/high/medium)
- [ ] Notify users (GitHub issue pinned)
- [ ] Execute rollback
- [ ] Verify marketplace shows previous version
- [ ] Test rolled-back version
- [ ] Post-mortem analysis
- [ ] Fix and prepare new release

---

## 🐛 Troubleshooting

### Common Publishing Issues

#### Issue 1: "A newer version already exists"

**Error:**
```
Error: A newer version already exists
```

**Solution:**
```bash
# Bump version higher
npm version patch

# Or manually edit package.json and bump version
```

#### Issue 2: "Invalid Personal Access Token"

**Error:**
```
Error: Failed request: Unauthorized(401)
```

**Solutions:**
1. Token expired → Create new PAT
2. Wrong scopes → Ensure "Marketplace: Manage" scope
3. Update GitHub secret with new token

#### Issue 3: "vsce: command not found"

**Error:**
```
bash: vsce: command not found
```

**Solution:**
```bash
npm install -g @vscode/vsce
# Or use npx:
npx vsce package
```

#### Issue 4: Build Fails in CI

**Solution:**
1. Check GitHub Actions logs
2. Run locally: `npm run compile`
3. Ensure all files committed
4. Check TypeScript errors

#### Issue 5: Tests Pass Locally but Fail in CI

**Possible Causes:**
- Platform-specific issues
- Missing environment variables
- Timing issues (increase timeouts)
- VS Code version mismatch

**Solution:**
```yaml
# In GitHub Actions, add debug output
- name: Debug environment
  run: |
    node --version
    npm --version
    code --version
```

---

## 📋 Manual Publishing (Emergency)

If GitHub Actions is down or unavailable:

### Manual Publish Steps

```bash
# 1. Ensure clean working directory
git status

# 2. Install dependencies
npm install

# 3. Run tests
npm test

# 4. Compile TypeScript
npm run compile

# 5. Run lint
npm run lint

# 6. Package extension
npx vsce package

# 7. Publish to marketplace
npx vsce publish -p YOUR_PERSONAL_ACCESS_TOKEN

# 8. Verify
# Check marketplace and test installation
```

### Manual Publish Checklist

- [ ] All tests pass
- [ ] No lint errors
- [ ] Compilation successful
- [ ] Version bumped in package.json
- [ ] CHANGELOG updated
- [ ] Git tag created
- [ ] Backup of .vsix file created

---

## 📚 Additional Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "lint": "eslint src --ext ts",
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "mocha --config test/mocha.opts src/test/unit/**/*.test.ts",
    "test:integration": "node out/test/runTest.js",
    "test:coverage": "nyc npm run test:unit",
    "package": "vsce package",
    "publish": "vsce publish",
    "version:patch": "npm version patch",
    "version:minor": "npm version minor",
    "version:major": "npm version major",
    "prepublishOnly": "npm run lint && npm run test"
  }
}
```

---

## 🔐 Security Considerations

### Secrets Management

- **Never commit PAT tokens**
- Use GitHub Secrets for CI/CD
- Rotate tokens annually
- Use minimal scopes

### Dependency Management

```bash
# Check for vulnerabilities
npm audit

# Auto-fix vulnerabilities
npm audit fix

# Update dependencies
npm update
```

### Supply Chain Security

Enable **Dependabot** for automated security updates:

**File:** `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

## 📞 Support & Resources

### Internal Documentation
- [TESTING-PIPELINE.md](TESTING-PIPELINE.md) - Testing strategy
- [USER-FEEDBACK-PIPELINE.md](USER-FEEDBACK-PIPELINE.md) - User feedback
- [SECURITY.md](SECURITY.md) - Security policy

### External Resources
- [VS Code Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [VSCE CLI Reference](https://github.com/microsoft/vscode-vsce)

### Contact
- **Email:** housam.kak20@gmail.com
- **GitHub:** https://github.com/housamkak/highlightability

---

**Last Updated:** January 2025
**Next Review:** April 2025

*Automate everything. Trust nothing. Verify everything.*
