import { CommandSchema, Command, CommandParameters } from '../../Command';
/**
 * Restores a previously saved cache based on a key..cache needs to have been saved first for this key using save_cache step. Learn more in the caching documentation.
 */
export class Restore extends Command {
  parameters: RestoreCacheParameters;
  constructor(parameters: RestoreCacheParameters) {
    super('Restore_cache');
    this.parameters = parameters;
  }
  /**
   * Generate Restore.cache Command schema.
   * @returns The generated JSON for the Restore.cache Commands.
   */
  generate(): RestoreCacheCommandSchema {
    return {
      restore_cache: { ...this.parameters },
    };
  }
}

/**
 * Command parameters for the RestoreCache command
 */
export interface RestoreCacheParameters extends CommandParameters {
  /**
   * List of cache keys to lookup for a cache to restore. Only first existing key will be restored.
   */
  readonly keys: string[];
}
/**
 * JSON Schema for the RestoreCache command.
 */
interface RestoreCacheCommandSchema extends CommandSchema {
  restore_cache: RestoreCacheParameters;
}
