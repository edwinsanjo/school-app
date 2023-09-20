import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className="relative overflow-hidden flex row w-full h-24 bg-[#282a36] subpixel-antialiased z-50">
        <div className="w-full justify-items-center">
          <h2 className="relative text-white text-center py-8 font-semibold font-sans text-2xl">LOGO</h2>
        </div>
        <div className="flex-col w-full h-full justify-items-center">
          <ul className="flex row h-[10px] py-10 font-medium">
            <li href="#" className="text-white w-full">Home</li>
            <li href="#" className="text-white w-full">Solution</li>
            <li href="#" className="text-white w-full">Features</li>
            <li href="#" className="text-white w-full">About us</li>
          </ul> 
          <div className="bg-[#dc96ff] w-12 h-2 rounded-[30px]"></div>
        </div>
        <div className="w-full justify-items-center text-center">
          <div className="my-10 mx-48 p-0.5 bg-[#fff] rounded"><a className="place-self-center text-black font-medium font-sans text-sm">Login</a></div>
        </div>
      </nav>
      <section className="relative flex row w-full justify-item-center my-0.5 bg-[#282A36] p-6">
        <div className='flex-col ml-12 text-white w-5/6 h-full p-6 mt-6 z-50 grid grid-cols-1 gap-4 content-center'>
          <h1 className="text-5xl font-['Jost'] font-bold text-white">Seamless School</h1>
          <h1 className="text-5xl font-['Jost'] font-bold text-white">Administration</h1>
          <p className='para'>Take the hassle out of school administration with our user-friendly platform. Effortlessly manage admissions, student records, timetables, and more. Spend less time on paperwork and more time on what truly matters.</p>
          <h2 className="text-2xl font-['Jost'] font-bold text-white pb-6">Educating The Future.</h2>
          <div className='flex row my-10'>
            <a className='bg-[#1C85E8] w-3 h-3 rounded-full mr-2 mt-1'></a>
            <a className='bg-[#fff] w-3 h-3 rounded-full mr-2 mt-1'></a>
            <a className='bg-[#fff] w-3 h-3 rounded-full mr-2 mt-1'></a>
            <img src="https://file.rendit.io/n/aAWNnUl3qVbe6mLASUC5.svg" alt="arrow" />
          </div>
        </div>
        <div className='flex h-full w-full'>
          <img src="https://file.rendit.io/n/eIzR2LG7eMzQPWr7WaL3.svg" alt="nothing" className='w-full h-full z-50'/>
        </div>
      </section>
      <div className="w-[300px] h-[125px] origin-top-left rotate-[15deg] bg-[#00ffa3] absolute top-[300px] right-1 rounded-[50%]" id="Ellipse" />
      <div className="w-[300px] h-[125px] bg-[#00d1ff] absolute top-[143.01734924316406px] right-[275px] rounded-[50%]" id="Ellipse2" />
      <div className="w-[300px] h-[125px] bg-[#eb00ff] absolute top-[320px] right-[300px] rounded-[50%]" id="Ellipse3" />
      <div className="w-[300px] h-[125px] bg-[#00d1ff] absolute top-28 right-4 rounded-[50%]" id="Ellipse5" />
      <div className="w-[300px] h-[100px] bg-[#9e00ff] absolute top-[507px] right-[400px] rounded-[50%]" id="Ellipse1" />
      <div className="w-[300px] h-[100px] bg-[#dbff00] absolute top-[507px] right-4 rounded-[50%]" id="Ellipse4" />
      <img src="https://file.rendit.io/n/PC0UJIQ9BzLLZI4lgCXA.svg" className="w-3 h-3 absolute top-[179.64527893066406px] left-[422.5327453613281px]" />
      <img src="https://file.rendit.io/n/ocFihX9DyyRPiNydNLJC.svg" className="absolute top-[165.64527893066406px] ml-56 mb-5 w-4" />
      <img src="https://file.rendit.io/n/lAu9yMuPpHunVcXEuWY6.svg" className="w-4 h-4 absolute top-40 left-[299.5327453613281px]" />
      <img src="https://file.rendit.io/n/wZJygVSuIFOVjGJPfJYZ.svg" className="absolute top-[150.64527893066406px] w-3 mb-20 ml-8" />
      <img src="https://file.rendit.io/n/bNgGCpi72FNcd9eZuRXw.svg" className="absolute top-[120.64527893066406px] w-4 mb-10 ml-[150px]" />
    </>
  )
}

export default App
