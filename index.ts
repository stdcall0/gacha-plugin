import fs from 'node:fs'

const files = fs.readdirSync('./plugins/gacha-plugin/apps').filter(file => file.endsWith('.js'))

let ret = []
files.forEach((file) => {
    ret.push(import(`./apps/${file}`))
})

if (!global.segment) {
    try {
        // @ts-ignore
        global.segment = (await import('oicq')).segment
    } catch (err) {
        // @ts-ignore
        global.segment = (await import('icqq')).segment
    }
}

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
    let name = files[i].replace('.js', '')

    if (ret[i].status != 'fulfilled') {
        // @ts-ignore
        logger.error(`载入插件错误：${logger.red(name)}`)
        // @ts-ignore
        logger.error(ret[i].reason)
        continue
    }
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}

export { apps }