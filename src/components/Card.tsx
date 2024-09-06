import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Animated, {FlipInXDown, FlipOutXUp} from 'react-native-reanimated';

interface CardProps {
  symbol: string;
  isFlipped: boolean;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({symbol, isFlipped, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {isFlipped ? (
        <Animated.View entering={FlipInXDown} exiting={FlipOutXUp}>
          <Text style={styles.symbol}>{symbol}</Text>
        </Animated.View>
      ) : (
        <View style={styles.cardBack} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 90,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    backgroundColor: '#ccc',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  symbol: {
    fontSize: 30,
  },
});

export default Card;
