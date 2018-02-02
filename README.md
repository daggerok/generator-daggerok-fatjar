# generator-daggerok-fatjar [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generate fatjar project

## Installation

First, install [Yeoman](http://yeoman.io) and generator-daggerok-fatjar using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-daggerok-fatjar
```

Then generate your new project:

```bash
yo daggerok-fatjar
# enter projectDirectory or just press enter (default: app)
# chose projectType (default: java)
cd $projectDirectory
```

using gradle

```bash
idea build.gradle
bash gradlew
```

using maven

```bash
idea pom.xml
bash mvnw
```

docker-compose

```bash
# gradle
bash gradlew composeUp
# maven
bash mvnw com.dkanejs.maven.plugins:docker-compose-maven-plugin:1.0.1:up
```

## What's inside?

java project:

 * java 8 based project
 * lombok (slf4j + logback logging)
 * vavr (javaslang)
 * support fatjar
 * support maven
 * support gradle
 * supports testing junit 4 / 5
 * docker / docker-compose support

scala project:

 * scala 2.11 based project
 * lombok (slf4j + logback logging)
 * support fatjar
 * support maven
 * support gradle
 * support testing using junit 4, scalactic, scalatest, specs2
 * docker / docker-compose support

java parent multi project:

 * java 8 based parent multi project
 * vavr (javaslang)
 * support maven
 * support gradle
 * docker / docker-compose support

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Maksim Kostromin](https://github.com/daggerok)

[npm-image]: https://badge.fury.io/js/generator-daggerok-fatjar.svg
[npm-url]: https://npmjs.org/package/generator-daggerok-fatjar
[travis-image]: https://travis-ci.org/daggerok/generator-daggerok-fatjar.svg?branch=master
[travis-url]: https://travis-ci.org/daggerok/generator-daggerok-fatjar
[daviddm-image]: https://david-dm.org/daggerok/generator-daggerok-fatjar.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/daggerok/generator-daggerok-fatjar
[coveralls-image]: https://coveralls.io/repos/daggerok/generator-daggerok-fatjar/badge.svg
[coveralls-url]: https://coveralls.io/r/daggerok/generator-daggerok-fatjar
