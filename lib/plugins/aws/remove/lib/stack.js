export default {
  async remove() {
    const stackName = this.provider.naming.getStackName();
    const params = {
      StackName: stackName,
    };

    const customDeploymentRole = this.provider.getCustomDeploymentRole();
    if (customDeploymentRole) {
      params.RoleARN = customDeploymentRole;
    }

    const cfData = {
      StackId: stackName,
    };

    return this.provider.request('CloudFormation', 'deleteStack', params).then(() => cfData);
  },

  async removeStack() {
    return this.remove();
  },
};
