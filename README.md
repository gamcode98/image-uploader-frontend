<h1 align="center">Tiny Cloud</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://image-uploader-gamcode.netlify.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/gamcode98/image-uploader-frontend">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx">
      Challenge
    </a>
  </h3>
</div>

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Overview

![login](/public/design/login.png)

In this screenshot you can see the login page where you can enter in the app, or redirect to the **signup** or **recover password** page.

![my space](/public/design/my-space.png)

Here is the page where you will redirect once you login successfully. There is a button that you can click and then you will redirect to the **upload image** page.

![upload image](/public/design/upload-image.png)

Here you can drag and drop an image or choose to select from your folder.

![upload image animation](/public/design/upload-image-animation.gif)

You will see a loader and then you will finally see your image, you can copy the url image.

![my space with images](/public/design/my-space-with-images.png)

You can see all your images uploaded in my space page and you can copy the url image or delete it.

### Built With

- [React](https://reactjs.org/)
- [React router dom](https://reactrouter.com/en/main)
- [MUI](https://mui.com/)
- [Formik](https://formik.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Features

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/O2iGT9yBd6xZBrOcVirx) was to build an application to complete the given user stories.

- You can drag and drop an image to upload it
- You can choose to select an image from my folder
- You can see a loader when uploading
- When the image is uploaded, I can see the image and copy it
- You can choose to copy to the clipboard

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/gamcode98/image-uploader-frontend

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

You will need to clone too the [backend repository](https://github.com/gamcode98/image-uploader-backend)

**Note**: Replace your *VITE_BACKEND_URL="your_backend_url"* in your **.env** file

## Acknowledgements

- [Dev challenges](https://devchallenges.io/)

## Contact

- Website [portfolio-gamcode.netlify.app/](https://portfolio-gamcode.netlify.app/)
- GitHub [@gamcode98](https://github.com/gamcode98)
