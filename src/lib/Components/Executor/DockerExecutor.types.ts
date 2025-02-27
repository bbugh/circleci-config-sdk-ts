import { DockerImageSchema } from './DockerImage';
/**
 * A JSON representation of the Docker Executor Schema
 * To be converted to YAML
 */
export interface DockerExecutorSchema {
  docker: DockerImageSchema[];
  resource_class: DockerResourceClass;
}
export interface DockerImageMap {
  image: string;
}

/**
 * The available Docker Resource Classes.
 * @see {@link https://circleci.com/docs/2.0/configuration-reference/#docker-executor} for specifications of each class.
 */
export type DockerResourceClass =
  | 'small'
  | 'medium'
  | 'medium+'
  | 'large'
  | 'xlarge'
  | '2xlarge'
  | '2xlarge+';
