import untildify from 'untildify';
import fsp from 'fs/promises';
import fse from 'fs-extra';
import { renameService } from './rename-service.js';
import ServerlessError from '../serverless-error.js';

export default async ({ templatePath, projectDir, projectName }) => {
  const sourcePath = untildify(templatePath);

  try {
    await fse.copy(sourcePath, projectDir, {
      dereference: true,
      filter: async (src) => {
        const stats = await fsp.lstat(src);
        return !stats.isSymbolicLink();
      },
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ServerlessError(
        `Could not find a template under provider path: ${sourcePath}`,
        'INVALID_TEMPLATE_PATH'
      );
    }

    throw new ServerlessError(`Cannot copy template: ${err.message}`, 'COPY_LOCAL_TEMPLATE_ERROR');
  }

  if (projectName) {
    renameService(projectName, projectDir);
  }
};
