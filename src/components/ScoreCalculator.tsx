import * as React from 'react'

import { AbilityScore } from './AbilityScore'
import { ScoreMode } from '../describe/ScoreMode'
import { roll4dropLowest } from '../functions/dice'
import { pointBuy } from '../functions/abilities'


interface Props {
  stats: AbilityScores
}

interface State {
  stats?: AbilityScores;
  mode: ScoreMode;
  pointsLeft: number;
  pointBuyLimit: number;
}

export class ScoreCalculator extends React.Component<Props, State>{
  state = {
    stats: {
      str: 8,
      dex: 8,
      con: 8,
      int: 8,
      wis: 8,
      cha: 8
    },
    mode: ScoreMode.roll,
    pointsLeft: 27,
    pointBuyLimit: 27
  }

  componentDidMount() {
    this.setState({ stats: this.props.stats })
  }

  rollStats = () => {
    const { stats } = this.state
    Object.keys(stats).forEach(key => {
      stats[key as keyof AbilityScores] = roll4dropLowest()
    })
    this.setState({ stats })
  }

  handleToggle = () => {
    const { mode, stats } = this.state
    const resetStats = Object.keys(stats).reduce(
      (acc, i) => ({ ...acc, [i]: 8 })
      , {} as AbilityScores)


    mode === ScoreMode.roll
      ? this.setState({ mode: ScoreMode.buy, stats: resetStats })
      : this.setState({ mode: ScoreMode.roll, stats: resetStats })
  }

  handlePointBuy = (
    ability: keyof AbilityScores,
    buyType: 'add' | 'subtract'
  ) => {
    const { stats, pointsLeft } = this.state

    const [score, availablePoints] = pointBuy(stats[ability], buyType, pointsLeft)

    this.setState({
      stats: { ...stats, [ability]: score }, pointsLeft: availablePoints
    })

  }

  render() {
    const { stats, mode } = this.state
    const AbilityDisplay = Object.keys(stats).map(
      key => (
        <AbilityScore
          key={key}
          ability={key as keyof AbilityScores}
          score={stats[key as keyof AbilityScores]}
          mode={mode}
          onPointBuy={this.handlePointBuy}
        />)
    )
    return (
      <div className="score-calculator" >
        <h2>Ability Score Calculator</h2>
        <p>Mode: {mode}</p>
        <button onClick={this.handleToggle}>Toggle Mode</button>
        {mode === ScoreMode.roll && <button onClick={() => this.rollStats()}>Roll Dice</button>}
        <div className="stats-display">
          {AbilityDisplay}
        </div>
      </div >
    )
  }
}
