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
```
./gradlew build
```
