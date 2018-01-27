'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('daggerok-fatjar') + ' generator!'
    ));

/*
    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];
*/

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

    const projectDirectory = this.props.projectDirectory;

    this.fs.copy(
      this.templatePath('app/**/*'),
      this.destinationPath(`${projectDirectory}`)
    );

    this.fs.copy(
      this.templatePath('app/**/.*'),
      this.destinationPath(`${projectDirectory}`)
    );

    this.fs.copy(
      this.templatePath('app/.*/**/*'),
      this.destinationPath(`${projectDirectory}`)
    );
  }

  install() {

    const projectDirectory = this.props.projectDirectory;

    // this.installDependencies({
    //   bower: false,
    //   yarn: false,
    // });

    this.log(yosay(
      `idea ./${projectDirectory} import project and start hacking!`
    ));
  }
};
