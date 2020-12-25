const shelljs = require('shelljs')
const fs = require('fs')
const path = require('path')

const exec = shelljs.exec
const mkdir = shelljs.mkdir
const cd = shelljs.cd
const rm = shelljs.rm
const cp = shelljs.cp
const ls = shelljs.ls

const USERNAME = 'h69'
const BLOG_REPO = 'blog'

function deploy() {
  rm('-rf', `build`)
  mkdir(`build`)

  cp('-R', `docs`, `build/docs`)

  cd(`build`)

  exec(`git clone git@github.com:${USERNAME}/${BLOG_REPO}.git`)
  cp('-R', `${BLOG_REPO}/.`, `docs`)
  
  cd('..')

  let config = require(`./build/docs/.vuepress/config`)
  const sidebar = { '/': [] }
  ls(`build/${BLOG_REPO}`).forEach((file1) => {
    if (file1 !== 'README.md') {
      let children = []
      ls(`build/${BLOG_REPO}/${file1}`).forEach((file2) => {
        children.push(`/${file1}/${file2}/`)
      })
      sidebar['/'].push({
        title: file1,
        children: children
      })
    } 
  })
  config.themeConfig.sidebar = sidebar
  fs.writeFileSync(path.join(__dirname, `build`, 'docs', '.vuepress', 'config.js'), `module.exports=${JSON.stringify(config)}`)

  exec('yarn run docs:build')
  
  cp('-R', `build/docs/.vuepress/dist`, `build/dist`)
  cp('-R', `CNAME`, `build/dist/CNAME`)
  cp('-R', `LICENSE`, `build/dist/LICENSE`)

  cd(`build`)
  cd(`dist`)

  exec('git init')
  exec('git add .')
  exec('git commit -m "deploy"')
  exec(`git push -f git@github.com:${USERNAME}/${USERNAME}.github.io.git master`)

  cd('..')
  cd('..')
}

module.exports = deploy