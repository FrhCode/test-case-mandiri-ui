FROM node:18.17.0-bullseye

RUN apt-get update -y && apt-get install -y \
	dos2unix

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

RUN cp .env.example .env

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","start"]