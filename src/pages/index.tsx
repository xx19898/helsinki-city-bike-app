import { type NextPage } from "next";
import { Transition } from 'react-transition-group'
import {useRef} from 'react'
import { api } from "~/utils/api";
import BicycleIcon from "~/utils/icons/bicycleIcon";
import Header from "~/modules/mainPage/components/header";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from "next/link";

const Home: NextPage = () => {
  const nodeRef = useRef(null);
  

  return (
    <Transition nodeRef={nodeRef} addEndListener={() => console.log('END')} onEntering={() => console.log('ENTERING')} onEnter={() => console.log('ENTERING')}>
      {
      state => 
      (
        <div ref={nodeRef} className="w-full min-h-screen h-auto">
          <Header />
          <ul className="w-auto h-auto mx-[2em] my-10 flex flex-col justify-center items-center">
            <li className="w-full text-white text-xl drop-shadow-md rounded-md text-center py-10 my-5 bg-EngineeringOrange">
              <Link href={'/journeys'}>View Journeys</Link>
            </li>
            <li className="w-full text-white text-xl drop-shadow-md rounded-md text-center py-10 my-5 bg-EngineeringOrange">
              <Link href={'/stations'}>View Stations</Link>
            </li>
            <li className="w-full text-white text-xl drop-shadow-md rounded-md text-center py-5 my-5 bg-EngineeringOrange flex flex-col justify-center items-ce">
              <button className="w-full h-full flex flex-row items-center justify-center md:gap-5 sm:gap-0">
                <p className="text-xl">Add new station</p>
                <AddCircleIcon sx={{ fontSize: 150,color: 'white' }}/>
              </button>
            </li>
            <li className="w-full text-white text-xl drop-shadow-md rounded-md text-center py-5 my-5 bg-EngineeringOrange flex flex-col justify-center items-ce">
              <button className="w-full h-full flex flex-row items-center justify-center md:gap-5 sm:gap-0">
                <p className="text-xl">Add new journey</p>
                <AddCircleIcon sx={{ fontSize: 150,color: 'white' }}/>
              </button>
            </li>
        </ul>
        </div> 
      )}
    </Transition>
  );
};


export default Home