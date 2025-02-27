import { ParameterTypes } from '../../Config/Parameters';

export type WorkflowParameterTypes =
  | ParameterTypes
  | WorkflowMatrixSchema
  | WorkflowFilterSchema;

export interface WorkflowSchema {
  [workflowName: string]: {
    jobs: WorkflowJobSchema[];
  };
}

export interface WorkflowJobParameters {
  /**
   * A list of jobs that must succeed for the job to start. Note: When jobs in the current workflow that are listed as dependencies are not executed (due to a filter function for example), their requirement as a dependency for other jobs will be ignored by the requires option. However, if all dependencies of a job are filtered, then that job will not be executed either.
   */
  readonly requires?: string[];
  readonly name?: string;
  readonly context?: string[];
  /**
   * {@link https://circleci.com/docs/2.0/configuration-reference/#filters} Filter workflow job's execution by branch or git tag.
   */
  readonly filters?: WorkflowFilterSchema;
  /**
   * {@link https://circleci.com/docs/2.0/configuration-reference/#matrix-requires-version-21} The matrix stanza allows you to run a parameterized job multiple times with different arguments.
   */
  readonly matrix?: WorkflowMatrixSchema;
  /**
   * An "approval" type job is a special job which pauses the workflow. This "job" is not defined outside of the workflow, you may enter any potential name for the job name. As long as the parameter of "type" is present and equal to "approval" this job will act as a placeholder that awaits user input to continue.
   */
  readonly jobType?: 'approval';
  [key: string]: WorkflowParameterTypes;
}

export interface WorkflowJobSchema {
  [workflowJobName: string]: {
    requires?: string[];
    context?: string[];
    jobType?: 'approval';
    filters?: WorkflowFilterSchema;
    matrix?: WorkflowMatrixSchema;
  };
}

export interface WorkflowFilterSchema {
  /**
   * A map defining rules for execution on specific branches
   */
  branches?: {
    /**
     * Either a single branch specifier, or a list of branch specifiers
     */
    only?: string[];
    /**
     * Either a single branch specifier, or a list of branch specifiers
     */
    ignore?: string[];
  };
  /**
   * A map defining rules for execution on specific tags
   */
  tags?: {
    /**
     * Either a single tag specifier, or a list of tag specifiers
     */
    only?: string[];
    /**
     * Either a single tag specifier, or a list of tag specifiers
     */
    ignore?: string[];
  };
}

/**
 * A map of parameter names to every value the job should be called with
 */
export interface WorkflowMatrixSchema {
  parameters: {
    [key: string]: string[];
  };
}
