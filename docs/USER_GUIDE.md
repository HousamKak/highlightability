# Highlightability - User Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Install & Activate

The extension is already installed! Now let's activate git-aware mode:

1. Open [package.json](package.json) in your workspace
2. Find line 37 (it says `"main": "./out/extension.js"`)
3. Change it to: `"main": "./out/extensionGitAware.js"`
4. Save the file
5. Run in terminal: `npm run compile`
6. In VSCode: Press `Ctrl+Shift+P` → type "Reload Window" → press Enter

That's it! Git-aware mode is now active.

---

## 📚 Basic Usage

### Creating Your First Highlight

**Method 1: Quick Highlight (Keyboard)**
1. Select some code (drag your mouse over it)
2. Press `Ctrl+Shift+Z` (Windows/Linux) or `Cmd+Shift+Z` (Mac)
3. Done! You'll see a yellow highlight

**Method 2: Highlight with Comment**
1. Select some code
2. Right-click → "Highlightability" → "Add Highlight"
3. Type a comment (optional) → press Enter
4. Choose a color (Yellow, Green, Pink, Cyan, Orange)
5. Choose scope:
   - **🔒 Personal** = Private, only you see it (not saved in git)
   - **👥 Shared** = Team sees it (saved in git)

### Example Use Cases

**Personal Highlights (🔒):**
- "TODO: Refactor this tomorrow"
- "Learn how this works"
- "Temporary debugging marker"

**Shared Highlights (👥):**
- "⚠️ Don't modify - used in production"
- "Bug: Fix edge case here"
- "Review needed: Complex logic"

---

## 📂 Understanding the Sidebar

After creating highlights, look at the VSCode sidebar (left side):

1. Click the **Bookmark icon** (📑) - This is the Highlightability panel
2. You'll see two sections:

```
👥 Shared (3)
  └── extension.ts (2)
      ├── ✅ const highlightManager = ... (Yellow)
      └── ⚠️ function activate() { ... (Green)
  └── highlightManager.ts (1)
      ├── ✅ export class HighlightManager ... (Pink)

🔒 Personal (2)
  └── utils.ts (2)
      ├── ✅ // TODO: Optimize this (Yellow)
      └── ✅ const helper = () => ... (Cyan)
```

**Icons mean:**
- ✅ **Valid** - Highlight is accurate
- ⚠️ **Needs Check** - Might be slightly off (verify it)
- ❌ **Stale** - Code changed too much, needs fixing
- ❓ **Lost** - File deleted or drastically changed

---

## 🔄 What Happens When Code Changes?

### Scenario 1: Code Added Before Highlight
```typescript
// BEFORE (highlight on line 42)
41: const x = 1;
42: const y = 2;  ← HIGHLIGHTED
43: const z = 3;

// You add 5 lines above line 42

// AFTER (highlight auto-moves to line 47)
41: const x = 1;
42: const newCode = 'added';
43: const moreCode = 'added';
44: const evenMore = 'added';
45: const andMore = 'added';
46: const lastOne = 'added';
47: const y = 2;  ← HIGHLIGHT MOVED HERE ✅
48: const z = 3;
```

**Result:** Highlight automatically moves to line 47. You don't do anything!

### Scenario 2: Code Changed Slightly
```typescript
// BEFORE
const example = 'code';  ← HIGHLIGHTED

// You change it to
const example = 'new-code';

// AFTER
```

**Result:** Highlight finds the similar code and marks it ⚠️ "needs check" (85% match). Review it to confirm.

### Scenario 3: Code Completely Refactored
```typescript
// BEFORE
function oldWay() {
  const x = 1;
  return x * 2;  ← HIGHLIGHTED
}

// You completely rewrite it
const newWay = (val) => val * 2;

// AFTER
```

**Result:** Highlight can't find the code, marks it ❌ **stale**. You need to fix it.

---

## 🔧 Fixing Stale Highlights

When you see ❌ stale highlights:

