# VAULT External Review Hierarchy Generator

Generate a new external review or student work hierarchy for [VAULT](https://vault.cca.edu) from an existing one by dictating values (e.g. role UUIDs, program name, semester) to fill into a template's XML.

```sh
> node index > program-review.xml
```

## Setup

Install node & npm, then install all npm dependencies from inside this directory.

```sh
> npm i
```

Copy "example.replacements.js" to "replacements.js" and edit in the appropriate values.

## Options

The script takes only two parameters:

- `--template` accepts an XML template file with placeholder values like `TPL_PROGRAM` and `TPL_COLLECTION_UUID`
- `--replacements` accepts a JavaScript file which is just a hash of values to be inserted into the template

There's a `--help` flag with this information, too.
