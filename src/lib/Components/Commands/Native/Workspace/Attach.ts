import { Command, CommandParameters, CommandSchema } from '../../Command';
/**
 * Special step used to attach the workflow’s workspace to the current container. The full contents of the workspace are downloaded and copied into the directory the workspace is being attached at.
 */
export class Attach extends Command {
  parameters: AttachParameters;
  constructor(parameters: AttachParameters) {
    super('attach_workspace');
    this.parameters = parameters;
  }
  /**
   * Generate Save.cache Command schema.
   * @returns The generated JSON for the Save.cache Commands.
   */
  generate(): AttachCommandSchema {
    return {
      attach_workspace: { ...this.parameters },
    };
  }
}

/**
 * JSON Schema for the Attach command.
 */
export interface AttachCommandSchema extends CommandSchema {
  attach_workspace: AttachParameters;
}

/**
 * Command parameters for the Attach command
 */
export interface AttachParameters extends CommandParameters {
  /**
   * Directory to attach the workspace to.
   */
  at: string;
}
