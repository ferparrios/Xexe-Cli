#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
// import { platform } from 'os';

function installReactNativeCli(appName, installReactNavigation, installStackNavigation, installBottomTabsNavigation, installDrawerNavigation) {
  console.log('Creating a new React Native project...');
  // const platformName = platform();
  execSync(`npx react-native@latest init ${appName}`)
  if (installReactNavigation) {
    execSync('npm install @react-navigation/native')
    execSync('npm install react-native-screens react-native-safe-area-context')
  }

  if (installStackNavigation) {
    execSync('npm install @react-navigation/stack')
    execSync('npm install react-native-gesture-handler')
    execSync('npm install @react-native-masked-view/masked-view')
  }

  if (installBottomTabsNavigation) {
    execSync('npm install @react-navigation/bottom-tabs')
  }

  if (installDrawerNavigation) {
    execSync('npm install @react-navigation/drawer')
    execSync('npm install react-native-gesture-handler react-native-reanimated')
  }

  // if (platformName == 'darwin') {
  //   execSync(`cd ${appName}`)
  //   execSync('bundle install')
  //   execSync('npx pod-install')
  // }
  console.log('If you are on Mac run npx pod-install on your root folder')
  console.log('To run your project: cd yourProject and write the command npm run android or yarn android')
  console.log('For ios use npm run ios or yarn ios')
  console.log('App is ready, thank you!');
}


async function main() {

  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Enter the name of your application:',
        validate: function (input) {
          if (!input) {
            return 'Please enter a name for your application.';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'reactNavigation',
        message: 'Do you want to install React Navigation?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'stackNavigation',
        message: 'Do you want to install Stack Navigator?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'bottomTabsNavigation',
        message: 'Do you want to install Bottom Tabs Navigator?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'drawerNavigation',
        message: 'Do you want to install Drawer Navigator?',
        choices: ['Yes', 'No']
      },


    ])
    .then(answers => {
      const { appName, reactNavigation, stackNavigation, bottomTabsNavigation, drawerNavigation } = answers;
      const installReactNavigation = reactNavigation === 'Yes';
      const installStackNavigation = stackNavigation === 'Yes';
      const installBottomTabsNavigation = bottomTabsNavigation === 'Yes';
      const installDrawerNavigation = drawerNavigation === 'Yes';
      installReactNativeCli(appName, installReactNavigation, installStackNavigation, installBottomTabsNavigation, installDrawerNavigation);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

main()

