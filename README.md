### App Engine website link: https://team-gahsp.uk.r.appspot.com/

To run locally, clone and type `npm install` in both the `client` and `api` folders. To start the `client` server, type `npm run dev`. To start the `api` server, type `npm start`. Must have both servers started for the backend to work.

If you want to deploy to App Engine, must run `gcloud app deploy` in both the `client` and `api` folders. Afterward, go to the root directory and type `gcloud app deploy dispatch.yaml`.