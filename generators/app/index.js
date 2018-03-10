'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const { version } = require('../../package.json');

const safety = input =>
  (input.replace(/\W+/g, '-') || 'app')
    .trim().toLocaleLowerCase();

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the terrific ${chalk.red('daggerok-fatjar')} generator ${chalk.blue('v' + version)}`
    ));

    const prompts = [
      {
        type: 'input',
        name: 'projectDirectory',
        message: 'Enter project directory',
        default: 'app'
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'My friend, what type of project do you want to create today?',
        choices: [
          'java',
          'java-ee',
          'java-akka',
          'java-parent-multi-project',
          'kotlin',
          'kotlin-ee',
          'kotlin-spring-boot',
          'kotlin-spring-boot_1.x',
          'kotlin-wildfly-swarm',
          'kotlin-parent-multi-project',
          'scala',
          'scala_2.11',
          'scala-akka-persistence-gradle',
          'spring-cloud-function-web',
        ],
        default: 'java',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    const projectDirectory = safety(this.props.projectDirectory);
    const projectType = this.props.projectType;

    switch (projectType) {

      case 'scala-akka-persistence-gradle':

        [
          '**/*',
          '**/.*',

        ].forEach(pattern => this.fs.copy(
          this.templatePath(`${projectType}/${pattern}`),
          this.destinationPath(`${projectDirectory}`)
        ));

        break;

      default:

        [
          '**/*',
          '**/.*',
          '.*/**/*',

        ].forEach(pattern => this.fs.copy(
          this.templatePath(`${projectType}/${pattern}`),
          this.destinationPath(`${projectDirectory}`)
        ));

        break;
    }

    switch (projectType) {

      case 'scala-akka-persistence-gradle':

        [
          '.travis.yml',
          'README.adoc',
          'settings.gradle',
          'gradle/Dockerfile',
          'docker-compose.yaml',

        ].forEach(path => this.fs.copyTpl(
          this.templatePath(`${projectType}/${path}`),
          this.destinationPath(`${projectDirectory}/${path}`),
          { projectDirectory }
        ));

        break;

      default:

        [
          'pom.xml',
          '.travis.yml',
          'README.adoc',
          'settings.gradle',
          'gradle/Dockerfile',
          'docker-compose-maven.yaml',
          'docker-compose-gradle.yaml',

        ].forEach(path => this.fs.copyTpl(
          this.templatePath(`${projectType}/${path}`),
          this.destinationPath(`${projectDirectory}/${path}`),
          { projectDirectory }
        ));

        break;
    }

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
