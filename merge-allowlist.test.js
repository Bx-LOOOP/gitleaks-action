const { mergeAllowList } = require("./merge-allowlist");

describe("Merge Allow List Tests", () => {
  test("no base allowlist returns overrides allowList", () => {
    const base = {};
    const overrides = {allowlist:{description:"overrides"}};

    const result = mergeAllowList(base, overrides);

    expect(result).toStrictEqual(overrides.allowlist);
  });

  test("no overrides allowlist returns base allowList", () => {
    const base = {allowlist: {description:"base"}};
    const overrides = {};

    const result = mergeAllowList(base, overrides);

    expect(result).toStrictEqual(base.allowlist);
  });

  test("commits overrides copied to base and preserves description", () => {
    const base = { allowlist: {description: "base"}};
    const overrides = { allowlist: {description: "overrides", commits:["commit-1"]}};

    const result = mergeAllowList(base, overrides);

    expect(result).toStrictEqual({description:"base", commits:["commit-1"]});
  });

  test('overrides commits added to base commits', async () => {
    const base = { allowlist: {description: "base", commits:["commit-base"]}};
    const overrides = { allowlist: {description: "overrides", commits:["commit-1"]}};

    const result = mergeAllowList(base, overrides);

    expect(result.commits).toStrictEqual(["commit-base", "commit-1"]);
  });
  test('empty commits removed', async () => {
    const base = { allowlist: {description: "base", commits:[]}};
    const overrides = { allowlist: {description: "overrides", commits:[]}};

    const result = mergeAllowList(base, overrides);

    expect(result.commits).toBeUndefined();
  });
  test('overrides commits de-duplicated', async () => {
    const base = { allowlist: {description: "base", commits:["commit-1"]}};
    const overrides = { allowlist: {description: "overrides", commits:["commit-1"]}};

    const result = mergeAllowList(base, overrides);

    expect(result.commits).toStrictEqual(["commit-1"]);
  });

  test('files processed', async () => {
    const base = { allowlist: {description: "base", files:["base"]}};
    const overrides = { allowlist: {description: "overrides", files:["override"]}};

    const result = mergeAllowList(base, overrides);

    expect(result.files).toStrictEqual(["base", "override"]);
  });

  test('regexes processed', async () => {
    const base = { allowlist: {description: "base", regexes:["base"]}};
    const overrides = { allowlist: {description: "overrides", regexes:["override"]}};

    const result = mergeAllowList(base, overrides);

    expect(result.regexes).toStrictEqual(["base", "override"]);
  });
  test('paths processed', async () => {
    const base = { allowlist: {description: "base", paths:["base"]}};
    const overrides = { allowlist: {description: "overrides", paths:["override"]}};

    const result = mergeAllowList(base, overrides);

    expect(result.paths).toStrictEqual(["base", "override"]);
  });
});