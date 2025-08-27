rm -rf es
rm -rf lib

# 不执行 tsc、swc 会缺少声明文件
node --experimental-specifier-resolution=node ./scripts/version.mjs

tsc -p .

swc src -d es --source-maps
cp -r tmp/* es

swc src -d lib --source-maps  --no-swcrc  --config module.type=commonjs
cp -r tmp/* lib

rm -rf tmp

echo "build success"
