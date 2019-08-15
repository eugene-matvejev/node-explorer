.DEFAULT_GOAL := interactive
.DEV_IMAGE := explorer-sa
.SERVE_IMAGE := explorer-sa-serve

PORT := 8081
PORT_DEBUG := 9229
DB_HOSTNAME := host.docker.internal
DB_USERNAME := root
DB_PASSWORD := password
DB_NAME := explorer
DB_PORT := 3306
DB_DIALECT := mysql

.SHARED_VOLUMES := \
	-v $(PWD)/config:/www/config \
	-v $(PWD)/database:/www/database \
	-v $(PWD)/src:/www/src \
	-v $(PWD)/var:/www/var \
	-v $(PWD)/.babelrc:/www/.babelrc \
	-v $(PWD)/.env:/www/.env \
	-v $(PWD)/.sequelizerc:/www/.sequelizerc \
	-v $(PWD)/nodemon.json:/www/nodemon.json

.ENV_VARIABLES := \
	-e PORT=$(PORT) \
 	-e DB_HOSTNAME=$(DB_HOSTNAME) \
 	-e DB_USERNAME=$(DB_USERNAME) \
 	-e DB_PASSWORD=$(DB_PASSWORD) \
 	-e DB_PORT=$(DB_PORT) \
 	-e DB_NAME=$(DB_NAME) \
 	-e DB_DIALECT=$(DB_DIALECT)

help:
	@echo ""
	@echo " Explorer SA [ client server application ] "
	@echo "-------------------------------------------"
	@echo ""
	@echo " make help\t\tdisplay help"
	@echo ""
	@echo "-- DOCKER IMAGE PREPARATION"
	@echo " make dev-image\t\tbuild [$(.DEV_IMAGE)] image which encapsulate dev-dependencies, nothing else"
	@echo " make serve-image\tbuild [$(.SERVE_IMAGE)] image of node + apline [no NPM]"
	@echo ""
	@echo "-- COMMANDS"
	@echo " make\t\t\talias for 'make $(.DEFAULT_GOAL)'"
	@echo " make interactive\trun [$(.DEV_IMAGE)] image, content become available on http://localhost:$(PORT) with debugger on $(PORT) port"
	@echo " make serve\t\trun [$(.SERVE_IMAGE)] image, content become available on http://localhost:$(PORT)"
	@echo " make test\t\texecute unit and functional tests"
	@echo " make build\t\tgenerate static assets in './build' directory"
	@echo ""

dev-image:
	docker build -t $(.DEV_IMAGE) .

serve-image:
	docker build -t $(.SERVE_IMAGE) . -f serve.Dockerfile

build: dev-image
	mkdir -p $(PWD)/build
	docker run \
		--rm \
		-it \
		-v $(PWD)/build:/www/build \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run build

test: dev-image
	docker run \
		--rm \
		--name sa-test \
		-it \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run test

interactive: dev-image
	docker run \
		--rm \
		--name sa-$(PORT) \
		-it \
		$(.SHARED_VOLUMES) \
		$(.ENV_VARIABLES) \
		-e NODE_OPTIONS="--inspect-port=:$(PORT_DEBUG)" \
		-p $(PORT):$(PORT) \
		-p $(PORT_DEBUG):$(PORT_DEBUG) \
		--entrypoint=npm \
		$(.DEV_IMAGE) run start:debug

serve: build serve-image
	docker run \
		--rm \
		--name sa-serve-$(PORT) \
		-it \
		-v $(PWD)/build:/www/build \
		$(.ENV_VARIABLES) \
		-p $(PORT):$(PORT) \
		--entrypoint=node \
		$(.SERVE_IMAGE) /www/build/app.js
