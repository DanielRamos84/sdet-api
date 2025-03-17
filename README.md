# SuperTest API Testing Framework 🚀

API Testing Framework repository built using TypeScript, Jest, and Supertest, and it focuses on ensuring the reliability and correctness of API endpoints.

## Overview 📋

This repository contains automated tests for the API endpoints of the [SDET Unicorns Practice Site](https://practice-react.sdetunicorns.com/test/api-docs/#/). The tests cover various aspects of the API, including CRUD operations, schema validation, and business logic.

## Technologies Used 🛠️

- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Jest**: JavaScript testing framework with a focus on simplicity.
- **Supertest**: A library for testing HTTP servers.
- **@ngneat/falso**: A library for generating fake data.

## Tests 🧪

### Brands Tests

The `brands.spec.ts` file contains tests for the `/brands` endpoint. The tests are organized into three main sections:

1. **Get /brands**:

   - **Should return list of brands**: Verifies that the API returns a list of brands.
   - **Should fetch new brand**: Verifies that a newly created brand can be fetched.
   - **Business Logic - Throw error brand id not found**: Verifies that an error is returned when a non-existent brand ID is requested.
   - **Business Logic - Throw error brand does not exist**: Verifies that an error is returned when an invalid brand ID is requested.

2. **Post /brands**:

   - **Should create a new brand**: Verifies that a new brand can be created.
   - **Schema Verification - Name is a mandatory field**: Verifies that an error is returned when the name field is missing.
   - **Schema Verification - Name minimum character length**: Verifies that an error is returned when the name is too short.
   - **Should create brand with empty description**: Verifies that a brand can be created with an empty description.

3. **Delete /brands**:
   - **Should delete new brand**: Verifies that a newly created brand can be deleted.

### Controller

The `brand.controller.ts` file contains methods for interacting with the `/brands` endpoint. These methods are used in the tests to perform various operations such as creating, fetching, and deleting brands.

## Getting Started 🚀

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository

2. Navigate to the project directory

3. Install the dependencies

### Running the Tests 🏃‍♂️

To run the tests, use the following command:

```sh
npm test
```

## Work in Progress 🚧

This repository is a work in progress. I am continuously expanding the tests and improving the framework.
