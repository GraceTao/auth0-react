# React + Vite
Install `npm` first (and Node). Run `node -v` and `npm -v` to check that they're installed.

To install dependencies, run `npm install` or `npm ci`. The file `package.json` contains minimum dependencies, while `package-lock.json` specifies exact versions the app is using.

To run the app in dev mode, use `npm run dev`: `dev` is a default Vite npm script. The app should auto-refresh upon new changes.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
