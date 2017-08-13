const should = require('should');
const Pipeline = require('../../lib/go/pipeline');

describe('Pipeline', () => {
  it('includes pipeline result on history', () => {
    const pipelineInstances = [
      {
        label: '2',
        stages: [
          {
            result: 'passed'
          }
        ]
      },
      {
        label: '1',
        stages: [
          {
            result: 'failed'
          }
        ]
      }
    ];
    const pipeline = new Pipeline('name', pipelineInstances);
    should(pipeline.history[0].result).eql('failed');
    should(pipeline.history[1].result).eql('passed');
  });

  it('is considred failed if at least 1 stage has failed', () => {
    const pipelineInstance = [
      {
        label: '1',
        stages: [
          {
            result: 'passed'
          },
          {
            result: 'failed'
          }
        ]
      }
    ];
    const pipeline = new Pipeline('name', pipelineInstance);
    should(pipeline.history[0].result).eql('failed');
  });
});
