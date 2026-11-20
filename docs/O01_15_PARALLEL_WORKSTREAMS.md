# O-01 — 15 Parallel Workstreams

**Revision:** 0.1 — 20 November 2026  
**Rule:** Parallelize independent discovery, design and preparation. Do not parallelize unsafe physical testing or spend before compatibility and safety reviews.

| # | Workstream | First concrete output | Dependency / gate |
|---:|---|---|---|
| 1 | Product requirements | Rev A requirement baseline | Customer and use-case assumptions |
| 2 | Mechanical CAD | Frame/housing assembly and drawings | Dimensions, mass and payload assumptions |
| 3 | Propulsion bench | One thruster + ESC verified on safe fixture | Supplier datasheet and electrical review |
| 4 | Thrust/control allocation | Force-vector and control matrix | Candidate thruster positions |
| 5 | Buoyancy and stability | Mass/displacement/CG/CB calculations | CAD and component masses |
| 6 | Tether and surface power | Loss/current/cable specification | Power budget and required tether length |
| 7 | Enclosure and penetrators | Seal/pressure qualification plan | Cable inventory and depth requirement |
| 8 | Camera and lighting | Optical test matrix and payload shortlist | Inspection stand-off and water conditions |
| 9 | Depth and orientation | Sensor interface/calibration plan | Controller and logging architecture |
| 10 | Imaging sonar research | Payload comparison and go/no-go memo | Customer evidence that optical coverage is inadequate |
| 11 | Inspection software | Panel-wise evidence/report MVP | Metadata schema and mock panel layout |
| 12 | Verification and safety | Test procedures and hazard log | Engineering review and test facility |
| 13 | Customer discovery | 15 interview target and validated needs | Station contacts and interview permission |
| 14 | Technical partners | Lab/industry review and test-access discussions | Accurate stage description and test plan |
| 15 | Funding and governance | PRISM draft, NOC/IP and budget pack | Exact call rules, institution approval and verified quotes |

## First sequence of deliverables

**Immediate**
- freeze the inspection-only scope;
- collect and compare supplier quotes;
- perform requirements and interface review;
- draft the PRISM application using the exact TOCIC form;
- complete the mock-rack inspection software data model;
- record every outreach message and next action.

**After design review**
- order only a single propulsion bench-test configuration;
- perform dry and bench tests;
- complete controlled tank tests in stages;
- demonstrate panel-wise inspection on a mock rack.

**After controlled test evidence**
- request design-partner letters only from organizations that have expressed genuine interest;
- seek a supervised, authorized field pilot;
- revisit accelerator applications that require proof-of-concept or technical validation.

## Operating rules

1. A sent email is not a partnership.
2. An application enquiry is not a submitted application.
3. A concept rendering is not a physical prototype.
4. A target specification is not a measured capability.
5. Never test in live intake structures without written permission and a site-specific safety plan.
6. Track each task with owner, status, next action, dependency and evidence.
