import Orbit from './Orbit/Orbit.jsx';
import Lamp from './Lamp/Lamp.jsx';
import System from './Planet/System.jsx'
import Head1 from "./../../Components/Header/Head1.jsx";
import { useState } from 'react';

export default function Spaces() {
    const [activeComponent, setActiveComponent] = useState('orbit');
    const [orbit, showOrbit]=useState(true)
    const [planet, showPlanet]=useState(false)
    const [lamp, showLamp]=useState(false)

    const handleOrbit=()=>{
        showOrbit(true)
        showPlanet(false)
        showLamp(false)
    }

    const handlePlanet=()=>{
        showOrbit(false)
        showPlanet(true)
        showLamp(false)
    }

    const handleLamp=()=>{
        showOrbit(false)
        showPlanet(false)
        showLamp(true)
    }

    return (
        <div>
            <Head1
                showSysSpace={handlePlanet}
                showOrbitSpace={handleOrbit}
                showLampSpace={handleLamp}
            />

            {planet && <System />}
            {orbit && <Orbit/>}
            {lamp && <Lamp />}
        </div>
    );
}
