export class FileSystemUtils {
  /**
   * Write the passed json file data into the passed file path.
   * @param filePath This string represents the path to the requested file or a path to a new file.
   * @param fileSizeInBytes This number represents the size of the file in bytes.
   * @param jsonFileData This json string represents the file content.
   */
  writePersistentJsonFile(filePath: string, fileSizeInBytes: number, jsonFileData: string) {
    // Request the persistent file system.
    window.requestFileSystem(LocalFileSystem.PERSISTENT, fileSizeInBytes, (fs: FileSystem) => {
      // If the persistent file system can be accessed, the file system will be used to get the file from the passed
      // path. If no file can be found, a new file will be created.
      fs.root.getFile(filePath, {create: true, exclusive: false}, (fileEntry: FileEntry) => {
        // If the file can be accessed successfully, the passed file data will be written into a new entry.
        fileEntry.createWriter((fileWriter: FileWriter) => {
          fileWriter.write(jsonFileData);
        });
      });
    });
  }

  /**
   * TODO: PROMISE FUNCTION!
   * Read the content of the persistent file that is specified by the passed file path.
   *
   */
  readPersistentFile(filePath: string) {
    // Request the persistent file system.
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 50, (fs: FileSystem) => {
      // If the persistent file system can be accessed, the file system will be used to get a file that is specified
      // with the passed path.
      fs.root.getFile(filePath,{create: false, exclusive: false},(fileEntry: FileEntry) => {
        // If the file can be found, the file content will be read asynchronously and returned.
        fileEntry.file(async (file: File) => {
            console.log(file);

            // Read the
            const reader = new FileReader();
            reader.onloadend = function () {
              console.log('Successful file read: ' + this.result);
            };

            reader.readAsText(file);
          })
        }
      )
    });
  }
}
