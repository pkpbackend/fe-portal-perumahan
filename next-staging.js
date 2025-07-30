const cli = require('next/dist/cli/next-start');

const readline = require('readline').createInterface({
  input: require('fs').createReadStream('.env'),
});

readline.on('line', (line) => {
  const envline = line.split('=');

  if (envline.length === 2 && envline[0] === 'PORT') {
    const PORT = envline[1];
  
    cli.nextStart([
      '-p', PORT || 8000,
    ]);
  }
});