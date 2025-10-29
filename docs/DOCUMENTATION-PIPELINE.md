# 📚 Documentation Pipeline

**Version:** 1.0
**Last Updated:** January 2025
**Status:** Active

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Documentation Structure](#documentation-structure)
3. [Documentation Types](#documentation-types)
4. [Writing Standards](#writing-standards)
5. [Documentation Workflow](#documentation-workflow)
6. [Maintenance & Updates](#maintenance--updates)
7. [Internationalization (i18n)](#internationalization-i18n)
8. [Tools & Automation](#tools--automation)
9. [Visual Assets](#visual-assets)
10. [Documentation Metrics](#documentation-metrics)

---

## 🎯 Overview

This document outlines the documentation strategy for Highlightability to ensure comprehensive, maintainable, and user-friendly documentation across all user touchpoints.

### Documentation Goals:
- ✅ Enable users to succeed independently
- ✅ Reduce support burden
- ✅ Improve feature discoverability
- ✅ Maintain accuracy across versions
- ✅ Support multiple skill levels
- ✅ Facilitate contributions

### Documentation Principles:
- **User-Centric** - Written for users, not developers
- **Concise** - Clear and to the point
- **Scannable** - Easy to find information quickly
- **Visual** - Screenshots, GIFs, videos
- **Up-to-Date** - Synchronized with releases
- **Accessible** - Works with screen readers

---

## 🗂️ Documentation Structure

### Documentation Hierarchy

```
highlightability/
├── README.md                    # Main user-facing docs
├── CHANGELOG.md                 # Version history
├── LICENSE                      # Legal
├── CONTRIBUTING.md              # Contributor guide (future)
│
├── docs/                        # Extended documentation
│   ├── getting-started.md       # Quick start guide
│   ├── features/                # Feature documentation
│   │   ├── highlighting.md
│   │   ├── comments.md
│   │   ├── tree-view.md
│   │   ├── export-import.md
│   │   └── keyboard-shortcuts.md
│   ├── guides/                  # Use case guides
│   │   ├── code-review.md
│   │   ├── learning.md
│   │   ├── collaboration.md
│   │   └── technical-debt.md
│   ├── tutorials/               # Step-by-step tutorials
│   │   ├── first-highlight.md
│   │   ├── team-workflow.md
│   │   └── advanced-tips.md
│   ├── api/                     # API docs (future)
│   │   └── extension-api.md
│   └── troubleshooting.md       # Common issues
│
├── Pipeline Documentation       # Internal processes
│   ├── FEATURES.md
│   ├── MONETIZATION-GUIDE.md
│   ├── USER-FEEDBACK-PIPELINE.md
│   ├── TESTING-PIPELINE.md
│   ├── CICD-PUBLISHING.md
│   ├── ANALYTICS-PIPELINE.md
│   ├── MARKETING-PIPELINE.md
│   ├── DOCUMENTATION-PIPELINE.md (this file)
│   └── SECURITY.md
│
└── assets/                      # Visual assets
    ├── screenshots/
    ├── gifs/
    ├── videos/
    └── diagrams/
```

---

## 📖 Documentation Types

### 1. User Documentation

#### README.md (Primary Entry Point)
**Purpose:** First impression, quick understanding

**Structure:**
```markdown
# Title + Logo
## Tagline
## Why Use This?
## Quick Start (30 seconds)
## Features (with visuals)
## Demo Videos
## Usage
## Keyboard Shortcuts
## Configuration
## Troubleshooting
## Support
## License
```

**Must Include:**
- Clear value proposition (first 3 lines)
- Visual demo (GIF or video)
- Installation instructions
- Key features (3-5 highlights)
- Quick start (< 30 seconds)
- Links to detailed docs

#### Getting Started Guide
**Purpose:** Onboarding new users

**Content:**
- Installation steps
- First highlight tutorial
- Basic features overview
- Quick wins (fast value)
- Next steps

**Length:** 5-10 minutes read

#### Feature Documentation
**Purpose:** Detailed feature explanations

**Format per Feature:**
```markdown
# Feature Name

## Overview
[What it is, why it matters]

## How to Use
[Step-by-step instructions]

## Options & Settings
[Configuration details]

## Examples
[Real-world use cases]

## Tips & Tricks
[Power user insights]

## Troubleshooting
[Common issues]
```

#### Use Case Guides
**Purpose:** Workflow-based documentation

**Examples:**
- **Code Review Guide**
  - Setting up for reviews
  - Annotating during review
  - Sharing feedback
  - Post-review cleanup

- **Learning Guide**
  - Studying new codebases
  - Note-taking strategies
  - Tracking learning progress

- **Collaboration Guide**
  - Team setup
  - Export/import workflows
  - Best practices

#### Tutorials
**Purpose:** Step-by-step learning

**Format:**
- Clear objective
- Prerequisites
- Numbered steps with screenshots
- Expected outcomes
- Next steps

### 2. Technical Documentation

#### API Documentation (Future)
**Purpose:** Integration and extension

**Content:**
- Public API reference
- Extension points
- Code examples
- TypeScript definitions

#### Architecture Documentation (Internal)
**Purpose:** Developer onboarding

**Content:**
- System architecture
- Code structure
- Data models
- Design decisions

### 3. Process Documentation (Internal)

Located in root directory:
- FEATURES.md
- MONETIZATION-GUIDE.md
- Pipeline documents (7 files)
- SECURITY.md

**Purpose:** Internal operations and processes

### 4. Release Documentation

#### CHANGELOG.md
**Purpose:** Version history and changes

**Format (Keep-a-Changelog):**
```markdown
# Changelog

## [Unreleased]

## [0.1.3] - 2025-01-25

### Added
- New feature X

### Changed
- Improved feature Y

### Fixed
- Bug Z

### Deprecated
- Old feature will be removed

### Removed
- Obsolete feature

### Security
- Security fix description
```

#### Release Notes (GitHub Releases)
**Purpose:** User-friendly change summary

**Format:**
```markdown
## 🎉 What's New
- Feature highlights

## 🐛 Bug Fixes
- Issue fixes

## ⚠️ Breaking Changes
- Migration steps

## 📚 Documentation
- Doc updates

**Full Changelog**: [link]
```

### 5. Support Documentation

#### FAQ
**Purpose:** Answer common questions

**Categories:**
- Installation & Setup
- Features & Usage
- Troubleshooting
- Billing & Licensing
- Privacy & Security

#### Troubleshooting Guide
**Purpose:** Self-service problem solving

**Format:**
```markdown
## Problem: [Description]

**Symptoms:**
- Symptom 1
- Symptom 2

**Causes:**
- Possible cause 1
- Possible cause 2

**Solutions:**
1. Try this first
2. Then this
3. Last resort

**Still not working?**
[Contact support]
```

---

## ✍️ Writing Standards

### Style Guide

#### Tone & Voice
- **Friendly** - Approachable, not robotic
- **Clear** - Simple language, avoid jargon
- **Concise** - Get to the point quickly
- **Helpful** - Focus on user success
- **Positive** - "You can" not "you can't"

#### Grammar & Style
- **Present tense** - "Click the button" not "You will click"
- **Active voice** - "Highlight the code" not "The code is highlighted"
- **Second person** - "You can" not "one can"
- **Imperative** - "Open VS Code" not "You should open"
- **Contractions OK** - "Don't" not "Do not" (casual tone)

#### Formatting

**Headings:**
- Title Case for H1
- Sentence case for H2+
- Use hierarchy logically

**Lists:**
- Use bullets for unordered items
- Use numbers for sequential steps
- Keep items parallel in structure

**Code:**
- Inline code: `code here`
- Code blocks with language:
  ```typescript
  const example = 'code';
  ```

**Emphasis:**
- **Bold** for UI elements ("Click **Save**")
- *Italic* for emphasis
- `Code` for technical terms

**Links:**
- Descriptive text ([See the guide](link))
- Not "click here"

#### Terminology Consistency

| Use This | Not This |
|----------|----------|
| Highlight | Mark, selection |
| Comment | Note, annotation |
| Tree view | Sidebar, panel |
| Extension | Plugin, add-on |
| Workspace | Project, folder |
| Pro | Premium, Paid |

### Accessibility

**Alt Text for Images:**
```markdown
![Screenshot showing the highlight toggle button in the editor toolbar](screenshot.png)
```

**Descriptive Links:**
```markdown
✅ [Learn about keyboard shortcuts](shortcuts.md)
❌ [Click here](shortcuts.md)
```

**Screen Reader Friendly:**
- Use semantic HTML when rendering docs
- Proper heading hierarchy
- Descriptive link text
- Alt text for all images

---

## 🔄 Documentation Workflow

### Creation Process

#### 1. Planning
- Identify documentation need
- Define target audience
- Outline structure
- Determine format (text/video/both)

#### 2. Writing
- Draft content
- Add screenshots/GIFs
- Review for accuracy
- Check against style guide

#### 3. Review
- Self-review (next day)
- Technical review (accuracy)
- User testing (clarity)
- Edit based on feedback

#### 4. Publishing
- Add to appropriate location
- Link from relevant pages
- Update table of contents
- Announce if major

#### 5. Validation
- Test all steps/examples
- Verify links work
- Check on different devices
- Collect user feedback

### Documentation Checklist

Before publishing:
- [ ] Clear purpose and audience
- [ ] Follows style guide
- [ ] Screenshots are current
- [ ] All links work
- [ ] Code examples tested
- [ ] Spelling/grammar checked
- [ ] Reviewed by another person
- [ ] Accessible (alt text, etc.)

### Version Control

**Documentation Versions:**
- Match extension versions
- Tag documentation in git
- Maintain docs for supported versions
- Archive old version docs

**Branching Strategy:**
```
main                # Current release docs
├── develop         # Next version docs
└── v0.1.x          # Version-specific docs
```

---

## 🔧 Maintenance & Updates

### Update Triggers

Documentation should be updated when:
1. **Feature Added** - Document new feature
2. **Feature Changed** - Update existing docs
3. **Bug Fixed** - Update if behavior changed
4. **User Feedback** - Clarify confusing parts
5. **Version Release** - Update version references
6. **Deprecated Feature** - Add deprecation notice

### Review Schedule

| Documentation Type | Review Frequency |
|--------------------|------------------|
| README.md | Before each release |
| Feature docs | Before each release |
| Tutorials | Quarterly |
| Troubleshooting | Monthly |
| FAQ | Monthly |
| API docs | Before each release |
| Process docs | Quarterly |

### Documentation Debt Tracking

Track documentation issues:
- Outdated screenshots
- Broken links
- Missing documentation
- User-reported confusion
- Incomplete sections

**Label in GitHub Issues:**
- `documentation` label
- Priority levels (P1-P3)
- Link to specific doc

### Deprecation Notices

**Format:**
```markdown
> ⚠️ **Deprecated:** This feature will be removed in v2.0.0.
> Use [new feature](link) instead.
> [Migration guide](migration-link)
```

**Timeline:**
- Announce deprecation (v1.0)
- Show warnings (v1.5)
- Remove feature (v2.0)
- Archive docs (v2.0+)

---

## 🌍 Internationalization (i18n)

### Translation Strategy

**Priority Languages (Future):**
1. English (primary)
2. Spanish
3. Chinese (Simplified)
4. French
5. German

### Documentation Translation

**Structure:**
```
docs/
├── en/          # English (default)
│   ├── README.md
│   └── ...
├── es/          # Spanish
│   ├── README.md
│   └── ...
└── zh-CN/       # Chinese Simplified
    ├── README.md
    └── ...
```

**Translation Process:**
1. English docs finalized
2. Extract translatable content
3. Professional translation or community
4. Review by native speaker
5. Publish alongside English

**Translation Notes:**
- Keep code examples in English
- Translate UI element names to match localized VS Code
- Include link to English version
- Note if translation is outdated

---

## 🛠️ Tools & Automation

### Documentation Tools

#### Writing & Editing
- **Editor:** VS Code (of course!)
- **Spell Check:** Code Spell Checker extension
- **Markdown Linting:** markdownlint
- **Grammar:** Grammarly or LanguageTool

#### Screenshots & GIFs
- **Screenshots:** Windows Snipping Tool, macOS Screenshot
- **Annotations:** Snagit, Skitch
- **GIFs:** ScreenToGif, Kap, LICEcap
- **Screen Recording:** OBS Studio, Loom

#### Diagrams
- **Architecture:** Excalidraw, Draw.io
- **Flowcharts:** Mermaid (in Markdown)
- **Mind Maps:** MindMeister

#### Video
- **Screen Recording:** OBS Studio, Camtasia
- **Editing:** DaVinci Resolve (free), Adobe Premiere
- **Hosting:** YouTube, Loom

### Automation

#### Link Checking
```yaml
# .github/workflows/docs-lint.yml
name: Documentation Link Check

on:
  push:
    paths:
      - '**.md'
  pull_request:
    paths:
      - '**.md'
  schedule:
    - cron: '0 0 * * 0' # Weekly

jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check Markdown links
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        with:
          use-quiet-mode: 'yes'
          config-file: '.github/markdown-link-check.config.json'
```

#### Markdown Linting
```yaml
# .github/workflows/docs-lint.yml (add job)
  markdown-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Lint Markdown
        uses: articulate/actions-markdownlint@v1
```

#### Spell Checking
```bash
# Add to package.json scripts
"scripts": {
  "docs:spellcheck": "cspell '**/*.md'",
  "docs:lint": "markdownlint '**/*.md' --ignore node_modules",
  "docs:links": "markdown-link-check README.md"
}
```

#### Auto-Generate Table of Contents

Use `markdown-toc`:
```bash
npm install -g markdown-toc

# Generate TOC
markdown-toc -i README.md
```

Or in-editor with VS Code extension: "Markdown All in One"

---

## 🎨 Visual Assets

### Screenshot Standards

**Requirements:**
- **Resolution:** 1920x1080 or higher
- **Format:** PNG (for transparency)
- **Compression:** Optimize with TinyPNG
- **Annotations:** Use consistent colors (brand colors)
- **Cursor:** Hide cursor unless showing action

**Naming Convention:**
```
feature-name-action-description.png

Examples:
highlight-toggle-button.png
tree-view-edit-comment.png
export-dialog-merge-option.png
```

**Storage:**
```
assets/
├── screenshots/
│   ├── v0.1/       # Version-specific
│   ├── v0.2/
│   └── current/    # Latest
└── gifs/
    └── demos/
```

### GIF Creation

**Best Practices:**
- **Duration:** 3-10 seconds
- **Frame Rate:** 10-15 fps
- **File Size:** < 5MB (optimize)
- **Loop:** Yes
- **Cursor:** Show only when demonstrating action
- **Speed:** Slightly slower than real-time
- **Highlight:** Use cursor highlights for key actions

**Tools:**
- **ScreenToGif** (Windows) - Free, lightweight
- **Kap** (macOS) - Open source, easy
- **LICEcap** (Cross-platform) - Simple

**Optimization:**
```bash
# Using gifsicle
gifsicle -O3 input.gif -o output.gif

# Or use online: ezgif.com
```

### Video Standards

**Recording:**
- **Resolution:** 1920x1080 (1080p)
- **Frame Rate:** 30fps
- **Audio:** Clear microphone, no background noise
- **Length:** 2-10 minutes
- **Pace:** Moderate, allow time to follow along

**Editing:**
- Intro/outro (< 5 seconds)
- Captions/subtitles
- Zoom in on important UI elements
- Background music (low volume)
- Call-to-action at end

**Publishing:**
- YouTube (primary)
- Embed in docs
- Transcripts for accessibility
- Timestamps in description

### Diagrams

**Types:**
- Architecture diagrams
- Data flow diagrams
- User journey maps
- Feature comparisons

**Tools:**
- **Mermaid** (Markdown-native)
  ```mermaid
  graph LR
      A[User] --> B[Highlight]
      B --> C[Save]
  ```
- **Excalidraw** (Hand-drawn style)
- **Draw.io** (Professional)

---

## 📊 Documentation Metrics

### Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Documentation Coverage** | 100% | All features documented |
| **Outdated Docs** | < 5% | Docs updated within 1 week of release |
| **Broken Links** | 0 | Automated checks |
| **User Feedback Score** | 4.5/5 | "Was this helpful?" ratings |
| **Time to Information** | < 2 min | User tests |

### User Engagement

Track (via analytics):
- Page views per doc
- Time on page
- Bounce rate
- Search queries (if docs site)
- "Was this helpful?" votes

### Improvement Signals

**Good Documentation:**
- ✅ High page views
- ✅ Low bounce rate
- ✅ Positive feedback
- ✅ Few support questions

**Needs Improvement:**
- ❌ High bounce rate
- ❌ Negative feedback
- ❌ Many support questions
- ❌ User confusion reports

---

## 📋 Documentation Checklist

### For Each Feature

When adding a new feature:
- [ ] Feature overview added
- [ ] Step-by-step guide written
- [ ] Screenshots captured
- [ ] Demo GIF created
- [ ] README.md updated
- [ ] CHANGELOG.md updated
- [ ] FAQ updated (if needed)
- [ ] Video tutorial (for major features)
- [ ] User-tested for clarity

### For Each Release

Before releasing:
- [ ] All new features documented
- [ ] Changed features updated
- [ ] Deprecated features marked
- [ ] CHANGELOG.md updated
- [ ] README.md version updated
- [ ] Screenshots current
- [ ] All links working
- [ ] Spell check passed
- [ ] Release notes drafted

---

## 🚀 Next Steps

### Phase 1: Foundation (Week 1-2)
- [ ] Standardize existing docs
- [ ] Set up documentation structure
- [ ] Create style guide
- [ ] Set up automation tools

### Phase 2: Expansion (Week 3-4)
- [ ] Write feature documentation
- [ ] Create tutorials
- [ ] Record demo videos
- [ ] Set up review process

### Phase 3: Enhancement (Month 2-3)
- [ ] Add troubleshooting guide
- [ ] Create use case guides
- [ ] Implement user feedback
- [ ] Establish maintenance schedule

### Phase 4: Scale (Month 4-6)
- [ ] API documentation
- [ ] Translation planning
- [ ] Documentation site (optional)
- [ ] Advanced tutorials

---

**Last Updated:** January 2025
**Next Review:** April 2025

*Documentation is a love letter that you write to your future self. - Damian Conway*
