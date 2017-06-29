import fs from 'fs';
import path from 'path';
const logDir = process.env.LOG_DIR || path.resolve(__dirname, '../../../logs');

/**
 * Asynchronously Ensures the log directory is present
 * @param {Function} done - callback which is called once the directory is stat'ed or created
 * @param {String} [dirPath=LOG_DIR or <project_root>/logs] -  path of the directory in which logs should be written to
 */
export const ensureLogsDir = (done, dirPath = logDir) => {
  /**
   * Done callback
   * @callback done
   * @param {String} dirPath=LOG_DIR or <project_root>/logs -  path of the directory in which logs should be written to
   */
  fs.stat(dirPath, (err, stats) => {
    if (!!stats && stats.isDirectory()) {
      // directory exists
      return done(dirPath);
    }

    const mkdirErr = fs.mkdirSync(dirPath);
    if (mkdirErr) throw mkdirErr;
    done(dirPath);
  });
};

/**
 * Ensures the log directory is present
 * @param {String} [dirPath=LOG_DIR or <project_root>/logs] -  path of the directory in which logs should be written to
 * @return {String} dirPath - the path of the logDir
 */
export const ensureLogsDirSync = (dirPath = logDir) => {
  const mkdir = () => {
    const mkdirErr = fs.mkdirSync(dirPath);
    if (mkdirErr) throw mkdirErr;
    return dirPath;
  };
  try {
    const stats = fs.statSync(dirPath);
    if (!!stats && stats.isDirectory()) {
      // directory exists
      return dirPath;
    }

    // file exists with same name as directory
    return mkdir();
  } catch (err) {
    // directory doesn't exist
    return mkdir();
  }
};
