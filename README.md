[![Build Status](https://travis-ci.com/fantastic-genius/politico.svg?branch=develop)](https://travis-ci.com/fantastic-genius/politico)

[![Coverage Status](https://coveralls.io/repos/github/fantastic-genius/politico/badge.svg?branch=develop)](https://coveralls.io/github/fantastic-genius/politico?branch=develop)

[![Maintainability](https://api.codeclimate.com/v1/badges/9a9aa54e14fb225991b1/maintainability)](https://codeclimate.com/github/fantastic-genius/politico/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/9a9aa54e14fb225991b1/test_coverage)](https://codeclimate.com/github/fantastic-genius/politico/test_coverage)

# Politico

A voting application where politicians can show interest for a political office and user can vote for contestant

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Hosted Client Side
https://fantastic-genius.github.io/politico/


### Prerequisites

You need to install the following dependencies:

```
npm install express --save
```

### Starting

After successfully installing the dependencies all you need is to start your application to get your application running. to do that just run 'npm start' after you have navigated to the directory where you saved this application


```
npm start
```

If you possible make any changes, the application automatocally restarts itself 

## Running the tests

To run the test all you need is run "npm test" within the command line after navigating to that directory

```
npm test
```

## Creating Database

The database used for this application is postgres. setup your postgres database and create you environment
as contained in the sample.env file

- To create the needed tables after setting up the application, run 

```
npm  run migrate
```

- To delete all the tables, run 

```
npm  run drop
```

- To create dummy data in your database after setting up the database and reated the tables, run

```
npm  run seeddb
```
