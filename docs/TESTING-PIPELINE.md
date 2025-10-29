# 🧪 Testing Pipeline

**Version:** 1.0
**Last Updated:** January 2025
**Status:** Active

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Testing Strategy](#testing-strategy)
3. [Unit Testing](#unit-testing)
4. [Integration Testing](#integration-testing)
5. [End-to-End Testing](#end-to-end-testing)
6. [Manual Testing](#manual-testing)
7. [Performance Testing](#performance-testing)
8. [Regression Testing](#regression-testing)
9. [CI/CD Integration](#cicd-integration)
10. [Test Coverage Goals](#test-coverage-goals)
11. [Testing Tools](#testing-tools)

---

## 🎯 Overview

This document outlines the comprehensive testing strategy for Highlightability to ensure quality, reliability, and performance before every release.

### Testing Goals:
- ✅ Catch bugs before users do
- ✅ Maintain code quality and reliability
- ✅ Ensure backward compatibility
- ✅ Validate performance standards
- ✅ Enable confident releases
- ✅ Reduce production bugs by 95%

### Testing Pyramid

```
           /\
          /  \        E2E Tests (10%)
         /____\       - Critical user flows
        /      \      - Real VS Code integration
       /________\
      /          \    Integration Tests (30%)
     /____________\   - VS Code API integration
    /              \  - Component interaction
   /________________\
  /                  \ Unit Tests (60%)
 /____________________\ - Business logic
                         - Pure functions
                         - Utilities
```

---

## 🧩 Testing Strategy

### Test Types Overview

| Test Type | Purpose | Frequency | Tool |
|-----------|---------|-----------|------|
| **Unit Tests** | Test individual functions/classes | Every commit | Mocha/Jest |
| **Integration Tests** | Test VS Code API integration | Every PR | VS Code Test API |
| **E2E Tests** | Test complete user workflows | Before release | VS Code Test API |
| **Manual Tests** | Exploratory testing | Before release | Manual checklist |
| **Performance Tests** | Validate speed/memory | Weekly | Custom scripts |
| **Regression Tests** | Ensure old features work | Every release | Automated suite |

### Testing Levels

#### Level 1: Local Development
- Run unit tests before commit
- ESLint checks
- TypeScript compilation

#### Level 2: Pre-Commit Hooks
- Auto-run tests on git commit
- Block commit if tests fail
- Format code with Prettier

#### Level 3: Continuous Integration
- Run full test suite on PR
- Test on multiple platforms (Windows, macOS, Linux)
- Generate coverage reports

#### Level 4: Pre-Release
- Manual testing checklist
- Performance benchmarks
- Backward compatibility checks

---

## 🔬 Unit Testing

### What to Test

**Business Logic:**
- ✅ `HighlightManager` - Add/remove/update highlights
- ✅ `LicenseManager` - License validation
- ✅ `StorageManager` - Save/load highlights
- ✅ Highlight range calculations
- ✅ Color validation
- ✅ Data transformations

**Utilities:**
- ✅ File path resolution
- ✅ Date/time formatting
- ✅ String manipulation
- ✅ Validation functions

### Test Framework: Mocha

**Setup:**
```bash
npm install --save-dev mocha @types/mocha chai @types/chai
```

**Configuration:** `test/mocha.opts`
```
--require ts-node/register
--require source-map-support/register
--recursive
--extension .test.ts
--timeout 5000
```

### Example Unit Test

**File:** `src/test/unit/highlightManager.test.ts`

```typescript
import { expect } from 'chai';
import { HighlightManager } from '../../highlightManager';
import * as vscode from 'vscode';

describe('HighlightManager', () => {
    let manager: HighlightManager;

    beforeEach(() => {
        manager = new HighlightManager();
    });

    describe('addHighlight', () => {
        it('should add a highlight with valid parameters', () => {
            const range = new vscode.Range(0, 0, 0, 10);
            const color = '#FFFF0066';
            const uri = vscode.Uri.file('/test/file.ts');

            const highlight = manager.addHighlight(uri, range, color);

            expect(highlight).to.not.be.undefined;
            expect(highlight.color).to.equal(color);
            expect(highlight.range).to.deep.equal(range);
        });

        it('should throw error with invalid color', () => {
            const range = new vscode.Range(0, 0, 0, 10);
            const uri = vscode.Uri.file('/test/file.ts');

            expect(() => {
                manager.addHighlight(uri, range, 'invalid');
            }).to.throw('Invalid color format');
        });
    });

    describe('removeHighlight', () => {
        it('should remove an existing highlight', () => {
            const range = new vscode.Range(0, 0, 0, 10);
            const uri = vscode.Uri.file('/test/file.ts');
            const highlight = manager.addHighlight(uri, range, '#FFFF0066');

            const removed = manager.removeHighlight(highlight.id);

            expect(removed).to.be.true;
            expect(manager.getHighlight(highlight.id)).to.be.undefined;
        });
    });

    describe('getHighlightsForFile', () => {
        it('should return highlights for specific file', () => {
            const uri1 = vscode.Uri.file('/test/file1.ts');
            const uri2 = vscode.Uri.file('/test/file2.ts');
            const range = new vscode.Range(0, 0, 0, 10);

            manager.addHighlight(uri1, range, '#FFFF0066');
            manager.addHighlight(uri1, range, '#00FF0066');
            manager.addHighlight(uri2, range, '#FF00FF66');

            const highlights = manager.getHighlightsForFile(uri1);

            expect(highlights).to.have.length(2);
        });
    });
});
```

### Running Unit Tests

```bash
# Run all unit tests
npm run test:unit

# Run specific test file
npm run test:unit -- test/unit/highlightManager.test.ts

# Run with coverage
npm run test:coverage
```

---

## 🔗 Integration Testing

### What to Test

**VS Code API Integration:**
- ✅ Extension activation
- ✅ Command registration
- ✅ Tree view provider
- ✅ Text editor decorations
- ✅ File system operations
- ✅ Configuration reading/writing
- ✅ Workspace state persistence

### Test Framework: VS Code Test API

**Setup:**
```bash
npm install --save-dev @vscode/test-electron
```

**Configuration:** `test/runTest.ts`

```typescript
import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');
        const extensionTestsPath = path.resolve(__dirname, './suite/index');

        await runTests({
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: ['--disable-extensions']
        });
    } catch (err) {
        console.error('Failed to run tests:', err);
        process.exit(1);
    }
}

main();
```

### Example Integration Test

**File:** `src/test/integration/commands.test.ts`

```typescript
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Command Integration Tests', () => {
    test('Toggle Highlight command should be registered', async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('codeHighlighter.toggleHighlight'));
    });

    test('Adding highlight should create decoration', async () => {
        // Open a test file
        const doc = await vscode.workspace.openTextDocument({
            content: 'const test = "hello world";',
            language: 'typescript'
        });
        const editor = await vscode.window.showTextDocument(doc);

        // Select text
        editor.selection = new vscode.Selection(0, 6, 0, 10);

        // Execute highlight command
        await vscode.commands.executeCommand('codeHighlighter.toggleHighlight');

        // Wait for decoration to be applied
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verify decoration exists
        const decorations = editor.decorations;
        assert.ok(decorations.length > 0);
    });

    test('Tree view should display highlights', async () => {
        const treeView = vscode.window.createTreeView('codeHighlighterTreeView', {
            treeDataProvider: treeDataProvider
        });

        // Add a highlight
        await vscode.commands.executeCommand('codeHighlighter.toggleHighlight');

        // Refresh tree view
        await vscode.commands.executeCommand('codeHighlighter.refreshHighlights');

        // Check tree view has items
        const children = await treeDataProvider.getChildren();
        assert.ok(children && children.length > 0);

        treeView.dispose();
    });
});
```

### Running Integration Tests

```bash
# Run integration tests
npm run test:integration

# Run in VS Code debug mode
# Press F5 in VS Code with "Extension Tests" launch config
```

---

## 🎭 End-to-End Testing

### Critical User Flows

#### Flow 1: Basic Highlight Workflow
```
1. Open VS Code
2. Open a file
3. Select text
4. Press Ctrl+Shift+Z
5. Verify highlight appears
6. Hover over highlight
7. Verify tooltip shows
8. Press Ctrl+Shift+Z again
9. Verify highlight removed
```

#### Flow 2: Comment Workflow
```
1. Create highlight
2. Right-click → Edit Comment
3. Enter comment text
4. Verify comment saved
5. Hover over highlight
6. Verify comment displays
7. Edit comment again
8. Verify update persists
```

#### Flow 3: Tree View Workflow
```
1. Create multiple highlights
2. Open Highlights sidebar
3. Verify all highlights listed
4. Click a highlight
5. Verify navigation to code
6. Delete from tree view
7. Verify highlight removed
```

#### Flow 4: Export/Import Workflow
```
1. Create highlights with comments
2. Export to JSON
3. Clear all highlights
4. Import JSON file
5. Verify all highlights restored
6. Verify comments intact
```

#### Flow 5: Persistence Workflow
```
1. Create highlights
2. Close VS Code
3. Reopen VS Code
4. Open same file
5. Verify highlights still present
```

### E2E Test Implementation

**File:** `src/test/e2e/userWorkflows.test.ts`

```typescript
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('E2E User Workflows', () => {
    test('Complete highlight lifecycle', async () => {
        // Step 1: Open file
        const doc = await vscode.workspace.openTextDocument({
            content: 'function test() { return true; }',
            language: 'typescript'
        });
        const editor = await vscode.window.showTextDocument(doc);

        // Step 2: Create highlight
        editor.selection = new vscode.Selection(0, 9, 0, 13);
        await vscode.commands.executeCommand('codeHighlighter.toggleHighlight');
        await wait(200);

        // Step 3: Add comment
        await vscode.commands.executeCommand('codeHighlighter.editHighlightComment');
        await typeText('Test comment');
        await pressKey('enter');
        await wait(200);

        // Step 4: Verify in tree view
        const treeItems = await getTreeViewItems();
        assert.ok(treeItems.length > 0);
        assert.ok(treeItems[0].description?.includes('Test comment'));

        // Step 5: Export
        const exportPath = await vscode.commands.executeCommand('codeHighlighter.exportHighlights');
        assert.ok(exportPath);

        // Step 6: Clear all
        await vscode.commands.executeCommand('codeHighlighter.clearAllHighlights');
        await wait(200);

        // Step 7: Import
        await vscode.commands.executeCommand('codeHighlighter.importHighlights', exportPath);
        await wait(200);

        // Step 8: Verify restored
        const restoredItems = await getTreeViewItems();
        assert.strictEqual(restoredItems.length, treeItems.length);

        // Step 9: Remove highlight
        editor.selection = new vscode.Selection(0, 9, 0, 13);
        await vscode.commands.executeCommand('codeHighlighter.toggleHighlight');
        await wait(200);

        // Step 10: Verify removed
        const finalItems = await getTreeViewItems();
        assert.strictEqual(finalItems.length, 0);
    });
});
```

---

## 📝 Manual Testing

### Pre-Release Checklist

#### Basic Features
- [ ] Toggle highlight (Ctrl+Shift+Z)
- [ ] Color selection menu
- [ ] All 5 colors work
- [ ] Highlight removal
- [ ] Comment creation
- [ ] Comment editing
- [ ] Comment display on hover

#### Tree View
- [ ] Tree view displays all highlights
- [ ] Click to navigate works
- [ ] Edit comment from tree view
- [ ] Delete from tree view
- [ ] Refresh updates view
- [ ] Icons display correctly

#### Export/Import
- [ ] Export creates valid JSON
- [ ] Import restores highlights
- [ ] Merge mode works
- [ ] Replace mode works
- [ ] Error handling for invalid JSON

#### Persistence
- [ ] Highlights persist after reload
- [ ] Comments persist after reload
- [ ] Workspace-specific storage works
- [ ] No data loss on crash

#### Edge Cases
- [ ] Empty file
- [ ] Very large file (>10,000 lines)
- [ ] Many highlights (>100)
- [ ] Unicode characters in comments
- [ ] Special characters in file paths
- [ ] Multi-root workspace

#### Platform-Specific
- [ ] Windows: Shortcuts work
- [ ] macOS: Cmd key shortcuts work
- [ ] Linux: Shortcuts work
- [ ] UI renders correctly on all platforms

#### Performance
- [ ] Extension activates quickly (<1s)
- [ ] No lag when adding highlights
- [ ] Smooth scrolling with many highlights
- [ ] Tree view updates quickly
- [ ] No memory leaks after extended use

### Testing Environments

| Environment | OS | VS Code Version | Test Frequency |
|-------------|-------|-----------------|----------------|
| Dev Machine | Windows 11 | Latest | Daily |
| CI/CD | Ubuntu 22.04 | Latest | Every PR |
| CI/CD | macOS 13 | Latest | Every PR |
| CI/CD | Windows Server | Latest | Every PR |
| Beta Testers | Mixed | Insiders | Weekly |

---

## ⚡ Performance Testing

### Performance Benchmarks

| Metric | Target | Maximum Acceptable |
|--------|--------|-------------------|
| Extension Activation | <500ms | 1000ms |
| Add Highlight | <50ms | 100ms |
| Remove Highlight | <50ms | 100ms |
| Tree View Refresh | <200ms | 500ms |
| Export 100 Highlights | <500ms | 1000ms |
| Import 100 Highlights | <1000ms | 2000ms |
| Memory Usage (idle) | <20MB | 50MB |
| Memory Usage (100 highlights) | <30MB | 75MB |

### Performance Test Script

**File:** `src/test/performance/benchmark.ts`

```typescript
import * as vscode from 'vscode';
import { performance } from 'perf_hooks';

async function benchmarkAddHighlight() {
    const doc = await vscode.workspace.openTextDocument({
        content: 'x'.repeat(10000),
        language: 'text'
    });
    const editor = await vscode.window.showTextDocument(doc);

    const iterations = 100;
    const times: number[] = [];

    for (let i = 0; i < iterations; i++) {
        editor.selection = new vscode.Selection(i, 0, i, 10);

        const start = performance.now();
        await vscode.commands.executeCommand('codeHighlighter.toggleHighlight');
        const end = performance.now();

        times.push(end - start);
    }

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const max = Math.max(...times);
    const min = Math.min(...times);

    console.log(`Add Highlight Performance:
        Average: ${avg.toFixed(2)}ms
        Min: ${min.toFixed(2)}ms
        Max: ${max.toFixed(2)}ms
    `);

    assert.ok(avg < 100, `Average time ${avg}ms exceeds target of 100ms`);
}

async function benchmarkMemoryUsage() {
    const memBefore = process.memoryUsage().heapUsed / 1024 / 1024;

    // Create 100 highlights
    const doc = await vscode.workspace.openTextDocument({
        content: 'x'.repeat(10000),
        language: 'text'
    });
    const editor = await vscode.window.showTextDocument(doc);

    for (let i = 0; i < 100; i++) {
        editor.selection = new vscode.Selection(i, 0, i, 10);
        await vscode.commands.executeCommand('codeHighlighter.toggleHighlight');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const memAfter = process.memoryUsage().heapUsed / 1024 / 1024;
    const memDiff = memAfter - memBefore;

    console.log(`Memory Usage:
        Before: ${memBefore.toFixed(2)}MB
        After: ${memAfter.toFixed(2)}MB
        Difference: ${memDiff.toFixed(2)}MB
    `);

    assert.ok(memDiff < 30, `Memory increase ${memDiff}MB exceeds target of 30MB`);
}
```

### Running Performance Tests

```bash
npm run test:performance

# With profiling
npm run test:performance -- --profile
```

---

## 🔄 Regression Testing

### Regression Test Suite

**Purpose:** Ensure new changes don't break existing functionality.

**When to Run:**
- Before every release
- After major refactoring
- When fixing critical bugs

### Automated Regression Tests

Maintain a suite of tests covering:
- All core features
- Previous bug fixes
- Edge cases
- Platform-specific behavior

**File:** `src/test/regression/regressionSuite.test.ts`

```typescript
suite('Regression Tests', () => {
    // Test for bug #123: Highlights lost on file rename
    test('Bug #123: Highlights persist after file rename', async () => {
        // Test implementation
    });

    // Test for bug #456: Comment with emoji crashes extension
    test('Bug #456: Comments with emoji work correctly', async () => {
        // Test implementation
    });

    // Add test for each fixed bug
});
```

---

## 🔧 CI/CD Integration

### GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

```yaml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        vscode-version: [stable, insiders]

    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Compile TypeScript
        run: npm run compile

      - name: Run Unit Tests
        run: npm run test:unit

      - name: Run Integration Tests
        run: npm run test:integration
        env:
          VSCODE_VERSION: ${{ matrix.vscode-version }}

      - name: Generate Coverage Report
        run: npm run test:coverage

      - name: Upload Coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-${{ matrix.os }}

      - name: Run Performance Tests
        if: matrix.os == 'ubuntu-latest'
        run: npm run test:performance
```

### Test Scripts in package.json

```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:integration",
    "test:unit": "mocha --config test/mocha.opts src/test/unit/**/*.test.ts",
    "test:integration": "node out/test/runTest.js",
    "test:e2e": "node out/test/runTest.js --suite e2e",
    "test:performance": "node out/test/performance/benchmark.js",
    "test:coverage": "nyc npm run test:unit",
    "test:watch": "mocha --watch --config test/mocha.opts src/test/unit/**/*.test.ts"
  }
}
```

---

## 📊 Test Coverage Goals

### Coverage Targets

| Component | Target Coverage | Current |
|-----------|----------------|---------|
| **Overall** | 80% | TBD |
| Core Logic (HighlightManager) | 90% | TBD |
| Commands | 70% | TBD |
| Tree View Provider | 70% | TBD |
| Storage | 85% | TBD |
| Utilities | 90% | TBD |

### Coverage Report

```bash
npm run test:coverage
```

**Output:**
```
-----------------------------|---------|----------|---------|---------|
File                         | % Stmts | % Branch | % Funcs | % Lines |
-----------------------------|---------|----------|---------|---------|
All files                    |   82.5  |   75.3   |   88.2  |   83.1  |
 highlightManager.ts         |   91.2  |   87.5   |   95.0  |   92.0  |
 treeViewProvider.ts         |   78.3  |   70.2   |   82.5  |   79.1  |
 extension.ts                |   75.0  |   65.8   |   80.0  |   76.5  |
-----------------------------|---------|----------|---------|---------|
```

---

## 🛠️ Testing Tools

### Required Dependencies

```json
{
  "devDependencies": {
    "@types/mocha": "^10.0.0",
    "@types/chai": "^4.3.0",
    "@types/sinon": "^10.0.0",
    "@vscode/test-electron": "^2.3.0",
    "mocha": "^10.0.0",
    "chai": "^4.3.0",
    "sinon": "^15.0.0",
    "nyc": "^15.1.0",
    "ts-node": "^10.9.0"
  }
}
```

### Tool Overview

| Tool | Purpose |
|------|---------|
| **Mocha** | Test runner for unit tests |
| **Chai** | Assertion library |
| **Sinon** | Mocking and stubbing |
| **NYC** | Code coverage |
| **@vscode/test-electron** | VS Code integration testing |
| **ts-node** | Run TypeScript tests directly |

---

## 🎯 Testing Best Practices

### Do:
- ✅ Write tests before fixing bugs (TDD)
- ✅ Keep tests fast and focused
- ✅ Use descriptive test names
- ✅ Test edge cases and error paths
- ✅ Mock external dependencies
- ✅ Clean up after tests (dispose resources)
- ✅ Run tests locally before pushing
- ✅ Maintain test documentation

### Don't:
- ❌ Write flaky tests that fail randomly
- ❌ Test implementation details
- ❌ Depend on test execution order
- ❌ Use hard-coded paths or data
- ❌ Skip writing tests for "simple" code
- ❌ Ignore failing tests
- ❌ Commit code without running tests

---

## 🚀 Next Steps

### Phase 1: Setup (Week 1)
- [ ] Install testing dependencies
- [ ] Configure test runners
- [ ] Set up CI/CD workflow
- [ ] Create test file structure

### Phase 2: Unit Tests (Week 2-3)
- [ ] Write tests for HighlightManager
- [ ] Write tests for utilities
- [ ] Write tests for storage
- [ ] Achieve 80% coverage

### Phase 3: Integration Tests (Week 4)
- [ ] Test command registration
- [ ] Test VS Code API usage
- [ ] Test tree view provider

### Phase 4: E2E Tests (Week 5)
- [ ] Implement critical user flows
- [ ] Test on multiple platforms

### Phase 5: Automation (Week 6)
- [ ] Set up pre-commit hooks
- [ ] Configure GitHub Actions
- [ ] Enable coverage reporting

---

**Last Updated:** January 2025
**Next Review:** April 2025

*Quality is not an act, it is a habit. - Aristotle*
