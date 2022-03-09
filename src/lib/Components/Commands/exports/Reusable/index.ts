import { GenerableType } from '../../../../Config/types/Config.types';
import { StringParameter } from '../../../Parameters/types/Parameters.types';
import { CommandParameters, CommandShape } from '../../types/Command.types';
import { Command } from '../Command';
import { CustomCommand } from './CustomCommand';

/**
 * Use a reusable command with parameters.
 *
 * {@label STATIC_2.1}
 */
export class ReusableCommand implements Command {
  parameters?: CommandParameters;
  name: StringParameter;

  /**
   * Reuse user defined functionality by adding a reusable command to a job.
   * @param command - A custom command to be reused.
   * @param parameters - the parameters to be passed to the custom command.
   */
  constructor(command: CustomCommand, parameters?: CommandParameters) {
    this.name = command.name;
    this.parameters = parameters;

    //TODO: Parse that CommandParameters parameters do exist on CustomCommand
  }

  /**
   * @returns JSON representation of the reusable command being called
   */
  generate(): CommandShape {
    return {
      [this.name]: { ...this.parameters },
    };
  }

  get generableType(): GenerableType {
    return GenerableType.REUSABLE_COMMAND;
  }
}

export { CustomCommand };
