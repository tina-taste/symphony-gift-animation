# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js (App Router), React, TypeScript, CSS Modules. The request named Next.js, matching the Symphony animation repo.

## Users

Tina, designing the motion. An engineer receives the locked version and builds it.

## Product Purpose

A bench for the photograph grid on Symphony’s thank-you screen. Design tunes the motion, locks it, and sends a review link with no sliders.

## Positioning

The screen and the nine photographs stay as designed. Only the motion is tunable, and the locked file is the version engineering implements. `npm run verify:animation` fails the build if that version drifts.

## Operating Context

Used at a desk while matching the Symphony Design System frame “Your taste is in.” The review route is the handoff.

## Capabilities and Constraints

- The grid is the right-hand graphic from Figma node `2378:2011` / collage `2378:2062`.
- Photographs are the nine images already inside that graphic. No separate image set was attached.
- Lock writes `src/animation/settings.lock.json` in local dev. A production deploy does not accept lock writes.
- Matter is the Symphony face used on the screen.

## Brand Commitments

Symphony Design System. Dark thank-you screen, Matter, the existing wordmark and nav.

## Evidence on Hand

Figma file `xgAX66RfTHoRS9haUuDetE`, node `2378:2011`. Plate images sliced from that collage.

## Product Principles

- The designed screen stays put. Motion is the only thing the bench changes.
- A locked file is the handoff, not a description of it.
- Engineering sees the motion without the controls.
