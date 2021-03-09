## To test locally on Linux:

```bash
yarn && yarn prisma:generate && yarn nx deploy bridge-api && docker build -t bridge -f tools/cicd/bridge.Dockerfile dist/apps/bridge-api/ && docker run --rm -it -p 4000:4000 bridge
```

## Folder structure

- `/prisma/` contains the latest ```schema.prisma```  lets us map and manipulate our current mariadb database using an
  object-oriented paradigm
- `/src/app/` contains the business logic
- `/src/app/*/dto` contains d
- `/src/app/models` contains our model classes and interfaces
- ``


# Running the bridge locally
1. Pull the latest build from master branch ```git pull origin master```
2. 
