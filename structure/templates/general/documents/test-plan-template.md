---
type: template
level: document
stage: test
output-of: forge-test
consumed-by: forge-operate
version: 1.0
created: 2025-10-05
author: VSALMEID
---

# Test Plan

**Project**: [App Name]  
**Created**: [Date]  
**Author**: [QA Lead / Tech Lead]  
**Based on**:
- Specification: `specification-[app-name].md`
- Architecture: `ADD-[app-name].md`
- Implementation: Source code in repository

**Status**: Draft | In Progress | Complete

---

## Executive Summary

**Testing Scope**: All functionality from specification and implementation

**Test Approach**: Unit → Integration → E2E

**Coverage Target**: >80% code coverage

**Timeline**: [Start date] → [End date]

**Test Environment**: Development | Staging | Production

---

## 1. Test Strategy

### 1.1 Testing Pyramid

```
         /\
        /E2E\        10% - Complete user workflows
       /------\
      /  INTG  \     30% - API & storage interactions  
     /----------\
    /    UNIT    \   60% - Functions & components
   /--------------\
```

**Rationale**: 
- Heavy unit testing for fast feedback and coverage
- Integration tests for critical API interactions
- Minimal E2E for key user journeys

---

### 1.2 Test Types

#### Unit Tests
**Purpose**: Test individual functions and components in isolation

**Tools**: Jest, React Testing Library (if Custom UI)

**Coverage Target**: >85% of functions

**Example**:
```typescript
// Test pure functions, utilities, data transformations
test('formatPRStatus returns correct status', () => {
  expect(formatPRStatus('OPEN')).toBe('Open');
});
```

---

#### Integration Tests
**Purpose**: Test interactions with Forge APIs and external services

**Tools**: Jest with mocked Forge APIs

**Coverage Target**: 100% of API interactions

**Example**:
```typescript
// Test Forge Storage, external API calls
test('fetchPRData caches results in Forge Storage', async () => {
  const data = await fetchPRData('PROJ-123');
  const cached = await storage.get('pr-cache:PROJ-123');
  expect(cached).toEqual(data);
});
```

---

#### End-to-End Tests
**Purpose**: Validate complete user workflows

**Tools**: Manual testing (v1), Puppeteer/Playwright (v2)

**Coverage Target**: All P0 user stories

**Example**:
- User opens Jira issue
- Panel loads and displays PR data
- User clicks refresh
- Data updates correctly

---

### 1.3 Performance Tests
**Purpose**: Validate performance requirements from specification

**Tools**: Custom timing scripts, Forge logs

**Coverage Target**: All REQ-NFR-001 performance requirements

---

### 1.4 Security Tests
**Purpose**: Ensure security requirements are met

**Tools**: Manual scope review, security checklist

**Coverage Target**: All REQ-NFR-004 security requirements

---

## 2. Test Coverage Matrix

### 2.1 Requirements to Tests Mapping

| Requirement | Type | Acceptance Criteria | Test IDs | Priority | Status |
|-------------|------|---------------------|----------|----------|--------|
| REQ-F-001 | Functional | AC-1.1.1, AC-1.1.2 | TEST-U-001, TEST-U-002, TEST-I-001 | P0 | ⏳ Todo |
| REQ-F-002 | Functional | AC-1.2.1 | TEST-I-002, TEST-I-003 | P0 | ⏳ Todo |
| REQ-NFR-001 | Performance | < 2s load time | TEST-P-001, TEST-P-002 | P0 | ⏳ Todo |
| REQ-NFR-004 | Security | Minimum scopes | TEST-SEC-001 | P0 | ⏳ Todo |
| REQ-NFR-007 | Reliability | Error handling | TEST-U-010, TEST-U-011 | P0 | ⏳ Todo |

**Legend**: ⏳ Todo | 🏃 In Progress | ✅ Pass | ❌ Fail | ⏭️ Skipped

---

### 2.2 Code Coverage by Module

