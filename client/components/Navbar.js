import Link from "next/link";
import React,{useState} from "react";
import{GiHamburgerMenu} from 'react-icons/gi'
import{IoMdClose} from 'react-icons/io'

const Navbar = () => {
  const [isHamburger, setIsHamburger] = useState(false)
  const handleHamburgerMenu =()=>{
    setIsHamburger(!isHamburger);
  }
  return <div className="h-20 bg-onprimary-variant text-surface">
    <nav className="p-4 h-20 shadow-xl md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <span className="text-2xl">
        <img className="h-10 inline" src="" alt=""/>
          <Link href="/">ePatra</Link> 
        </span>
        <span className="text-2xl cursor-pointer md:hidden block">
          {isHamburger ?<IoMdClose color="white" onClick={handleHamburgerMenu}/> :<GiHamburgerMenu color="white" onClick={handleHamburgerMenu}/>}
        </span>
      </div>
      <ul class={`md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-onprimary-variant w-full left-0 md:w-auto md:py-0 my-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-300 ${isHamburger && "top-[40px] z-10 opacity-100"}`}>
        <li className="mx-4 my-6 md:my-0">
          <Link href="/" className="text-xl hover:text-secondary duration-500">Home</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="/" className="text-xl hover:text-secondary duration-500">General</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="/" className="text-xl hover:text-secondary duration-500">Business</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="/" className="text-xl hover:text-secondary duration-500">Entertainment</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="/" className="text-xl hover:text-secondary duration-500">Sports</Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link href="/" className="text-xl hover:text-secondary duration-500">Technology</Link>
        </li>
      </ul>
    </nav>
  </div>;
};

export default Navbar;
