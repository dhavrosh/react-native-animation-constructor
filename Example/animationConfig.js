export default [{
  event: 'start',
  items: [{
    type: 'parallel',
    value: [{
        key: 'rotate',
        from: 0,
        to: 1,
        isTransformed: true,
        interpolation: {
         input: [0, 1],
         output: ['0deg', '360deg']
        },
        type: 'timing',
        options: {
          duration: 500,
          delay: 1000
        }
      }, {
        key: 'scale',
        from: 1,
        to: 0.5,
        type: 'timing',
        isTransformed: true,
        options: {
          duration: 500,
          delay: 0
        }
      }]
    },
    {
    type: 'parallel',
    value: [{
          key: 'translateX',
          from: 0,
          to: -100,
          isTransformed: true,
          type: 'timing',
          options: {
            duration: 1500,
            delay: 100
          }
        }, {
          key: 'opacity',
          from: 1,
          to: 0.4,
          type: 'timing',
          options: {
            duration: 400,
            delay: 100
          }
      }]
  }]
}];
