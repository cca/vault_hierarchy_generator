// load options, set defaults
var opts = require('rc')('app', {
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

// load replacement strings & name of template file
var replacements = require(__dirname + '/' + (opts.r || opts.replacements))
var template = opts.t || opts.template
var fs = require('fs')
var replaceStream = require('replaceStream')

fs.createReadStream(template)
    // perform replacements
    .pipe(replaceStream('TPL_COLLECTION_UUID', replacements['collection-uuid']))
    .pipe(replaceStream('TPL_PROGRAM', replacements.program))
    .pipe(replaceStream('TPL_SEMESTER', replacements.semester))
    // do all role UUIDs replacements in one fell swoop
    .pipe(replaceStream('TPL_WHO', (match) => {
        var acl = `R:${replacements['admin-role-uuid']} R:${replacements['college-admin-uuid']} OR R:${replacements['division-admin-role-uuid']} OR R:${replacements['external-reviewer-role-uuid']} OR `
        // may not have a work study UUID
        if (replacements['work-study-uuid']) {
            acl += `R:${replacements['work-study-uuid']} OR `
        }
        return acl
    }))
    .pipe(process.stdout)
