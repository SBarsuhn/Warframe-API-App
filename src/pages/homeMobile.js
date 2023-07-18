import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import PullToRefresh from 'react-simple-pull-to-refresh';
import steelEssence from '../images/SteelEssence.png'

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
    const [steelPath, setSteelPath] = useState([])
    // const [isChecked, setIsChecked] = useState(false)

    // const handleChange = () => {
    //   setIsChecked(!isChecked)
    // }

    function handleRefresh() {
      console.log("hello")
      window.location.reload(false);
      return new Promise((done, err) => {
})
    }


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
            setSteelPath(response.data.steelPath.currentReward)
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

const steelPathItem = JSON.stringify(steelPath.name)
const steelPathCost = JSON.stringify(steelPath.cost)
const steelPathItemCheck = steelPathItem?.replace(/['"]+/g, '')
const steelPathCostCheck = steelPathCost?.replace(/['"]+/g, '')

const steelPathRender = 
<div>{steelPathItemCheck} : {steelPathCostCheck} 
<a className="sp-render-mob" target='blank' href={`https://warframe.fandom.com/wiki/Steel_Essence`}>
  
<img className='sp-img-mob' title='Steel Essence' alt='Steel Essence' src={steelEssence}></img>
</a></div>


const invasionRender = invasions.map((worldState, index) => 
worldState.attackingFaction === "Infested"? (
<div className="inv-content-mob" key={index} >
<div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/wiki/Credits`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/${worldState.defenderReward.asString.replace(/[0-9]/g, '')}`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a>
</div> 
</div>) 
: worldState.attackerReward.asString === "Orokin Catalyst Blueprint" && worldState.defenderReward.asString === "Orokin Reactor Blueprint"? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Catalyst`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Reactor`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) 
: worldState.attackerReward.asString === "Orokin Reactor Blueprint" && worldState.defenderReward.asString === "Orokin Reactor Blueprint"? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Reactor`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Reactor`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) 
: worldState.attackerReward.asString === "Orokin Catalyst Blueprint" && worldState.defenderReward.asString === "Orokin Catalyst Blueprint"? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Catalyst`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Catalyst`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) 
: worldState.attackerReward.asString === "Orokin Reactor Blueprint" && worldState.defenderReward.asString === "Orokin Catalyst Blueprint"? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Reactor`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Catalyst`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) 
:
worldState.attackerReward.asString === "Orokin Catalyst Blueprint" ? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Catalyst`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/${worldState.defenderReward.asString.replace(/[0-9]/g, '')}`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) 
: worldState.defenderReward.asString === "Orokin Catalyst Blueprint"? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/wiki/${worldState.attackerReward.asString.replace(/[0-9]/g, '')}`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/Orokin_Catalyst`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) 
: worldState.attackerReward.asString === "Orokin Reactor Blueprint"? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/Orokin_Reactor`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/${worldState.defenderReward.asString.replace(/[0-9]/g, '')}`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) 
: worldState.defenderReward.asString === "Orokin Reactor Blueprint"? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/${worldState.attackerReward.asString.replace(/[0-9]/g, '')}`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/Orokin_Reactor`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) : worldState.rewardTypes[0] === "vandal" || worldState.rewardTypes[1] === "wraith" || worldState.rewardTypes[0] === "wraith" || worldState.rewardTypes[1] === "vandal" ? (
  (<div className="inv-content-mob" key={index}>
  <div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/${worldState.attackerReward.asString.replace(/\b(?:Receiver|Stock|Barrel|Blueprint)\b/gi, '')}`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/${worldState.defenderReward.asString.replace(/\b(?:Receiver|Stock|Barrel|Blueprint)\b/gi, '')}`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>)
) 
: (<div className="inv-content-mob" key={index}>
<div className="attacker-mob">
  <a target='blank' href={`https://warframe.fandom.com/wiki/${worldState.attackerReward.asString.replace(/[0-9]/g, '')}`}>
<img className='inv-img' title={worldState.attackerReward.asString} alt={`(${worldState.attackerReward.asString}) `} src={worldState.attackerReward.thumbnail}></img>
</a>
{worldState.attackingFaction}</div> <div className="vs-mob">VS</div> <div className="defender-mob">{worldState.defendingFaction} 
<a target='blank' href={`https://warframe.fandom.com/wiki/${worldState.defenderReward.asString.replace(/[0-9]/g, '')}`}>
<img className='inv-img' title={worldState.defenderReward.asString} alt={`(${worldState.defenderReward.asString})`} src={worldState.defenderReward.thumbnail}></img>
</a> 
</div>
</div>))







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

const nightwaveRender = nightwave.map((worldState, index) => 

<div key={index}>
<div className="list">
{worldState.desc}
</div>
</div>)


  return (
    <div className="container-mob">
 
      <div className="card-header-mob">
        <h2>CURRENT WORLD STATES</h2>
      </div>
      <div className="card-mob">
      <PullToRefresh   onRefresh={handleRefresh}>
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
  <div className="col-head-mob">STEEL PATH</div>
  <div className="col-content-mob">{steelPathRender}</div>
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
      </PullToRefresh>
      </div>
      </div>
  );
}

export default HomeMobile;
