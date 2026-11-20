# O-01 Inspection Intelligence — MVP Specification

**Revision:** 0.1 — 20 November 2026  
**Purpose:** Human-reviewed inspection evidence, not automated structural diagnosis.

## 1. MVP goal

Turn a recorded inspection into a traceable, panel-wise evidence package that an engineer can review. Version 1 should make collection and retrieval of evidence reliable before adding AI classification.

## 2. Primary entities

### Inspection project
- project ID and customer/site alias;
- structure type and inspection scope;
- operator and reviewing engineer;
- approved panel/rack layout reference;
- planned stand-off and safe operating constraints.

### Inspection run
- unique run ID;
- vehicle and payload configuration revision;
- operator;
- date/time and local timezone;
- site conditions recorded by the operator;
- depth and orientation sensor calibration status;
- video file references and data-integrity status.

### Inspection panel
- stable panel ID, e.g. RACK-A-PANEL-001;
- row/column or drawing reference;
- approximate location and orientation supplied by the inspection plan;
- coverage status: not inspected / partial / reviewed / inaccessible.

### Observation
- observation ID and linked panel/run;
- timestamp and video timecode;
- still image or video clip reference;
- depth and attitude at capture;
- optional estimated position with an explicit uncertainty/quality field;
- human-entered tag (e.g. debris, apparent deformation, missing member, corrosion-like appearance, unknown);
- reviewer status and notes.

**Do not label an observation as a confirmed defect or safety finding unless a qualified engineer makes that determination.**

## 3. Core user workflow

1. Create an inspection project and import the rack-panel layout.
2. Start a run and select the vehicle/payload configuration.
3. Record video and sensor metadata on a shared timebase.
4. Mark the active panel during inspection.
5. Add manual observations while reviewing footage.
6. Link each observation to a video timecode and still frame.
7. Review missing coverage and incomplete metadata.
8. Export a structured PDF/CSV/JSON report and evidence index.

## 4. Required MVP features

- operator login or named operator field for the pilot;
- project/run/panel identifiers;
- synchronized recording metadata;
- manual panel selection and annotation;
- time-linked snapshots and clips;
- depth, pitch, roll and heading where sensors expose them;
- data-quality flags and missing-sensor warnings;
- reviewer comments and disposition;
- PDF report and machine-readable CSV/JSON export;
- audit history for edits and reviewer sign-off.

## 5. Report structure

1. Cover page: project, site, run, date, operator and reviewer.
2. Inspection scope and limitations.
3. Vehicle/payload configuration and sensor calibration state.
4. Environmental/visibility notes.
5. Panel coverage matrix.
6. Observations: panel ID, timecode, depth, image, human tag and comments.
7. Inaccessible or uninspected areas.
8. Data-quality exceptions.
9. Engineer review and sign-off section.
10. Appendices: evidence file index and raw sensor log references.

## 6. Non-goals

- automatic defect detection or severity grading;
- fitness-for-service, structural integrity or dam-safety conclusions;
- georeferencing claims without a validated localization method;
- automatic comparison across missions until coordinate registration and uncertainty are validated;
- cloud storage of sensitive site data without the customer's security approval.

## 7. Acceptance criteria

The MVP is ready for mock-rack evaluation when it can:
- create and export a complete inspection record;
- link every observation to a panel and video timecode;
- preserve original video and raw sensor logs;
- show missing or invalid metadata rather than silently invent it;
- identify uninspected panels;
- let a reviewer add and sign off comments;
- reproduce the same report from the same source dataset.
