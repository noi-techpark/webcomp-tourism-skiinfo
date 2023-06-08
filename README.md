<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Tourism Skiinfo

![REUSE Compliance](https://github.com/noi-techpark/webcomp-tourism-skiinfo/actions/workflows/reuse.yml/badge.svg)
[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-tourism-skiinfo)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-tourism-skiinfo)
[![CI/CD](https://github.com/noi-techpark/webcomp-tourism-skiinfo/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-tourism-skiinfo/actions/workflows/main.yml)

A web component to display a list and details of skiareas located in South Tyrol.

- [Tourism Details](#tourism-details)
  - [Usage](#usage)
    - [Attributes](#attributes)
      - [content-type](#content-type)
      - [content-id-list](#content-id-list)
      - [category](#category)
      - [language](#language)
      - [page-size](#page-size)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Source code](#source-code)
    - [Dependencies](#dependencies)
    - [Build](#build)
  - [Tests and linting](#tests-and-linting)
  - [Deployment](#deployment)
  - [Docker environment](#docker-environment)
    - [Installation](#installation)
    - [Dependenices](#dependenices)
    - [Start and stop the containers](#start-and-stop-the-containers)
    - [Running commands inside the container](#running-commands-inside-the-container)
  - [Information](#information)
    - [Support](#support)
    - [Contributing](#contributing)
    - [Documentation](#documentation)
    - [Boilerplate](#boilerplate)
    - [License](#license)

## Usage

```html
<script src="./odh-tourism-skiinfo.min.js"></script>
<odh-tourism-skiinfo></odh-tourism-skiinfo>
```

### Attributes

#### content-id-list

List of content Ids separated by a comma. Example: "1,2,3"

Type: String
Default: null

To find content IDs of the content types shown under `content-type` go to
https://tourism.opendatahub.bz.it/swagger and look at the categories `Activity`,
`Poi`, and `Gastronomy`. Make sure that the content type and the IDs match,
otherwise you will get an empty result.

#### language

Language of the data

Type: string\
Options: ["de", "en", "it"]
Default: "de"

#### page-size

Number of items that are shown in one page

Type: Number
Default: 20

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- ToDo: Check the prerequisites
- Node 12 / NPM 6

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
ToDo: git clone https://github.com/noi-techpark/webcomp-tourism-skiinfo.git
```

Change directory:

```bash
ToDo: cd webcomp-tourism-skiinfo/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```

The application will be served and can be accessed at [http://localhost:8080](http://localhost:8080).

## Tests and linting

The tests and the linting can be executed with the following commands:

```bash
npm run test
npm run lint
```

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

After the build the web-component can be tested by opening /dist/demo.html

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "npm install"
```

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose run --rm app /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose run --rm app /bin/bash -c "npm run test"
```

## Information

### Support

For support, please contact [help@opendatahub.bz.it](mailto:help@opendatahub.bz.it).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `development` branch.

- Make sure the tests are passing.

- Create a pull request against the `development` branch.

A more detailed description can be found here: [https://github.com/noi-techpark/documentation/blob/master/contributors.md](https://github.com/noi-techpark/documentation/blob/master/contributors.md).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.