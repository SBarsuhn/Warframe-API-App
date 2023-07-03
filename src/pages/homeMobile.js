import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function HomeMobile() {

    const [isLoading, setIsLoading] = useState(true)
    const [archonHunt, setArchonHunt] = useState([])
    const [cetus, setCetus] = useState('')
    const [vallis, setVallis] = useState('')
    const [cambion, setCambion] = useState('')
    const [sortie, setSortie] = useState([])
    const [invasions, setInvasions] = useState([])
    const [fissures, setFissures] = useState([])
    const [nightwave, setNightwave] = useState([])
    // const [isChecked, setIsChecked] = useState(false)

    // const handleChange = () => {
    //   setIsChecked(!isChecked)
    // }



  useEffect(() => {
    APIcall();
  }, []);

  const APIcall = () => {
    const ENDPOINT = "https://api.warframestat.us/pc";
    axios(ENDPOINT)
      .then((response) => {
        setIsLoading(false)
        console.log(response.data);
        if (response.data) {
            setArchonHunt(response.data.archonHunt.missions)
            setInvasions(response.data.invasions)
            setCetus(response.data.cetusCycle.shortString) 
            setSortie(response.data.sortie.variants)
            setVallis(response.data.vallisCycle.shortString)
            setCambion(response.data.cambionCycle)
            setFissures(response.data.fissures)
            setNightwave(response.data.nightwave.activeChallenges)
        } else {
            console.log('error')
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.log("error", error);
      });
  };


const archonRender = archonHunt.map((worldState, index) => <div key={index}>{worldState.type} : {worldState.node}</div>)

const cetusString = JSON.stringify(cetus)
const cetusCheck = cetusString?.replace(/['"]+/g, '')

const vallisString = JSON.stringify(vallis)
const vallisCheck = vallisString?.replace(/['"]+/g, '')

const cambionActive = JSON.stringify(cambion.active)
const cambionFor = JSON.stringify(cambion.timeLeft)
const activeCheck = cambionActive?.replace(/['"]+/g, '')
const forCheck = cambionFor?.replace(/['"]+/g, '')


const cetusRender = <div>{cetusCheck}</div>
const vallisRender = <div>{vallisCheck}</div>
const cambionRender = <div>{activeCheck} for {forCheck}</div>


const invasionRender = invasions.map((worldState, index) => 
<div className="inv-content-mob" key={index}>
  <a target='blank' href={`https://warframe.fandom.com/wiki/WARFRAME_Wiki${worldState.attackerReward.asString}`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction} VS {worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/WARFRAME_Wiki${worldState.defenderReward.asString}`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>)





  const fissureRender = fissures.map((worldState, index) =>
!worldState.isHard && !worldState.isStorm? (
  <div className="fis-content-mob" key={index}>
  {worldState.tier} : {worldState.missionType}
  </div>
  ): null
)

const spFissureRender = fissures.map((worldState, index) =>
worldState.isHard && !worldState.isStorm? (
  <div className="fis-content-mob" key={index}>
  {worldState.tier} : {worldState.missionType}
</div>
): null

)

const rjFissureRender = fissures.map((worldState, index) =>
!worldState.isHard && worldState.isStorm  ? (
<div className="fis-content-mob" key={index}>
{worldState.tier} : {worldState.missionType}
</div>
): null
)



const sortieRender = sortie.map((worldState, index) => <div key={index}>{worldState.missionType} : {worldState.modifier}</div>)

const nightwaveRender = nightwave.map((worldState, index) => <div key={index}>
<input 
type='checkbox'
// checked={isChecked}
// onChange={handleChange}
/>
{worldState.desc}
</div>)


  return (
    <div className="container-mob">
 
      <div className="card-header-mob">
        <h2>CURRENT WORLD STATES</h2>
      </div>
      <div className="card-mob">
      <div className="col-mob">
  <header className="col-head-mob">ARCHON HUNT</header>
  <div className="col-content-mob">{archonRender}</div>
  <header className="col-head-mob">SORTIE</header>
  <div className="col-content-mob">{sortieRender}</div>
  <header className="col-head-mob">PLAINS OF EIDOLON</header>
  <div className="col-content-mob">{cetusRender}</div>
  <header className="col-head-mob"> ORB VALLIS</header>
  <div className="col-content-mob">{vallisRender}</div>
  <header className="col-head-mob">CAMBION DRIFT</header>
  <div className="col-content-mob">{cambionRender}</div>
  <div className="col-mob col-inv-mob">
  <header className="col-head-mob">INVASIONS</header>
  <div className="inv-content-mob">{invasionRender}</div>
  <div className="col-nw-mob">
  <header className="col-head-mob">NIGHTWAVE</header>
  <div className="col-content-mob">{nightwaveRender}</div>
  </div>
  </div>
  </div>
  
  <div className="col-mob col-sml-mob">
  <header className="col-head-mob">FISSURES</header>
  <div className="col-content-mob">{fissureRender}</div>
  <header className="col-head-mob">SP FISSURES</header>
  <div className="col-content-mob">{spFissureRender}</div>
  <header className="col-head-mob">RJ FISSURES</header>
  <div className="col-content-mob">{rjFissureRender}</div>
  </div>
      </div>
      </div>

  );
}

export default HomeMobile;
