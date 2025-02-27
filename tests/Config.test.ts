import * as CircleCI from '../src/index';
import * as YAML from 'yaml';
import { version as SDKVersion } from '../src/package-version.json';

describe('Generate a Setup workflow config', () => {
  const myConfig = new CircleCI.Config(true).stringify();
  it('Should produce a blank config with Setup set to true', () => {
    const expected = {
      version: 2.1,
      setup: true,
      jobs: {},
      workflows: {},
    };
    expect(YAML.parse(myConfig)).toEqual(expected);
  });
  it('Should include the version comment string', () => {
    const comment = `# This configuration has been automatically generated by the CircleCI Config SDK.
# For more information, see https://github.com/CircleCI-Public/circleci-config-sdk-ts
# SDK Version: ${SDKVersion}
`;
    expect(myConfig).toContain(comment);
  });
});
