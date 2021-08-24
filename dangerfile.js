import { warn, message, danger } from 'danger'

// const modifiedMD = danger.git.modified_files.join('- ')
// message('Changed Files in this PR: \n - ' + modifiedMD)

if (danger.bitbucket_cloud.pr.title.includes('WIP')) {
  warn('PR is considered WIP')
}
