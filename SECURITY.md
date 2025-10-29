# 🔒 Security Policy

**Version:** 1.0
**Last Updated:** January 2025
**Status:** Active

---

## 📋 Table of Contents

1. [Supported Versions](#supported-versions)
2. [Reporting a Vulnerability](#reporting-a-vulnerability)
3. [Security Update Policy](#security-update-policy)
4. [Disclosure Policy](#disclosure-policy)
5. [Security Best Practices](#security-best-practices)
6. [Known Security Considerations](#known-security-considerations)
7. [Security Acknowledgments](#security-acknowledgments)

---

## 🛡️ Supported Versions

We release security updates for the following versions of Highlightability:

| Version | Supported          | Notes |
|---------|--------------------|-------|
| 0.1.x   | ✅ Yes            | Current stable release |
| 0.0.x   | ⚠️ Limited        | Critical fixes only |
| < 0.0.1 | ❌ No             | Please upgrade |

**Recommendation:** Always use the latest version from the VS Code Marketplace for the best security and features.

---

## 🚨 Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these guidelines:

### Reporting Process

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security issues privately:

#### Method 1: Email (Preferred)
**Email:** housam.kak20@gmail.com
**Subject:** `[SECURITY] Highlightability Vulnerability Report`

**Include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Affected versions
- Any suggested fixes (optional)
- Your contact information (for follow-up)

#### Method 2: GitHub Security Advisories (Coming Soon)
Once configured, you can use:
https://github.com/housamkak/highlightability/security/advisories/new

### What to Expect

| Timeline | Action |
|----------|--------|
| **Within 24 hours** | Initial acknowledgment of your report |
| **Within 72 hours** | Assessment of severity and impact |
| **Within 7 days** | Detailed response with planned fix timeline |
| **Within 30 days** | Security patch released (for high/critical issues) |

### Severity Classification

We use the following severity levels based on impact:

#### Critical (P0)
- **Impact:** Data loss, remote code execution, full extension compromise
- **Response Time:** 24 hours
- **Fix Timeline:** 1-3 days
- **Example:** Arbitrary code execution via malicious import file

#### High (P1)
- **Impact:** Unauthorized access to user data, privilege escalation
- **Response Time:** 48 hours
- **Fix Timeline:** 3-7 days
- **Example:** Exposure of sensitive workspace data

#### Medium (P2)
- **Impact:** Limited data exposure, denial of service
- **Response Time:** 3-5 days
- **Fix Timeline:** 1-2 weeks
- **Example:** XSS in webview component

#### Low (P3)
- **Impact:** Minor information disclosure, best practice violations
- **Response Time:** 5-7 days
- **Fix Timeline:** Next release cycle
- **Example:** Verbose error messages revealing system info

---

## 🔄 Security Update Policy

### Release Process

1. **Vulnerability Confirmed**
   - Security team validates the issue
   - Assign severity level
   - Create private patch branch

2. **Fix Development**
   - Develop fix in isolated environment
   - Write security-focused tests
   - Internal code review

3. **Testing**
   - Test fix against reported vulnerability
   - Regression testing
   - Cross-platform validation

4. **Release**
   - Create security advisory (if public disclosure)
   - Release patched version
   - Update CHANGELOG with security notice
   - Notify users via extension update

5. **Disclosure**
   - Wait 7 days after release for users to update
   - Publish full security advisory
   - Credit researcher (if permission granted)

### Notification Channels

Users will be notified of security updates via:
- ✅ VS Code Marketplace update mechanism
- ✅ GitHub Security Advisories
- ✅ CHANGELOG.md with `[SECURITY]` tag
- ✅ GitHub Release notes
- ⚠️ Email (for enterprise customers only)

---

## 📢 Disclosure Policy

### Coordinated Disclosure

We follow **responsible disclosure** principles:

1. **Private Reporting** - Researchers report privately
2. **Acknowledgment** - We confirm receipt within 24h
3. **Investigation** - We investigate and develop fix
4. **Fix Release** - We release patched version
5. **Public Disclosure** - We publish advisory after 7-day grace period

### Timeline

- **T+0 days:** Vulnerability reported privately
- **T+1 day:** Acknowledgment sent
- **T+7 days:** Fix developed and tested
- **T+14 days:** Security update released
- **T+21 days:** Public disclosure (if applicable)

### Embargo Period

We request a **90-day embargo** for critical vulnerabilities to allow time for:
- Fix development
- Testing and validation
- User updates
- Coordinated disclosure

---

## 🛡️ Security Best Practices

### For Users

#### 1. Keep Extension Updated
Always use the latest version from VS Code Marketplace.

```bash
# Check current version
code --list-extensions --show-versions | grep highlightability

# Update all extensions
code --update-extensions
```

#### 2. Review Permissions
Highlightability requires minimal permissions:
- ✅ Read/write workspace files (for highlights storage)
- ✅ Access to editor content (for highlighting)
- ❌ No network access (except for license validation in Pro version)
- ❌ No access to system files outside workspace

#### 3. Be Careful with Imports
When importing highlight files:
- Only import from trusted sources
- Review JSON content before importing
- Use "merge" mode instead of "replace" for safety
- Keep backups of your highlights

#### 4. Protect Your Data
- Don't share highlight exports containing sensitive information
- Review comments before exporting/sharing
- Be aware highlights are stored locally in workspace

### For Developers/Contributors

#### 1. Input Validation
Always validate and sanitize user input:
```typescript
// ✅ Good
function validateColor(color: string): boolean {
    const colorRegex = /^#[0-9A-Fa-f]{8}$/;
    return colorRegex.test(color);
}

// ❌ Bad
function applyColor(color: string) {
    // Directly using user input without validation
    decoration.backgroundColor = color;
}
```

#### 2. Secure File Operations
```typescript
// ✅ Good - Validate paths
import * as path from 'path';

function readHighlightFile(filePath: string) {
    // Ensure path is within workspace
    const workspaceRoot = vscode.workspace.rootPath;
    const resolvedPath = path.resolve(filePath);

    if (!resolvedPath.startsWith(workspaceRoot)) {
        throw new Error('Path outside workspace');
    }

    // Safe to read
}

// ❌ Bad - No validation
function readHighlightFile(filePath: string) {
    fs.readFileSync(filePath); // Potential path traversal
}
```

#### 3. Sanitize HTML/Markdown
When rendering user content in webviews:
```typescript
import * as DOMPurify from 'dompurify';

// ✅ Good
function renderComment(comment: string): string {
    const html = marked(comment);
    return DOMPurify.sanitize(html);
}

// ❌ Bad
function renderComment(comment: string): string {
    return marked(comment); // Potential XSS
}
```

#### 4. Secure Storage
```typescript
// ✅ Good - Store sensitive data securely
context.secrets.store('licenseKey', key);

// ❌ Bad - Plain text storage
context.globalState.update('licenseKey', key);
```

---

## ⚠️ Known Security Considerations

### 1. Local Storage
**Consideration:** Highlights are stored in workspace `.vscode` folder.

**Implications:**
- Highlights are visible to anyone with file system access
- Comments may contain sensitive information
- Exported JSON files contain plain text data

**Mitigation:**
- Don't put sensitive information in comments
- Be cautious when sharing exports
- Use file system permissions to protect workspace

### 2. Import Functionality
**Consideration:** Importing JSON files could potentially include malicious data.

**Mitigation:**
- JSON schema validation before import
- Sanitize file paths in imported data
- Validate color formats
- Limit import file size (max 10MB)

**Implementation:**
```typescript
function validateImportData(data: any): boolean {
    // Validate structure
    if (!data.highlights || !Array.isArray(data.highlights)) {
        return false;
    }

    // Validate each highlight
    for (const highlight of data.highlights) {
        if (!validateHighlight(highlight)) {
            return false;
        }
    }

    return true;
}
```

### 3. Command Injection
**Consideration:** User input in commands could be misused.

**Mitigation:**
- All commands validate input
- No direct shell execution
- Parameterized operations only

### 4. VS Code Extension API
**Consideration:** Extension has access to VS Code workspace APIs.

**Mitigation:**
- Minimal permissions requested
- No telemetry without opt-in
- No network access (except license validation)
- Clear purpose for each API usage

### 5. License Validation (Pro Version)
**Consideration:** License keys are validated via network request.

**Security Measures:**
- HTTPS only
- No sensitive data transmitted
- License key stored securely (SecretStorage API)
- Validation server is trusted (Gumroad/LemonSqueezy)

---

## 🎖️ Security Acknowledgments

We thank the following security researchers for responsible disclosure:

| Researcher | Vulnerability | Severity | Date | Bounty |
|------------|---------------|----------|------|--------|
| TBD | TBD | TBD | TBD | TBD |

*Want to be listed here? Report a security issue responsibly!*

### Bug Bounty Program (Future)

Currently, we don't have a formal bug bounty program, but we recognize security contributions:

- **Critical vulnerability:** Free Pro license + public acknowledgment
- **High severity:** Free Pro license
- **Medium/Low severity:** Public acknowledgment

*Enterprise bug bounty program coming soon.*

---

## 🔐 Security Checklist for Releases

Before each release, we verify:

- [ ] All dependencies updated to latest secure versions
- [ ] No known vulnerabilities in `npm audit`
- [ ] Input validation on all user-facing features
- [ ] Secure storage for sensitive data
- [ ] XSS protection in webviews
- [ ] Path traversal protection in file operations
- [ ] No hardcoded secrets or credentials
- [ ] HTTPS for all network requests
- [ ] Proper error handling (no info leakage)
- [ ] Security-focused code review completed

---

## 📚 Security Resources

### Internal Documents
- [TESTING-PIPELINE.md](TESTING-PIPELINE.md) - Testing security measures
- [CICD-PUBLISHING.md](CICD-PUBLISHING.md) - Secure release process

### External Resources
- [VS Code Extension Security Best Practices](https://code.visualstudio.com/api/references/extension-guidelines#security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

### Security Tools
- **npm audit** - Dependency vulnerability scanning
- **Snyk** - Continuous security monitoring
- **GitHub Dependabot** - Automated dependency updates
- **ESLint security plugins** - Static code analysis

---

## 📞 Contact

**Security Email:** housam.kak20@gmail.com
**Subject Line:** `[SECURITY] Highlightability`

**PGP Key:** Coming soon

**Response Time:**
- Critical: 24 hours
- High: 48 hours
- Medium: 3-5 days
- Low: 5-7 days

---

## 📜 Security Policy Changes

This security policy may be updated periodically. Major changes will be announced via:
- GitHub Release notes
- CHANGELOG.md
- Extension update notes

**Version History:**
- v1.0 (January 2025) - Initial security policy

---

**Last Updated:** January 2025
**Next Review:** July 2025

*Security is not a product, but a process. - Bruce Schneier*
