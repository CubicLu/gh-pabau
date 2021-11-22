# Pabau

- [Pabau](#pabau)
  - [Welcome](#welcome)
  - [Paths](#paths)
  - [Setup](#setup)
    - [Windows](#windows)
    - [Linux](#linux)
    - [VS Code](#vs-code)
    - [Common](#common)
    - [Production](#production)
  - [Parts of the system](#parts-of-the-system)
    - [Storybook](#storybook)
    - [Frontend](#frontend)
    - [Bridge](#bridge)
    - [Backend](#backend)
  - [Code Rules](#code-rules)
  - [Delineation between /apps/web/components/ ("App components") and /libs/ui/ ("UI components")](#delineation-between-appswebcomponents-app-components-and-libsui-ui-components)
  - [Our Stack](#our-stack)
  - [Ticket workflow](#ticket-workflow)
  - [GraphQL workflow](#graphql-workflow)
  - [Troubleshooting](#troubleshooting)
  - [To do (big engineering items)](#to-do-big-engineering-items)

## Welcome

This monorepo contains all of our code and is controlled using the [Nx](https://nx.dev) CLI.

Please read this file in Preview mode (not the source code).

## Paths

- `/` - our monorepo root
- `/.run/` - scripts for all devs (and Jetbrains IDE's)
- `/.storybook/` - global Storybook config
- `/.vscode/` - vscode specific settings for all devs
- `/apps/` - where most of our projects reside
- `/apps/web/` - the main application Frontend
- `/apps/*-e2e/` - End-to-end testing with Cypress
- `/dist/` - temporary directory where the build outputs are generated
- `/hasura/` - our database configuration
- `/libs/` - where any shared libraries reside. These can be referenced (used) in any app.
- `/libs/ui/` - our shared UI (React Components)
- `/libs/graphql/` - our shared GraphQL documents (Apollo Hooks)
- `/tools/` - repo-level tooling.
- `**/cicd/` - devops only.

Notes:

- Libs are not allowed to import from apps

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
- [Rancher](https://rancher.com/) Our self-hosted platform for backend, bridge-api
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

## Setup

### Common

1. Ensure your IDE has eslint plugin setup and configured to auto-fix on save.

1. Ensure your `git config --local user.name` is your full name in title case, and same for `user.email` which should match your <https://bitbucket.org> account.

1. Install docker and docker-compose

   1. For Windows users: Install WSL1 -- WSL2 is not supported!
   1. Install docker-compose from <https://docs.docker.com/compose/install/>
   1. Ensure you're on version 1.29 or later by running `docker-compose -v`

1. Install and launch Pabau1

   1. Either: Follow the instructions from the <https://bitbucket.org/pabau/pabau-crm> repo's README.md to launch the local docker stack
   1. Or (easier): Ask Toshe to share his public MySQL URL and put that into `apps/bridge-api/src/prisma/.env.local` as `DATABASE_URL=`

1. Create some bookmarks in your browser:

   1. "Prisma" to <http://localhost:4000/graphql>
   1. "Hasura READ-ONLY" to <http://localhost:8080>
   1. "Hasura EDITABLE" to <http://localhost:9695>
   1. "Web" to <http://localhost:4200>
   1. "Backend" to <http://localhost:3333>
   1. "Mgmt" to <http://localhost:???>
   1. "Connect" to <http://localhost:???>

### Windows

1. Install Node 14 LTS (Opt in for the extra build tools)
1. Install yarn: `npm i -g yarn`
1. Ensure your terminal is BASH (cmd and PS not supported. Vscode: `"terminal.integrated.shell.windows": "c:/program files/git/bin/bash.exe",`)

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

### VS Code

1. Install the workspace recommended plugins

## Parts of the system

### Storybook

Any component that is likely to be needed on other pages, such as a table, button, heading, avatar, etc, should live in `/libs/ui/`. Each component in here should be exposed as a Storybook item, and is visible on [https://storybook.new.pabau.com](https://storybook.new.pabau.com) or run `yarn run nx run ui:storybook` to develop on it locally with live reloading.

To create a new component, such as "Button", do the following:

```bash
yarn run nx g @nrwl/react:component --project=ui --style=less --export --pascalCaseFiles --name=Button
```

### Frontend

The master branch is Constantly Deployed to [https://prelive-crm.new.pabau.com](https://prelive-crm.new.pabau.com).

To develop againt the production API [https://api-v2.new.pabau.com](https://api-v2.new.pabau.com), run `yarn production:web`.

To develop againt the staging API [https://api-v2-staging.new.pabau.com](https://api-v2-staging.new.pabau.com), create a new file called `apps/web/.env.production.local` and run `yarn production:web`.
```dotenv
NEXT_PUBLIC_GRAPHQL_ENDPOINT="https://api-v2-staging.pabau.com/v1/graphql"
NEXT_PUBLIC_WS_ENDPOINT="wss://api-v2-staging.pabau.com/v1/graphql"
```

To develop against local DB, run `yarn dev` and `yarn start`. If you have "missing" data locally, please add to 2.sql or ask Branko or Kostova.

To create a new page (route), such as "/marketing/sources", do the following:

```bash
yarn run nx g @nrwl/next:page --project=web --style=less --directory marketing sources
```

Now add `import { } from '@pabau/ui'` at top of the new page file and fill in the {} with components you need.

### Bridge

The Bridge let's us access the legacy MySQL database over GraphQL. Prisma is used to access the old database, from nexus resolvers. The whole lot is then served as a GraphQL endpoint using Apollo Server. From there, Hasura then connects to this using Remote Schemas. Then the frontend apps connect to Hasura.

The master schema file is located at `apps/bridge-api/src/prisma/schema.prisma`

- Model names must adhere to the following regular expression: [A-Za-z][a-za-z0-9_]\*
- Model names must start with a letter
- Casing is PascalCase
- Model names must use the singular form (for example, User instead of users or Users)
- Never manually edit apps/bridge-api/src/generated/\*\*
- When you edit `apps/bridge-api/src/schema.ts` you must then run `yarn prisma generate`

- To map the singular name of a Model to a plural database table use @@map("table_name")

`model marketing_source{ ...[multiple filed names] @@map("marketing_sources") }`

- To map a database table name which doesn't follow the naming convention [A-Za-z][a-za-z0-9_]\*
  `model third_party_access{ ...[multiple filed names] @@map("3rd_party_access") }`

For more information please visit the bridge-api README apps/bridge-api/README.md

### Backend

The backend is a REST MVC framework. We are using NestJS and converting it into Serverless Vercel Functions at compile-time.

The backend should only be called from Hasura via Triggers and Actions. There is also a function to call the backend from Pabau1 PHP.

Whenever you add a new route to the backend, you must wait for your PR to be merged to master before you will see it reflected on the live site. Once it's on the live site you then have to add an Action to Hasura for it. Choose async mode, and forward headers.

To view the Backend, you can either visit [https://backend.pabau.com](https://backend.pabau.com) or run `yarn nx serve backend` to develop on it locally with live reloading (HMR).

## Code Rules

- Communication is paramount. Please discuss your ideas at meetings and open Slack threads about whatever you are pondering or stuck on.
- Anything security related please also open a constant dialog with Head of Security
- Prefer TS paradigm (favour FP over OOP). Don't use classes unless you have a use for them (such as long-lived with private members, polymorphism/inheritance, or nestjs).
- If you introduce a new concept into the codebase such as 'recompose' in apps/web/components/Locations/Map.tsx please make yourself highly accommodating for discussions and code re-writes until it fits well.
- Take care to use established casing for the names you create. We support camelCase, PascalCase, snail_case and kebab-case.
- Branch from master, PR back to master.
  - Small PRs are good
  - Tag your commits and/or PR with the JIRA issue ID.
- Before writing code that is considered dangerous such as `yarn add`, `eslint-ignore`, `dangerouslySetInnerHTML`, or `$queryRaw` please open a thread with your team leader and tag James and Nenad in.
- Keep eye on your build pipeline status. If it fails, the onus is on your to make it green.
- Never do `import './MyComponent.less'` - always change it to `import styles from './MyComponent.module.less'`
- Never run your IDE or npm/yarn/npx with sudo or as root/Administrator.
- Never commit secrets, passwords, or tokens to this repo.
- To help keep DRY maybe you can tag me in a PR early on in any new component you are writing, so I can primarily help with the naming of things (as they saying goes "naming things is hard"). Or a screenshare, or just type out your plan more. Also have you looked at a wide variety of FIGMA designs? that would help. Also check out <https://vimeo.com/user30916972> for some videos of our old system, to get an idea for the domain and intended user.
- Best to use jsx ternary rather than display none in react
- Best to make each component responsive on its own (Storybook even has a mobile preview button), rather than based on outside props.
- Don't use index key in JSX
- Never use the CR character
- Configure your IDE's eslint to autofix on save
- Is master build broken? please hotfix it on its own branch (eg hf_master_build) then other devs can merge that branch into theirs, allowing us all to continue work.
- `husky` lints your code as you `git commit`, and tests your code as you `git push`.
- Keep assets close to the components which use them
- Don't `import '../../..` across project boundaries - use `import { ... } from '@pabau/ui'` instead.
- Don't do `setBlah(!blah)`, it's `setBlah(e => !e)`

### Delineation between /apps/web/components/ ("App components") and /libs/ui/ ("UI components")

- Most components should be a UI component, because most elements on a page should be "natural" to the user.
- Only UI components can be shown in Storybook
- UI components cannot access database
- UI components have to expose full control via Storyboard Controls
- App components will involve Database interaction (via Apollo Client)
- Maybe for a one-off type widget, App component is fine

## Ticket workflow

1. On the JIRA
   1. Click _Create new branch_ (accept defaults, branch should be master)
   2. Change Status into In Development
2. Checkout your new branch and code away :)

   ```bash
   git checkout master
   git pull
   git checkout -b origin/PABAU2-1234
   yarn && yarn dev
   ```

3. Commit often. Push once or twice a day at least.

   ```bash
   git commit -am"Meaningful message here"
   git push
   ```

4. When you feel very much finished, do a final push and open up a PR for it (to master again)
5. Configure Bitbucket to receive email upon code comment, 'Changes requested', or merged
6. Start your next ticket immediately while you follow through the remaining steps
7. After 30 minutes or so, release-bot will post to [#pabau-2-devs](https://pabau.slack.com/archives/C01HXJK6YQ2) on Slack. Reply to the message with any extra info needed for QA to test it. Doing so will also subscribe you to updates on it via the Slack Threads feature.
8. Change the JIRA status to CODE REVIEW.
9. If you receive an email that require you to make more changes: code, push, wait for the slack bot to post another url, reply to that tagging in @James and @Dipak
10. When you receive an email that your code is merged, you should also find your ticket is moved to 'QA' status.

## GraphQL workflow

In addition to Ticket workflow, if you are doing backend:

1. Run `yarn dev` to launch the backend services.
1. This should open the local Hasura console on port 9695. You can still use localhost:8080 to view-only, but remember to never make any changes on this port! **ALL CHANGES MUST BE MADE ON PORT 9695**.
1. Whenever you make a change, you should see a new `/hasura/migrations/default/**/*.sql` file appear!
1. When you are finished, you can squash all your edits into 1 migration file by running `yarn hasura:cli migrate squash --database-name default --from NNNN --name "My shiny new database stuff"` where `NNNN` is the oldest non-committed datetime stamp you have. At the end, it will ask if you want to delete the migration files, press `y` to choose yes.
1. Export the metadata (this overwrites on top in a "Git-safe" fashion): `yarn hasura:export`

- Never change previous migrations in Git that have already been merged to master.
- If you are out-of-sync, you'll have to `git checkout master hasura/ && yarn hasura:clean` to start over.
- Careful not to create a resolver in Hasura that is same name as Prisma.
- Naming conventions should follow Hasura guidelines for Hasura, and GraphQL spec for Prisma.
- Add comments for the customer to all tables and columns. You can omit the 3-5 boilerplate columns such as `id`.

## Troubleshooting

Any problems, type `yarn hasura:clean`

Problem: `Fatal Error:- Environment variable HASURA_GRAPHQL_JWT_SECRET: Error in $: Failed reading: not a valid json value`
Solution: Upgrade docker-compose to latest version

## To do (big engineering items)

- Nextjs 11
- Apollo persisted queries (automatic, or build time)
- Apollo local state
- Apollo getfromtree
- Ant design babel import loader
- Playroom
- Apollo Typed Documents
- web/mgmt/connect: next server, or static? Full, split, or no SSR?
- proper next i18n at build time
- Install a working serverless adapter for NestJS
- stylelint within eslint
- storing jwt token for hasura in nextjs httponly cookie
- nestjs needs a typed hasura service that we can call
