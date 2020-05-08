# 可以指定依赖的node镜像的版本 node:<version>，如果不指定，就会是最新的
FROM node:10-alpine

# 创建工作目录，对应的是应用代码存放在容器内的路径, 如该目录不存在，WORKDIR 会帮你建立目录
WORKDIR /home/project

# 把 package.json，package-lock.json(npm@5+) 或 yarn.lock 复制到工作目录(相对路径)
COPY package.json *.lock ./
# node镜像自带yarn
RUN yarn --only=prod --registry=https://registry.npm.taobao.org && yarn install

# 把其他源文件复制到工作目录
COPY . .

EXPOSE 3000

# 这里根据实际起动命令做修改
CMD [ "npm", "start" ]