### Method 1: From Sidebar
1. Click the **Bookmark icon** (sidebar)
2. Click the **⚠️ Warning icon** (top of panel) - "Show Stale Highlights"
3. You'll see a list of all stale highlights
4. Click one to jump to that file
5. Choose how to fix:
   - **Search and Update** - Extension finds the code automatically
   - **Update to Current Selection** - You select the new code location
   - **Delete** - Remove the highlight

### Method 2: In the File
1. Open a file with stale highlights
2. You'll see red dashed borders around stale highlights
3. Put your cursor on the stale highlight
4. Press `Ctrl+Shift+P` → "Fix Stale Highlight"
5. Choose an action

### Method 3: Delete All Stale
1. Click **Bookmark icon** (sidebar)
2. Click **⚠️ Warning icon** → "Delete All Stale Highlights"
3. Confirm

---

## 🤝 Team Collaboration

### Sharing Highlights with Your Team

**Step 1: Create Shared Highlight**
1. Select code
2. `Ctrl+Shift+Z`
3. Choose **👥 Shared** scope
4. Add comment: "⚠️ Critical: Don't modify without review"

**Step 2: Commit to Git**
```bash
git add .highlights/shared.json
git commit -m "Add important code highlights"
git push
```

**Step 3: Team Members Pull**
```bash
git pull
# Reload VSCode window
# They now see your highlights!
```

### Personal Notes (Not Shared)

1. Select code
2. `Ctrl+Shift+Z`
3. Choose **🔒 Personal** scope
4. Add comment: "TODO: Research this algorithm"

**Result:** Saved to `.highlights/personal.json` which is **gitignored** (not committed)

---

## 📁 Where Are Highlights Stored?

After creating highlights, you'll see a new folder:

```
your-workspace/
├── .highlights/
│   ├── shared.json         ← Team highlights (in git)
│   ├── personal.json       ← Your private notes (NOT in git)
│   ├── config.json         ← Settings
│   └── .gitignore          ← Ensures personal.json not committed
├── src/
│   └── your code...
└── .git/
```

**Important:**
- ✅ `shared.json` **IS** committed to git
- ❌ `personal.json` **IS NOT** committed to git
- 🔒 `.gitignore` ensures personal highlights stay private

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut (Windows/Linux) | Shortcut (Mac) |
|--------|-------------------------|----------------|
| Toggle Highlight | `Ctrl+Shift+Z` | `Cmd+Shift+Z` |
| Edit Comment | `Ctrl+Shift+C` | `Cmd+Shift+C` |

---

## 🎨 Choosing Colors

Colors help you categorize highlights:

| Color | Common Use |
|-------|------------|
| 🟨 **Yellow** | General notes, TODOs |
| 🟩 **Green** | Good code, examples to learn |
| 🟪 **Pink** | Important, critical sections |
| 🔵 **Cyan** | Questions, unclear code |
| 🟧 **Orange** | Warnings, potential issues |

**Tip:** Develop your own color system! For example:
- Yellow = My TODOs
- Orange = Bugs to fix
- Green = Completed tasks
- Pink = Team review needed

---

## 📋 Common Workflows

### Workflow 1: Code Review

**As Reviewer:**
1. Review code
2. Select problematic sections
3. `Ctrl+Shift+Z` → Choose **👥 Shared**
4. Add comments: "Fix: Handle null case", "Question: Why this approach?"
5. Commit `.highlights/shared.json`
6. Team sees your review comments in their editor!

**As Developer:**
1. Pull latest code
2. See reviewer's highlights in sidebar
3. Click each highlight to jump to location
4. Fix issues
5. Delete highlights as you address them

### Workflow 2: Learning Codebase

**Exploring unfamiliar code:**
1. Select interesting code sections
2. `Ctrl+Shift+Z` → Choose **🔒 Personal**
3. Add notes: "This handles authentication", "Entry point for API"
4. Use sidebar to navigate between your notes
5. As you understand more, delete highlights

### Workflow 3: Bug Tracking

