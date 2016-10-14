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
    .pipe(replaceStream('TPL_PROGRAM_ADMIN_UUID', replacements['program-admin-role-uuid']))
    .pipe(replaceStream('TPL_DIVISION_ADMIN_UUID', replacements['division-admin-role-uuid']))
    .pipe(replaceStream('TPL_REVIEWER_UUID', replacements['external-reviewer-role-uuid']))
    // work study may not exist, only tricky one
    .pipe(replaceStream(' OR R:TPL_WORK_STUDY_UUID', (match) => {
        // return OR R:UUID & empty string if not (delete the work study role from template)
        return replacements['work-study-uuid'] ? ' OR R:' + replacements['work-study-uuid'] : ''
    }))
    .pipe(process.stdout)
