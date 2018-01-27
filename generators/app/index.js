'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

function safety(input) {
  return input.replace(/\W+/g, '_') || 'app';
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('daggerok-fatjar') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'projectDirectory',
        message: 'Enter project directory',
        default: 'app'
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    const projectDirectory = safety(this.props.projectDirectory);

    [
      'app/**/*',
      'app/**/.*',
      'app/.*/**/*',

    ].forEach(pattern => this.fs.copy(
      this.templatePath(pattern),
      this.destinationPath(`${projectDirectory}`)
    ));

    [
      'pom.xml',
      'README.adoc',
      'settings.gradle',
      'docker-compose-gradle.yaml',
      'docker-compose-maven.yaml',

    ].forEach(path => this.fs.copyTpl(
      this.templatePath(`app/${path}`),
      this.destinationPath(`${projectDirectory}/${path}`),
      { projectDirectory }
    ));
  }

  install() {

    const projectDirectory = safety(this.props.projectDirectory);

    this.log(`# import project and start hacking!`);
    this.log(`cd ./${projectDirectory}/`);
    this.log(`bash gradlew && idea build.gradle`);
    this.log(`# or`);
    this.log(`bash mvnw && idea pom.xml`);
  }
};
