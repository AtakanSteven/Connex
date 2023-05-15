# DETAILS
- Created `'response decorator'` so that the expected results cannot be changed.
- Used `'axios'` to make a request to an external API and retrieved the server time based on the executor's IP address.
- Created `'autharaziton middleware'` to ensure the APIs are secured.
- Added `'unit testing'` to verify the functionality and behavior of the code.
- Used `'Eslint'` as a linter and code styling tool to ensure code quality, consistency, and adherence to coding standards.
- Added `'Swagger'` documentation to enhance the API's documentation and testing capabilities.
- I used `'ChatGPT'`'s assistance to help me with writing the code. ChatGPT provided guidance and suggestions based on the information and instructions provided.

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- An API testing tool such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/)

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone https://github.com/AtakanSteven/connex.git
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./connex
npm install or npm i
```

### 1.3 Launch and discover

You are now ready to launch the connex (given task) NestJS application using the command below.

```shell
# Launch the development server with TSNode
npm run start:dev
```

You can now head to `http://localhost:3000/swagger` and see your API Swagger docs.

## 2. Project structure

Some part of connex's well-defined directory structure.

```sh
connex/
.
├── app.module.ts
├── common
│   ├── auth-middleware
│   │   └── authorization.middleware.ts
│   ├── enums
│   ├── error-messages
│   └── response-decorator
│       ├── errorDecorator.ts
│       ├── responseDecorator.interceptor.ts
│       └── responses.interface.ts
├── main.ts
├── response
│   ├── response.module.ts
│   ├── response.service.ts
│   └── schema
│       └── time
│           ├── GetMetricsResponse.ts
│           └── GetServerTimeResponse.ts
├── swagger
│   └── swagger.ts
└── time
    ├── dto
    ├── interface
    │   └── get.server.time.output.interface.ts
    ├── time.service.spec.ts
    ├── time.controller.ts
    ├── time.module.ts
    └── time.service.ts
```

## 3. Default NPM commands

The NPM commands below can be used to quickly run, build and test.

- `npm run start`- Start application

- `npm run start:dev` - Start application in watch mode

- `npm run test` - Run test functions.

