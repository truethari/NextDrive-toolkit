# NextDrive-toolkit 🦊: A toolkit for NextDrive

---

![NextDrive Logo](https://i.imgur.com/cdmB95b.png)

---

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Google Drive](#google-drive)
    - [Enable the API](#enable-the-api)
    - [Configure the OAuth consent screen](#configure-the-oauth-consent-screen)
    - [Authorize credentials for a web application](#authorize-credentials-for-a-web-application)
    - [Configure the Toolkit](#configure-the-toolkit)
- [License](#license)

## Introduction

NextDrive-toolkit is a toolkit for [NextDrive](https://github.com/truethari/NextDrive), a web application built using NextJS, designed to provide seamless access and management of public cloud drives over the internet. With NextDrive, users can effortlessly connect and interact with various cloud storage services, making data management and collaboration more efficient and convenient.

## Prerequisites

Before running this project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [NPM](https://www.npmjs.com/) (v8 or higher)

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository to your local machine using the following command:

    ```bash
    git clone https://github.com/truethari/NextDrive-toolkit.git
    ```

2. Navigate to the project directory and install the required dependencies:

    ```bash
    cd NextDrive-toolkit
    npm install
    ```

3. Run the project:

    ```bash
    node index
    ```

## Usage

### Google Drive

#### Create a Google Cloud project

- Go to the [Google Cloud Console](https://console.cloud.google.com/).
- Click the project selector at the top of the page.
- Click **New Project**.
- In the **Project name** field, enter a name for the project, such as "NextDrive-toolkit".
- Click **Create**.
- Make a note of the project ID, which might be different from the project name. The project ID is used in commands and in configurations.
- Click **Open**.
- In the **Google Cloud console**, on the project selector page, select your project.

#### Enable the API

Before using Google Drive APIs, you need to turn them on in a Google Cloud project. You can turn on one or more APIs in a single Google Cloud project.

- In the Google Cloud console, enable the [Google Drive API](https://console.cloud.google.com/flows/enableapi?apiid=drive.googleapis.com).

#### Configure the OAuth consent screen

If you're using a new Google Cloud project to complete this quickstart, configure the OAuth consent screen and add yourself as a test user. If you've already completed this step for your Cloud project, skip to the next section.

- Go to the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) page in the Google Cloud console.
- Select **External** and click **Create**.
- Enter a name for your application, such as "NextDrive-toolkit", and click **Save**.
- In the **Scopes** section, click **Add or Remove Scopes**.
- In the **Select OAuth Scopes** dialog, select the following scopes and click **Update**:

  - `https://www.googleapis.com/auth/drive`

- In the **Test users** section, click **Add Users** and add your Google account as a test user.
- Click **Save**.

#### Authorize credentials for a web application

To authenticate as an end user and access user data in your app, you need to create one or more OAuth 2.0 Client IDs. A client ID is used to identify a single app to Google's OAuth servers. If your app runs on multiple platforms, you must create a separate client ID for each platform.

- Go to the [Credentials](https://console.cloud.google.com/apis/credentials) page in the Google Cloud console.
- Click **Create Credentials** and select **OAuth client ID**.
- Select **Web application** and click **Create**.
- Enter a name for your OAuth 2.0 client ID, such as "NextDrive-toolkit", and click **Create**.
- Copy the client ID and client secret to use in the next section.
- Click **OK**.
- Click the **Download JSON** button to the right of the client ID.

#### Configure the Toolkit

To configure the toolkit, rename the downloaded JSON file to `credentials.json` and place it in the `NextDrive-toolkit` folder.

## License

This project is licensed under the [MIT](https://github.com/truethari/NextDrive-toolkit/blob/master/LICENSE) License.
