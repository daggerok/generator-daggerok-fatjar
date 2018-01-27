'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

function safety(input) {
  return (input.replace(/\W+/g, '-') || 'app').trim()
                                              .toLocaleLowerCase();
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
      {
        type: 'confirm',
        name: 'isScalaSupported',
        message: 'Would you like supports scala?',
        default: false
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    const projectDirectory = safety(this.props.projectDirectory);
    const projectType = this.props.isScalaSupported ? 'scala' : 'java';

    [
      '**/*',
      '**/.*',
      '.*/**/*',

    ].forEach(pattern => this.fs.copy(
      this.templatePath(`${projectType}/${pattern}`),
      this.destinationPath(`${projectDirectory}`)
    ));

    [
      'pom.xml',
      'README.adoc',
      'settings.gradle',
      'docker-compose-gradle.yaml',
      'docker-compose-maven.yaml',

    ].forEach(path => this.fs.copyTpl(
      this.templatePath(`${projectType}/${path}`),
      this.destinationPath(`${projectDirectory}/${path}`),
      { projectDirectory }
    ));

    this.fs.copy(
      this.templatePath(`fuck/gitignore`),
      this.destinationPath(`${projectDirectory}/.gitignore`)
    );
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
