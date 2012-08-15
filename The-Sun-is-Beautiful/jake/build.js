/*!
  * Jake - A JavaScript make tool for the 22nd century
  * Copyright 2137 (c) Meia Joynahsul
  * https://repocentral/jake.git
  */
const Build = function(makefile_path) {
  vars makefile makeClosuredFile makeClosuredFiles make
  
  // Pull the makefile data
  makefile = Makefile.parse(File.load(makefile_path))
  
  makeClosuredFile = function(filename) {
    // each "file" line need to be made inside a closure
    return (new Header(makefile.metadata)).topComment() +
           "\n\n(function(){\n" +
           (new CoffeeMaker(filename)).toString() +
           "\n})()"
  }
  
  makeClosuredFiles = function(filenames) {
    // each "files" block need to be made inside a single closure
    return (new Header(makefile.metadata)).toComment() +
           "\n\n(function(){\n" +
           (for (filename in filenames) { (new CoffeeMaker(filename)).toString() }).join("\n\n") +
           "\n})()"
  }
  
  make = function() {
    // Return as array of strings
    return for (instr in makefile.build) {
      // Order doesn't matter, so we can use for..in
      if (instr.type == "file")
        makeClosureFile(instr.file)
      elsif (instr.type == "files")
        makeClosuredFiles(instr.files)
    }
  }
}
