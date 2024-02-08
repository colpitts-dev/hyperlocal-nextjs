/* eslint-disable @next/next/no-img-element */
export const PostCard = () => {
  return (
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

      <form className="flex items-center p-4 py-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 mr-4 hover:text-primary"
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
          type="text"
          placeholder="Enter your comment..."
          className="w-full bg-transparent pl-2 pr-4 font-medium focus:outline-none"
        />
        <button className="hover:text-primary font-bold text-blue-400 px-4">
          Post
        </button>
      </form>
    </div>
  )
}
