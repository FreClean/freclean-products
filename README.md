# FreClean Products

The canonical product data for FreClean's cleaning and fragrance product lines: catalog data, JSON Schema, an SDS template, packaging guidelines, and a validation script that fails CI if a product claims availability it hasn't earned.

Part of the FreClean ecosystem. `freclean-api` and `freclean-website` should read product facts from `catalog/products.yaml` rather than duplicating them.

## Status

**In development.** One real product line (FreClean Multi-Surface Cleaner) is tracked at `lifecycleStatus: development`; a fragrance line is tracked at `planned`. No product in this catalog is currently `available`.

## Structure

| Path | Purpose |
|---|---|
| `schema/product.schema.json` | JSON Schema every catalog entry must satisfy |
| `catalog/products.yaml` | The actual product data — source of truth |
| `scripts/validate-catalog.ts` | Validates the catalog against the schema, and enforces the realism rule (see below) |
| `docs/PRODUCT-LIFECYCLE.md` | The five lifecycle states and how a product moves between them |
| `docs/SDS-TEMPLATE.md` | Safety Data Sheet template, required before a product can go `available` |
| `docs/PACKAGING-GUIDELINES.md` | Label requirements and what not to print yet |
| `assets/img/` | Current product photography |

## The realism rule, enforced mechanically

A product cannot be marked `lifecycleStatus: available` in this catalog unless it also has a real SKU (not the placeholder `"Not yet available"`) and `manufacturingStatus: in_production`. `scripts/validate-catalog.ts` checks this on every push via CI — see `docs/PRODUCT-LIFECYCLE.md` for why this is enforced in code rather than left to convention.

## Getting started

```bash
npm install
npm run validate    # validates catalog/products.yaml against the schema
```

## Roadmap for this repo

- [ ] Publish a real SDS for the Multi-Surface Cleaner once the formulation is finalized
- [ ] Assign real SKUs once packaging is finalized
- [ ] Add a script that syncs this catalog into freclean-api's `/api/products` on deploy
- [ ] Add ingredient/hazard data once available

## License

Not provided.
