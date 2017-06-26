import {Animated} from 'react-native';
import createGetter from './getter';

const animations = {
  parallel: Animated.parallel,
  sequence: Animated.sequence,
  delay: Animated.delay,
  timing: Animated.timing,
  spring: Animated.spring
}

export default createGetter(animations);
