// .pnpmfile.cjs
module.exports = {
  hooks: {
    readPackage(pkg, context) {
      if (pkg.name === "problematic-package") {
        // Modify the package.json as needed to resolve the peer dependency warning
        pkg.dependencies = {
          ...pkg.dependencies,
          next: "10.0.7", // Specify the version of 'next' to satisfy the peer dependency
        };
      }
      return pkg;
    },
  },
};
