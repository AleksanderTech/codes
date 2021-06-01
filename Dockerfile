FROM node:14

WORKDIR /usr/src/codes

COPY . .

RUN chmod +x ui_build.sh && ./ui_build.sh

EXPOSE 5000

WORKDIR /usr/src/codes/node

CMD ["yarn", "start"]
