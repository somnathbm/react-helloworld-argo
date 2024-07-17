FROM node:18-alpine AS base

# just install the deps
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# copy node_modules and source code files and build the app
FROM base AS builder
ARG HLO_WRLD_CLR
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV REACT_APP_HLO_WRLD_CLR=$HLO_WRLD_CLR
RUN npm run build

# spin off a nginx server
FROM nginx:alpine AS runner
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off"]