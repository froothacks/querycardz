# How to get started

1. Follow the guide [here](https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account) there won't be an option to do Device registration so skip any
   steps where that is required we will step that up using the cli.

- While setting up your project take note of it's `project-id` _NOT_ the application name
- Setup your virtual env based on which OS you are using guide is [here (venv docs)](https://docs.python.org/3/library/venv.html#creating-virtual-environments) and [here (API docs)](https://github.com/googlesamples/assistant-sdk-python/tree/master/google-assistant-sdk/googlesamples/assistant/grpc#setup)
- Run `which python` or `where python` (Windows) and ensure that the python refers to your `./env/` directory
- Run `python -m pip install --upgrade google-assistant-sdk[samples]`
- Run `python -m pip install --upgrade google-auth-oauthlib[tool]`
- Go to https://console.developers.google.com/apis/credentials and add an OAuth 2.0 Client ID
  - Set the application type to be Desktop
  - Provide a friendly name
  - Download the secrets.json file to the `./auth` directory
- Run `google-oauthlib-tool --scope https://www.googleapis.com/auth/assistant-sdk-prototype --save --headless --client-secrets /path/to/client_secret_client-id.json` ensure to change the `/path/to/client_secret_client-id.json` to your secrets file (probably `./auth/client_secret_STUFF.json`).
- Follow the rest of the steps https://developers.google.com/assistant/sdk/guides/service/python/embed/install-sample#generate_credentials
- Make sure to take note of where your `credentials.json` is saved for windows it is save in `C:\Users\<user>\AppData\Roaming\google-oauthlib-tool\credentials.json`
- Now register the device by running `googlesamples-assistant-devicetool register --model <projectID>Dev --type LIGHT --manufacturer HackMIT --product-name querycardz --device Dev --client-type SERVICE`
- This should register your device using the api take note of the device-id in the console window and create a python file in `./auth` called `credentials.json`

  ```json
  {
    "device_id": "<fromConsoleWindow>",
    "device_model_id": "<projectID>Dev",
    "creds_path": "<pathToCreds.json>"
  }
  ```

- Then run `python -m pip install -r requirements.txt` from `./server`
