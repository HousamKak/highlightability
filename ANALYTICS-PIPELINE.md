# 📊 Analytics Pipeline

**Version:** 1.0
**Last Updated:** January 2025
**Status:** Planned

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Privacy-First Approach](#privacy-first-approach)
3. [Metrics to Track](#metrics-to-track)
4. [Analytics Architecture](#analytics-architecture)
5. [Implementation Guide](#implementation-guide)
6. [Analytics Platforms](#analytics-platforms)
7. [Data Analysis & Reporting](#data-analysis--reporting)
8. [GDPR & Privacy Compliance](#gdpr--privacy-compliance)
9. [A/B Testing](#ab-testing)
10. [Performance Monitoring](#performance-monitoring)

---

## 🎯 Overview

This document outlines the analytics strategy for Highlightability to understand user behavior, measure feature adoption, and make data-driven product decisions while respecting user privacy.

### Goals:
- ✅ Understand feature usage patterns
- ✅ Identify popular and unused features
- ✅ Track performance and reliability
- ✅ Measure conversion to premium
- ✅ Improve user experience with data
- ✅ Maintain user privacy and trust

### Key Principles:
- **Opt-In Only** - Users must explicitly consent
- **Privacy-First** - No personally identifiable information (PII)
- **Transparent** - Clear about what we collect
- **Minimal** - Only collect what's necessary
- **Secure** - Encrypted transmission and storage
- **Compliant** - GDPR, CCPA compliant

---

## 🔒 Privacy-First Approach

### What We DON'T Collect

❌ Code content or file contents
❌ File names or paths
❌ Comments or highlight text
❌ Personal information (name, email)
❌ IP addresses (anonymized at collection)
❌ Workspace names or project details
❌ Any sensitive user data

### What We DO Collect (with opt-in consent)

✅ Extension activation events
✅ Command usage frequency (anonymized)
✅ Feature adoption rates
✅ Error events (stack traces anonymized)
✅ Performance metrics (load time, memory)
✅ Session duration
✅ Extension version
✅ VS Code version
✅ Operating system (Windows/Mac/Linux)
✅ Installation/uninstallation events

### User Control

Users have complete control:
- **Default:** Analytics OFF
- **Opt-In:** Clear, easy-to-understand consent
- **Opt-Out:** Can disable anytime in settings
- **Export:** Can request their data
- **Delete:** Can request data deletion

---

## 📈 Metrics to Track

### 1. Activation Metrics

| Metric | Description | Purpose |
|--------|-------------|---------|
| **Installations** | New extension installs | Growth tracking |
| **Activations** | Extension activated in VS Code | Actual usage |
| **Active Users (DAU/WAU/MAU)** | Daily/Weekly/Monthly active users | Engagement |
| **Activation Rate** | Installs → First use | Onboarding success |
| **Time to First Value** | Install → First highlight created | UX quality |

### 2. Feature Usage Metrics

| Metric | Description | Purpose |
|--------|-------------|---------|
| **Command Usage** | Frequency of each command | Feature popularity |
| **Color Selection** | Which colors used most | Color preference |
| **Comment Usage** | % of highlights with comments | Feature adoption |
| **Export/Import Usage** | How often users export/import | Collaboration need |
| **Tree View Usage** | Tree view interactions | Navigation patterns |
| **Keyboard Shortcuts** | Shortcut vs. menu usage | Power user behavior |

### 3. User Behavior Metrics

| Metric | Description | Purpose |
|--------|-------------|---------|
| **Highlights Per Session** | Avg highlights created per session | Usage intensity |
| **Session Duration** | Time extension is active | Engagement |
| **Highlight Retention** | % of highlights kept long-term | Value perception |
| **Feature Adoption Curve** | Time to try new features | Feature discoverability |
| **User Journey** | Common workflow patterns | UX optimization |

### 4. Performance Metrics

| Metric | Description | Purpose |
|--------|-------------|---------|
| **Activation Time** | Extension startup time | Performance |
| **Command Response Time** | Latency for commands | Responsiveness |
| **Memory Usage** | Heap size over time | Resource efficiency |
| **Error Rate** | Errors per session | Reliability |
| **Crash Rate** | Crashes per 1000 sessions | Stability |

### 5. Business Metrics

| Metric | Description | Purpose |
|--------|-------------|---------|
| **Free → Pro Conversion** | % upgrading to Pro | Monetization |
| **Trial Conversion** | % converting after trial | Pricing validation |
| **Churn Rate** | % uninstalling extension | User satisfaction |
| **License Activation** | Successful license activations | Sales process |
| **Feature Gate Hits** | Premium feature attempts | Upgrade triggers |

### 6. Quality Metrics

| Metric | Description | Purpose |
|--------|-------------|---------|
| **Error Events** | Types and frequency of errors | Bug prioritization |
| **User Feedback Score** | Rating from in-app feedback | Satisfaction |
| **Support Ticket Volume** | Number of support requests | Product quality |
| **GitHub Issue Velocity** | Issues opened vs. closed | Development pace |

---

## 🏗️ Analytics Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code Extension                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  User       │ → │  Analytics  │ → │  Queue      │     │
│  │  Action     │    │  Tracker    │    │  (Local)    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                                  │ (Batch upload)
                                  ↓
┌─────────────────────────────────────────────────────────────┐
│                    Analytics Platform                        │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Ingestion  │ → │  Processing │ → │  Storage    │     │
│  │  API        │    │  Pipeline   │    │  Database   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                                  ↓
┌─────────────────────────────────────────────────────────────┐
│                    Analysis & Reporting                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Dashboard  │    │  Alerts     │    │  Reports    │     │
│  │  (Grafana)  │    │  (Email)    │    │  (Weekly)   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Event Generation** - User action triggers event
2. **Event Tracking** - Analytics module captures event
3. **Local Queue** - Events queued locally
4. **Batch Upload** - Periodically upload to server (every 5 min or 100 events)
5. **Processing** - Server processes and stores events
6. **Analysis** - Data analyzed for insights
7. **Reporting** - Dashboards and reports generated

---

## 💻 Implementation Guide

### Phase 1: Setup Analytics Module

**File:** `src/analytics/analyticsManager.ts`

```typescript
import * as vscode from 'vscode';

interface AnalyticsEvent {
    event: string;
    timestamp: number;
    properties?: Record<string, any>;
    sessionId: string;
    userId: string; // Anonymous UUID
}

export class AnalyticsManager {
    private context: vscode.ExtensionContext;
    private isEnabled: boolean = false;
    private sessionId: string;
    private userId: string;
    private eventQueue: AnalyticsEvent[] = [];
    private readonly BATCH_SIZE = 100;
    private readonly UPLOAD_INTERVAL = 5 * 60 * 1000; // 5 minutes

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.sessionId = this.generateSessionId();
        this.userId = this.getOrCreateUserId();
        this.isEnabled = this.checkUserConsent();

        if (this.isEnabled) {
            this.startUploadScheduler();
        }
    }

    private checkUserConsent(): boolean {
        const config = vscode.workspace.getConfiguration('highlightability');
        return config.get<boolean>('telemetry.enabled', false);
    }

    private getOrCreateUserId(): string {
        let userId = this.context.globalState.get<string>('analytics.userId');

        if (!userId) {
            userId = this.generateUUID();
            this.context.globalState.update('analytics.userId', userId);
        }

        return userId;
    }

    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public async trackEvent(
        eventName: string,
        properties?: Record<string, any>
    ): Promise<void> {
        if (!this.isEnabled) {
            return;
        }

        const event: AnalyticsEvent = {
            event: eventName,
            timestamp: Date.now(),
            properties: {
                ...properties,
                extensionVersion: this.getExtensionVersion(),
                vscodeVersion: vscode.version,
                platform: process.platform,
            },
            sessionId: this.sessionId,
            userId: this.userId,
        };

        this.eventQueue.push(event);

        // Upload if batch size reached
        if (this.eventQueue.length >= this.BATCH_SIZE) {
            await this.uploadEvents();
        }
    }

    private async uploadEvents(): Promise<void> {
        if (this.eventQueue.length === 0) {
            return;
        }

        const eventsToUpload = [...this.eventQueue];
        this.eventQueue = [];

        try {
            // Send to analytics platform
            await this.sendToAnalyticsPlatform(eventsToUpload);
        } catch (error) {
            console.error('Failed to upload analytics:', error);
            // Re-queue events on failure
            this.eventQueue.unshift(...eventsToUpload);
        }
    }

    private async sendToAnalyticsPlatform(
        events: AnalyticsEvent[]
    ): Promise<void> {
        // Implement based on chosen platform
        // Example for Mixpanel, Google Analytics, etc.

        const endpoint = 'https://analytics.yourserver.com/v1/events';

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ events }),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
    }

    private startUploadScheduler(): void {
        setInterval(() => {
            this.uploadEvents();
        }, this.UPLOAD_INTERVAL);
    }

    private getExtensionVersion(): string {
        const extension = vscode.extensions.getExtension('housamkak.highlightability');
        return extension?.packageJSON.version || 'unknown';
    }

    public async dispose(): Promise<void> {
        // Upload remaining events before disposing
        await this.uploadEvents();
    }
}
```

### Phase 2: Track Events

**File:** `src/extension.ts`

```typescript
import { AnalyticsManager } from './analytics/analyticsManager';

let analytics: AnalyticsManager;

export function activate(context: vscode.ExtensionContext) {
    // Initialize analytics
    analytics = new AnalyticsManager(context);

    // Track activation
    analytics.trackEvent('extension.activated');

    // Register commands with tracking
    context.subscriptions.push(
        vscode.commands.registerCommand('codeHighlighter.toggleHighlight', async () => {
            analytics.trackEvent('command.toggleHighlight');

            // Command implementation
            await toggleHighlight();
        })
    );

    // Track feature usage
    context.subscriptions.push(
        vscode.commands.registerCommand('codeHighlighter.addComment', async () => {
            analytics.trackEvent('command.addComment', {
                hasExistingComment: false, // Example property
            });

            await addComment();
        })
    );

    // Track performance
    const startTime = Date.now();
    performHeavyOperation();
    const duration = Date.now() - startTime;

    analytics.trackEvent('performance.heavyOperation', {
        durationMs: duration,
    });
}

export function deactivate() {
    analytics.dispose();
}
```

### Phase 3: User Consent UI

**Settings in `package.json`:**

```json
{
  "contributes": {
    "configuration": {
      "title": "Highlightability",
      "properties": {
        "highlightability.telemetry.enabled": {
          "type": "boolean",
          "default": false,
          "description": "Send anonymous usage data to help improve Highlightability. No personal information or code content is collected."
        }
      }
    }
  }
}
```

**First-Run Consent Dialog:**

```typescript
async function showAnalyticsConsent(context: vscode.ExtensionContext): Promise<void> {
    const hasAsked = context.globalState.get<boolean>('analytics.consentAsked');

    if (hasAsked) {
        return;
    }

    const choice = await vscode.window.showInformationMessage(
        'Help improve Highlightability by sending anonymous usage data? No personal information or code is collected.',
        'Learn More',
        'Enable',
        'No Thanks'
    );

    context.globalState.update('analytics.consentAsked', true);

    if (choice === 'Enable') {
        const config = vscode.workspace.getConfiguration('highlightability');
        await config.update('telemetry.enabled', true, vscode.ConfigurationTarget.Global);

        vscode.window.showInformationMessage('Thank you! Analytics enabled.');
    } else if (choice === 'Learn More') {
        vscode.env.openExternal(
            vscode.Uri.parse('https://github.com/housamkak/highlightability/blob/main/ANALYTICS-PIPELINE.md')
        );
    }
}
```

---

## 🔧 Analytics Platforms

### Option 1: Mixpanel (Recommended)

**Pros:**
- Free tier (100k events/month)
- User-friendly dashboards
- Cohort analysis
- Funnel tracking
- Retention reports
- A/B testing support

**Cons:**
- Requires external service
- Data stored on their servers

**Implementation:**
```typescript
import Mixpanel from 'mixpanel';

const mixpanel = Mixpanel.init('YOUR_PROJECT_TOKEN');

analytics.trackEvent = (event, properties) => {
    mixpanel.track(event, {
        distinct_id: userId,
        ...properties,
    });
};
```

### Option 2: Google Analytics 4

**Pros:**
- Free (unlimited events)
- Integration with Google ecosystem
- Advanced segmentation
- Machine learning insights

**Cons:**
- Complex setup
- Privacy concerns
- Overkill for simple needs

**Implementation:**
```typescript
import { GA4 } from 'ga-4-api';

const ga4 = new GA4('G-XXXXXXXXXX');

analytics.trackEvent = (event, properties) => {
    ga4.event({
        name: event,
        params: properties,
    });
};
```

### Option 3: Amplitude

**Pros:**
- Excellent for product analytics
- Free tier (10M events/month)
- Behavioral cohorting
- User journey mapping

**Cons:**
- Can be complex
- Focus on web apps

### Option 4: Self-Hosted (Plausible / Umami)

**Pros:**
- Full data ownership
- Privacy-first
- No external dependencies
- GDPR compliant by design

**Cons:**
- Need to host yourself
- Setup and maintenance overhead
- Simpler analytics

**Best For:** Privacy-conscious developers

### Option 5: Application Insights (Azure)

**Pros:**
- Deep integration with Azure
- Application performance monitoring
- Error tracking
- Free tier available

**Cons:**
- Microsoft ecosystem
- Overkill for simple analytics

---

## 📊 Data Analysis & Reporting

### Weekly Analytics Report

**Automated Email Report (Every Monday):**

```
📊 Highlightability - Weekly Analytics Report
Week of: January 15-21, 2025

🎯 KEY METRICS
─────────────────────────────────────────
Active Users (WAU):        1,245 (+8%)
New Installs:               342 (+15%)
Churn Rate:                 2.3% (-0.5%)
Avg Session Duration:       18 min (+2 min)

📈 FEATURE USAGE (Top 5)
─────────────────────────────────────────
1. Toggle Highlight:       5,234 uses
2. Add Comment:            2,156 uses
3. Tree View Navigation:   1,892 clicks
4. Export Highlights:        432 exports
5. Color Selection:          389 changes

💎 PREMIUM INSIGHTS
─────────────────────────────────────────
Free → Pro Conversion:     3.2% (+0.5%)
Feature Gate Hits:          156 attempts
Trial Starts:               45 users

🐛 QUALITY METRICS
─────────────────────────────────────────
Error Rate:                0.12% (-0.03%)
Crash Rate:                0.01% (stable)
Avg Response Time:         45ms (-5ms)

📉 CONCERNS & ACTION ITEMS
─────────────────────────────────────────
⚠️ Churn spike in users with <5 highlights
   → Action: Improve onboarding

✅ Export feature gaining traction
   → Action: Prioritize collaboration features
```

### Dashboard Metrics (Real-Time)

**Grafana Dashboard:**

```
┌─────────────────────────────────────────────────────────────┐
│  Highlightability Analytics Dashboard                        │
├─────────────────────────────────────────────────────────────┤
│  Active Users (Last 24h)     │  Command Usage (Today)       │
│  ┌─────────────────────────┐ │  ┌─────────────────────────┐│
│  │     1,245 users          │ │  │ ████████░░ Toggle (45%) ││
│  │     +8% vs yesterday     │ │  │ ████░░░░░░ Comment (18%)││
│  └─────────────────────────┘ │  │ ███░░░░░░░ Tree (15%)   ││
│                               │  │ ██░░░░░░░░ Export (10%)  ││
│  Error Rate (Last 7d)         │  └─────────────────────────┘│
│  ┌─────────────────────────┐ │                             │
│  │ 0.12%  [────────░░░░]   │ │  Free vs Pro Users          │
│  │ Target: <0.5%            │ │  ┌─────────────────────────┐│
│  └─────────────────────────┘ │  │ Free:  92%  █████████    ││
│                               │  │ Pro:    8%  █            ││
│  Performance (Avg)            │  └─────────────────────────┘│
│  ┌─────────────────────────┐ │                             │
│  │ Activation: 412ms        │ │  New Installs (This Week)  │
│  │ Command:     45ms        │ │  ┌─────────────────────────┐│
│  │ Memory:     28MB         │ │  │ Mon ████████            ││
│  └─────────────────────────┘ │  │ Tue ██████████          ││
└─────────────────────────────────┴──────────────────────────┘
```

---

## 🔐 GDPR & Privacy Compliance

### GDPR Requirements

✅ **User Consent** - Opt-in, not opt-out
✅ **Data Transparency** - Clear what we collect
✅ **Right to Access** - Users can request their data
✅ **Right to Erasure** - Users can delete their data
✅ **Data Portability** - Users can export their data
✅ **Data Minimization** - Collect only what's needed
✅ **Storage Limitation** - Retain data only as long as needed

### Privacy Policy

Add to README.md:

```markdown
## Privacy & Analytics

Highlightability respects your privacy. Analytics are **disabled by default**.

### What We Collect (if you opt-in):
- Anonymous usage statistics (which features you use)
- Performance metrics (extension speed)
- Error reports (to fix bugs)

### What We DON'T Collect:
- Your code or file contents
- Personal information
- IP addresses
- Workspace details

To enable analytics: Settings → Highlightability → Telemetry

Full Privacy Policy: [ANALYTICS-PIPELINE.md](ANALYTICS-PIPELINE.md)
```

### Data Retention Policy

| Data Type | Retention Period | Reason |
|-----------|------------------|--------|
| Event Data | 90 days | Trend analysis |
| Error Logs | 30 days | Bug fixing |
| User IDs (anonymous) | Indefinite | User tracking across sessions |
| Aggregated Statistics | Indefinite | Historical analysis |

---

## 🧪 A/B Testing

### Use Cases for A/B Testing

1. **Onboarding Flow** - Test different first-time experiences
2. **Premium Prompts** - Test messaging for Pro features
3. **UI Changes** - Test new layouts or designs
4. **Feature Discovery** - Test ways to highlight new features

### A/B Test Implementation

```typescript
class ABTestManager {
    private variant: 'A' | 'B';

    constructor(context: vscode.ExtensionContext) {
        // Assign user to variant (persistent)
        this.variant = this.getOrAssignVariant(context);
    }

    private getOrAssignVariant(context: vscode.ExtensionContext): 'A' | 'B' {
        let variant = context.globalState.get<'A' | 'B'>('ab.variant');

        if (!variant) {
            variant = Math.random() < 0.5 ? 'A' : 'B';
            context.globalState.update('ab.variant', variant);
        }

        return variant;
    }

    public getVariant(): 'A' | 'B' {
        return this.variant;
    }

    // Example: Test different upgrade prompts
    public showUpgradePrompt() {
        if (this.variant === 'A') {
            vscode.window.showInformationMessage(
                '🚀 Upgrade to Pro for unlimited highlights!',
                'Upgrade Now'
            );
        } else {
            vscode.window.showInformationMessage(
                '✨ Try Pro features free for 14 days!',
                'Start Trial'
            );
        }
    }
}
```

### Tracking A/B Test Results

```typescript
analytics.trackEvent('ab.upgradePromptShown', {
    variant: abTestManager.getVariant(),
});

analytics.trackEvent('ab.upgradePromptClicked', {
    variant: abTestManager.getVariant(),
});
```

---

## ⚡ Performance Monitoring

### Performance Events to Track

```typescript
// Extension activation
const activationStart = Date.now();
// ... activation logic
analytics.trackEvent('performance.activation', {
    durationMs: Date.now() - activationStart,
});

// Command execution
analytics.trackEvent('performance.command', {
    command: 'toggleHighlight',
    durationMs: executionTime,
});

// Memory usage (every 5 minutes)
analytics.trackEvent('performance.memory', {
    heapUsedMB: process.memoryUsage().heapUsed / 1024 / 1024,
    highlightCount: highlightManager.getHighlightCount(),
});
```

### Performance Alerts

Set up alerts for:
- Activation time > 1 second
- Command response > 200ms
- Memory usage > 100MB
- Error rate > 1%

---

## 🚀 Next Steps

### Phase 1: Foundation (Week 1-2)
- [ ] Choose analytics platform
- [ ] Implement AnalyticsManager
- [ ] Add user consent UI
- [ ] Test locally

### Phase 2: Core Events (Week 3)
- [ ] Track activation events
- [ ] Track command usage
- [ ] Track error events
- [ ] Test event delivery

### Phase 3: Dashboards (Week 4)
- [ ] Set up analytics dashboard
- [ ] Create weekly report automation
- [ ] Configure alerts

### Phase 4: Advanced (Week 5-6)
- [ ] Implement A/B testing
- [ ] Add performance monitoring
- [ ] Set up retention analysis
- [ ] Create conversion funnels

---

**Last Updated:** January 2025
**Next Review:** April 2025

*In God we trust. All others must bring data. - W. Edwards Deming*
