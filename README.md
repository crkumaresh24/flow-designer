# Flow Designer
React based UI app to design simple flow graph to automate chain of tasks

# Studio Screenshots (Demo will be launced soon !)
1. Designer Page

![Designer_Page](https://user-images.githubusercontent.com/10774494/104192332-b1a7b700-5444-11eb-8535-9337abb2d562.jpg)

2. Designer Page with Task Drawer

![Designer_Page_Drawer](https://user-images.githubusercontent.com/10774494/104192460-dbf97480-5444-11eb-9495-9b7b6859caed.jpg)


# Installation

1. NPM Run - 

git clone https://github.com/crkumaresh24/flow-designer.git
cd flow-designer

yarn install
yarn start

Open http://localhost:3000/ in browser

2. Docker Build and Run (Optional):

docker build . -t flow-designer:1.0.0
docker run -it -p 3000:80 flow-designer:1.0.0

Open http://localhost:3000/ in browser