FROM node:stretch AS build-stage
WORKDIR /app
COPY . /app
ENV NODE_ENV=production
ENV REACT_APP_GENERATE_SOURCEMAP=false
ENV GENERATE_SOURCEMAP=false
RUN ["sh", "-ce", "npm i -g react-scripts"]
RUN ["sh", "-ce", "yarn install --production=false"]
RUN ["sh", "-ce", "yarn build"]

FROM nginx:alpine
COPY --from=build-stage /app/build/ /app/build/
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx" ,"-g", "daemon off;"]
