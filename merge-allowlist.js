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
    // deduplicate
    result[prop] = [...new Set(result[prop])];
    if (result[prop].length === 0){
      delete result[prop];
    }
  });
  return result;
}
module.exports = { mergeAllowList };