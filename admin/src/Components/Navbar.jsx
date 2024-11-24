
const Navbar = ({ setToken }) => {

  return (
    <div className="flex items-center py-2 justify-between px-[4%]">
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsBziGLGyV1PgU1m3r1KQK5dmnl_P-LnbdBg&s' className='w-60 h-20 -ml-8' alt='Logo' />
      <div className="flex justify-center items-center mb-2">
        <h3 className='text-5xl text-gray-900 mt-2'>Admin<span className='text-gray-600 text-2xl'>Panel®</span></h3>
      </div>
      <button onClick={() => setToken('')} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-md font-semibold sm:text-sm" >LogOut</button>
    </div>
  )
}

export default Navbar
