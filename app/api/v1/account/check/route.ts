import * as peopleService from '@hyperlocal/services/people.service'

export async function POST(request: Request) {
  const body = request?.json ? await request?.json() : request.body

  if (!body.walletAddress) {
    return Response.json({ ok: false }, { status: 400 })
  }

  try {
    const doc = await peopleService.getByWalletAddress(body?.walletAddress)
    if (!doc) {
      return Response.json({ ok: false }, { status: 404 })
    }

    return Response.json({ ok: true })
  } catch (e) {
    console.log(e)
    return Response.json({ ok: false }, { status: 400 })
  }
}
