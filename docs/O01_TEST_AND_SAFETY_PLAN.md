# O-01 Rev A — Verification, Test and Safety Plan

**Revision:** 0.1 — 20 November 2026  
**Status:** Draft test plan; requires review by a competent underwater-robotics/electrical engineer before execution.

## 1. Safety boundary

Initial work is limited to bench tests and controlled tank/pool trials with permission, suitable supervision and a documented recovery plan. No live intake, dam, reservoir gate, trash rack or high-current environment testing is authorized by this plan.

Never deploy the prototype near operating turbines, intake gates, screens or other hazardous hydraulic machinery without written site approval, a site-specific risk assessment, lockout/isolation arrangements where applicable, and qualified personnel.

## 2. Staged verification

| Stage | Test | Evidence to retain | Exit condition |
|---|---|---|---|
| 0 | Requirements and hazard review | Signed requirements, hazard log, test authorization | Open high-severity hazards have controls |
| 1 | Component bench checks | Datasheets, wiring diagrams, current/voltage logs | Ratings and interfaces understood |
| 2 | Single-thruster bench test | Thrust/current/temperature vs command; fixture details | Stable, repeatable, within rated limits |
| 3 | Full propulsion bench test | Direction matrix, command mapping, fault checks | Correct control direction and safe stop |
| 4 | Dry electrical enclosure test | Seal inspection, continuity/isolation checks as appropriate | No unresolved electrical or mechanical defect |
| 5 | Enclosure leak/pressure qualification | Approved procedure, calibrated instrumentation, inspection record | Qualified limit established by competent reviewer |
| 6 | Buoyancy and trim tank test | Mass, displacement, trim and stability observations | Recoverable neutral/positive buoyancy strategy demonstrated |
| 7 | Low-energy tethered pool test | Video, depth, orientation, current, tether observations | Controlled low-speed motion and recovery |
| 8 | Mock rack inspection test | Panel coverage, view quality, repeatability, report | Defined inspection task completed reproducibly |
| 9 | Low-visibility payload comparison | Optical and acoustic evidence with stated conditions | Payload choice supported by measured need |

## 3. Suggested measurable metrics

Set numeric thresholds only after requirements and equipment limits are reviewed. Do not invent pass values before the measurement system is selected.

Record at minimum:
- static buoyancy and trim;
- pitch/roll deviation at a stationary test point;
- position/heading drift over a defined observation interval;
- time to recover a requested inspection view;
- repeatability of camera stand-off and orientation;
- video dropouts, latency and recording completeness;
- lighting setting and observable backscatter;
- depth-sensor error against a calibrated reference;
- tether voltage drop, current and temperature;
- leak detector response and shutdown time;
- recovery success under simulated loss of control/power (using safe, controlled simulation).

## 4. Fault-injection cases

Test one fault at a time in a controlled, recoverable environment:
- one thruster unavailable;
- loss of depth sensor;
- IMU data invalid or stale;
- video stream lost;
- tether communications interrupted;
- surface power removed;
- leak alarm simulated;
- operator emergency stop activated.

For each case document expected behaviour, actual behaviour, operator action, recovery method and whether the test passed. The safe state should be explicitly designed; do not assume that cutting power automatically makes the vehicle safe or recoverable.

## 5. Hazard log — initial set

| Hazard | Possible consequence | Required controls before test |
|---|---|---|
| Electrical fault/water ingress | Shock, fire, equipment damage | Appropriate isolation/protection, fuse, sealed enclosure qualification, competent electrical review |
| Unexpected thruster activation | Injury or equipment damage | Propeller guards, arm/disarm logic, physical disconnect, clear exclusion zone |
| Tether entanglement | Vehicle loss, snagging, personnel hazard | Tether plan, strain relief, controlled payout/retrieval, spotter |
| Vehicle instability | Collision with structure or loss of view | Buoyancy/trim work, low-energy first tests, protected frame |
| Loss of power/communications | Loss of control or recovery | Defined failsafe, surface-side stop, recovery line/plan |
| Pressure-housing failure | Flooding, loss of vehicle | Qualified enclosure, conservative test increments, remote/deconflicted testing |
| Poor visibility/backscatter | Incorrect inspection conclusion | Record conditions, lighting trials, engineer review, no automated diagnosis |
| Live plant/hydraulic flow | Entrapment, fatality, plant damage | No live testing without formal site authorization, isolation and specialist safety plan |

## 6. Test data and change control

Every test record must include:
- date, location and authorization;
- vehicle configuration and revision;
- component serial/model identifiers;
- sensor calibration status;
- test operator and safety observer;
- environmental conditions;
- procedure version;
- raw logs, video and photographs;
- anomalies, corrective actions and retest result.

A configuration change to frame, thrusters, power, tether, housing, software failsafe or payload requires a change note and review of affected tests.

## 7. Stop-work conditions

Stop immediately for unexpected movement, tether damage, leak indication, overheating, electrical fault, loss of reliable control, unsafe test-area access or uncertainty about recovery. Do not repeat a failed test until the hazard and corrective action are understood.
