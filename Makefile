help:								## Show this help.
	@echo ''
	@echo 'Available commands:'
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ''
.PHONY: help

build:										## Build the docker image (production)
	docker build --force-rm -t sammlerio/user-profile -f Dockerfile.prod .
.PHONY: build

run:											## Run the docker image
	docker run -it sammlerio/user-profile
.PHONY: run

build-test:								## Build the docker image (test image)
	docker build --force-rm -t sammlerio/user-profile-test -f Dockerfile.test .
.PHONY: build-test

gen-readme:					## Generate README.md (using docker-verb)
	docker run --rm -v ${PWD}:/opt/verb stefanwalther/verb
.PHONY: gen-readme

up-deps:									## Run services being dependent on
	docker-compose --f=docker-compose.deps.yml up
.PHONY: up-deps

rs-deps: down-deps up-deps
.PHONY: rs-deps

down-deps:								## Stop services being dependent on
	docker-compose --f=docker-compose.deps.yml down
.PHONY: down-deps
