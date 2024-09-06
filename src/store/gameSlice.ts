import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CardData} from '../utils/generateCards';

interface GameState {
  cards: CardData[];
  moves: number;
  selectedCards: number[];
  matchedCards: number[];
  time: number;
}

const initialState: GameState = {
  cards: [],
  moves: 0,
  selectedCards: [],
  matchedCards: [],
  time: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardData[]>) => {
      state.cards = action.payload;
    },
    selectCard: (state, action: PayloadAction<number>) => {
      if (state.selectedCards.length < 2) {
        state.selectedCards.push(action.payload);
      }
    },
    matchCards: state => {
      state.matchedCards.push(...state.selectedCards);
      state.selectedCards = [];
    },
    resetSelectedCards: state => {
      state.selectedCards = [];
    },
    incrementMove: state => {
      state.moves += 1;
    },
    resetGame: state => {
      state.moves = 0;
      state.matchedCards = [];
      state.selectedCards = [];
      state.time = 0;
    },
    incrementTime: state => {
      state.time += 1;
    },
  },
});

export const {
  setCards,
  selectCard,
  matchCards,
  resetSelectedCards,
  incrementMove,
  resetGame,
  incrementTime,
} = gameSlice.actions;
export default gameSlice.reducer;
