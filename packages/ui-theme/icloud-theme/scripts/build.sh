echo "node $(node -v)"
echo "npm $(npm -v)"
echo "pnpm $(pnpm -v)"

rm -rf dist
rm -rf vars
mkdir -p dist/theme
mkdir -p vars
cp variables/acud/tokens.ts vars/tokens.ts

tsc
echo 'tsc done'
node scripts/build.mjs

cp -r patches/* dist
cp -r vars/* dist/theme

echo "build success"
