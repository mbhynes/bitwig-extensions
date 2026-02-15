all: link-extensions link-scripts

clean:
	rm -r build/libs/*

link-extensions: extensions
	cp build/libs/*.bwextension ~/Documents/Bitwig\ Studio/Extensions

link-scripts: controller-scripts/
	cp -r controller-scripts/* ~/Documents/Bitwig\ Studio/Controller\ Scripts

extensions: src/
	./gradlew clean jar