| Module | Lines | Functions | Branches | Target | Status |
|--------|-------|-----------|----------|--------|--------|
| `src/resolvers/` | 0% → | 0% → | 0% → | >85% | ⏳ |
| `src/services/` | 0% → | 0% → | 0% → | >80% | ⏳ |
| `src/utils/` | 0% → | 0% → | 0% → | >90% | ⏳ |
| **Total** | **0%** | **0%** | **0%** | **>80%** | ⏳ |

---

## 3. Unit Test Plan

### 3.1 Resolver Tests

#### TEST-U-001: Fetch PR Data - Happy Path
**Requirement**: REQ-F-001  
**Acceptance Criteria**: AC-1.1.1

**Test Case**:
```typescript
describe('fetchPRData', () => {
  it('should return array of PRs for valid issue key', async () => {
    // Arrange
    const issueKey = 'PROJ-123';
    const mockPRs = [{ id: '1', title: 'Test PR', status: 'OPEN' }];
    mockBitbucketAPI.getPRs.mockResolvedValue(mockPRs);

    // Act
    const result = await fetchPRData(issueKey);

    // Assert
    expect(result).toEqual(mockPRs);
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('OPEN');
  });
});
```

**Expected Result**: Returns array of PR objects  
**Priority**: P0  
**Estimated Time**: 1 hour

---

#### TEST-U-002: Fetch PR Data - Include Status
**Requirement**: REQ-F-001  
**Acceptance Criteria**: AC-1.1.2

**Test Case**:
```typescript
it('should include PR status in response', async () => {
  const result = await fetchPRData('PROJ-123');
  
  result.forEach(pr => {
    expect(pr).toHaveProperty('status');
    expect(['OPEN', 'MERGED', 'DECLINED']).toContain(pr.status);
  });
});
```

**Expected Result**: All PRs have valid status field  
**Priority**: P0

---

### 3.2 Caching Tests

#### TEST-U-003: Cache Hit
**Requirement**: REQ-NFR-001  
**Architecture**: ADD-DATA-002

**Test Case**:
```typescript
it('should use cached data when available and fresh', async () => {
  // Arrange - populate cache
  const cached = {
    data: [{ id: '1' }],
    timestamp: Date.now(),
    ttl: 300
  };
  storage.get.mockResolvedValue(cached);

  // Act
  const result = await fetchPRData('PROJ-123');

  // Assert
  expect(result).toEqual(cached.data);
  expect(mockBitbucketAPI.getPRs).not.toHaveBeenCalled();
});
```

**Expected Result**: Uses cache, no API call made  
**Priority**: P0

---

#### TEST-U-004: Cache Miss - Expired
**Requirement**: REQ-NFR-001

**Test Case**:
```typescript
it('should fetch fresh data when cache expired', async () => {
  // Arrange - expired cache
  const expired = {
    data: [{ id: '1' }],
    timestamp: Date.now() - 400000, // >5 min ago
    ttl: 300
  };
  storage.get.mockResolvedValue(expired);

  // Act
  await fetchPRData('PROJ-123');

  // Assert
  expect(mockBitbucketAPI.getPRs).toHaveBeenCalled();
});
```

**Expected Result**: Fetches fresh data, updates cache  
**Priority**: P0

---

### 3.3 Error Handling Tests

#### TEST-U-010: API Failure - No Cache
**Requirement**: REQ-NFR-007  
**Architecture**: ADD-REL-001

**Test Case**:
```typescript
it('should return empty array on API failure with no cache', async () => {
  // Arrange
  mockBitbucketAPI.getPRs.mockRejectedValue(new Error('API down'));
  storage.get.mockResolvedValue(null);

  // Act
  const result = await fetchPRData('PROJ-123');

  // Assert
  expect(result).toEqual([]);
  // Should NOT throw error
});
```

**Expected Result**: Graceful degradation, empty array returned  
**Priority**: P0

---

#### TEST-U-011: API Failure - Stale Cache Fallback
**Requirement**: REQ-NFR-007  
**Architecture**: ADD-REL-001

