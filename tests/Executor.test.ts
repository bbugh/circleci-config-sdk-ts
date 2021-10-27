import * as CircleCI from '../src/index';
import * as YAML from 'yaml';

describe('Instantiate Docker Executor', () => {
  const docker = new CircleCI.executor.DockerExecutor('cimg/node:lts');
  const executorYAML = `
docker:
  - image: cimg/node:lts
resource_class: "medium"`;

  it('Should match the expected output', () => {
    expect(docker.generate()).toEqual(YAML.parse(executorYAML));
  });

  it('Should parse and the expected executor', () => {
    expect(CircleCI.executor.parse(YAML.parse(executorYAML))).toEqual(docker);
  });
});

describe('Instantiate Machine Executor', () => {
  const machine = new CircleCI.executor.MachineExecutor();
  const executorYAML = `
machine:
  image: ubuntu-2004:202010-01
resource_class: "medium"`;

  it('Should match the expected output', () => {
    expect(machine.generate()).toEqual(YAML.parse(executorYAML));
  });

  it('Should parse and the expected executor', () => {
    expect(CircleCI.executor.parse(YAML.parse(executorYAML))).toEqual(machine);
  });
});

describe('Instantiate MacOS Executor', () => {
  const macos = new CircleCI.executor.MacOSExecutor('13.0.0', 'medium');
  const executorYAML = `
macos:
  xcode: "13.0.0"
resource_class: medium`;

  it('Should match the expected output', () => {
    expect(macos.generate()).toEqual(YAML.parse(executorYAML));
  });

  it('Should parse and the expected executor', () => {
    expect(CircleCI.executor.parse(YAML.parse(executorYAML))).toEqual(macos);
  });
});

describe('Instantiate Large MacOS Executor', () => {
  const macos = new CircleCI.executor.MacOSExecutor('13.0.0', 'large');
  const executorYAML = `
macos:
  xcode: "13.0.0"
resource_class: large`;

  it('Should match the expected output', () => {
    expect(macos.generate()).toEqual(YAML.parse(executorYAML));
  });

  it('Should parse and the expected executor', () => {
    expect(CircleCI.executor.parse(YAML.parse(executorYAML))).toEqual(macos);
  });
});

describe('Instantiate Windows Executor', () => {
  const windows = new CircleCI.executor.WindowsExecutor();
  const executorYAML = `
machine:
  image: "windows-server-2019-vs2019:stable"
resource_class: "windows.medium"
shell: powershell.exe -ExecutionPolicy Bypass`;

  it('Should match the expected output', () => {
    expect(windows.generate()).toEqual(YAML.parse(executorYAML));
  });

  it('Should parse and the expected executor', () => {
    expect(CircleCI.executor.parse(YAML.parse(executorYAML))).toEqual(windows);
  });
});

describe('Instantiate a 2xlarge Docker Executor', () => {
  const xxlDocker = new CircleCI.executor.DockerExecutor(
    'cimg/node:lts',
    '2xlarge',
  );
  const executorYAML = `
docker:
  - image: cimg/node:lts
resource_class: 2xlarge`;
  it('Should match the expected output', () => {
    expect(xxlDocker.generate()).toEqual(YAML.parse(executorYAML));
  });

  it('Should parse and the expected executor', () => {
    expect(CircleCI.executor.parse(YAML.parse(executorYAML))).toEqual(
      xxlDocker,
    );
  });
});

describe('Instantiate Large Machine Executor', () => {
  const machine = new CircleCI.executor.MachineExecutor('large');
  const executorYAML = `
machine:
  image: ubuntu-2004:202010-01
resource_class: "large"`;

  it('Should match the expected output', () => {
    expect(machine.generate()).toEqual(YAML.parse(executorYAML));
  });

  it('Should parse and match the expected executor', () => {
    expect(CircleCI.executor.parse(YAML.parse(executorYAML))).toEqual(machine);
  });
});
