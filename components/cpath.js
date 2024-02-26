const cwd = process.cwd();
const Path = {
    Process: cwd,
    Resource: `${cwd}/plugins/gacha-plugin/resources`,
    HTML: `${cwd}/plugins/gacha-plugin/resources/html`,
    Image: `${cwd}/plugins/gacha-plugin/resources/img`,
    MiaoRes: `${cwd}/plugins/miao-plugin/resources/meta-sr/artifact`
};
export default Path;
