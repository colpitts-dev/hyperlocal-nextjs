# Hyperlocal

open source community engagement platform

### Getting Started

#### Prerequisites

- Node 18.18+
- MongoDB 6.x+

#### .env variables

```
JWT_SECRET=
MONGO_URI=
```

JWT_SECRET: _to generate secrets from command line:_

```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
