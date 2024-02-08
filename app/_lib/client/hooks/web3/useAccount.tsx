import useSWR from 'swr'

export const hookFactory = (deps: any) => (params: any) => {
  const { data, error } = useSWR('/web3/useAccount', async url => {
    console.log({ deps })
    return 'Test User'
  })

  return {
    data,
    error,
  }
}

export const useAccount = hookFactory({ ethereum: null, provider: null })
