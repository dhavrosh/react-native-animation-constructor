import React, {Component} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import components from './components';
import animations from './animations';
import createEventContainer from './events';

export default class AnimationConstructor extends Component {
  static propTypes = {
    component: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    config: PropTypes.array.isRequired, // describe deeper
  }

  constructor(props) {
    super(props);

    this.components = components;
    this.animations = animations;
    this.events = createEventContainer();

    this.parseSequenceAnimations = this.parseSequenceAnimations.bind(this);
    this.parseParallelAnimations = this.parseParallelAnimations.bind(this);

    this.handleProps(props);
  }

  render() {
    const Animation = this._component;
    const style = this.formAnimationStyle();

    return(
      <Animation style={[styles.container, style]}>
        {this.props.children}
      </Animation>
    )
  }

  handleProps(props) {
    const component = this.components.get(props.component);

    if (component) {
      this._component = component;
      this._style = {};

      this.parseAnimationConfig(props.config);
    } else throw new Error('Invalid component key');
  }

  parseAnimationConfig(config) {
    if (!Array.isArray(config)) throw new Error('Invalid type of animations config');

    config.forEach(animation => {
      const worker = this.getAnimationWorker(
        animation.items,
        this.parseSequenceAnimations,
        this.animations.get('sequence')
      );
      this.events.register(animation.event, worker);
    });
  }

  getAnimationWorker(items, getAnimation, createAnimated) {
    const animations = [];
    let worker = null;

    if (!Array.isArray(items)) throw new Error('Invalid type of animation items');
    if (items.length === 0) return null;

    items.forEach(animationObj => {
      let animation = getAnimation(animationObj);

      if (animation) {
        animations.push(animation);
      }
    });

    if (items.length > 1) {
      worker = createAnimated(animations);
    } else {
      worker = animations[0];
    }

    return worker;
  }

  parseSequenceAnimations(animationObj) {
    let animation = null;

    if (animationObj.type === 'parallel') {
      animation = this.getAnimationWorker(
        animationObj.value,
        this.parseParallelAnimations,
        this.animations.get('parallel')
      );
    } else {
      const animationWorker = this.animations.get(animationObj.type);
      animationWorker && animationWorker(animationObj.value);
    }

    return animation;
  }

  parseParallelAnimations(animationObj) {
    let animation = null;
    const animationWorker = this.animations.get(animationObj.type);

    if (animationWorker) {
      let animationConfig = null;

      if (this.checkStyleExistance(animationObj.key)) {
        animationConfig = this._style[animationObj.key];
      } else {
        animationConfig = {
          value: new Animated.Value(animationObj.from),
          isTransformed: animationObj.isTransformed,
          interpolation: animationObj.interpolation
        };

        this._style[animationObj.key] = animationConfig;
      }

      animation = animationWorker(animationConfig.value, {
        toValue: animationObj.to,
        ...animationObj.options
      });
    } else throw new Error('Invalid type of animation');

    return animation;
  }

  formAnimationStyle() {
    return Object.keys(this._style).reduce((style, prop) => {
      const currentStyle = this._style[prop];
      let {value, interpolation} = currentStyle;

      if (interpolation) {
        value = value.interpolate({
          inputRange: interpolation.input,
          outputRange: interpolation.output
        })
      }

      if (currentStyle.isTransformed) {
        style.transform.push({[prop]: value});
      } else {
          style[prop] = value;
      }

      return style;
    }, {transform: []});
  }

  checkStyleExistance(key) {
    return this._style[key] !== undefined;
  }

  emitEvent(key, callback) {
    this.events.emit(key, callback);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
