/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { CommunityLayout } from '@hyperlocal/_lib/client/components/layouts/CommunityLayout'
import { auth } from '@hyperlocal/server/auth'
import * as communitiesService from '@hyperlocal/services/communities.service'

async function getData(slug: string) {
  try {
    const community = await communitiesService.getBySlug(slug)

    return community?.toJSON()
  } catch (e: any) {
    throw new Error(e.toString())
  }
}

export default async function Page({ params: { slug } }: any) {
  const data = await getData(slug)
  const { theme } = data
  return (
    <CommunityLayout theme={theme}>
      <main className="grid grid-cols-1 md:grid-cols-3 mx-auto md:max-w-6xl">
        <section className="md:col-span-2 ">
          <div className="flex space-x-2 p-6 border border-stroke dark:border-strokedark dark:bg-boxdark overflow-x-scroll scrollbar-none rounded-sm bg-white">
            <div className="cursor-pointer relative group">
              <img
                src="https://placekeanu.com/128/128?img=0"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary group-hover:scale-110 transition-transform duration-200 ease-out"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute top-4 left-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>

              <p className="text-xs w-14 truncate text-center">somerando</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=1"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Amorepead1944</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=2"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Berman</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=3"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Wevell36</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=4"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Wough1971</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=5"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Ovion1943</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=6"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Unessight</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=7"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Nowassained</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=8"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Freg1969</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=9"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Ushe1969</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=10"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Onstonly1976</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=11"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Cleakettent</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=12"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Foldishow</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=13"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Pith2000</p>
            </div>
            <div className="cursor-pointer">
              <img
                src="https://placekeanu.com/128/128?img=14"
                className="h-14 w-14 rounded-full p-[1.5px] border-2 border-primary hover:scale-110 transition-transform duration-200 ease-out"
              />
              <p className="text-xs w-14 truncate text-center">Amorepead1944</p>
            </div>
          </div>

          <div className="border border-stroke dark:border-strokedark dark:bg-boxdark my-7 bg-white rounded-md">
            <div className="flex items-center p-5">
              <img
                className="h-12 rounded-full border border-tertiary p-1 mr-3"
                src="https://placekeanu.com/128/128?img=0"
                alt="user-image"
              />
              <p className="flex-1 font-bold">somerando</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>

            <img
              className="w-full object-cover"
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80"
              alt=""
            />

            <div className="flex justify-between p-4">
              <div className="flex space-x-4 h-[24px] w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn hover:text-secondary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn hover:text-secondary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn rotate-45 h-6 hover:text-secondary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn hover:text-secondary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
            </div>

            <p className="p-5 truncate">
              <span className="font-bold mr-2">somerando</span>
              nice picture!
            </p>

            <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
              <div className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=1"
                  alt="user-image"
                />
                <p className="font-semibold">RyanwatQueem</p>
                <p className="flex-1 truncate">nice</p>
                <p>2 hours ago</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=2"
                  alt="user-image"
                />
                <p className="font-semibold">Vicenary</p>
                <p className="flex-1 truncate">amazing!</p>
                <p>5 hours ago</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=3"
                  alt="user-image"
                />
                <p className="font-semibold">Stibialism</p>
                <p className="flex-1 truncate">great!</p>
                <p>2 days ago</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=4"
                  alt="user-image"
                />
                <p className="font-semibold">Ubiquarian</p>
                <p className="flex-1 truncate">nice pic!</p>
                <p>1 month ago</p>
              </div>
            </div>

            <form className="flex items-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <input
                className="border-none flex-1 focus:ring-0 mr-4"
                type="text"
                placeholder="Enter your comment"
              />
              <button className="font-bold text-blue-400">Post</button>
            </form>
          </div>
          <div className="border border-stroke dark:border-strokedark dark:bg-boxdark my-7 bg-white rounded-md">
            <div className="flex items-center p-5">
              <img
                className="h-12 rounded-full border border-tertiary p-1 mr-3"
                src="https://placekeanu.com/128/128?img=0"
                alt="user-image"
              />
              <p className="flex-1 font-bold">somerando</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>

            <img
              className="w-full object-cover"
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80"
              alt=""
            />

            <div className="flex justify-between p-4">
              <div className="flex space-x-4 h-[24px] w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn hover:text-secondary cursor-pointer"
                  fill="red"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn hover:text-secondary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn rotate-45 h-6 hover:text-secondary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn hover:text-secondary cursor-pointer"
                  fill="black"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
            </div>
            <p className="p-5 truncate">
              <span className="font-bold">2 likes</span>
              <br />
              <span className="font-bold mr-2">somerando</span>
              nice picture!
            </p>

            <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
              <div className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=1"
                  alt="user-image"
                />
                <p className="font-semibold">RyanwatQueem</p>
                <p className="flex-1 truncate">nice</p>
                <p>2 hours ago</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=2"
                  alt="user-image"
                />
                <p className="font-semibold">Vicenary</p>
                <p className="flex-1 truncate">amazing!</p>
                <p>5 hours ago</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=3"
                  alt="user-image"
                />
                <p className="font-semibold">Stibialism</p>
                <p className="flex-1 truncate">great!</p>
                <p>2 days ago</p>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  className="h-7 rounded-full object-cover"
                  src="https://i.pravatar.cc/150?img=4"
                  alt="user-image"
                />
                <p className="font-semibold">Ubiquarian</p>
                <p className="flex-1 truncate">nice pic!</p>
                <p>1 month ago</p>
              </div>
            </div>

            <form className="flex items-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <input
                className="border-none flex-1 focus:ring-0 mr-4"
                type="text"
                placeholder="Enter your comment"
              />
              <button className="font-bold text-blue-400">Post</button>
            </form>
          </div>
        </section>

        <section className="hidden md:inline-grid md:col-span-1">
          <div className="fixed w-[380px]">
            <div className="mt-4 ml-10">
              <div className="flex justify-between mb-5 text-sm">
                <h3 className="font-bold text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See all</button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <img
                  className="h-10 border rounded-full p-[2px]"
                  src="https://i.pravatar.cc/150?img=17"
                  alt="user-image"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-sm">john26375</h2>
                  <h3 className="text-sm text-gray-400">Admin</h3>
                </div>
                <button className="font-semibold text-blue-400 text-sm">
                  Follow
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <img
                  className="h-10 border rounded-full p-[2px]"
                  src="https://i.pravatar.cc/150?img=18"
                  alt="user-image"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-sm">davidlkdnc75</h2>
                  <h3 className="text-sm text-gray-400">Member</h3>
                </div>
                <button className="font-semibold text-blue-400 text-sm">
                  Follow
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <img
                  className="h-10 border rounded-full p-[2px]"
                  src="https://i.pravatar.cc/150?img=19"
                  alt="user-image"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-sm">sarasjhgcvsvc</h2>
                  <h3 className="text-sm text-gray-400">Member</h3>
                </div>
                <button className="font-semibold text-blue-400 text-sm">
                  Follow
                </button>
              </div>
            </div>
            <div className="mt-8 ml-10">
              <div className="flex justify-between mb-5 text-sm">
                <h3 className="font-bold text-gray-400">Community Theme</h3>
              </div>
              <div className="bg-primary h-4 w-full mb-1" />
              <div className="bg-secondary h-4 w-full mb-1" />
              <div className="bg-tertiary h-4 w-full mb-1" />
              <div className="bg-black dark:bg-gray h-4 w-full" />
            </div>
          </div>
        </section>
      </main>
    </CommunityLayout>
  )
}
