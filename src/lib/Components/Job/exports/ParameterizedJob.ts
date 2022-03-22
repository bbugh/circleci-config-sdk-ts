import { Job } from '..';
import { Command } from '../../Commands/exports/Command';
import { Executor } from '../../Executor/exports/Executor';
import { CustomParametersList } from '../../Parameters';
import { Parameterized } from '../../Parameters/exports/Parameterized';
import { JobParameterLiteral } from '../../Parameters/types/CustomParameterLiterals.types';
import { CustomParametersListShape } from '../../Parameters/types/Parameters.types';
import { JobContentShape } from '../types/Job.types';
/**
 * Parameterized are a type of Job which defines parameters it can accept.
 * {@label STATIC_2.1}
 */
class ParameterizedJob
  extends Job
  implements Parameterized<JobParameterLiteral>
{
  parameters: CustomParametersList<JobParameterLiteral>;

  constructor(
    name: string,
    executor: Executor,
    parameters?: CustomParametersList<JobParameterLiteral>,
    steps?: Command[],
  ) {
    super(name, executor, steps);
    this.parameters = parameters || new CustomParametersList();
  }

  generateJobContents(): ParameterizedJobContents {
    return {
      parameters: this.parameters.generate(),
      ...super.generateJobContents(),
    };
  }

  defineParameter(
    name: string,
    type: JobParameterLiteral,
    defaultValue?: unknown,
    description?: string,
    enumValues?: string[],
  ): ParameterizedJob {
    this.parameters.define(name, type, defaultValue, description, enumValues);

    return this;
  }
}

export type ParameterizedJobContents = JobContentShape & {
  parameters: CustomParametersListShape;
};

export { ParameterizedJob };
