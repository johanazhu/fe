yum install wget

wget https://github.com/NixOS/patchelf/archive/refs/tags/0.17.0.tar.gz
tar -xf 0.17.0.tar.gz
cd patchelf-0.17.0
./bootstrap.sh
./configure
make
make install
cd ..

wget https://zlib.net/fossils/zlib-1.2.9.tar.gz
tar -xf zlib-1.2.9.tar.gz
cd zlib-1.2.9
sh configure
make
cp libz.so.1.2.9 ../node_modules/canvas/build/Release/libz.so.X
cd ..

patchelf --replace-needed /lib64/libz.so.1 libz.so.X ./node_modules/canvas/build/Release/libpng16.so.16
patchelf --replace-needed libz.so.1 libz.so.X ./node_modules/canvas/build/Release/libpng16.so.16
