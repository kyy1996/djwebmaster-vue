## Website of WebmasterClub at Shanghai Dianji University

[https://www.djwebclub.com](https://www.djwebclub.com)

### Instruction for deployment

#### Deploy for the development

1. Install the dependencies
2. Start development server

```bash
npm i
./fix.sh
npm run dev
```

#### Deploy for the production

1. Install the dependencies
2. Build
3. Start server

```bash
npm i
./fix.sh
npm run build
NODE_ENV=production npm run start
```
