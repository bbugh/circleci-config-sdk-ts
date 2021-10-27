import { Component } from '../index';
import { ExecutorSchema } from './Executor.types';

/**
 * A generic reusable Executor
 */
export abstract class AbstractExecutor extends Component {
  description?: string;
  resource_class: string;
  constructor(resource_class: string, description?: string) {
    super();
    this.description = description;
    this.resource_class = resource_class;
  }
  abstract generate(): ExecutorSchema;
}
