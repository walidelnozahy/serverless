const { exec } = require('child_process');

const changedFiles = process.argv.slice(2);
console.log('changedFiles',changedFiles);

if (changedFiles.length === 0) {
  console.log('No changed files to process.');
  process.exit(0);
}

console.log('Building documentation for the following changed files:');
console.log(changedFiles.join('\n'));

// Example build command
changedFiles.forEach((file) => {
  console.log(`Processing ${file}`);
  // Add your actual build logic here
  // For example:
  // exec(`npm run build --file=${file}`, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error building ${file}: ${error}`);
  //     return;
  //   }
  //   console.log(`Output for ${file}: ${stdout}`);
  //   console.error(`Error output for ${file}: ${stderr}`);
  // });
});

console.log('Build completed.');