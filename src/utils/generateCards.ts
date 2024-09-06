export interface CardData {
  id: number;
  symbol: string;
}

const symbols = ['🍎', '🍊', '🍇', '🍉', '🍒', '🍓', '🍋', '🍍'];

export const generateCards = (): CardData[] => {
  const cardPairs = symbols.concat(symbols);
  return cardPairs
    .map((symbol, index) => ({id: index, symbol}))
    .sort(() => Math.random() - 0.5);
};
