import getS3EndpointForRegion from '../../utils/get-s3-endpoint-for-region.js';
import ServerlessError from '../../../../serverless-error.js';

export default {
  async validateTemplate() {
    const bucketName = this.bucketName;
    const artifactDirectoryName = this.serverless.service.package.artifactDirectoryName;
    const compiledTemplateFileName = this.provider.naming.getCompiledTemplateS3Suffix();
    const s3Endpoint = getS3EndpointForRegion(this.provider.getRegion());
    const params = {
      TemplateURL: `https://${s3Endpoint}/${bucketName}/${artifactDirectoryName}/${compiledTemplateFileName}`,
    };

    return this.provider.request('CloudFormation', 'validateTemplate', params).catch((error) => {
      const errorMessage = ['The CloudFormation template is invalid:', ` ${error.message}`].join(
        ''
      );
      throw new ServerlessError(errorMessage, 'INVALID_AWS_CLOUDFORMATION_TEMPLATE');
    });
  },
};
