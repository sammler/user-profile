REPO = sammlerio
SERVICE = user-profile
NODE_VER := $(shell cat .nvmrc)

help:											## Show this help.
	@echo ''
	@echo 'Available commands:'
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ''
.PHONY: help

build:										## Build the docker image (production)
	NODE_VER=$(NODE_VER)
	docker build --build-arg NODE_VER=$(NODE_VER) -t ${REPO}/${SERVICE} -f Dockerfile.prod .
.PHONY: build

run:											## Run the docker image
	docker run -it ${REPO}/${SERVICE}
.PHONY: run

build-test:								## Build the docker image (test image)
	docker build --force-rm -t ${REPO}/${SERVICE}-test -f Dockerfile.test .
.PHONY: build-test

gen-readme:								## Generate README.md (using docker-verb)
	docker run --rm -v ${PWD}:/opt/verb stefanwalther/verb
.PHONY: gen-readme

up-deps:									## Run services being dependent on (daemon mode)
	docker-compose --f=docker-compose.deps.yml up -d
.PHONY: up-deps

up-deps-i:								## Run services being dependent on (interactive mode)
	docker-compose --f=docker-compose.deps.yml up
.PHONY: up-deps-i

rs-deps: down-deps up-deps
.PHONY: rs-deps

down-deps:								## Stop services being dependent on
	docker-compose --f=docker-compose.deps.yml down -t 0
.PHONY: down-deps

run-lint:
	docker-compose --f=docker-compose.tests.yml run user-profile-test npm run lint
.PHONY: run-lint

run-tests: 								## Run tests
	docker-compose --f=docker-compose.tests.yml run user-profile-test npm run test
.PHONY: run-tests

circleci:									## Simulate the CircleCI tests
	$(MAKE) build
	$(MAKE) build-test
	$(MAKE) run-lint
	$(MAKE) run-tests
.PHONY: circleci

circleci-validate: 				## Validate the circleci config.
	circleci config validate
.PHONY: circleci-validate

