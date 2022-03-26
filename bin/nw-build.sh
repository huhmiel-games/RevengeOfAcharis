#!/bin/bash
echo "start building"
mkdir ../nw-build/acharis/build
cp -r ./dist/* ../nw-build/acharis/build/
cp ./styles.css ../nw-build/acharis/build/styles.css
cp ./favicon.png ../nw-build/acharis/build/favicon.png
cp ../nw-build/acharis/package.json ../nw-build/acharis/build/package.json
pushd ../nw-build/acharis/build
zip -r ../package.nw .
popd
cat ../nw-build/acharis/nw ../nw-build/acharis/package.nw > ../nw-build/acharis/acharis
chmod +x ../nw-build/acharis/acharis
rm -rv ../nw-build/acharis/build
rm -rv ../nw-build/acharis/package.nw
echo "build successfull"