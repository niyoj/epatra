import Link from "next/link";
import React,{useEffect,useState} from "react";
import ReactDOM from "react-dom";
import logo from "../public/epatra.png";
import avatar from "../public/avatar.png";
import { getLoggedOut, getUserData } from "../services";

const Navbar = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [userEp, setUserEp] = useState("0");
  const [username, setUsername] = useState("")
  const [displayPic, setDisplayPic] = useState("")
  
  const getUserDetail = async ()=>{
    const user = localStorage.getItem("username")
    const {data} = await getUserData(user);
    console.log(data);
    const ep = data.ep;
    const displayPic = data.display_picture;
    const username = data.username;
    setUserEp(ep);
    setUsername(username);

    if (displayPic == null) {
      setDisplayPic(avatar.src);
    } else {
      setDisplayPic(displayPic);
    }
  }

  useEffect(() => {
    if(typeof window !== "undefined") {
      const LoggedIn = localStorage.getItem("isLoggedIn");
      if(LoggedIn == "true"){
        setisLoggedIn(true);
        getUserDetail()
      } 
    } else setisLoggedIn(false);
  }, [])
  
  const handleLogout = async()=>{
    console.log("logout clicked");
    const res = await getLoggedOut();
    
    localStorage.setItem("isLoggedIn","false");
    window.location.reload();
  }

  return (
    <nav className="flex justify-between px-8 md:pd-4 py-2 bg-background text-onbackground border-b border:outline h-[60px]">
      <div className="">
        <Link href="/"><img src={logo.src} className="h-[50px]" alt="Logo of epatra" /></Link>
      </div>
      <div className="group relative">
        <div className="h-[40px] border-2 rounded-full overflow-hidden cursor-pointer border-primary">
          <img className="object-contain h-[40px]" src={(displayPic!=="")?`${displayPic}`:avatar.src} />
          {/* <Link href="/"><img src={(displayPic!=="")?`${displayPic}`:logo.src} className="h-[50px]" alt="Logo of epatra" /></Link> */}
        </div>

        <div className="w-5 h-5 absolute rotate-45 right-3 top-[45px] hidden bg-background border z-0 group-hover:block"></div>
          
        <div className="absolute top-[50px] w-[200px] right-0 bg-background border p-4 rounded hidden group-hover:block z-10">
          <ul className={`capitalize text-secondary ${isLoggedIn ? null : "hidden"}`} >
            <li className="hover:text-primary font-bold cursor-pointer">{username}</li>
            <li className="hover:text-primary font-bold cursor-pointer">my progress : {userEp}</li>
            <li className="hover:text-primary font-bold cursor-pointer"><Link href="/changepassword">change password</Link></li>
            <li className="hover:text-primary font-bold cursor-pointer" onClick={handleLogout}>logout</li>
          </ul>

          <ul className={`flex flex-col items-center ${isLoggedIn ? "hidden" : null}`}>
            <li className="text-center pb-2">Login or Register to get started.</li>
            <li>
              <Link href="/register"><button className="bg-primary rounded-md text-onprimary px-4 py-2 capitalize text-xl">Register</button></Link>
            </li>
            <li className="pt-3">
              <Link href="/login"><button className="bg-background rounded-md text-primary px-4 py-2 capitalize text-xl border-primary border-2">login</button></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
