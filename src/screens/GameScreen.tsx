import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button, FlatList, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import {generateCards} from '../utils/generateCards';
import {
  selectCard,
  matchCards,
  resetSelectedCards,
  incrementMove,
  resetGame,
  setCards,
} from '../store/gameSlice';
import {RootState} from '../store/store';
import {useTimer} from '../hooks/useTimer';

const GameScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {cards, selectedCards, matchedCards, moves} = useSelector(
    (state: RootState) => state.game,
  );
  const [isGameActive, setGameActive] = useState(true);

  const handleTimeOver = () => {
    setGameActive(false);
    Alert.alert('Time Over', 'You ran out of time!');
  };

  const time = useTimer(60, handleTimeOver);

  useEffect(() => {
    dispatch(setCards(generateCards()));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (cards[first].symbol === cards[second].symbol) {
        dispatch(matchCards());
      } else {
        setTimeout(() => dispatch(resetSelectedCards()), 1000);
      }
      dispatch(incrementMove());
    }
  }, [selectedCards, dispatch, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameActive(false);
      Alert.alert('You Win', 'Congratulations! You matched all the cards!');
    }
  }, [matchedCards, cards]);

  const handleCardPress = (index: number) => {
    if (
      !selectedCards.includes(index) &&
      !matchedCards.includes(index) &&
      isGameActive
    ) {
      dispatch(selectCard(index));
    }
  };

  const renderCard = ({item, index}: {item: any; index: number}) => (
    <Card
      symbol={item.symbol}
      isFlipped={selectedCards.includes(index) || matchedCards.includes(index)}
      onPress={() => handleCardPress(index)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Moves: {moves}</Text>
      <Text style={styles.text}>Time: {time} s</Text>
      <FlatList
        data={cards}
        numColumns={4}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCard}
      />
      <Button title="Reset Game" onPress={() => dispatch(resetGame())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default GameScreen;
