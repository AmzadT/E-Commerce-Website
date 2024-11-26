const Navbar = ({ setToken }) => {

  return (
    <div className="flex flex-wrap items-center py-2 justify-between px-4 md:px-[4%]">
      {/* Logo Section */}
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBziGLGyV1PgU1m3r1KQK5dmnl_P-LnbdBg&s'
        className='w-32 h-14 sm:w-40 sm:h-16 lg:w-60 lg:h-20 -ml-1 lg:-ml-11' alt='Logo' />

      {/* Title Section */}
      <div className="flex flex-col justify-center items-center mb-2">
        <h3 className='text-lg sm:text-2xl md:text-3xl lg:text-5xl text-gray-900 mt-2 text-center'>
          Admin<span className='text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl'>Panel®</span>
        </h3>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken('')}
        className="bg-gray-900 text-white px-3 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-full text-sm sm:text-md md:text-lg font-semibold">LogOut</button>
    </div>


  )
}

export default Navbar
