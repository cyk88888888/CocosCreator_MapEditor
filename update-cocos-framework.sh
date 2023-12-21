if [ ! -d "extensions" ]; then
    mkdir extensions
fi
cd extensions

if [ ! -d "cocos-framework" ]; then
    git clone git@github.com:cyk88888888/cocos-framework.git
else
    cd cocos-framework
    git pull
fi
