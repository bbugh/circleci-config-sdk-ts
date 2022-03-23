import { SchemaObject } from 'ajv';

const StepsSchema: SchemaObject = {
  $id: '/definitions/Step',
  type: 'array',
  minItems: 1,
  additionalItems: false,
  items: [
    {
      $ref: '/custom/commands',
    },
    {
      type: 'object',
      properties: {
        run: {
          $ref: '/commands/native/run',
        },
      },
    },
    {
      type: 'object',
      properties: {
        checkout: {
          $ref: '/commands/native/checkout',
        },
      },
    },
    {
      type: 'object',
      properties: {
        setup_remote_docker: {
          $ref: '/commands/native/setup_remote_docker',
        },
      },
    },
    {
      type: 'object',
      properties: {
        save_cache: {
          $ref: '/commands/native/save_cache',
        },
      },
    },
    {
      type: 'object',
      properties: {
        restore_cache: {
          $ref: '/commands/native/restore_cache',
        },
      },
    },
    {
      type: 'object',
      properties: {
        store_artifacts: {
          $ref: '/commands/native/store_artifacts',
        },
      },
    },
    {
      type: 'object',
      properties: {
        store_test_results: {
          $ref: '/commands/native/store_test_results',
        },
      },
    },
    {
      type: 'object',
      properties: {
        persist_to_workspace: {
          $ref: '/commands/native/persist_to_workspace',
        },
      },
    },
    {
      type: 'object',
      properties: {
        attach_workspace: {
          $ref: '/commands/native/attach_workspace',
        },
      },
    },
    {
      type: 'object',
      properties: {
        add_ssh_keys: {
          $ref: '/commands/native/add_ssh_keys',
        },
      },
    },
  ],
};

export default StepsSchema;
