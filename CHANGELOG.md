# Change Log

All notable changes to the "Highlightability" extension will be documented in this file.

## [0.0.2] - 2025-10-22

### Added
- GitHub Actions workflow for automated publishing to VS Code Marketplace
- npm scripts for package management (`package`, `publish`, `version:patch`, `version:minor`, `version:major`)
- Publishing guide documentation (PUBLISHING.md) with setup and release instructions
- ESLint configuration file for code quality and CI/CD pipeline

### Changed
- Updated keyboard shortcut from `Ctrl+Shift+A` to `Ctrl+Shift+Z` for toggle highlight functionality
- Fixed keyboard shortcut documentation in README and CHANGELOG to reflect correct shortcuts

### Removed
- Removed outdated QUICKSTART.md file

## [0.0.1] - 2025-10-22

### Added
- Initial release of Highlightability
- Toggle highlight functionality with keyboard shortcut (Ctrl+Shift+Z)
- Multiple highlight colors: Yellow, Green, Pink, Cyan, Orange
- Add and edit comments on highlights
- Tree View sidebar for managing all highlights
- Persistent highlights across sessions
- Dynamic range adjustment when code is edited
- Export/Import highlights to JSON
- Context menu integration
- Navigate to highlights from sidebar
- Comprehensive logging system
- Clear all highlights command
- Refresh highlights command
