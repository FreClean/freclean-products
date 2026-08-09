import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as yaml from 'js-yaml';
import Ajv from 'ajv';

const schemaPath = resolve(__dirname, '../schema/product.schema.json');
const catalogPath = resolve(__dirname, '../catalog/products.yaml');

const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const catalog = yaml.load(readFileSync(catalogPath, 'utf8')) as unknown[];

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

let hasErrors = false;

catalog.forEach((product: any, index: number) => {
  const valid = validate(product);
  if (!valid) {
    hasErrors = true;
    console.error(`\n❌ Product #${index} ("${product?.name ?? 'unnamed'}") failed schema validation:`);
    console.error(validate.errors);
  }

  // Realism rule enforcement — this is the check that actually matters:
  // a product cannot claim to be commercially available without a real SKU
  // and a supplier/manufacturing status backing that claim.
  if (product.lifecycleStatus === 'available') {
    if (product.sku === 'Not yet available' || !product.sku) {
      hasErrors = true;
      console.error(`\n❌ Product "${product.name}" is marked 'available' but has no real SKU.`);
    }
    if (product.manufacturingStatus !== 'in_production') {
      hasErrors = true;
      console.error(
        `\n❌ Product "${product.name}" is marked 'available' but manufacturingStatus is '${product.manufacturingStatus}', not 'in_production'.`,
      );
    }
  }
});

if (hasErrors) {
  console.error('\nCatalog validation failed. See errors above.\n');
  process.exit(1);
} else {
  console.log(`✅ ${catalog.length} product(s) validated against schema/product.schema.json — no invented availability claims found.`);
}
