# Emmy & Lily Web Project

## Solo Engineer Playbook

**Maintainer:** Serhii Oberemchuk  
**Role:** Solo Full-Stack Developer / Acting Tech Lead

This document defines how this project is built, reviewed, released, and supported in a one-developer setup.
The goal is simple: stable product delivery with clear engineering standards.

## 1) Product-first execution

- Every change must map to a user or business outcome.
- Before implementation, define: problem, expected result, and validation method.
- Avoid technical work that does not improve product value, reliability, or speed of delivery.

## 2) Engineering standards

- One code style across the repo (`TypeScript`, `ESLint`, `Prettier`).
- Clear naming over clever naming.
- Small modules with single responsibility.
- Reuse existing abstractions before creating new ones.

## 3) Architecture and maintainability

- Keep business logic out of view components where possible.
- Make components predictable: explicit inputs, minimal side effects.
- Prefer simple and reversible designs.
- Add dependencies only after checking maintenance, bundle impact, and security risk.

## 4) Git and change management

- One task, one focused PR-sized change.
- Use meaningful commit messages (`feat:`, `fix:`, `refactor:`, `chore:`).
- Keep each change easy to review and easy to rollback.
- Never merge unverified code into `main`.

## 5) Self-review policy (solo mode)

- Review as if a second senior engineer will maintain this in 6 months.
- Validate correctness, regressions, edge cases, readability, and security impact.
- For risky changes, perform a second pass review after a short break.

## 6) Testing policy

- Minimum for every change: local validation of the main user flow.
- Add automated tests for critical business logic and regressions.
- Bug fixes should include a reproducible test case when practical.
- No release with flaky or unreliable checks.

## 7) Performance baseline

- Treat mobile performance as a default requirement.
- Minimize unnecessary rendering and network requests.
- Cache expensive operations when safe.
- Block release if the change introduces obvious performance regressions.

## 8) Security and privacy

- No secrets in repository history.
- Validate and sanitize all external input (forms, params, API payloads).
- Keep data access minimal and explicit.
- Prioritize critical dependency vulnerabilities.

## 9) Reliability and observability

- Log critical failures (checkout, API integrations, payment-related flows).
- Ensure failure behavior is explicit: retry, fallback, or clear user message.
- Track minimum production signals: availability, error rate, latency.

## 10) Release discipline

- Every release has a short changelog.
- Manually verify core user journeys before deployment.
- Keep a rollback path for risky changes.
- Any production incident requires root-cause notes and a prevention action.

## 11) Documentation discipline

- If behavior changes, update documentation in the same change.
- Record non-obvious technical decisions in short ADR-style notes (in PR or docs).
- Keep docs operational and concise.

---

## Definition of Done

- Lint, typecheck, and build pass.
- Main user flow is verified locally.
- Risks and edge cases are reviewed.
- Relevant documentation is updated.
- Change is safe to deploy or has a rollback plan.

## Release checklist

- Confirm scope and expected impact.
- Run quality checks (`lint`, `typecheck`, `build`).
- Smoke test critical pages and conversion flow.
- Deploy with rollback path ready.
- Monitor logs and key metrics after release.

## Incident checklist

- Contain impact first (rollback, disable feature, or fallback).
- Identify root cause with concrete evidence.
- Apply fix and verify with test/reproduction scenario.
- Document incident summary and prevention action.