**Test Case**:
```typescript
it('should fallback to stale cache on API failure', async () => {
  // Arrange
  const staleCache = {
    data: [{ id: '999', title: 'Old PR' }],
    timestamp: 0, // Very old
    ttl: 300
  };
  mockBitbucketAPI.getPRs.mockRejectedValue(new Error('API down'));
  storage.get.mockResolvedValue(staleCache);

  // Act
  const result = await fetchPRData('PROJ-123');

  // Assert
  expect(result).toEqual(staleCache.data);
  expect(result[0].id).toBe('999');
});
```

**Expected Result**: Returns stale cache data  
**Priority**: P0

---

#### TEST-U-012: Timeout Handling
**Requirement**: REQ-NFR-007

**Test Case**:
```typescript
it('should handle timeout gracefully', async () => {
  // Arrange - simulate slow API
  mockBitbucketAPI.getPRs.mockImplementation(
    () => new Promise(resolve => setTimeout(resolve, 15000))
  );

  // Act
  const result = await fetchPRData('PROJ-123');

  // Assert
  expect(result).toBeDefined();
  // Should complete, not hang
}, 12000); // Test timeout
```

**Expected Result**: Completes within timeout  
**Priority**: P1

---

[Additional unit tests for each function/component]

---

## 4. Integration Test Plan

### 4.1 API Integration Tests

#### TEST-I-001: Bitbucket API Integration
**Requirement**: REQ-F-002  
**Architecture**: ADD-API-001

**Test Case**:
```typescript
describe('Bitbucket API Integration', () => {
  it('should fetch PRs from real Bitbucket API', async () => {
    // Use test Bitbucket account
    const result = await fetchPRData('TEST-1');
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
      expect(result[0]).toHaveProperty('status');
    }
  });
});
```

**Environment**: Development with test Bitbucket credentials  
**Expected Result**: Returns PR data from real API  
**Priority**: P0

---

#### TEST-I-002: Rate Limiting Handling
**Requirement**: REQ-NFR-007  
**Architecture**: ADD-API-001

**Test Case**:
```typescript
it('should handle rate limiting gracefully', async () => {
  // Make many rapid requests
  const promises = Array(100).fill(null).map(() => 
    fetchPRData('TEST-1')
  );

  // Should not crash, should use caching
  const results = await Promise.all(promises);
  
  expect(results).toHaveLength(100);
  expect(results.every(r => r !== null)).toBe(true);
});
```

**Expected Result**: All requests complete, leveraging cache  
**Priority**: P1

---

### 4.2 Forge Storage Integration Tests

#### TEST-I-003: Storage Persistence
**Requirement**: REQ-NFR-001  
**Architecture**: ADD-DATA-001

**Test Case**:
```typescript
it('should persist data across requests', async () => {
  const key = 'test-pr-cache';
  const value = { data: [{ id: '1' }], timestamp: Date.now(), ttl: 300 };

  await storage.set(key, value);
  const retrieved = await storage.get(key);

  expect(retrieved).toEqual(value);
});
```

**Environment**: Development Forge environment  
**Expected Result**: Data persists  
**Priority**: P0

---

#### TEST-I-004: Storage Size Limits
**Requirement**: Platform constraint (250KB/entity)

**Test Case**:
```typescript
it('should respect 250KB entity limit', async () => {
  const largeData = 'x'.repeat(300 * 1024); // >250KB

  await expect(
    storage.set('large-key', largeData)
  ).rejects.toThrow();
});
```

**Expected Result**: Error thrown for oversized data  
**Priority**: P2

---

## 5. End-to-End Test Plan

### 5.1 User Journey Tests

#### TEST-E2E-001: View PR Status in Issue Panel
**User Story**: Story 1.1  
**Requirement**: REQ-F-001

**Test Steps**:
1. Navigate to Jira issue with linked PRs
2. Locate the [App Name] panel
3. Verify panel loads within 2 seconds
4. Verify PRs are displayed with correct information
5. Verify status indicators are visible

**Expected Result**:
- Panel visible in issue view
- PRs listed with title, status, author
- Status color-coded (green=merged, blue=open, red=declined)
- Data fresh (check timestamp)

**Test Data**: Issue KEY-123 with 3 linked PRs  
**Priority**: P0  
**Estimated Time**: 15 minutes

---

