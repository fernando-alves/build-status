const should = require('should');
const Pipeline = require('../../lib/go/pipeline');

describe('Pipeline', () => {
  it('includes pipeline result on history', () => {
    const history = [
      {
        label: '2',
        stages: [
          {
            result: 'passed',
            jobs: [{ scheduled_date: Date.now }]
          }
        ]
      },
      {
        label: '1',
        stages: [
          {
            result: 'failed',
            jobs: [{ scheduled_date: Date.now }]
          }
        ]
      }
    ];
    const pipeline = new Pipeline('name', history);
    should(pipeline.history[0].result).eql('failed');
    should(pipeline.history[1].result).eql('passed');
  });

  it('is considered failed if at least 1 stage has failed', () => {
    const history = [
      {
        label: '1',
        stages: [
          {
            result: 'passed',
            jobs: [{ scheduled_date: Date.now }]
          },
          {
            result: 'failed',
            jobs: [{ scheduled_date: Date.now }]
          }
        ]
      }
    ];
    const pipeline = new Pipeline('name', history);
    should(pipeline.history[0].result).eql('failed');
  });

  it('includes timestamp from when the pipeline was last scheduled', () => {
    const history = [
      {
        label: '1',
        stages: [
          {
            result: 'passed',
            jobs: [
              {
                scheduled_date: 1501978239798
              },
              {
                scheduled_date: 2601978239798
              }
            ]
          }
        ]
      }
    ];

    const pipeline = new Pipeline('name', history);
    should(pipeline.history[0].scheduledAt).eql(2601978239798);
  });
});
