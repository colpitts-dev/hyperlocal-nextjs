import { NextResponse } from 'next/server'
import * as peopleService from '@hyperlocal/services/people.service'

export async function GET(request: Request) {
  try {
    const people = await peopleService.getAll()
    return NextResponse.json(people)
  } catch (error) {
    return NextResponse.error()
  }
}

export async function POST(request: Request) {
  const personInput = request?.json ? await request?.json() : request.body
  try {
    const newPerson = await peopleService.create(personInput)
    return NextResponse.json(newPerson, {
      status: 201,
    })
  } catch (error: any) {
    const message = error?.message || error
    return NextResponse.json({ message }, { status: 400 })
  }
}
