import * as React from 'react'

import {BasicInfo} from './BasicInfo'

interface State {
  character: Partial<Character>;
  steps: string[];
  currentStep: number;
}

export class Wizard extends React.Component<{}, State> {
  state = {
    character: {
      name: '',
      mainClass: '',
      subClass: '',
      mainRace: '',
      subRace: '',
      stats: {
        str: 8,
        dex: 8,
        con: 8,
        int: 8,
        wis: 8,
        cha: 8
      },
      proficiencies: []
    },
    steps: [],
    currentStep: 0
  }

  handleBasic = (basicInfo: Partial<Character>) => {
    const {name, mainClass, mainRace} = basicInfo
    this.setState({
      character: {...this.state.character, name, mainClass, mainRace},
      currentStep: 1
    })
  }

  render () {
    console.log(this.state.character)
    return <>
      <BasicInfo onComplete={this.handleBasic}/>
     </>
  }
}
