import { AbstractExecutor } from '../../Components/Executor/Executor';
import {
  DockerExecutorSchema,
  DockerImageMap,
  DockerResourceClass,
} from './DockerExecutor.types';
import { DockerImage } from './DockerImage';

/**
 * A Docker based CircleCI executor.
 * @see {@link https://circleci.com/docs/2.0/configuration-reference/?section=configuration#docker}
 */
export class DockerExecutor extends AbstractExecutor {
  /**
   * The name of a custom Docker image to use.
   * @example "cimg/base:stable"
   */
  image: DockerImage;
  /**
   * Add additional Docker images which will be accessible from the primary container.
   * This is typically used for adding a database as a service container.
   */
  serviceImages: DockerImage[] = [];
  /**
   * Instantiate a Docker executor.
   * @param name - The name of this reusable executor.
   * @param image - The primary docker container image.
   */
  resource_class: DockerResourceClass;
  constructor(image: string, resource_class: DockerResourceClass = 'medium') {
    super(resource_class);
    const newImage = new DockerImage(image);
    this.image = newImage;
    this.resource_class = resource_class;
  }
  /**
   * Generate Docker Executor schema.
   * @returns The generated JSON for the Docker Executor.
   */
  generate(): DockerExecutorSchema {
    const imagesArray: DockerImage[] = [this.image];
    imagesArray.concat(this.serviceImages);
    const dockerImageMap: DockerImageMap[] = [];
    imagesArray.forEach((img) => {
      dockerImageMap.push({
        image: img.image,
      });
    });
    return {
      docker: dockerImageMap,
      resource_class: this.resource_class,
    };
  }
}
