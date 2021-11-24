<p align="center">
  <img alt="gitleaks" src="https://raw.githubusercontent.com/zricethezav/gifs/master/gitleakslogo.png" height="70" />
</p>

Gitleaks Action provides a simple way to run gitleaks in your CI/CD pipeline.


### Sample Workflow
```
name: gitleaks

on: [push,pull_request]

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
      with:
        fetch-depth: '0'
    - name: gitleaks-action
      uses: bx-looop/gitleaks-action@master
```

### Using your own .gitleaks.toml configuration
```
name: gitleaks

on: [push,pull_request]

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
      with:
        fetch-depth: '0'
    - name: gitleaks-action
      uses: bx-looop/gitleaks-action@master
      with:
        config-path: security/.gitleaks.toml
```
    > The `config-path` is relative to your GitHub Worskpace

### NOTE!!!
You must use `actions/checkout` before the gitleaks-action step. If you are using `actions/checkout@v2` you must specify a commit depth other than the default which is 1. 

ex: 
```
    steps:
    - uses: actions/checkout@v2
      with:
        fetch-depth: '0'
    - name: gitleaks-action
      uses: bx-looop/gitleaks-action@master
```

using a fetch-depth of '0' clones the entire history. If you want to do a more efficient clone, use '2', but that is not guaranteed to work with pull requests.   

### Overrides

Overrides for a repository can be defined in the file `.github/.gitleaks.overrides.toml`. This will be merged with the config allowing you to add allowlists to rules and avoiding having to duplicate the entire configuration to add a single allowlist rule.

This file should contain rules with allowlists. The matching is performed on the rule name, which should match the base rule name exactly. This is printed out when the rule is triggered.

Any allowlists present in the base configuration will be replaced if there is a match in the overrides. This is due to the fact that merging allowlists does not perform as you may expect. e.g. specifying `files` can cause the allowlist to be ignored as the regexes will only be checked in these files.

Where a rule matches an existing rule the base rule is not replaced.

If a rule does not exist in the base, it will be included in the resulting config. This allows you to add new rules.

If is also possible to replace the global allowlist.