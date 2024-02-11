'use client'
import * as React from 'react'
import Image from 'next/image'
import { useAccount, useSignMessage, useConnect, Connector } from 'wagmi'

import { Fragment } from 'react'

export function SignInButton({ signIn }: { signIn: () => void }) {
  const { connectors, connect } = useConnect()
  const { isConnected, address, chain } = useAccount()

  const [state, setState] = React.useState<{
    loading?: boolean
    nonce?: string
  }>({})

  // const fetchNonce = async () => {
  //   try {
  //     const nonceRes = await fetch('/api/v1/account/wallet')
  //     const nonce = await nonceRes.json()
  //     setState(x => ({ ...x, nonce }))
  //   } catch (error) {
  //     setState(x => ({ ...x, error: error as Error }))
  //   }
  // }

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  React.useEffect(() => {
    if (isConnected) {
      console.log('ADDRESS THAT IS CONNECTED', address)
    }
    //fetchNonce()
  }, [])

  // If the user is not connected
  // display the Connect MetaMask button
  // otherwise display the Sign In button

  return (
    <>
      {isConnected ? (
        <button
          disabled={state.loading}
          onClick={signIn}
          type="button"
          className="text-black dark:text-white flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50 mb-4"
        >
          <span>
            <Image
              width={24}
              height={24}
              src={`${'/images/logo/metamask-logo.svg'}`}
              alt="MetaMask Logo"
            />
          </span>
          Sign In with MetaMask
        </button>
      ) : (
        <>
          {connectors.map(connector => (
            <Fragment key={connector.uid}>
              {connector.id === 'io.metamask' && (
                <button
                  type="button"
                  onClick={() => connect({ connector })}
                  className="text-black dark:text-white flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50 mb-4"
                >
                  <span>
                    <Image
                      width={24}
                      height={24}
                      src={`${
                        connector?.icon || '/images/logo/metamask-logo.svg'
                      }`}
                      alt={`${connector.name} logo`}
                    />
                  </span>
                  Connect {connector.name}
                </button>
              )}
            </Fragment>
          ))}
        </>
      )}
      {/* {isConnected ? (
        <button
          disabled={!state.nonce || state.loading}
          onClick={signIn}
          type="button"
          className="text-black dark:text-white flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50 mb-4"
        >
          <span>
            <Image
              width={24}
              height={24}
              src={'/images/logo/metamask-logo.svg'}
              alt="MetaMask Logo"
            />
          </span>
          Sign In with MetaMask
        </button>
      ) : (
        <>
          {connectors.map(connector => (
            <>
              {connector.id === 'io.metamask' && (
                <button
                  key={connector.uid}
                  type="button"
                  onClick={() => connect({ connector })}
                  className="text-black dark:text-white flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50 mb-4"
                >
                  <span>
                    <Image
                      width={24}
                      height={24}
                      src={`${
                        connector?.icon || '/images/logo/metamask-logo.svg'
                      }`}
                      alt={`${connector.name} logo`}
                    />
                  </span>
                  {connector.name}
                </button>
              )}
            </>
          ))}
        </>
      )} */}
    </>
  )
}
