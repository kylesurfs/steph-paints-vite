# 📂 React SPA Repo for [stephpaints.com](stephpaints.com)
- This repo is for the frontend TypeScript code that is available at [stephpaints.com](stephpaints.com)

## Dev setup
Navigate to the vite folder (`steph-paints-vite` in my case) and run the following commands in a terminal.
- Terminal 1: `npm run dev`

## Dev links
- [GitHub Express repo](https://github.com/kylesurfs/steph-paints-express) 
- [GitHub Vite repo](https://github.com/kylesurfs/steph-paints-vite) (current page)

## [stephpaints.com](stephpaints.com) repos and stack
### Repos
- Frontend 
  - [React SPA](https://github.com/kylesurfs/steph-paints-vite)
- Backend
  - [Express server](https://github.com/kylesurfs/steph-paints-express)

### Frontend Stack
- [Vite](vitejs.dev) - build tooling
- [React](reactjs.org) 18
- [React Router 6](https://reactrouter.com/en/main)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)- for static hosting of SPA

### Backend Serverful Stack
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Amazon Linux 2](https://aws.amazon.com/amazon-linux-2/)
- [AWS VPC, Target Groups, ENIs, Security Groups, etc.](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- [AWS EC2 (Elastic Compute Cloud)](https://aws.amazon.com/pm/ec2/)
- Coming soon (in replacement of EC2):
  - [AWS ECS (Elastic Container Service)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)

### Backend Serverless Stack
- [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)- for storing art portfolio images and user uploaded files
- [MongoDB](mongodb.com) - NoSQL database

### CI/CD Stack
- [GitHub](github.com)
- [CodePipeline](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html)
- [CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html)

#### More dev support can be found at notes.md




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