#### TEST-E2E-002: Refresh PR Data
**User Story**: Story 1.2  
**Requirement**: REQ-F-001

**Test Steps**:
1. Open issue panel (from TEST-E2E-001)
2. Note current PR count
3. Create new PR in Bitbucket and link to issue
4. Click "Refresh" button in panel
5. Verify new PR appears

**Expected Result**:
- Refresh button visible and clickable
- Loading indicator shown during refresh
- New PR appears in list
- Timestamp updated

**Priority**: P1  
**Estimated Time**: 20 minutes

---

#### TEST-E2E-003: Error Handling - API Down
**Requirement**: REQ-NFR-007

**Test Steps**:
1. Disconnect network OR block Bitbucket API
2. Open issue with panel
3. Observe behavior

**Expected Result**:
- Panel shows cached data (if available)
- Clear message: "Using cached data - Unable to refresh"
- Option to retry
- No crash or blank screen

**Priority**: P1  
**Estimated Time**: 10 minutes

---

## 6. Performance Test Plan

### 6.1 Load Time Tests

#### TEST-P-001: Initial Load Time
**Requirement**: REQ-NFR-001 (< 2s load time)

**Test Case**:
```typescript
it('should load in < 2 seconds (cache hit)', async () => {
  // Pre-populate cache
  await storage.set('pr-cache:PROJ-123', {
    data: mockPRs,
    timestamp: Date.now(),
    ttl: 300
  });

  const start = Date.now();
  const result = await fetchPRData('PROJ-123');
  const duration = Date.now() - start;

  expect(duration).toBeLessThan(2000);
  expect(result).toBeDefined();
});
```

**Target**: < 2000ms (95th percentile)  
**Priority**: P0

---

#### TEST-P-002: API Call Performance
**Requirement**: REQ-NFR-001

**Test Case**:
```typescript
it('should complete API call within reasonable time', async () => {
  const start = Date.now();
  await fetchPRData('PROJ-123');
  const duration = Date.now() - start;

  expect(duration).toBeLessThan(5000); // 5 seconds max
});
```

**Target**: < 5000ms (including API latency)  
**Priority**: P1

---

### 6.2 Forge Timeout Tests

#### TEST-P-003: Stay Under 25s Timeout
**Requirement**: Platform constraint

**Test Case**:
```typescript
it('should complete well under Forge 25s timeout', async () => {
  const start = Date.now();
  
  // Worst case: multiple operations
  await fetchPRData('PROJ-1');
  await fetchPRData('PROJ-2');
  await fetchPRData('PROJ-3');
  
  const duration = Date.now() - start;
  
  expect(duration).toBeLessThan(20000); // 20s safety margin
});
```

**Target**: < 20000ms (well under 25s limit)  
**Priority**: P0

---

## 7. Security Test Plan

### 7.1 Scope Validation

#### TEST-SEC-001: Minimum Scopes Requested
**Requirement**: REQ-NFR-004, ADD-SEC-002

**Test Steps**:
1. Review `manifest.yml` permissions section
2. Verify only required scopes present:
   - `read:jira-work` ✅
   - `storage:app` ✅
3. Verify NO unnecessary scopes:
   - `write:jira-work` ❌
   - `admin:jira` ❌
   - `read:account` ❌

**Expected Result**: Only 2 scopes requested  
**Priority**: P0  
**Type**: Manual review

---

#### TEST-SEC-002: Data Encryption
**Requirement**: REQ-NFR-004

**Test Steps**:
1. Verify Forge Storage used (encrypted by platform)
2. Verify no sensitive data in logs
3. Verify API tokens stored securely

**Expected Result**: All data encrypted, no leaks  
**Priority**: P0  
**Type**: Code review + manual

---

## 8. Test Execution Schedule

### Week 1: Unit Tests
- [ ] Write all resolver unit tests (TEST-U-001 to TEST-U-005)
- [ ] Write all caching unit tests (TEST-U-006 to TEST-U-009)
- [ ] Write all error handling tests (TEST-U-010 to TEST-U-012)
- **Target**: >80% code coverage

---

