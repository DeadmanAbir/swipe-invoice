import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="w-full h-12 shadow-md fixed flex ">
      <div className="max-w-[1440px] mx-auto h-12 flex items-center justify-start w-full px-3  ">
        <Image src="/swipe_logo.svg" alt="logo" height={100} width={100}  />
      </div>
    </div>
  )
}

export default Navbar
