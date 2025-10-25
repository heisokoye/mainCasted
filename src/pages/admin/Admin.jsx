import React,{useState} from 'react'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { app } from '../../Firebase'
import { useNavigate } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard")
    } catch(error){
      switch(error.code){
        case "auth/invalid-email":
          setErrorMsg("Invalid Email");
          break;
        case "auth/user-not-found":
          setErrorMsg("User not found");
          break;
        case "auth/wrong-password":
          setErrorMsg("Wrong Password");
          break;
        default:
          setErrorMsg("Invalid login credentials");
          break;
      }
    }
  };

  return (
    <div className='pt-16   h-[100vh] w-full' >
        <section className='mx-auto w-[80%]'>
          <div className='mx-auto flex justify-center  h-[85vh] items-center'>
            <form action="" onSubmit={handleLogin} className='flex flex-col border-none items-center justify-center rounded-lg  backdrop-blur-lg bg-white/60 shadow-2xl border h-[25rem] w-[20rem] md:h-[30rem] md:w-[25rem] p-2' >
                <div className='flex   flex-col p-4'>
                  <h1>Email</h1>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  required placeholder='' className='md:w-[20rem] border p-1 focus:outline-none' />
                </div> 
                <div className='flex flex-col  p-4'>
                  <h1> Password</h1>
                  <input type="password" required placeholder='' value={password} onChange ={(e)=> setPassword(e.target.value)} className='md:w-[20rem] border p-1 focus:outline-none '  />
                </div>
                {errorMsg && <p className='text-red-500 text-sm mb-2'>{errorMsg}</p>}
                <button className='mt-4  border text-amber-600 px-3 py-2 cursor-pointer rounded-lg hover:bg-amber-600 hover:text-white hover:transition-transform hover:duration-300 '>
                    <h1> Login <BsArrowRight className='inline hover:translate-x-2 hover:transition-transform hover:text-white hover:duration-300 '/></h1> 
                </button>
            </form>
          </div>
        </section>
    </div>
  )
}

export default Admin