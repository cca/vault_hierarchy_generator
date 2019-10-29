// load options, set defaults
let opts = require('rc')('app', {
    'replacements': 'replacements.js',
    'template': 'template.xml'
})

if (opts.h || opts.help) {
    console.log('usage: node index [ -r replacements.js ] [ -t template.xml ]\n')
    console.log('Use an EQUELLA hierarchy as a template & inserts new values into it, writing the new hierarchy XML to stdout.\n')
    console.log('optional arguments:')
    console.log('\t-r or --replacements\tJS file of strings to insert into template (see example.replacements.js)')
    console.log('\t-t or --template\texported EQUELLA hierarchy XML to use as template')
    process.exit(0)
}

const path = require("path")
const fs = require('fs')
const replaceStream = require('replaceStream')
// load replacement strings
const replacements = require(path.join(__dirname, opts.r || opts.replacements))

fs.createReadStream(opts.t || opts.template)
    // perform replacements
    .pipe(replaceStream('TPL_COLLECTION_UUID', replacements['collection-id']))
    .pipe(replaceStream('TPL_PROGRAM', replacements.program))
    .pipe(replaceStream('TPL_SEMESTER', replacements.semester))
    // do all role UUIDs replacements in one fell swoop
    .pipe(replaceStream('TPL_WHO', (match) => {
        // add all the non-empty role IDs to a single access control list
        let acl = [
        'program-admin-id',
        'college-admin-id',
        'division-admin-id',
        'external-reviewer-id',
        'work-study-id',
            ].reduce((acl, role) => {
                if (!!replacements[role]) return acl + `R:${replacements[role]} OR `
                return acl
            }, '')
        return acl
    }))
    .pipe(process.stdout)
