// This is the actual input-section

import { useCallback } from 'react'
import { HomeIcon } from '@heroicons/react/24/solid'
import { useHyperlight } from './hyperlight'

export default function Editor() {
  const { current, currentSet } = useHyperlight()

  // use input to update current parsed
  const updateParsed = useCallback((name, color) => (e) => {
    const n = { ...current }
    if (['health', 'healthUp', 'keys', 'gears', 'deaths', 'id', 'name', 'ammo', 'posX', 'posY', 'drifterKey'].includes(name)) {
      n.parsed[name] = e.target.value
    }
    if (['outfits', 'swords', 'companions'].includes(name)) {
      if (e.target.checked) {
        n.parsed[name].push(color)
      } else {
        n.parsed[name] = n.parsed[name].filter((i) => i !== color)
      }
    }
    currentSet(n)
  })

  const checkAll = useCallback((name) => (e) => {
    const n = { ...current }
    if (!e.target.checked) {
      n.parsed[name] = ['red']
    } else {
      n.parsed[name] = ['red', 'blue', 'fuscia', 'white', 'yellow', 'orange', 'green', 'pink', 'black', 'ochre', 'purple']
      if (name === 'companions') {
        n.parsed.companions.push('gold')
      }
    }
    console.log(n)
    currentSet(n)
  })

  const setHome = useCallback((e) => {
    const n = { ...current }
    n.parsed.posX = 344
    n.parsed.posY = 322
    currentSet(n)
  })

  return current.hasVals ? (
    <div className='p-4 flex gap-2 flex-col'>
      <label>
        Computer ID: <input type='text' className='input' value={current.parsed.id} onChange={updateParsed('id')} />
      </label>

      <label>
        Player Name: <input type='text' className='input' value={current.parsed.name} onChange={updateParsed('name')} />
      </label>

      <label>
        Position:
        <input type='number' className='input' value={current.parsed.posX} min={0} step={1} onChange={updateParsed('posX')} /> x
        <input type='number' className='input' value={current.parsed.posY} min={0} step={1} onChange={updateParsed('posY')} />{' '}
        <button className='btn' onClick={setHome}>
          <HomeIcon className='size-6' /> Home
        </button>
      </label>
      <h2 className='text-xl mb-4 mt-4'>Stats</h2>
      <div className='flex gap-2 mt-4 flex-col'>
        <label>
          Deaths: <input type='number' className='input' value={current.parsed.deaths} step={1} min={0} onChange={updateParsed('deaths')} />
        </label>
        <label>
          Current Health: <input type='number' className='input' value={current.parsed.health} min={1} max={8} onChange={updateParsed('health')} />
        </label>
        <label>
          Additional Health: <input type='number' className='input' value={current.parsed.healthUp} step={1} min={0} max={3} onChange={updateParsed('healthUp')} />
        </label>
        <label>
          Ammo: <input type='number' className='input' value={current.parsed.ammo} step={0.1} min={0} max={1} onChange={updateParsed('ammo')} />
        </label>
        <label>
          Drift: <input type='number' className='input' value={current.parsed.drifterKey} step={1} min={0} onChange={updateParsed('drifterKey')} />
        </label>
      </div>
      <h2 className='text-xl mb-4 mt-4'>Items</h2>
      <div className='flex gap-2 mt-4 flex-col'>
        <label>
          Keys: <input type='number' className='input' value={current.parsed.keys} step={1} min={0} max={16} onChange={updateParsed('keys')} />
        </label>
        <label>
          Gears: <input type='number' className='input' value={current.parsed.gears} step={1} min={0} max={16} onChange={updateParsed('gears')} />
        </label>
      </div>
      <div className='flex gap-2 mt-4'>
        <div>
          <h3 className='text-lg mb-2'>Outfits</h3>
          <div className='flex flex-col gap-2'>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.length >= 11} onChange={checkAll('outfits')} /> All
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('ngplus')} onChange={updateParsed('outfits', 'ngplus')} /> NG+
            </label>
            <label>
              <input disabled type='checkbox' className='toggle' checked={current.parsed.outfits.includes('red')} /> Red
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('blue')} onChange={updateParsed('outfits', 'blue')} /> Blue
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('fuscia')} onChange={updateParsed('outfits', 'fuscia')} /> Fuscia
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('white')} onChange={updateParsed('outfits', 'white')} /> White
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('yellow')} onChange={updateParsed('outfits', 'yellow')} /> Yellow
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('orange')} onChange={updateParsed('outfits', 'orange')} /> Orange
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('green')} onChange={updateParsed('outfits', 'green')} /> Green/Blue
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('pink')} onChange={updateParsed('outfits', 'pink')} /> Pink
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('black')} onChange={updateParsed('outfits', 'black')} /> Black
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('ochre')} onChange={updateParsed('outfits', 'ochre')} /> Ochre
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.outfits.includes('purple')} onChange={updateParsed('outfits', 'purple')} /> Purple
            </label>
          </div>
        </div>
        <div>
          <h3 className='text-lg mb-2'>Swords</h3>
          <div className='flex flex-col gap-2'>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.length >= 11} onChange={checkAll('swords')} /> All
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('ngplus')} onChange={updateParsed('swords', 'ngplus')} /> NG+
            </label>
            <label>
              <input disabled type='checkbox' className='toggle' checked={current.parsed.swords.includes('red')} /> Red
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('blue')} onChange={updateParsed('swords', 'blue')} /> Blue
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('fuscia')} onChange={updateParsed('swords', 'fuscia')} /> Fuscia
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('white')} onChange={updateParsed('swords', 'white')} /> White
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('yellow')} onChange={updateParsed('swords', 'yellow')} /> Yellow
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('orange')} onChange={updateParsed('swords', 'orange')} /> Orange
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('green')} onChange={updateParsed('swords', 'green')} /> Green/Blue
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('pink')} onChange={updateParsed('swords', 'pink')} /> Pink
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('black')} onChange={updateParsed('swords', 'black')} /> Black
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('ochre')} onChange={updateParsed('swords', 'ochre')} /> Ochre
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.swords.includes('purple')} onChange={updateParsed('swords', 'purple')} /> Purple
            </label>
          </div>
        </div>
        <div>
          <h3 className='text-lg mb-2'>Companions</h3>
          <div className='flex flex-col gap-2'>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.length >= 12} onChange={checkAll('companions')} /> All
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('ngplus')} onChange={updateParsed('companions', 'ngplus')} /> NG+
            </label>
            <label>
              <input disabled type='checkbox' className='toggle' checked={current.parsed.companions.includes('red')} /> Red
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('blue')} onChange={updateParsed('companions', 'blue')} /> Blue
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('fuscia')} onChange={updateParsed('companions', 'fuscia')} /> Fuscia
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('white')} onChange={updateParsed('companions', 'white')} /> White
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('yellow')} onChange={updateParsed('companions', 'yellow')} /> Yellow
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('orange')} onChange={updateParsed('companions', 'orange')} /> Orange
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('green')} onChange={updateParsed('companions', 'green')} /> Green/Blue
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('pink')} onChange={updateParsed('companions', 'pink')} /> Pink
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('black')} onChange={updateParsed('companions', 'black')} /> Black
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('ochre')} onChange={updateParsed('companions', 'ochre')} /> Ochre
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('purple')} onChange={updateParsed('companions', 'purple')} /> Purple
            </label>
            <label>
              <input type='checkbox' className='toggle' checked={current.parsed.companions.includes('gold')} onChange={updateParsed('companions', 'gold')} /> Gold (Kickstarter)
            </label>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
