const process = require('process');
const fs = require('fs');
const TOML = require('@iarna/toml');

if (process.argv.length !== 4) {
  console.error("Usage: merge base.toml overrides.tml");
  process.exit(1);
}

const baseObject = TOML.parse(fs.readFileSync(process.argv[2], 'utf8'));
const overridesObject = TOML.parse(fs.readFileSync(process.argv[3], 'utf8'));

overridesObject.rules.forEach(rule => {
  const baseRule = baseObject.rules.find(_rule => _rule.description === rule.description);
  if (baseRule) {
    baseRule.allowlist = rule.allowlist
  }
  else {
    baseObject.rules.push(rule);
  }
});

baseObject.allowlist = overridesObject.allowlist || baseObject.allowlist;

console.log(TOML.stringify(baseObject));
