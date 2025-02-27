import * as CircleCI from '../src/index';
import * as YAML from 'yaml';

describe('Instantiate Docker Executor', () => {
  const docker = new CircleCI.executor.DockerExecutor(
    'cimg/node:lts',
  ).generate();
  const expectedYAML = `
docker:
  - image: cimg/node:lts
resource_class: "medium"`;

  it('Should match the expected output', () => {
    expect(docker).toEqual(YAML.parse(expectedYAML));
  });
});

describe('Instantiate Machine Executor', () => {
  const machine = new CircleCI.executor.MachineExecutor().generate();
  const expectedYAML = `
machine:
  image: ubuntu-2004:202010-01
resource_class: "medium"`;

  it('Should match the expected output', () => {
    expect(machine).toEqual(YAML.parse(expectedYAML));
  });
});

describe('Instantiate MacOS Executor', () => {
  const macos = new CircleCI.executor.MacOSExecutor(
    '13.0.0',
    'medium',
  ).generate();
  const expectedYAML = `
macos:
  xcode: "13.0.0"
resource_class: medium`;

  it('Should match the expected output', () => {
    expect(macos).toEqual(YAML.parse(expectedYAML));
  });
});

describe('Instantiate Large MacOS Executor', () => {
  const macos = new CircleCI.executor.MacOSExecutor(
    '13.0.0',
    'large',
  ).generate();
  const expectedYAML = `
macos:
  xcode: "13.0.0"
resource_class: large`;

  it('Should match the expected output', () => {
    expect(macos).toEqual(YAML.parse(expectedYAML));
  });
});

describe('Instantiate Windows Executor', () => {
  const windows = new CircleCI.executor.WindowsExecutor().generate();
  const expectedYAML = `
machine:
  image: "windows-server-2019-vs2019:stable"
resource_class: "windows.medium"
shell: powershell.exe -ExecutionPolicy Bypass`;

  it('Should match the expected output', () => {
    expect(windows).toEqual(YAML.parse(expectedYAML));
  });
});

describe('Instantiate a 2xlarge Docker Executor', () => {
  const xxlDocker = new CircleCI.executor.DockerExecutor(
    'cimg/node:lts',
    '2xlarge',
  ).generate();
  const expectedYAML = `
docker:
  - image: cimg/node:lts
resource_class: 2xlarge`;
  it('Should match the expected output', () => {
    expect(xxlDocker).toEqual(YAML.parse(expectedYAML));
  });
});

describe('Instantiate Large Machine Executor', () => {
  const machine = new CircleCI.executor.MachineExecutor('large').generate();
  const expectedYAML = `
machine:
  image: ubuntu-2004:202010-01
resource_class: "large"`;

  it('Should match the expected output', () => {
    expect(machine).toEqual(YAML.parse(expectedYAML));
  });
});
