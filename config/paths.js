const path = require('path')
const glob = require('glob')

const files = glob.sync(path.resolve(process.cwd(),'./src/**/*.js'))
  .map(item => item.replace(process.cwd() + '/src/', ''))

function getEntries (files = []) {
  const entries = {}
  
  files.forEach(item => {
    
  })
}