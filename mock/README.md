# How to use

1. Open a new tab in the terminal.
2. Run the following command:

##### With Yarn

```
  yarn mock
  or
  yarn run json-server -w -p 3333 ./mock/database.json

```

##### With NPM

```
  npm run mock
  or
  npx json-server -w -p 3333 ./mock/database.json

```

#### Routes

```
/people
/cities
/auth

```

[![Preview][mock-screenshot1]](https://citiesnewapi.herokuapp.com/)

# Note

###### If you don't run this command, the people page will not work properly

[mock-screenshot1]: ./preview.png
