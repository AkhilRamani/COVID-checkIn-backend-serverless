SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
source $SCRIPTPATH/environment.sh

serverless deploy

# 'export' command is valid only for unix shells. In Windows - use 'set' instead of 'export'