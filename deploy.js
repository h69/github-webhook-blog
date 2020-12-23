const shelljs = require('shelljs')
const fs = require('fs')
const path = require('path')

const exec = shelljs.exec
const mkdir = shelljs.mkdir
const touch = shelljs.touch
const cd = shelljs.cd
const rm = shelljs.rm
const cp = shelljs.cp
const ls = shelljs.ls

const USERNAME = 'h69'
const BLOG_REPO = 'blog'

const BUILD_PATH = 'build'
const DIST_PATH = 'dist'

function deploy() {
  rm('-rf', `${BUILD_PATH}`)
  mkdir(`${BUILD_PATH}`)

  cp('-R', `docs`, `${BUILD_PATH}/docs`)

  cd(`${BUILD_PATH}`)
  exec(`git clone git@github.com:${USERNAME}/${BLOG_REPO}.git`)

  cp('-R', `${BLOG_REPO}/.`, `docs`)
  
  cd(`docs`)
  touch(`README.md`)

  cd('..')
  cd('..')

  let config = require(`./${BUILD_PATH}/docs/.vuepress/config`)
  const sidebar = { '/': [] }
  ls(`${BUILD_PATH}/${BLOG_REPO}`).forEach((file1) => {
    if (file1 !== 'README.md') {
      let children = []
      ls(`${BUILD_PATH}/${BLOG_REPO}/${file1}`).forEach((file2) => {
        children.push(`/${file1}/${file2}/`)
      })
      sidebar['/'].push({
        title: file1,
        children: children
      })
    } 
  })
  config.themeConfig.sidebar = sidebar
  fs.writeFileSync(path.join(__dirname, `${BUILD_PATH}`, 'docs', '.vuepress', 'config.js'), `module.exports=${JSON.stringify(config)}`)

  exec('yarn run docs:build')
  
  cp('-R', `${BUILD_PATH}/docs/.vuepress/dist`, `${BUILD_PATH}/${DIST_PATH}`)
  cp('-R', `CNAME`, `${BUILD_PATH}/${DIST_PATH}/CNAME`)
  cp('-R', `LICENSE`, `${BUILD_PATH}/${DIST_PATH}/LICENSE`)

  cd(`${BUILD_PATH}/${DIST_PATH}`)

  exec('git init')
  exec('git add .')
  exec('git commit -m "webhook deploy"')
  exec(`git push -f git@github.com:${USERNAME}/${USERNAME}.github.io.git master`)

  cd('..')
  cd('..')
}

module.exports = deploy