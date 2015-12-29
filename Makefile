all: build

build:
	bash -x bin/build.sh

install:
	bash -x bin/install.sh

start:
	node webecho.js --webdebug

tests:
	mocha test -R spec --recursive
