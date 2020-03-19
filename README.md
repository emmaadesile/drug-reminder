# Drug-reminder
Drug-reminder is a prescription reminder web app. It helps you keep track of your prescription and ensures you take your drugs at set intervals.

## Installation

You need `Node v12.16.x` and `npm 6.13.x` to run the project.

```bash
git clone https://github.com/emmaadesile/drug-reminder.git
npm install
```

## Running the app locally
Before starting the app, create .env file using the .env.sample file

```
npm run migrate
npm run dev
```

## Available routes
```
Signup a new user: POST => /api/user/
Login a user: POST => /api/user/
Add Prescription: POST => /api/prescription/:prescriptionId
Delete Prescription: DELETE => /api/prescription/:prescriptionId
Edit Prescription: PUT => /api/prescription/:prescriptionId
```

## Test
```
npm run test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)