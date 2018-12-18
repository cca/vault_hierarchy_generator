# OpenEQUELLA Hierarchy Generator

Generate a new external review or student work hierarchy for [VAULT](https://vault.cca.edu) from an existing one by dictating values (e.g. role UUIDs, program name, semester) to fill into a template's XML.

```sh
> node index > program-review.xml
```

## How does it work?

One can export hierarchy objects from OpenEQUELLA using the admin console. These objects are large XML documents with strings, scripts, permissions, and collection UUIDs present in them. By replacing specific values with template strings like `TPL_COLLECTION_UUID` we can then run a script that populates the XML template with new values, essentially cloning a hierarchy but adjusting all its values slightly. When the new hierarchy created from a template is imported into OpenEQUELLA, it will ask "do you wish to create the tree with new UUIDs?" which prevents the old hierarchy (the basis for the template) from being overwritten.

This tool was designed with external reviews in mind but can be used for any hierarchy—see the "student-work-template.xml" which creates hierarchies suitable for the Student Work folders in VAULT. If a particular template string doesn't appear in a template, it will be ignored (e.g. "semester" isn't relevant for Student Work hierarchies).

**But how do I find the UUIDs to fill in as replacement values?** While most (but frustratingly not all) UUIDs are visible in the admin console, the easiest way to look them up is with [equella-cli](https://www.npmjs.com/package/equella-cli):

```sh
> # copy admin role UUID to clipboard (Mac OS X, jq installed separately)
> eq role --name 'Interaction Design Workstudy Role' | jq -r .id | pbcopy
> # copy collection UUID to clipboard
> eq collection --name 'Painting/Drawing Program' | jq -r .uuid | pbcopy
```

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
