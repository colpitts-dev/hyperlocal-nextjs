/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { PostCard } from '@hyperlocal/ui/components/PostCard'
import { CommunityLayout } from '@hyperlocal/ui/components/layouts/CommunityLayout'
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

          <PostCard />
          <PostCard />
          <PostCard />
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
