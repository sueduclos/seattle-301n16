# Execute this script from root of this repo: ./configs/generate-challenges.sh

# Define a shell function we can invoke from a subshell
replace_solutions(){
  # Grab the first arg: the directory we are currently working in
  dirName="$1"

  # Extract class number from dir name, from pos 19, taking 2 chars.
  classNumber=${dirName:19:2}

  # Build up the new file name
  newFile=$1challenges-$classNumber.test.js

  # Use Perl to do the substitution, and redirect output to a new file
  perl -0pe 's/<solution>[\s\S]*?<\/solution>/ Solution code here.../g' $1solutions-$classNumber.test.js > $newFile

  # Report on progress to user
  echo "Generated class $classNumber challenge in $newFile"
}

# Exporting the function makes it available to invoke
export -f replace_solutions

# List all paths that include a 'challenges/' directory, and
# pipe the list xargs, to invoke our function once per directory
ls -d ./curriculum/**/challenges/ | xargs -I % bash -c 'replace_solutions %'

# Report to the user that we completed this script
echo "Done!"
