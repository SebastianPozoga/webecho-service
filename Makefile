all: build install

build:
	bash -x bin/build.sh

install:
	bash -x bin/install.sh

start:
	node webecho.js --debug
