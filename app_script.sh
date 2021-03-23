#!/bin/sh

SRC_DIR=src
REACT_APP_BUILD_DIR=/var/www/react-app/build


build() {
	if [ -d "$SRC_DIR" ]; then
		yarn install && npm run build && rm -rf $REACT_APP_BUILD_DIR && cp -r build $REACT_APP_BUILD_DIR
		echo "Logs: New build is generated and deployed at $REACT_APP_BUILD_DIR...."
	else
		echo "Logs: Build failed...."
	fi
}

clean_build() {
	rm -rf build node_modules yarn.lock
	build
}

option="${1}"
case ${option} in
   -clean_build)
        clean_build
        ;;
   -build)
        build
        ;;
   -h)
      echo -e "\n`basename ${0}`: usage: [-build] | [-clean_build] | [-h]\n"
      echo "    -build: build the package with existing node_modules packages."
      echo "    -clean_build: Remove all the generated packages and build."
      echo -e "    -h: info to run the application\n"
      ;;
   *)
      echo -e "\n`basename ${0}`: usage: [-build] | [-clean_build] | [-h]\n"
      exit 1 # Command to come out of the program with status 1
      ;;
esac
