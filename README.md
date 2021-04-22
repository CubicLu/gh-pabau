# Pabau

- [Pabau](#pabau)
  - [Welcome](#welcome)
  - [Paths](#paths)
  - [Setup](#setup)
    - [Windows](#windows)
    - [Linux](#linux)
    - [vscode](#vscode)
    - [Common](#common)
  - [Storybook](#storybook)
  - [Frontend](#frontend)
  - [Bridge](#bridge)
  - [Backend](#backend)
  - [Code Rules](#code-rules)
  - [Delineation between /apps/web/components/ ("App components") and /libs/ui/ ("UI components")](#delineation-between-appswebcomponents-app-components-and-libsui-ui-components)
  - [Our Stack](#our-stack)
  - [Ticket workflow](#ticket-workflow)
  - [GraphQL workflow](#graphql-workflow)
  - [To do (big engineering items)](#to-do-big-engineering-items)
  - [bridge-proxy (PDS)](#bridge-proxy-pds)

## Welcome

This monorepo contains all of our code (with the exception of `.env` files), and is controlled using the [Nx](https://nx.dev) CLI. Please read this file in Preview mode (not the source code).

## Paths

- `/` -
- `/.run/` - scripts for all devs (and Jetbrains IDE's)
- `/.storybook/` - global Storybook config
- `/.vscode/` - vscode specific settings for all devs
- `/apps/` - where most of our projects reside.
- `/apps/web/` - the main application Frontend.
- `/apps/*-e2e/` - End-to-end testing with Cypress.
- `/dist/` - temporary directory where the build outputs are generated
- `/hasura/` - our database configuration
- `/libs/` - where any shared libraries reside. These can be referenced (used) in any app.
- `/libs/ui/` - our shared UI (React Components).
- `/tools/` - repo-level tooling.
- `**/cicd/` - devops only.

## Setup

### Windows

1. Install Node 14 LTS (Opt in for the extra build tools)
1. Install yarn: `npm i -g yarn`
1. Ensure your terminal is BASH (cmd and PS not supported. Vscode: `"terminal.integrated.shell.windows": "c:/program files/git/bin/bash.exe",`)
1. Ensure your IDE has eslint plugin setup and configured to auto-fix on save.
1. Ensure your Git config user.name is your full name, and user.email is the same email you registered as with Bitbucket.org.

### Linux

```bash
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs gcc g++ make curl build-essential
mkdir ~/.npm-global
npm config set prefix "${HOME}/.npm-global"
echo 'NPM_STORE="${HOME}/.npm-global"' >> ~/.bashrc
echo 'export PATH="$PATH:$NPM_STORE/bin"' >> ~/.bashrc
echo 'export MANPATH="${MANPATH-$(manpath)}:$NPM_STORE/share/man"' >> ~/.bashrc
npm i -g yarn
```

### vscode

1. Install the workspace recommended plugins

### Common

1. Install docker-compose 1.29 or later <https://docs.docker.com/compose/install/> `docker-compose -v`

2. Install the Hasura CLI globally

    ```bash
    npm i -g hasura-cli
    hasura update-cli --version v2.0.0-alpha.8
    ```

3. Copy `hasura/.env.SAMPLE` to `.env`

4. Copy `apps/web/.env.SAMPLE` to `.env.local`

5. Copy `apps/bridge-api/.env.SAMPLE` to `.env`
   1. Now either install Pabau1 locally,
   2. Or ask Toshe to share his public MySQL

6. Create some bookmarks in your browser:
   1. "Prisma" to <http://localhost:4000/graphql>
   2. "Hasura" to <http://localhost:8080>
   3. "Web" to <http://localhost:4200>

## Storybook

Any component that is likely to be needed on other pages, such as a table, button, heading, avatar, etc, should live in `/libs/ui/`. Each component in here should be exposed as a Storybook item, and is visible on [https://storybook.new.pabau.com](https://storybook.new.pabau.com) or run `yarn run nx run ui:storybook` to develop on it locally with live reloading.

To create a new component, such as "Button", do the following:

```bash
yarn run nx g @nrwl/react:component --project=ui --style=less --export --pascalCaseFiles --name=Button
```

## Frontend

To view the Frontend, you can either visit [https://prelive-crm.new.pabau.com](https://prelive-crm.new.pabau.com) or run `yarn start` to develop on it locally with live reloading (HMR).

Each Page on the Frontend should use as many components as possible from our Storybook.

To create a new page (route), such as "/marketing/sources", do the following:

```bash
yarn run nx g @nrwl/next:page --project=web --style=less --directory marketing sources
```

Now add `import { } from '@pabau/ui'` at top of the new page file and fill in the {} with components you need.

## Bridge

The Bridge let's us access the legacy MySQL database over GraphQL. Prisma is used to access the old database, from nexus resolvers. The whole lot is then served as a GraphQL endpoint using Apollo Server. From there, Hasura then connects to this using Remote Schemas. Then the frontend apps connect to Hasura.

The master schema file is located at `apps/bridge-api/prisma/schema.prisma`

- Model names must adhere to the following regular expression: [A-Za-z][a-za-z0-9_]\*
- Model names must start with a letter
- Casing is PascalCase
- Model names must use the singular form (for example, User instead of users or Users)
- Never manually edit apps/bridge-api/src/generated/**
- When you edit `apps/bridge-api/src/schema.ts` you must then run `yarn prisma generate`

- To map the singular name of a Model to a plural database table use @@map("table_name")

`model marketing_source{ ...[multiple filed names] @@map("marketing_sources") }`

- To map a database table name which doesn't follow the naming convention [A-Za-z][a-za-z0-9_]\*
  `model third_party_access{ ...[multiple filed names] @@map("3rd_party_access") }`

## Backend

The backend is a REST MVC framework. We are using NestJS and converting it into Serverless Vercel Functions at compile-time.

The backend is designed to only be called from Hasura (Webhooks and Actions). Whenever you add a new route to the backend, you must wait for your PR to be merged to master before you will see it reflected on the live site. Once it's on the live site you then have to add an Action to Hasura for it. Choose async mode, and forward headers.

To view the Backend, you can either visit [https://backend.pabau.com](https://backend.pabau.com) or run `yarn nx serve backend` to develop on it locally with live reloading (HMR).

## Code Rules

- Branch from master, PR back to master.
  - Small PR's are good
  - Tag your commits and/or PR with the JIRA issue ID.
- Keep eye on your build pipeline status. If it fails, the onus is on your to make it green.
- Never do `import './MyComponent.less'` - always change it to `import styles from './MyComponent.module.less'`
- Never run your IDE or npm/yarn/npx with sudo or as root/Administrator.
- Never commit secrets, passwords, or tokens to this repo.
- To help keep DRY maybe you can tag me in a PR early on in any new component you are writing, so I can primarily help with the naming of things (as they saying goes "naming things is hard"). Or a screenshare, or just type out your plan more. Also have you looked at a wide variety of FIGMA designs? that would help. Also check out <https://vimeo.com/user30916972> for some videos of our old system, to get an idea for the domain and intended user.
- Best to use jsx ternary rather than display none in react
- Best to make each component responsive on its own (Storybook even has a mobile preview button), rather than based on outside props.
- Open to all disagreements and other ideas. Please raise threads about problems you see in the code, my code, or future code.
- Don't use index key in JSX
- Never use the CR character
- Configure your IDE's eslint to autofix on save
- Is master build broken? please hotfix it on its own branch (eg hf_master_build) then other devs can merge that branch into theirs, allowing us all to continue work.
- `husky` lints your code as you `git commit`, and tests your code as you `git push`.
- Keep assets close to the components which use them
- Don't `import '../../..` across project boundaries - use `import { ... } from '@pabau/ui'` instead.
- Dont do `setBlah(!blah)`, it's `setBlah(e => !e)`

## Delineation between /apps/web/components/ ("App components") and /libs/ui/ ("UI components")

- Most components should be a UI component, because most elements on a page should be "natural" to the user.
- Only UI components can be shown in Storybook
- UI components cannot access database
- UI components have to expose full control via Storyboard Controls
- App components will involve Database interaction (via Apollo Client)
- Maybe for a one-off type widget, App component is fine

## Our Stack

- [TypeScript](https://www.typescriptlang.org/) - strong-typing is key to team success within DDD paradigm
- [Nx](https://nx.dev/) - our monorepo orchestrator
- [eslint](https://eslint.org/) / [prettier](https://prettier.io/) - auto-cleans your code on save
- [Hasura](https://hasura.io/) - used as our ORM layer, provides websocket push notifications
- [Postgres](https://postgresql.org/) - the underlying SQL database that sits behind Hasura
- [Prisma](https://prisma.io/) - a graphql server that allows us to bridge to our old database
- [NestJS](https://nestjs.com/) - a backend that only hasura will call, for things like sending email(and converted to Vercel's [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction) at deploy-time)
- [ant.design](https://ant.design/) - the base for most of our UI components
- [Vercel](https://vercel.com/) - Our hosting platform for mgmt and web apps
- [Rancher](https://rancher.com/) Our self-hosted platform for backend, bridge-api, bridge-proxy
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) - modern React using Functional Programming principles
- [NextJS](https://nextjs.org/) - frontend framework that uses React
- [LESS Modules](https://webpack.js.org/loaders/less-loader/#css-modules-gotcha) - our CSS language of choice
- [Apollo Client 3](https://www.apollographql.com/docs/react/) - client-side database access layer
- [Formik](https://formik.org/) - handles any \<form> we need
- [Storybook](https://storybook.js.org/) - for previewing our UI component library
- [LogEntries](https://logentries.com/) - a legal vault where we track changes to data
- [Figma](https://figma.com/) - pre-JSX designs/specifications
- [Husky](https://github.com/typicode/husky#readme) - pre-commit and pre-push hooks to ensure no errors exist in code
- [Sentry](https://sentry.io/for/react/) - production app error logging and reporting
- [yup](https://github.com/jquense/yup) - write business-level validation logic once - and securely use the same code for frontend and backend
- Twilio Video + Sendgrid
- Atlassian: JIRA, Bitbucket (& Pipelines)

## Ticket workflow

1. On the JIRA
   1. Click *Create new branch* (accept defaults, branch should be master)
   2. Change Status into In Development
2. Checkout your new branch and code away :)

    ```bash
    git fetch && \
    git checkout -b origin/PABAU2-1234 && \
    yarn && yarn dev:linux # change to dev:windows if you are on Docker for Windows
    ```

3. Commit often. Push once or twice a day at least.

   ```bash
   git add -A && \
   git commit -m"Made a meaningful change in X" && \
   git push # grab a drink, this will take 2 minutes
   ```

4. When you feel very much finished, do a final push and open up a PR for it (to master again)
5. Configure Bitbucket to receive email upon code comment, 'Changes requested', or merged
6. Start your next ticket immediately while you follow through the remaining steps
7. After 10 mins or so, release-bot will post to [#pabau-2-devs](https://pabau.slack.com/archives/C01HXJK6YQ2) on Slack. Reply to the message with any comments on it.
8. Change the JIRA status to CODE REVIEW. This will let William browse all CODE REVIEW's and click the direct vercel link to see changes.
9. If you receive an email that require you to make more changes: code, push, wait for the slack bot to post another url, reply to that tagging in @James and @Dipak
10. When you receive an email that your code is merged, you should also find your ticket is moved to 'QA' status.

## GraphQL workflow

1. Open the Hasura console: <http://localhost:8080/console/>
2. Create a new table (in the singular tense, using snake_case)
3. Insert 3 'Frequently used columns', in order:
   1. `id` as a GUID
   2. Created at
   3. Updated at
4. If your table is order sensitive (customers can drag to rearrange the order), then add a column called "order", type Integer
5. If your table has is_active boolean, then add "is_active" as Boolean
6. Add the rest of your columns too
7. Add a very clear comment for the table (our customers will see this)
8. Change the table permissions so that 'public' role can do pretty much everything (for now).
9. Check your table's public role permission for SELECT has the Aggregation queries permissions enabled.
10. Now run `yarn hasura:export` in your IDE, commit the changes to your branch.
11. Now on your page's `schema.fields` array, add the relevant keys in -- they should match the hasura columns

## To do (big engineering items)

- Apollo persisted queries (automatic, or build time)
- Apollo local state
- Apollo getfromtree
- Ant design babel import loader
- Playroom
- Apollo Typed Documents
- local dev env for hasura, migrations
- graphql-code-generator
- Convert from 'next export' to full on next server with ssr (i'm not sure)
- proper next i18n at build time
- Install a working serverless adapter for NestJS
- stylelint within eslint
- eslint should capture tsc errors too
- auth to prisma
- storing jwt token for hasura in nextjs httponly cookie
- nestjs needs a typed hasura service that we can call

## bridge-proxy (PDS)

To run debug build locally, type `yarn nx serve bridge-proxy` - it listens on port 5006.

To run production build locally, type `docker build -t bridge-proxy -f tools/cicd/bridge-proxy.Dockerfile apps/bridge-proxy/ && docker run --rm -p 5006:5006 -it bridge-proxy`
