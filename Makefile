include .env

.EXPORT_ALL_VARIABLES:

build:
	@docker build -t workour_fronend .

start:
	@docker run -it\
	 -v ${PWD}/src:/app/src\
	 -p 3002:3000 --rm\
	 workour_fronend

clean:
	@docker image rm workour_fronend