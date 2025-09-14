# bitwig-extensions
Bitwig Studio Controller Extensions

A scripting guide and API reference resides in Bitwig Studio under Help > Documentation > Developer Resources.

## JAVA codestyle

If you plan on contributing to this repository please import `code-formatting.xml` in your IDE.

## Developer Quickstart

### Setup

- Install JDK 21
```
brew install openjdk@21
```
- Set `JAVA_HOME`;
```
echo 'export PATH="/usr/local/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc
```

### Building the project
Note that the `build.gradle` file has been modified on this branch to compile only a subset of class files.
This may be built with:
```
./gradlew clean jar
```

### Linking the extension
The jar file (`.bwextension`) can now be linked from the [extension directory](https://www.bitwig.com/support/technical_support/how-do-i-add-a-controller-extension-or-script-17/):
```
cp build/libs/apcmk2custom.bwextension ~/Documents/Bitwig\ Studio/Extensions
```
