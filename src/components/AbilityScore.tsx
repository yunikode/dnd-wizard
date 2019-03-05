import * as React from 'react'

import { getModifier } from '../functions/abilities'
import { ScoreMode } from '../describe/ScoreMode'

interface Props {
  ability: keyof AbilityScores
  score: number
  mode: ScoreMode
  onPointBuy: (
    ability: keyof AbilityScores,
    buyType: 'add' | 'subtract'
  ) => any
}

export const AbilityScore: React.SFC<Props> = ({
  ability,
  score,
  mode,
  onPointBuy
}) => (
    <div className="stats">
      <p>{ability}</p>
      <p>{score}</p>
      <p>{getModifier(score)}</p>
      {mode === ScoreMode.buy &&
        <div>
          <button onClick={() => onPointBuy(ability, 'add')}>+</button>
          <button onClick={() => onPointBuy(ability, 'subtract')}>-</button>
        </div>
      }
    </div>
  )
