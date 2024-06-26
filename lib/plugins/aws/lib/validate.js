import ServerlessError from '../../../serverless-error.js';

export default {
  validate() {
    if (!this.serverless.serviceDir) {
      throw new ServerlessError(
        'This command can only be run inside a service directory',
        'MISSING_SERVICE_DIRECTORY'
      );
    }

    this.options.stage = this.provider.getStage();
    this.options.region = this.provider.getRegion();
  },
};
