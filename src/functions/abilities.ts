export const getModifier = (ability: number) => {
  const modifier = Math.floor((ability - 10) / 2)
  return modifier > 0 ? String('+' + modifier) : String(modifier)
}

export const pointBuy = (
  score: number,
  buyType: 'add' | 'subtract',
  availablePoints: number
) => {
  let newScore = score
  let newAvailablePoints = availablePoints
  switch (buyType) {
    case 'add':
      if (score >= 8 && score < 13) {
        newScore = score + 1;
        newAvailablePoints = availablePoints - 1;
      } else if (score < 15) {
        newScore = score + 1;
        newAvailablePoints = availablePoints - 2;
      }
      break;
    case 'subtract':
      if (score > 8 && score <= 13) {
        newScore = score - 1;
        newAvailablePoints = availablePoints + 1;
      } else if (score >= 14) {
        newScore = score - 1;
        newAvailablePoints = availablePoints + 2;
      }
      break;
    default:
      break
  }
  return [newScore, newAvailablePoints]
}
