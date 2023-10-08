// create out directory for static Chrome Extension

const fs = require("fs");

const glob = require("glob");

const files = glob.sync("out/**/*.html");
files.forEach((file: any) => {
  const content = fs.readFileSync(file, "utf-8");
  const modifiedContent = content.replace(/\/_next/g, "./myNext");
  fs.writeFileSync(file, modifiedContent, "utf-8");
});

const sourcePath = "out/_next";
const destinationPath = "out/myNext";

fs.rename(sourcePath, destinationPath, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error('Failed to rename "_next" directory to "myNext".', err);
  } else {
    console.log('Renamed "_next" directory to "myNext" successfully.');
  }
});
