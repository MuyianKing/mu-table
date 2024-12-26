import child_process from 'node:child_process'

function exec(cmd) {
  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (error) => {
      if (!error) {
        resolve('ok')
      }
      else {
        reject(error)
      }
    })
  })
}

function build() {
  exec('vite build')
}

build()