**Finding and fixing bugs:**
1. Find bug location
2. Highlight → **👥 Shared** → Comment: "🐛 Bug: Null pointer on empty input"
3. Commit to git
4. Later, filter highlights to see all bugs
5. Fix them one by one
6. Delete highlights as bugs are fixed

### Workflow 4: Refactoring

**Planning refactoring:**
1. Highlight code to refactor → **🔒 Personal** → "Refactor: Extract to helper"
2. Highlight dependencies → "Update: Uses old helper"
3. Work through highlights systematically
4. Delete as you refactor each section

---

## 🐛 Troubleshooting

### "No highlights showing up"

**Check:**
1. Is git-aware mode active? (Check `package.json` line 37)
2. Did you reload VSCode after changing entry point?
3. Is the sidebar open? (Click bookmark icon)

### "Migration prompt not appearing"

**If you had old highlights:**
1. Old highlights were in VSCode workspace state
2. Migration happens automatically on first launch
3. If you missed it, highlights are backed up - check Output → "Highlighter Logs"

### "Highlights lost after code change"

**Likely stale:**
1. Check sidebar for ❌ stale highlights
2. Click **⚠️ Warning icon** → "Show Stale Highlights"
3. Fix or delete them

### "Personal highlights showing in git status"

**Should not happen (they're gitignored):**
1. Check `.highlights/.gitignore` exists
2. It should contain: `personal.json`
3. Run: `git status` - `personal.json` should NOT appear

---

## 🎓 Tips & Best Practices

### ✅ **DO:**
- Use **Personal** for temporary notes and TODOs
- Use **Shared** for team communication and code reviews
- Develop a consistent color system
- Review and clean up stale highlights regularly
- Add descriptive comments to highlights

### ❌ **DON'T:**
- Don't highlight entire files (be specific)
- Don't create hundreds of highlights (they become noise)
- Don't forget to commit `shared.json` if you want team to see
- Don't ignore stale warnings (fix or delete them)

---

## 🆘 Need Help?

### View Logs
1. `Ctrl+Shift+P` → "Show Highlighter Logs"
2. See what's happening behind the scenes

### Report Issues
1. Go to: https://github.com/housamkak/highlightability/issues
2. Describe the problem
3. Include logs if possible

### Read Technical Docs
- [GIT_AWARE_HIGHLIGHTS.md](GIT_AWARE_HIGHLIGHTS.md) - How it works under the hood
- [INTEGRATION_COMPLETE.md](INTEGRATION_COMPLETE.md) - Developer guide

---

## 📊 Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│  HIGHLIGHTABILITY - QUICK REFERENCE             │
├─────────────────────────────────────────────────┤
│                                                 │
│  CREATE HIGHLIGHT:                              │
│    1. Select code                               │
│    2. Ctrl+Shift+Z                              │
│    3. Choose scope: Personal 🔒 or Shared 👥    │
│                                                 │
│  VIEW HIGHLIGHTS:                               │
│    Click bookmark icon in sidebar               │
│                                                 │
│  FIX STALE HIGHLIGHTS:                          │
│    Click ⚠️ icon in sidebar                     │
│                                                 │
│  SCOPES:                                        │
│    🔒 Personal  = Private (gitignored)          │
│    👥 Shared    = Team (committed to git)       │
│                                                 │
│  STATES:                                        │
│    ✅ Valid      = Accurate                     │
│    ⚠️ Needs Check = Verify position             │
│    ❌ Stale      = Fix or delete                │
│                                                 │
│  FILES:                                         │
│    .highlights/shared.json    (git tracked)     │
│    .highlights/personal.json  (gitignored)      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🎉 You're Ready!

Now you know how to:
- ✅ Create highlights (personal and shared)
- ✅ View them in the sidebar
- ✅ Understand what happens when code changes
- ✅ Fix stale highlights
- ✅ Collaborate with your team
- ✅ Use highlights effectively in your workflow

**Try it now:**
1. Select some code in this file
2. Press `Ctrl+Shift+Z`
3. Add a comment
4. See it appear in the sidebar!

Happy highlighting! 🎨
