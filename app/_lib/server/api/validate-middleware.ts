export { validateMiddleware }

async function validateMiddleware(req: Request) {
  console.log(
    '---------------- EVERY REQUEST GOES THROUGH THIS MIDDLEWARE ----------------',
  )
}
