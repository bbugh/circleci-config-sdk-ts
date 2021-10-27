/**
 * Instantiate a CircleCI Executor, the build environment for a job. Select a type of executor and supply the required parameters.
 */
import { DockerExecutor } from './DockerExecutor';
import { DockerResourceClass } from './DockerExecutor.types';
import { AbstractExecutor } from './Executor';
import { MachineExecutor } from './MachineExecutor';
import { MachineResourceClass } from './MachineExecutor.types';
import { MacOSExecutor } from './MacOSExecutor';
import { MacOSResourceClass } from './MacOSExecutor.types';
import { WindowsExecutor } from './WindowsExecutor';
import { WindowsResourceClass } from './WindowsExecutor.types';

/*
  *Type '(args: Partial<DockerExecutor>) => DockerExecutor' is not assignable to type '(args: unknown) => 
  AbstractExecutor'.
  Types of parameters 'args' and 'args' are incompatible.
    Type 'unknown' is not assignable to type 'Partial<DockerExecutor>'.*/
type AnyResourceClass =
  | DockerResourceClass
  | MachineResourceClass
  | MacOSResourceClass
  | WindowsResourceClass;

function parse(executorIn: {
  resource_class: AnyResourceClass;
  [key: string]: unknown;
}): AbstractExecutor {
  const subtypes: { [key: string]: (args: unknown) => AbstractExecutor } = {
    docker: (args) => {
      const dockerArgs = args as [{ image: string }];

      return new DockerExecutor(
        dockerArgs[0].image || 'cimg/base:stable',
        executorIn.resource_class,
      );
    },
    machine: (args) => {
      const windowsResourceClass = executorIn.resource_class.substring(
        'windows.'.length,
      ) as WindowsResourceClass;

      if (executorIn.resource_class.startsWith('windows.')) {
        const windowsArgs = args as Partial<WindowsExecutor>;

        return new WindowsExecutor(windowsResourceClass, windowsArgs.image);
      }

      const machineArgs = args as Partial<MachineExecutor>;

      return new MachineExecutor(
        executorIn.resource_class as MachineResourceClass,
        machineArgs.image,
      );
    },
    macos: (args) => {
      const macOSArgs = args as Partial<MacOSExecutor>;

      return new MacOSExecutor(
        macOSArgs.xcode || '13.1',
        executorIn.resource_class as MacOSResourceClass,
      );
    },
  };

  const executorType = Object.keys(executorIn).find(
    (subtype) => subtype in subtypes,
  );

  // @todo: move to parsing
  if (!executorType) {
    throw new Error('Invalid executor type has been passed');
  }

  return subtypes[executorType](executorIn[executorType]);
}

export {
  DockerExecutor,
  MachineExecutor,
  MacOSExecutor,
  WindowsExecutor,
  parse,
};
