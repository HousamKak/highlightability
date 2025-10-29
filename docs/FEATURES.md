# Highlightability - Feature Roadmap

**Version:** 1.0  
**Last Updated:** October 22, 2025  
**Status:** Planning & Specification

This document outlines potential features for Highlightability, organized by category with detailed specifications, implementation considerations, and priority levels.

---

## 🎨 Visual & UI Enhancements

### 1. Custom Colors

**Description:**  
Allow users to define their own highlight colors beyond the 5 default presets, enabling personalized color schemes that match their workflow or preferences.

**User Story:**  
As a developer, I want to define my own highlight colors so that I can create a color scheme that matches my team's conventions or my personal preferences.

**Detailed Requirements:**
- Add a settings configuration for custom color definitions
- Support hex codes, RGB, and RGBA values
- Minimum of 10 custom color slots
- Color validation to ensure visibility and contrast
- Default fallback colors if custom colors are invalid
- UI to manage custom colors in extension settings
- Preview of colors in settings UI
- Reset to default colors option
- Import/export custom color schemes

**Technical Considerations:**
- Settings schema in `package.json` for color array
- Validation function for color format
- Dynamic color injection into decoration types
- Persistence in workspace/user settings
- Color picker integration (VS Code's QuickPick with color preview)

**Priority:** High  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 2. Highlight Styles

**Description:**  
Provide different visual styles for highlights beyond just background color, including underline, border, background, or combinations thereof.

**User Story:**  
As a developer, I want to choose different visual styles for my highlights so that I can distinguish between different types of annotations without relying solely on color.

**Detailed Requirements:**
- Style options:
  - Background (current default)
  - Underline (solid, wavy, dotted, dashed)
  - Border (full box, left bar, top/bottom)
  - Text decoration (bold, italic, strikethrough)
  - Gutter icon
  - Combinations of above
- Per-highlight style selection
- Style presets (e.g., "Error", "Warning", "Info")
- Custom style definitions in settings
- Style inheritance (default → custom → per-highlight)
- Visual preview in quick pick menu

**Technical Considerations:**
- Extend `TextEditorDecorationType` options
- Add `style` property to `Highlight` interface
- UI for style selection during highlight creation
- CSS-like style configuration
- Performance impact of complex decorations
- Compatibility with different VS Code themes

**Priority:** Medium  
**Estimated Complexity:** High  
**Dependencies:** None

---

### 3. Color Picker

**Description:**  
Integrate a visual color picker when adding or editing highlights, allowing users to choose colors intuitively.

**User Story:**  
As a developer, I want to pick colors visually when creating highlights so that I can quickly select the exact color I want without memorizing color codes.

**Detailed Requirements:**
- Visual color picker UI component
- Recent colors history
- Color palette with common colors
- Hex/RGB input option
- Color preview before applying
- Integration into highlight creation workflow
- Option to save picked color to custom colors
- Eyedropper tool to pick colors from editor
- Keyboard accessibility for color selection

**Technical Considerations:**
- Use VS Code's native color picker API if available
- Custom webview for advanced color picker
- Color format conversion utilities
- State management for color history
- Quick pick vs. webview trade-offs
- Theme-aware color suggestions

**Priority:** Medium  
**Estimated Complexity:** Medium  
**Dependencies:** Custom Colors feature recommended

---

### 4. Highlight Opacity Control

**Description:**  
Allow users to adjust the transparency/opacity of highlight backgrounds to control visual prominence.

**User Story:**  
As a developer, I want to adjust highlight opacity so that I can make some highlights more subtle while keeping others prominent, without compromising code readability.

**Detailed Requirements:**
- Opacity slider (0-100%)
- Per-highlight opacity setting
- Global default opacity setting
- Quick opacity presets (25%, 50%, 75%, 100%)
- Live preview of opacity changes
- Opacity indicator in tree view
- Keyboard shortcuts for opacity adjustment
- Opacity affects only background, not text

**Technical Considerations:**
- RGBA color conversion
- Add `opacity` property to `Highlight` interface
- Update decoration rendering logic
- Settings schema for default opacity
- UI component for opacity slider
- Performance with many semi-transparent highlights
- Ensure text remains readable at all opacity levels

**Priority:** Low  
**Estimated Complexity:** Low  
**Dependencies:** None

---

### 5. Icons/Emojis for Highlights

**Description:**  
Display custom icons or emojis in the editor gutter next to highlighted lines for better visual identification.

**User Story:**  
As a developer, I want to add icons or emojis to my highlights so that I can quickly identify different types of annotations at a glance.

**Detailed Requirements:**
- Icon picker with common icon sets
- Emoji picker with search
- Custom icon upload (SVG/PNG)
- Icon library with categories (bugs, features, questions, etc.)
- Per-highlight icon assignment
- Icon size customization
- Toggle gutter icons on/off
- Icon shown in tree view
- ThemeIcon support for VS Code native icons
- Fallback for themes that don't support gutter icons

**Technical Considerations:**
- Use VS Code's `gutterIconPath` decoration option
- Add `icon` property to `Highlight` interface
- Icon asset management and bundling
- SVG to data URI conversion
- Icon caching for performance
- Theme color adaptation for icons
- Accessibility considerations (screen readers)

**Priority:** Medium  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

## 📝 Comment & Note Features

### 6. Rich Text Comments

**Description:**  
Support Markdown formatting in highlight comments, enabling rich text with bold, italic, code blocks, links, and lists.

**User Story:**  
As a developer, I want to format my highlight comments with Markdown so that I can create more structured and readable notes with code examples and emphasis.

**Detailed Requirements:**
- Full Markdown support in comments
- Syntax highlighting in code blocks
- Clickable links
- Image embedding
- Task lists (checkboxes)
- Tables support
- Preview mode toggle
- Edit/preview split view
- Export formatted comments
- Copy comment as formatted text
- Markdown shortcuts (Ctrl+B for bold, etc.)

**Technical Considerations:**
- Markdown parser integration (e.g., `marked` library)
- Syntax highlighting library (e.g., `highlight.js`)
- Add `commentFormat` property to `Highlight` interface
- Webview for rich text rendering
- Plain text fallback for compatibility
- Storage format (Markdown source + rendered HTML)
- Security: sanitize HTML output
- Performance with large comments

**Priority:** High  
**Estimated Complexity:** High  
**Dependencies:** None

---

### 7. Tags/Labels

**Description:**  
Add categorization tags to highlights (e.g., #bug, #todo, #review) for better organization and filtering.

**User Story:**  
As a developer, I want to tag my highlights with categories so that I can organize and filter them by topic, making it easier to focus on specific types of annotations.

**Detailed Requirements:**
- Tag input with autocomplete
- Multiple tags per highlight
- Predefined tag library (#bug, #todo, #review, #question, #important, #deprecated)
- Custom tag creation
- Tag color coding
- Tag-based filtering in tree view
- Tag search functionality
- Tag statistics (count per tag)
- Tag rename (updates all highlights)
- Tag deletion (with warning)
- Tag suggestions based on comment content
- Export highlights by tag

**Technical Considerations:**
- Add `tags` array property to `Highlight` interface
- Tag storage and indexing
- Tag autocomplete implementation
- Tag manager class for CRUD operations
- UI for tag input (multi-select quick pick)
- Tree view filtering by tags
- Tag persistence in storage
- Tag migration/versioning

**Priority:** High  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 8. Multi-line Comments

**Description:**  
Improve comment display with better formatting for multi-line comments, including line breaks and indentation.

**User Story:**  
As a developer, I want to write multi-line comments that preserve formatting so that I can create detailed, well-structured notes for complex highlights.

**Detailed Requirements:**
- Line break preservation
- Indentation support
- Text wrapping at configurable width
- Paragraph separation
- Copy full comment with formatting
- Expandable/collapsible long comments
- Character/line count indicator
- Comment templates
- Auto-formatting options
- Export with formatting intact

**Technical Considerations:**
- Store comments with escape sequences for line breaks
- Update tree view rendering for multi-line display
- Tooltip rendering improvements
- Text area input instead of single-line input
- `\n` handling in storage
- Preview pane for long comments
- Accessibility for screen readers

**Priority:** Medium  
**Estimated Complexity:** Low  
**Dependencies:** None

---

### 9. Comment Search

**Description:**  
Search through all comments across all highlights in the workspace, with filtering and preview capabilities.

**User Story:**  
As a developer, I want to search through all my highlight comments so that I can quickly find specific notes or references without browsing through every highlight.

**Detailed Requirements:**
- Full-text search across all comments
- Search with filters (file, color, tag, date)
- Regex search support
- Case-sensitive/insensitive toggle
- Search results preview
- Jump to highlight from search results
- Search history
- Search and replace in comments
- Export search results
- Highlight search terms in results
- Search within specific workspace folders

**Technical Considerations:**
- Indexing system for fast search
- Search algorithm (fuzzy vs. exact)
- UI for search interface (tree view, panel, or quick pick)
- Search result ranking/relevance
- Incremental search
- Performance with large numbers of highlights
- Integration with VS Code's search API

**Priority:** Medium  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 10. Priority Levels

**Description:**  
Assign priority levels (high, medium, low) to highlights to indicate importance and urgency.

**User Story:**  
As a developer, I want to mark highlights with priority levels so that I can focus on the most important items first and communicate urgency to my team.

**Detailed Requirements:**
- Three priority levels: High, Medium, Low
- Visual indicators for priority (icons, colors, badges)
- Sort by priority in tree view
- Filter by priority
- Default priority setting
- Priority change shortcut
- Priority shown in tooltips
- Priority-based notifications/reminders
- Export with priority metadata
- Statistics by priority
- Critical/urgent flag (above high)

**Technical Considerations:**
- Add `priority` property to `Highlight` interface
- Priority enum definition
- Tree view icons for priority levels
- Sorting algorithm updates
- Color/style customization per priority
- Migration for existing highlights (default to medium)

**Priority:** Medium  
**Estimated Complexity:** Low  
**Dependencies:** None

---

## 🔍 Navigation & Organization

### 11. Filter Highlights

**Description:**  
Filter highlights in the tree view by color, file, tag, priority, or date range for better organization.

**User Story:**  
As a developer, I want to filter my highlights by various criteria so that I can focus on specific subsets of annotations without visual clutter.

**Detailed Requirements:**
- Filter by:
  - Color (single or multiple)
  - File/folder
  - Tag (single or multiple)
  - Priority
  - Date range (created/modified)
  - Comment content (search)
  - Line number range
- Multiple simultaneous filters (AND/OR logic)
- Save filter presets
- Quick filter toggle buttons
- Filter status bar indicator
- Clear all filters button
- Filter count display
- Persistent filter state across sessions
- Filter shortcuts

**Technical Considerations:**
- Filter state management
- Tree view data provider filtering logic
- Filter UI (tree view toolbar, command palette)
- Complex filter query parsing
- Performance with large highlight sets
- Filter persistence in workspace state
- Filter export/import

**Priority:** High  
**Estimated Complexity:** Medium  
**Dependencies:** Tags/Labels feature recommended

---

### 12. Sort Options

**Description:**  
Sort highlights in the tree view by various criteria including date, file, priority, or custom order.

**User Story:**  
As a developer, I want to sort my highlights in different ways so that I can organize them according to my current task or workflow.

**Detailed Requirements:**
- Sort options:
  - Date created (ascending/descending)
  - Date modified (ascending/descending)
  - File path (alphabetical)
  - Line number
  - Priority (high to low)
  - Color
  - Comment length
  - Tag (alphabetical)
  - Custom manual order
- Reverse sort toggle
- Multi-level sorting (primary + secondary criteria)
- Sort indicator in tree view header
- Persistent sort preference
- Sort within filtered results
- Drag-and-drop manual ordering

**Technical Considerations:**
- Sorting algorithms implementation
- Tree view refresh on sort change
- Add `sortOrder` and `customOrder` to storage
- UI for sort selection (context menu, toolbar)
- Performance with large datasets
- Stable sort to maintain manual ordering
- Sort state persistence

**Priority:** Medium  
**Estimated Complexity:** Low  
**Dependencies:** None

---

### 13. Highlight Groups

**Description:**  
Create named groups to organize related highlights together, with expand/collapse functionality.

**User Story:**  
As a developer, I want to group related highlights together so that I can organize my annotations by feature, bug, or code review session.

**Detailed Requirements:**
- Create named groups
- Assign highlights to groups (single or multiple)
- Ungrouped highlights category
- Group expand/collapse state
- Group renaming and deletion
- Drag-and-drop to move highlights between groups
- Group color coding
- Group-level operations (export, delete all, change color)
- Nested groups/subgroups
- Group templates
- Group statistics
- Search within group
- Shareable group definitions

**Technical Considerations:**
- Add `Group` class with properties (id, name, color, icon)
- Add `groupId` property to `Highlight` interface
- Group manager for CRUD operations
- Tree view hierarchical structure updates
- Group persistence in storage
- Group migration for existing highlights
- UI for group management panel

**Priority:** High  
**Estimated Complexity:** High  
**Dependencies:** None

---

### 14. Next/Previous Highlight Navigation

**Description:**  
Keyboard shortcuts to jump between highlights in the current file or across the workspace.

**User Story:**  
As a developer, I want to navigate between highlights using keyboard shortcuts so that I can quickly review my annotations without using the mouse.

**Detailed Requirements:**
- Navigate to next highlight (in current file or workspace)
- Navigate to previous highlight
- Configurable keyboard shortcuts
- Wrap around at end/beginning
- Skip to next file if no more highlights in current file
- Visual indicator of current highlight
- Navigation history (back/forward)
- Navigate by color (next red highlight)
- Navigate by tag
- Navigate by priority
- Status bar navigation controls
- Cycle through highlights in tree view order

**Technical Considerations:**
- Command implementations for next/previous
- Active highlight tracking
- Keybinding definitions in `package.json`
- Cursor positioning and selection
- Reveal highlight in tree view on navigation
- Navigation scope settings (file vs. workspace)
- Performance with large numbers of highlights

**Priority:** High  
**Estimated Complexity:** Low  
**Dependencies:** None

---

### 15. Bookmarks Integration

**Description:**  
Integrate with VS Code's native bookmarks feature, allowing highlights to be linked or converted to bookmarks.

**User Story:**  
As a developer, I want to integrate highlights with bookmarks so that I can use both features together and leverage existing bookmark workflows.

**Detailed Requirements:**
- Convert highlight to bookmark
- Convert bookmark to highlight
- Sync highlights and bookmarks
- Show bookmarks in highlight tree view
- Show highlights in bookmarks view
- Bookmark icon for highlight-bookmark hybrids
- Import bookmarks as highlights
- Export highlights as bookmarks
- Maintain both independently or sync
- Settings for sync behavior

**Technical Considerations:**
- VS Code bookmarks API integration
- Bookmark extension detection
- Add `isBookmark` property to `Highlight` interface
- Bidirectional sync logic
- Storage coordination
- Handle bookmark extension updates
- Fallback if bookmark extension not installed

**Priority:** Low  
**Estimated Complexity:** Medium  
**Dependencies:** VS Code Bookmarks extension

---

## 🤝 Collaboration & Sharing

### 16. Share Single Highlight

**Description:**  
Export individual highlights with code context as shareable snippets (text, markdown, or HTML).

**User Story:**  
As a developer, I want to share specific highlights with my team so that I can communicate important code sections with my annotations.

**Detailed Requirements:**
- Export formats: Plain text, Markdown, HTML, JSON
- Include code context (configurable lines before/after)
- Syntax highlighting in exported format
- Include file path and line numbers
- Include comment and metadata (tags, priority)
- Copy to clipboard
- Save to file
- Share via email (mailto link)
- Share via messaging platforms (Slack, Teams formatting)
- Generate shareable link (cloud storage)
- Permalink to highlight (GitHub line links)
- Screenshot with highlight visible

**Technical Considerations:**
- Export template system
- Code formatting and syntax highlighting
- Clipboard API integration
- File path resolution (relative vs. absolute)
- Privacy considerations (code visibility)
- URL encoding for share links
- Integration with cloud services (optional)

**Priority:** Medium  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 17. GitHub Integration

**Description:**  
Share highlights as GitHub comments, issues, or pull request reviews directly from VS Code.

**User Story:**  
As a developer, I want to create GitHub issues or comments from my highlights so that I can seamlessly transfer my code annotations to GitHub for team collaboration.

**Detailed Requirements:**
- Create GitHub issue from highlight
- Add comment to existing issue
- Create PR review comment from highlight
- Link highlight to GitHub issue/PR
- Sync highlight with GitHub comment
- Batch create issues from multiple highlights
- Template for issue creation
- Label and assignee selection
- Milestone assignment
- Pull request creation with highlights
- Auto-link to code on GitHub
- OAuth authentication for GitHub

**Technical Considerations:**
- GitHub API integration (Octokit)
- Authentication flow (OAuth, personal access token)
- API rate limiting handling
- Add `githubLink` property to `Highlight` interface
- Issue template rendering
- Repository detection (from Git remote)
- Branch and commit context
- Security: token storage in secure credential store
- Error handling for API failures

**Priority:** Medium  
**Estimated Complexity:** High  
**Dependencies:** Git repository, GitHub account

---

### 18. Team Sync

**Description:**  
Synchronize highlights across team members via cloud storage or Git, enabling collaborative annotations.

**User Story:**  
As a team lead, I want to sync highlights across my team so that we can share code reviews, todos, and important annotations in real-time.

**Detailed Requirements:**
- Cloud sync options (custom server, AWS S3, Azure, Google Cloud)
- Git-based sync (highlights stored in repo)
- Real-time or manual sync
- Conflict resolution (merge strategies)
- Team member identification (author tracking)
- Privacy settings (personal vs. shared highlights)
- Sync scope (workspace, folder, file)
- Offline support with sync queue
- Sync history and audit log
- Team admin controls
- Invitation system for team access
- Notification on new/updated highlights

**Technical Considerations:**
- Cloud storage provider APIs
- Git integration for `.highlights` files in repo
- Add `author`, `syncStatus`, `isShared` to `Highlight` interface
- Conflict resolution algorithm
- Authentication and authorization
- Encryption for sensitive data
- Sync protocol design
- Network error handling
- Delta sync for performance
- Storage quota management

**Priority:** Low  
**Estimated Complexity:** Very High  
**Dependencies:** External services, authentication system

---

### 19. Highlight Diff

**Description:**  
Compare highlights between Git branches, showing added, removed, or modified annotations.

**User Story:**  
As a developer, I want to compare highlights between branches so that I can see what annotations have changed during code reviews or feature development.

**Detailed Requirements:**
- Diff view for highlights between two branches
- Show added highlights (green)
- Show removed highlights (red)
- Show modified highlights (yellow)
- Side-by-side comparison view
- Generate diff report (text, HTML, PDF)
- Merge highlights from another branch
- Cherry-pick highlights to current branch
- Diff statistics (count of changes)
- Visual diff in tree view
- Export diff for sharing

**Technical Considerations:**
- Git API integration
- Highlight storage parsing from different branches
- Diff algorithm implementation
- Add `gitBranch`, `gitCommit` to `Highlight` interface
- UI for diff visualization
- Performance with large changesets
- Handle renamed/moved files
- Merge conflict resolution

**Priority:** Low  
**Estimated Complexity:** High  
**Dependencies:** Git repository

---

### 20. Review Mode

**Description:**  
Mark highlights as "reviewed" or "resolved" to track progress through code reviews or todos.

**User Story:**  
As a developer, I want to mark highlights as reviewed or resolved so that I can track my progress through code reviews and todos.

**Detailed Requirements:**
- Status options: Pending, In Review, Reviewed, Resolved, Archived
- Visual indicators for each status (icons, strike-through)
- Filter by status
- Status change tracking (who, when)
- Status history log
- Bulk status updates
- Auto-resolve based on rules (e.g., code changed)
- Reopen resolved highlights
- Status report generation
- Status-based notifications
- Archive old resolved highlights
- Review mode toggle (focus on unreviewed)

**Technical Considerations:**
- Add `status`, `statusHistory` to `Highlight` interface
- Status enum definition
- Status change event handling
- Tree view status indicators
- Filtering and sorting by status
- Archive storage separate from active highlights
- Status persistence
- Migration for existing highlights

**Priority:** Medium  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

## 🔧 Productivity Features

### 21. TODO Integration

**Description:**  
Convert highlights to TODO items that appear in VS Code's TODO tree or task list extensions.

**User Story:**  
As a developer, I want to convert my highlights to TODO items so that I can manage them in my existing task management workflow.

**Detailed Requirements:**
- Convert highlight to TODO comment in code
- Generate TODO item from highlight
- Sync with TODO Tree extension
- Sync with Task extension
- Auto-detect TODO keywords in comments (TODO, FIXME, HACK)
- Create highlight from TODO comment
- Bidirectional sync
- TODO completion tracking
- TODO priority mapping
- Export as task list (text, CSV, Markdown)
- Integration with issue trackers (Jira, Trello)

**Technical Considerations:**
- TODO comment format (language-specific)
- TODO Tree extension API integration
- Add `isTodo`, `todoStatus` to `Highlight` interface
- File modification for TODO insertion
- Sync conflict handling
- Detection of existing TODOs in code
- Mapping highlight properties to TODO format

**Priority:** High  
**Estimated Complexity:** Medium  
**Dependencies:** TODO Tree or similar extension (optional)

---

### 22. Code Snippets

**Description:**  
Save highlighted code sections as reusable snippets in VS Code's snippet library.

**User Story:**  
As a developer, I want to save highlighted code as snippets so that I can reuse common code patterns without copy-pasting.

**Detailed Requirements:**
- Create snippet from highlight
- Snippet name and description
- Snippet prefix/trigger
- Snippet placeholders ($1, $2, etc.)
- Language-specific snippet scope
- Edit snippet from highlight
- Preview snippet before saving
- Snippet library view
- Delete snippet
- Share snippet with team
- Import/export snippets
- Snippet statistics (usage count)

**Technical Considerations:**
- VS Code snippet format (JSON)
- Snippet file creation and modification
- Add `snippetId` property to `Highlight` interface
- Placeholder detection and insertion
- User snippet directory access
- Snippet validation
- Language detection for scope
- Integration with VS Code's snippet API

**Priority:** Medium  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 23. History/Undo

**Description:**  
Track changes to highlights over time with the ability to undo/redo changes and view history.

**User Story:**  
As a developer, I want to see the history of my highlights and undo changes so that I can recover from accidental deletions or modifications.

**Detailed Requirements:**
- Full change history for all highlights
- Undo/redo stack
- History timeline view
- Restore previous versions
- Compare versions (diff)
- History filters (date range, action type)
- Export history log
- History statistics
- Configurable history retention (days or count)
- Bulk undo/redo
- History search
- Purge history option

**Technical Considerations:**
- History storage format
- Add `history` array to storage structure
- Circular buffer for history entries
- History entry schema (action, timestamp, before, after, author)
- Command palette undo/redo commands
- History manager class
- Storage size management
- Performance with large history
- History persistence across sessions

**Priority:** Medium  
**Estimated Complexity:** High  
**Dependencies:** None

---

### 24. Bulk Operations

**Description:**  
Select multiple highlights to perform batch operations like delete, edit, export, or change properties.

**User Story:**  
As a developer, I want to perform operations on multiple highlights at once so that I can efficiently manage large numbers of annotations.

**Detailed Requirements:**
- Multi-select in tree view (Ctrl+click, Shift+click)
- Select all in current file
- Select all with filter criteria
- Bulk operations:
  - Delete
  - Change color
  - Change priority
  - Add/remove tags
  - Change status
  - Export
  - Move to group
  - Convert to TODO
- Confirmation dialog for destructive operations
- Undo bulk operations
- Progress indicator for large batches
- Bulk edit preview

**Technical Considerations:**
- Tree view multi-select support
- Bulk operation command implementations
- Transaction/batch processing
- Performance optimization for large selections
- UI for bulk operation confirmation
- Undo/redo for bulk changes
- Cancellation support for long operations
- Progress reporting

**Priority:** High  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 25. Auto-highlight

**Description:**  
Automatically create highlights based on patterns, keywords, or rules (e.g., all TODOs, console.log statements).

**User Story:**  
As a developer, I want to automatically highlight code patterns so that I can quickly identify todos, debug statements, or security issues across my codebase.

**Detailed Requirements:**
- Pattern-based auto-highlight rules
- Keyword matching (TODO, FIXME, HACK, console.log)
- Regex pattern support
- Language-specific rules
- File/folder scope for rules
- Auto-highlight on file open
- Auto-highlight on save
- Background scanning for new matches
- Rule enable/disable toggle
- Rule priority and ordering
- Custom color/style per rule
- Exclude patterns (negative matching)
- Rule templates library
- Import/export rules
- Auto-update when code changes

**Technical Considerations:**
- Add `Rule` class (pattern, scope, color, enabled)
- Pattern matching engine
- File system watcher for changes
- Background scanning worker
- Performance with large codebases
- Rule evaluation order
- Add `isAutoGenerated` to `Highlight` interface
- Settings schema for rules
- Incremental scanning strategy

**Priority:** High  
**Estimated Complexity:** High  
**Dependencies:** None

---

## 📊 Analytics & Insights

### 26. Highlight Statistics

**Description:**  
Display statistics about highlights including count by file, color, tag, and time period.

**User Story:**  
As a developer, I want to see statistics about my highlights so that I can understand my annotation patterns and productivity.

**Detailed Requirements:**
- Statistics dashboard/panel
- Metrics:
  - Total highlight count
  - Count by file/folder
  - Count by color
  - Count by tag
  - Count by priority
  - Count by status
  - Count by date (daily, weekly, monthly)
  - Average highlights per file
  - Most highlighted files
  - Most used colors/tags
  - Active vs. archived
- Date range filter for statistics
- Export statistics (CSV, JSON, PDF)
- Visual charts (bar, pie, line graphs)
- Refresh/update statistics
- Comparison between time periods

**Technical Considerations:**
- Statistics calculation functions
- Caching for performance
- Webview for statistics dashboard
- Charting library integration (e.g., Chart.js)
- Date range filtering logic
- Export format generation
- Real-time vs. on-demand calculation
- Storage for historical statistics

**Priority:** Low  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 27. Heatmap View

**Description:**  
Visualize the most highlighted areas of the codebase as a heatmap, showing annotation density.

**User Story:**  
As a team lead, I want to see a heatmap of our highlights so that I can identify which parts of the codebase need the most attention or have the most issues.

**Detailed Requirements:**
- File-level heatmap (color intensity by highlight count)
- Folder-level rollup
- Line-level heatmap within files
- Configurable color scheme
- Filter by highlight type (color, tag, priority)
- Date range for heatmap
- Interactive heatmap (click to navigate)
- Export heatmap visualization
- Minimap integration (show hot areas)
- Heatmap overlay on file explorer
- Comparison heatmaps (before/after, branch comparison)

**Technical Considerations:**
- Density calculation algorithm
- Webview for heatmap visualization
- D3.js or similar for visualization
- Integration with VS Code's minimap API
- Performance with large codebases
- Color gradient generation
- File tree decoration for heatmap
- Real-time updates vs. snapshot

**Priority:** Low  
**Estimated Complexity:** High  
**Dependencies:** None

---

### 28. Activity Timeline

**Description:**  
Display a timeline showing when highlights were created, modified, or resolved over time.

**User Story:**  
As a developer, I want to see a timeline of my highlight activity so that I can track my progress and review my annotation history.

**Detailed Requirements:**
- Timeline view (day, week, month, year)
- Event types: created, modified, deleted, resolved
- Filter by event type, file, tag, author
- Timeline visualization (chart/graph)
- Activity summary by period
- Export timeline data
- Compare activity between team members
- Activity streaks and milestones
- Integration with commit history
- Activity notifications/reminders
- Calendar view of activity

**Technical Considerations:**
- Add `createdAt`, `modifiedAt` timestamps to `Highlight`
- Event log storage
- Timeline data structure
- Webview for timeline visualization
- Date/time utilities
- Timezone handling
- Performance with long timelines
- Real-time activity updates
- Historical data migration

**Priority:** Low  
**Estimated Complexity:** Medium  
**Dependencies:** History/Undo feature recommended

---

### 29. Export Reports

**Description:**  
Generate comprehensive reports of all highlights in various formats (PDF, HTML, Markdown, CSV).

**User Story:**  
As a team lead, I want to generate reports of highlights so that I can share code review summaries and action items with stakeholders.

**Detailed Requirements:**
- Export formats: PDF, HTML, Markdown, CSV, JSON, Excel
- Report templates (code review, bug report, feature summary)
- Customizable report sections
- Include code snippets with syntax highlighting
- Filters for report content
- Report statistics and summaries
- Cover page and table of contents
- Date range for report
- Group by file, tag, priority, or status
- Author attribution
- Branding/logo customization
- Scheduled report generation
- Email report delivery

**Technical Considerations:**
- Template engine (Handlebars, Mustache)
- PDF generation library (jsPDF, pdfkit)
- HTML/CSS for styled output
- Syntax highlighting in exports
- Image generation for charts
- Report configuration schema
- Asynchronous generation for large reports
- Progress indicator
- Output directory management

**Priority:** Medium  
**Estimated Complexity:** High  
**Dependencies:** Statistics feature recommended

---

## ⚙️ Advanced Features

### 30. Workspace-specific Highlights

**Description:**  
Maintain separate highlight sets for different workspaces, with optional sharing or merging.

**User Story:**  
As a developer working on multiple projects, I want each workspace to have its own highlights so that annotations don't mix between unrelated projects.

**Detailed Requirements:**
- Separate storage per workspace
- Workspace identifier in storage
- Switch between workspace highlight sets
- Copy highlights between workspaces
- Merge highlights from multiple workspaces
- Global highlights (across all workspaces)
- Workspace-specific settings
- Import/export workspace highlights
- Workspace templates (default highlights for new workspaces)
- Workspace inheritance (child inherits from parent)

**Technical Considerations:**
- Workspace-specific storage files
- Workspace ID generation and tracking
- Storage path determination (workspace vs. global)
- Multi-root workspace support
- Settings scope (workspace vs. user)
- Migration from global to workspace storage
- Storage file naming convention
- Handle workspace rename/move

**Priority:** Medium  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 31. Highlight Templates

**Description:**  
Pre-defined highlight types with specific colors, styles, and metadata (bug, feature, question, etc.).

**User Story:**  
As a developer, I want to use highlight templates so that I can quickly create consistently formatted annotations without manual configuration.

**Detailed Requirements:**
- Built-in templates:
  - Bug (red, high priority, #bug tag)
  - Feature (green, medium priority, #feature tag)
  - Question (yellow, #question tag)
  - TODO (blue, #todo tag)
  - Important (orange, high priority, #important tag)
  - Review (purple, #review tag)
  - Deprecated (gray, #deprecated tag)
  - Security (red, high priority, #security tag)
- Custom template creation
- Template properties (color, style, tags, priority, icon)
- Quick apply template to highlight
- Template library/gallery
- Import/export templates
- Template preview
- Default template setting
- Template keyboard shortcuts
- Template sharing with team

**Technical Considerations:**
- Add `Template` class with properties
- Template storage and management
- Template picker UI
- Apply template logic (merge with existing properties)
- Template schema definition
- Settings for custom templates
- Template versioning
- Migration for template changes

**Priority:** High  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

### 32. Git Integration

**Description:**  
Link highlights to specific Git commits or branches, tracking annotations alongside code changes.

**User Story:**  
As a developer, I want to link highlights to Git commits so that my annotations are versioned with the code and I can see historical context.

**Detailed Requirements:**
- Link highlight to current commit
- Link highlight to specific branch
- Show commit info in highlight details
- Filter highlights by commit/branch
- Track highlights through rebases/merges
- Highlight persistence across checkout
- Show highlights from other branches
- Commit message include highlight notes
- Auto-update highlights on code changes
- Detect when highlighted code is deleted
- Move highlight when code is moved
- Git blame integration (show highlight author)

**Technical Considerations:**
- Git extension API integration
- Add `gitCommit`, `gitBranch`, `gitBlame` to `Highlight`
- Track file renames and moves
- Diff-based highlight position updates
- Handle merge conflicts for highlights
- Storage in `.git` directory or separate
- Performance with large Git history
- Detect and prompt for orphaned highlights

**Priority:** Medium  
**Estimated Complexity:** Very High  
**Dependencies:** Git repository

---

### 33. Code Lens Integration

**Description:**  
Display highlight count and quick actions inline above functions, classes, or code blocks using Code Lens.

**User Story:**  
As a developer, I want to see highlight counts inline in my code so that I can quickly identify annotated sections without switching to the tree view.

**Detailed Requirements:**
- Code Lens showing highlight count per function/class
- Click to reveal highlights in tree view
- Quick actions: Add highlight, Show all highlights
- Configurable scope (function, class, file)
- Show color breakdown (e.g., "3 highlights: 2 red, 1 yellow")
- Filter Code Lens by tag/priority
- Enable/disable Code Lens in settings
- Language-specific Code Lens
- Performance optimization (only visible regions)
- Custom Code Lens text format

**Technical Considerations:**
- Implement `CodeLensProvider` interface
- Symbol detection (functions, classes)
- Language service integration
- Add `symbolName` to `Highlight` interface
- Count aggregation per symbol
- Performance with many symbols
- Update on highlight changes
- Multi-language support

**Priority:** Medium  
**Estimated Complexity:** High  
**Dependencies:** Language-specific support

---

### 34. Multi-cursor Support

**Description:**  
Create highlights for multiple selections simultaneously using multi-cursor editing.

**User Story:**  
As a developer, I want to highlight multiple code sections at once so that I can quickly annotate similar patterns across my file.

**Detailed Requirements:**
- Detect multi-cursor selections
- Create highlights for each cursor
- Same color/comment for all (batch mode)
- Individual color/comment for each
- Preview all highlights before creating
- Multi-cursor navigation between highlights
- Edit multiple highlights simultaneously
- Delete multiple highlights at cursor positions
- Keyboard shortcut for multi-cursor highlight
- Works with find-all selections
- Merge overlapping multi-cursor highlights

**Technical Considerations:**
- Access `editor.selections` array
- Handle multiple ranges in one operation
- Batch highlight creation
- UI for batch vs. individual input
- Decoration handling for multiple ranges
- Performance with many cursors
- Undo/redo for batch operations
- State management during creation

**Priority:** Low  
**Estimated Complexity:** Medium  
**Dependencies:** None

---

## Implementation Priority Matrix

| Priority | Features |
|----------|----------|
| **High** | Custom Colors, Tags/Labels, Filter Highlights, Highlight Groups, Next/Previous Navigation, Bulk Operations, Auto-highlight, TODO Integration, Highlight Templates, Rich Text Comments |
| **Medium** | Highlight Styles, Color Picker, Icons/Emojis, Multi-line Comments, Comment Search, Priority Levels, Sort Options, Review Mode, Code Snippets, History/Undo, Workspace-specific Highlights, Git Integration, Code Lens Integration, Share Single Highlight, GitHub Integration, Export Reports |
| **Low** | Highlight Opacity Control, Bookmarks Integration, Team Sync, Highlight Diff, Statistics, Heatmap View, Activity Timeline, Multi-cursor Support |

---

## Technical Architecture Considerations

### Storage Schema Evolution
- Version storage format for future migrations
- Backwards compatibility for older versions
- Schema validation on load

### Performance Optimization
- Lazy loading for large highlight sets
- Indexing for fast search/filter
- Debouncing for real-time updates
- Virtual scrolling in tree view
- Background processing for heavy operations

### Extensibility
- Plugin/extension API for third-party features
- Custom export formats
- Custom highlight providers
- Event system for integrations

### Testing Strategy
- Unit tests for core logic
- Integration tests for VS Code APIs
- E2E tests for user workflows
- Performance benchmarks

### Documentation
- User guide for each feature
- Developer documentation for APIs
- Migration guides for breaking changes
- Video tutorials for complex features

---

## Success Metrics

For each implemented feature, track:
- User adoption rate
- User satisfaction (feedback/ratings)
- Performance impact (load time, memory)
- Bug reports and resolution time
- Feature usage frequency

---

## Future Considerations

- AI-powered features (auto-tagging, smart suggestions)
- Mobile companion app
- Browser extension for web-based editors
- Integration with project management tools
- Voice annotations
- Collaborative real-time editing
- Accessibility improvements (screen reader optimization)
- Internationalization (i18n) support

---

**End of Feature Roadmap**

*This is a living document. Features may be added, modified, or removed based on user feedback and technical feasibility.*