### Week 2: Integration Tests
- [ ] Setup test Bitbucket account
- [ ] Run API integration tests (TEST-I-001 to TEST-I-002)
- [ ] Run storage integration tests (TEST-I-003 to TEST-I-004)
- **Target**: All integration tests passing

---

### Week 3: E2E & Performance Tests
- [ ] Manual E2E testing (TEST-E2E-001 to TEST-E2E-003)
- [ ] Performance validation (TEST-P-001 to TEST-P-003)
- [ ] Security review (TEST-SEC-001 to TEST-SEC-002)
- **Target**: All P0 tests passing

---

### Week 4: Regression & Fixes
- [ ] Fix any failing tests
- [ ] Re-run full test suite
- [ ] Generate coverage report
- [ ] Document known issues

---

## 9. Test Environment Setup

### Prerequisites
- Forge CLI installed and authenticated
- Test Jira site: `test-site.atlassian.net`
- Test Bitbucket workspace: `test-workspace`
- Node.js 18.x
- Dependencies installed: `npm install`

### Environment Configuration
```bash
# .env.test
BITBUCKET_TEST_WORKSPACE=test-workspace
BITBUCKET_TEST_REPO=test-repo
JIRA_TEST_SITE=test-site.atlassian.net
JIRA_TEST_ISSUE=TEST-123
```

### Running Tests
```bash
# Unit + Integration tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Specific test file
npm test src/__tests__/resolvers/fetchPRData.test.ts
```

---

## 10. Defect Tracking

### Bug Template

**Bug ID**: BUG-XXX  
**Test ID**: TEST-XXX-XXX  
**Severity**: Critical | High | Medium | Low  
**Priority**: P0 | P1 | P2

**Description**: [What went wrong]

**Steps to Reproduce**:
1. Step 1
2. Step 2
3. Step 3

**Expected Result**: [What should happen]

**Actual Result**: [What actually happened]

**Environment**: Development | Staging | Production

**Traces to**: REQ-XXX, ADD-XXX-XXX

---

### Bug Log

| Bug ID | Test ID | Severity | Status | Assigned To | Fixed In |
|--------|---------|----------|--------|-------------|----------|
| BUG-001 | TEST-U-005 | High | ⏳ Open | [Dev] | - |
| BUG-002 | TEST-E2E-001 | Medium | ✅ Fixed | [Dev] | v1.0.1 |

---

## 11. Test Metrics & Reporting

### Coverage Report

**Target**: >80% code coverage

**Current**:
- Statements: 0% → [Update]
- Branches: 0% → [Update]
- Functions: 0% → [Update]
- Lines: 0% → [Update]

---

### Test Results Summary

| Test Type | Total | Passed | Failed | Skipped | Pass Rate |
|-----------|-------|--------|--------|---------|-----------|
| Unit | 0 | 0 | 0 | 0 | 0% → |
| Integration | 0 | 0 | 0 | 0 | 0% → |
| E2E | 0 | 0 | 0 | 0 | 0% → |
| Performance | 0 | 0 | 0 | 0 | 0% → |
| Security | 0 | 0 | 0 | 0 | 0% → |
| **Total** | **0** | **0** | **0** | **0** | **0%** |

**Target**: 100% pass rate for P0 tests

---

### Requirements Coverage

**Total Requirements**: [X]  
**Tested**: 0 → [Update]  
**Coverage**: 0% → [Target: 100%]

---

## 12. Acceptance Criteria

### Test Plan Approved When:

- [ ] All P0 requirements have tests
- [ ] All acceptance criteria from specification tested
- [ ] Code coverage > 80%
- [ ] All critical paths have E2E tests
- [ ] Performance targets validated
- [ ] Security review complete

---

## 13. Sign-off

| Role | Name | Status | Date |
|------|------|--------|------|
| QA Lead | [Name] | ☐ Pending / ☑ Approved | [Date] |
| Tech Lead | [Name] | ☐ Pending / ☑ Approved | [Date] |
| Product Owner | [Name] | ☐ Pending / ☑ Approved | [Date] |

---

**Next Step**: Run `forge-operate` to prepare deployment and operational documentation.
