# OpenEQUELLA Hierarchy Generator

Generate a new external review or student work hierarchy for [VAULT](https://vault.cca.edu) from an existing one by dictating values (e.g. role UUIDs, program name, semester) to fill into a template's XML.

```sh
> node index > program-review.xml
```

## How does it work?

One can export hierarchy objects from OpenEQUELLA using the admin console. These objects are large XML documents with strings, scripts, permissions, and collection UUIDs present in them. By replacing specific values with template strings like `TPL_COLLECTION_UUID` we can then run a script that populates the XML template with new values, essentially cloning a hierarchy but adjusting all its values slightly. When the new hierarchy is imported into OpenEQUELLA, it will ask if you want to overwrite the old one or create a new hierarchy object (typically desirable).

This tool was designed with external reviews in mind but can be used for any hierarchy—see the "student-work-template.xml" which creates hierarchies suitable for the Student Work folders in VAULT.

## Software Setup

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
