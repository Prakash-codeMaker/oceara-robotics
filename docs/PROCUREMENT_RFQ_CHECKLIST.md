# O-01 Rev A — Procurement and RFQ Checklist

**Revision:** 0.1 — 20 November 2026  
**Status:** Quote and engineering evaluation only. No purchasing approval implied.

## 1. Propulsion and ESCs

Ask suppliers for:
- exact thruster and propeller model;
- thrust versus voltage/current curve in water;
- continuous and peak ratings, duty cycle and thermal limits;
- matched ESC model, firmware and control interface;
- connector, cable and penetrator requirements;
- allowable operating depth and maintenance interval;
- propeller guard/entanglement recommendations;
- warranty, spares, lead time, GST and delivery to Pune.

Request one complete bench-test set first. Do not assume T200, Blu-Thrust Z60E or another thruster are interchangeable. Compare them with the actual frame, power budget, control interface and expected mission duty cycle.

## 2. Tether and surface power

Request:
- conductor count, gauge, resistance per metre and current rating;
- voltage-drop calculation for the proposed length and maximum current;
- data-pair specifications and achievable data rates;
- tensile strength, minimum bend radius and buoyancy;
- jacket material and water compatibility;
- connector and strain-relief details;
- electrical protection and safe disconnection approach.

The 24 V surface-fed concept is preliminary. Final design requires electrical engineering review and suitable isolation/protection.

## 3. Enclosure and penetrators

Request:
- material, dimensions and internal usable volume;
- manufacturer-rated depth/pressure and test basis;
- end-cap, O-ring, seal and fastener specifications;
- penetrator compatibility with actual cable diameters;
- corrosion compatibility and serviceability;
- pressure-test documentation and inspection procedure.

Do not assign a depth rating based solely on tube material or a supplier's generic catalogue.

## 4. Visual payload

Request:
- camera resolution, sensor size, lens/FOV and low-light performance;
- frame rate, encoding, latency and interface;
- housing rating and window material;
- light output, beam angle, dimming and heat limits;
- backscatter guidance and mounting recommendations;
- synchronization options for video and sensor timestamps.

## 5. Navigation sensors

Request:
- depth sensor range, accuracy, resolution, compensation and calibration procedure;
- IMU attitude/heading output, drift and calibration;
- interface/protocol, update rate and driver support;
- mounting orientation and installation constraints.

Do not describe IMU/depth fusion as absolute position. If repeatable rack-relative positioning is needed, evaluate additional sensing and calibration experimentally.

## 6. Acoustic payload

Separate the two use cases:
- **Altimeter:** range to a nearby surface.
- **Imaging sonar:** two-dimensional acoustic image of objects/structures.

Request imaging-sonar range, resolution, beam width, frequency, update rate, interface, software access, mounting and current India price. Purchase only after operator interviews establish that optical visibility is a real first-build limitation and the payload can fit the budget.

## 7. Quote comparison template

| Vendor | Item/model | Qty | Unit price | GST | Freight | Lead time | Rating evidence | Interface verified | Decision |
|---|---|---:|---:|---:|---:|---|---|---|---|
| Pending | Thruster + ESC test set | 1 | TBD | TBD | TBD | TBD | Pending | Pending | Hold |
| Pending | Full propulsion set | TBD | TBD | TBD | TBD | TBD | Pending | Pending | Hold |
| Pending | Tether | TBD | TBD | TBD | TBD | TBD | Pending | Pending | Hold |
| Pending | Pressure housing | TBD | TBD | TBD | TBD | TBD | Pending | Pending | Hold |
| Pending | Camera + lighting | TBD | TBD | TBD | TBD | TBD | Pending | Pending | Hold |
| Pending | Depth + IMU | TBD | TBD | TBD | TBD | TBD | Pending | Pending | Hold |
| Pending | Imaging sonar | 0 initially | TBD | TBD | TBD | TBD | Pending | Pending | Defer |

## 8. Purchase approval gates

No component order until:
1. requirement and interface are written;
2. at least two suitable technical options are compared where possible;
3. supplier documents/rating evidence are received;
4. electrical and mechanical compatibility is reviewed;
5. total landed cost is reconciled against a revised budget;
6. founder/institutional funding restrictions are understood.
