const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

const ArpOtelExePath = process.argv[2]
var ArpOtelPath = ArpOtelExePath.replace('ArpOtel.exe', '')

var Services = [
    'ARPOTELSERVIS.exe', 'ARPOTELUPDATESERVIS.exe'
]
const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
var framework = ''
var found = false
const FrameworkFolders = getDirectories(`${process.env.windir}\\Microsoft.NET\\Framework\\`)
FrameworkFolders.forEach(folder => {
    if(folder.includes('v4')) {
        framework = `${process.env.windir}\\Microsoft.NET\\Framework\\${folder}`
        found = true
    }
})

if(!found) {
    console.log(`Error! Please update .NET Framework 4.x`)
}

console.log(framework)

const startServices = () => {
    Services.forEach(service => {
        child_process.exec(`${framework}\\InstallUtil.exe -i "${ArpOtelPath}${service}"`)
        child_process.exec(`net start ${service}`)
    })
}
startServices()