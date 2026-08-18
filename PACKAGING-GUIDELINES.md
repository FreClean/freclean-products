# Packaging Guidelines

## Current packaging (in development)

| Size | Format | Status |
|---|---|---|
| 400ml | Flip-top bottle | In development |
| 750ml | Trigger-spray bottle | In development |

## Label requirements

Every FreClean product label must include:

- Product name and FreClean logo
- Net contents (size + unit)
- "Made in Haiti"
- Category (e.g. "Multi-Surface Cleaner")
- Hazard statements, once the SDS is published (see `SDS-TEMPLATE.md`); never omit required hazard language once ingredients are finalized.
- Batch/lot code, once batch tracking is enabled (see `products.yaml` → `batch.batchTrackingEnabled`)
- Contact information: freclean7@gmail.com

## What not to do

- Do not print a barcode/SKU on packaging until that SKU is finalized in `products.yaml`.
- Do not print "Available at retailers" language until `lifecycleStatus: available` is set and validated (see `PRODUCT-LIFECYCLE.md`).
- Do not print ingredient claims not yet confirmed in the SDS.

## Sustainability

Packaging material choice (recyclability, refill options) is not yet finalized; track decisions here once made rather than in marketing copy.
