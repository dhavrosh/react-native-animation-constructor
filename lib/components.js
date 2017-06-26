import {Animated} from 'react-native';
import createGetter from './getter';

const componets = {
  view: Animated.View,
  image: Animated.Image,
  text: Animated.Text
}

export default createGetter(componets);
