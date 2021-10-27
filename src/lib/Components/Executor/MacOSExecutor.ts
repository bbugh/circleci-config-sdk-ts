import { AbstractExecutor } from '../../Components/Executor/Executor';
import { MacOSExecutorSchema, MacOSResourceClass } from './MacOSExecutor.types';

/**
 * A MacOS Virtual Machine with configurable Xcode version.
 * @see {@link https://circleci.com/docs/2.0/executor-types/#using-macos}
 */
export class MacOSExecutor extends AbstractExecutor {
  resource_class: MacOSResourceClass;
  /**
   * Select an xcode version
   * @see {@link https://circleci.com/developer/machine/image/macos}
   */
  xcode: string;
  constructor(xcode: string, resource_class: MacOSResourceClass = 'medium') {
    super(resource_class);
    this.xcode = xcode;
    this.resource_class = resource_class;
  }
  generate(): MacOSExecutorSchema {
    return {
      macos: {
        xcode: this.xcode,
      },
      resource_class: this.resource_class,
    };
  }
}
