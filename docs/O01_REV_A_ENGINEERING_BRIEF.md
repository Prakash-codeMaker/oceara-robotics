# OCEARA O-01 — Rev A Engineering Brief

**Revision:** 0.1 — 20 November 2026  
**Status:** Engineering basis for review; not a released manufacturing design  
**Product stage:** Pre-prototype. No physical vehicle or field validation is claimed.

## 1. Product definition

O-01 Rev A is a compact, tethered, operator-supervised underwater vehicle intended to capture repeatable visual inspection evidence of submerged hydropower intake structures and trash racks.

The first version should prove one workflow: deploy in a controlled and authorized test environment; approach a defined mock intake-rack panel under operator control; hold a sufficiently repeatable view; record video, lighting state, depth and orientation metadata; and let an engineer annotate suspected conditions and produce a structured report.

The first version is an **inspection platform**, not a debris-removal robot. A manipulator, gripper and collection basket are deliberately deferred.

## 2. Problem and design priorities

The engineering problem is not simply obtaining a high-resolution camera image. The vehicle must maintain useful viewing geometry while the operator manages currents, tether drag, low visibility and nearby structures.

Priority order:
1. Stable, predictable movement and safe recovery.
2. Repeatable position and viewing orientation near a mock rack.
3. Reliable tether, power and communications.
4. Useful lighting and optical evidence.
5. Traceable inspection records.
6. Optional acoustic imaging as a separately evaluated payload.

## 3. Proposed subsystem architecture

| Subsystem | Rev A concept | Design status |
|---|---|---|
| Frame | Compact corrosion-resistant open frame with protected propellers and replaceable mounts | CAD and structural review required |
| Propulsion | Candidate six-thruster layout; evaluate 4 horizontal + 2 vertical only after force/moment analysis | Configuration unvalidated |
| Controller | Vehicle controller with manual pilot override and documented failsafe behaviour | Select after I/O and control review |
| Compute | Small onboard computer for video, logging and later software integration | Exact board/interface to be frozen |
| Camera | Forward-facing low-light HD inspection camera; optional second view only if justified | Lens, field of view and interface TBD |
| Lighting | Dimmable, independently controllable underwater lights; avoid backscatter where possible | Output and placement TBD |
| Depth | Pressure-based depth measurement with calibration and timestamping | Sensor and operating range TBD |
| Orientation | IMU for attitude and heading estimate; calibration and drift limitations documented | Sensor/interface TBD |
| Acoustic payload | Imaging sonar only if customer discovery demonstrates optical inspection gaps | Separate payload; not the same as an altimeter |
| Tether | Combined power/data or separately managed conductors with strain relief and buoyancy review | Length, resistance and construction TBD |
| Surface station | Protected power distribution, pilot controls, video display, recording and emergency stop | Electrical safety review required |
| Safety | Leak detection, current/voltage monitoring, watchdog and surface-side stop | Must be designed before wet testing |

**Important sensor distinction:** a sonar altimeter measures range to a nearby surface; it is not a substitute for imaging sonar. Any imaging-sonar capability must be selected, integrated and validated as its own payload.

## 4. Proposed mission envelope — targets only

The October design notes contained an indicative 0–20 m depth target, approximate 700 × 500 × 400 mm envelope and 24 V surface-fed power concept. These are planning targets, not achieved capabilities or approved operating limits.

Rev A shall not inherit a depth rating, pressure rating, thrust margin, endurance or current tolerance from a concept deck. Each must be derived from selected components, pressure-housing calculations, tether losses and controlled testing.

Before a final specification is issued, record:
- required inspection depth and maximum test depth;
- freshwater/saltwater and temperature range;
- expected flow/current envelope at the inspection location;
- target stand-off distance and acceptable image angle;
- tether length, route and handling method;
- payload mass and buoyancy margin;
- continuous and peak electrical power;
- communications and video-latency needs.

## 5. Mechanical and stability design review

The design review must include:
- total mass and displaced volume;
- centre of gravity and centre of buoyancy;
- static pitch/roll stability and trim adjustments;
- thruster force vectors and control allocation;
- loss-of-one-thruster behaviour;
- propeller guards and entanglement protection;
- frame deflection and camera vibration;
- tether attachment point, strain relief and induced yaw/roll moments;
- service access for connectors, seals and replaceable components.

Do not freeze a six-thruster configuration merely because it appears in the earlier funding deck. Verify degrees of freedom, control authority and failure cases against the intended inspection manoeuvres.

## 6. Power and tether review

The earlier concept proposed a 24 V surface-fed architecture without an onboard battery. This remains a design hypothesis. Before selecting it, calculate:
- worst-case current and cable voltage drop;
- conductor heating and continuous-duty margin;
- connector and penetrator ratings;
- isolation, fusing and emergency shutdown;
- communication and video signal integrity;
- strain relief, minimum bend radius and tether buoyancy;
- the consequence of surface power loss and tether damage.

All electrical work and wet tests require a competent reviewer and an appropriate isolated/protected test arrangement. Do not improvise mains-powered underwater equipment.

## 7. Rev A exclusions

Not part of the first demonstrator:
- autonomous navigation or unsupervised mission execution;
- AI defect diagnosis or automated structural safety assessment;
- manipulator, gripper or debris extraction;
- long-range flooded-tunnel inspection;
- imaging sonar unless a separately funded and justified payload milestone is approved;
- operation in live intakes, strong currents or hazardous plant environments.

## 8. Design-freeze gates

**Gate A — requirements:** customer interview evidence, environment assumptions and measurable acceptance criteria approved.

**Gate B — interfaces:** propulsion, controller, tether, surface power, housing penetrations, camera and sensors have compatible specifications.

**Gate C — mechanical review:** buoyancy, stability, load paths, guards and tether loads reviewed.

**Gate D — bench validation:** each electrical and propulsion subsystem tested independently.

**Gate E — controlled-water validation:** staged tank/pool tests completed with documented safety controls.

No design gate is considered passed by concept imagery, simulation alone or supplier marketing claims.
