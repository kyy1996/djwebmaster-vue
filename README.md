## Website of WebmasterClub at Shanghai Dianji University

[https://www.djwebclub.com](https://www.djwebclub.com)

### Instruction for deployment

#### Deploy for the development

1. Install the dependencies
2. Start development server

```bash
yarn
./fix.sh
yarn run dev
```

#### Deploy for the production

1. Install the dependencies
2. Build
3. Start server

```bash
yarn
./fix.sh
yarn run build
NODE_ENV=production yarn run start
```
