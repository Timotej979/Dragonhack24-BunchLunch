build:
	go build -o bunchlunchapi main.go

run: build
	./bunchlunchapi

watch:
	reflex -s -r '\.go$$' make run