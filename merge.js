const process = require('process');
const fs = require('fs');
const TOML = require('@iarna/toml');

const mergeAllowList = (base, overrides) => {
  if (!base.allowlist){
    return overrides.allowlist;
  }
  const result = base.allowlist;
  if (! overrides.allowlist){
    return result;
  }
  const props = ["commits", "files", "paths", "regexes"];
  props.forEach(prop => {
    result[prop] = [...(result[prop] || []), ...(overrides.allowlist[prop] || [])];  
    if (result[prop].length === 0){
      delete result[prop];
    }
  });
  return result;
}

if (process.argv.length !== 4) {
  console.error("Usage: merge base.toml overrides.tml");
  process.exit(1);
}

const baseObject = TOML.parse(fs.readFileSync(process.argv[2], 'utf8'));
const overridesObject = TOML.parse(fs.readFileSync(process.argv[3], 'utf8'));

overridesObject.rules.forEach(rule => {
  const baseRule = baseObject.rules.find(_rule => _rule.description === rule.description);
  if (baseRule) {
    baseRule.allowlist = mergeAllowList(baseRule, rule)
  }
  else {
    baseObject.rules.push(rule);
  }
});

baseObject.allowlist = mergeAllowList(baseObject, overridesObject);

console.log(TOML.stringify(baseObject));
