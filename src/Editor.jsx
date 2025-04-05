// This is the actual input-section

import { useState, useCallback } from 'react'
import { FolderArrowDownIcon, HomeIcon } from '@heroicons/react/24/solid'

import EnumInput from './EnumInput'
import ValueInput from './ValueInput'

// decode a file buffer (base64 text)
export function decode(text) {
  const buffer = atob(text)
  const header = buffer.slice(0, 60)
  const settings = JSON.parse(buffer.slice(60, -1))
  return { header, settings }
}

// encode a file buffer (base64 text)
export function encode({ header, settings }) {
  const json = JSON.stringify(settings)
  return btoa(`${header}${json}\u0000`)
}

// download a file
export function download(filename, contents, type = 'application/octet-stream') {
  const blob = new Blob([contents], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// fields that use plus seperator like "4+1+0+2+3+"
export const enums = {
  cCapes: { 11: 'NG+', 0: 'Red', 1: 'Blue', 2: 'Fuscia', 3: 'White', 4: 'Yellow', 5: 'Orange', 6: 'Green', 7: 'Pink', 8: 'Black', 9: 'Ochre', 10: 'Purple' },
  cSwords: { 11: 'NG+', 0: 'Red', 1: 'Blue', 2: 'Fuscia', 3: 'White', 4: 'Yellow', 5: 'Orange', 6: 'Green', 7: 'Pink', 8: 'Black', 9: 'Ochre', 10: 'Purple' },
  cShells: { 11: 'NG+', 0: 'Red', 1: 'Blue', 2: 'Fuscia', 3: 'White', 4: 'Yellow', 5: 'Orange', 6: 'Green', 7: 'Pink', 8: 'Black', 9: 'Ochre', 10: 'Purple', 12: 'Gold' },
  bossGearbits: {
    // TODO: figure out what these are
    // and also they don't seemm to work as it is, so I might need to tie them to bosses or something
    G12110931: 'Gear 1',
    G12110932: 'Gear 2',
    G12110933: 'Gear 3',
    G19543222: 'Gear 4',
    G19543223: 'Gear 5',
    G19543221: 'Gear 6',
    G24527052: 'Gear 7',
    G24527053: 'Gear 8',
    G24527051: 'Gear 9',
    G15051971: 'Gear 10',
    G15051972: 'Gear 11',
    G15051973: 'Gear 12',
    G14363903: 'Gear 13',
    G14363901: 'Gear 14',
    G14363902: 'Gear 15',
    G16436761: 'Gear 16',
    G16436762: 'Gear 17',
    G16436763: 'Gear 18',
    G15720771: 'Gear 19',
    G15720772: 'Gear 20',
    G15720773: 'Gear 21'
  },

  // TODO: I dunno how any of these enums work
  skill: {},
  rooms: {},
  wellMap: {},
  tablet: {},
  skill: {},
  warp: {},
  events: {},
  cues: {},
  well: {},
  sc: {},
  healthKits: {}
}

const enumNames = Object.keys(enums)

export default function Editor() {
  const [game, gameSet] = useState()
  const [name, nameSet] = useState()
  const [id, idSet] = useState()

  const handleFileChange = useCallback(async (e) => {
    const { header, settings } = decode(await e.target.files[0].text())
    nameSet(e.target.files[0].name)
    idSet(btoa(header))
    gameSet(settings)
  })

  // TODO: break these into different callbacks?
  const handleChange = useCallback((name) => (e) => {
    // id is just header base64 ecoded, so save-file can be passed from different computers
    if (name === 'id') {
      idSet(e.target.value)

      // gameName requires some formatting
    } else if (name === 'gameName') {
      gameSet({ ...game, gameName: e.target.value.toUpperCase().replace(/[^A-Z 0-9]/g, '') })

      // int fields
    } else if (['gear', 'healthUp', 'checkHP'].includes(name)) {
      gameSet({ ...game, [name]: parseInt(e.target.value) })

      // float fields
    } else if ([].includes(name)) {
      gameSet({ ...game, [name]: parseFloat(e.target.value) })

      // string fields
    } else {
      gameSet({ ...game, [name]: e.target.value })
    }
  })

  // called when user clicks download button
  const handleDownload = useCallback((e) => download(name, encode({ header: atob(id), settings: game })))

  // called when user clicks Home button (near position)
  const handleHome = useCallback(() => gameSet({ ...game, checkX: 344, checkY: 322 }))

  return (
    <div>
      <div className='flex flex-row gap-2 items-center mb-4'>
        <input type='file' className='file-input my-2' onChange={handleFileChange} />
        {!!game && (
          <button className='btn btn-sm btn-primary' onClick={handleDownload}>
            <FolderArrowDownIcon className='size-6'></FolderArrowDownIcon> Download
          </button>
        )}
      </div>
      {!!game && (
        <>
          <div className='flex gap-2 items-center my-2'>
            <label className='w-48' htmlFor='id'>
              Computer ID
            </label>
            <input id='id' type='text' className='input' value={id} onChange={handleChange('id')} />
          </div>
          <div className='flex gap-2 items-center my-2'>
            <label className='w-48' htmlFor='gameName'>
              Player Name
            </label>
            <input id='gameName' type='text' className='input' value={game.gameName} onChange={handleChange('gameName')} />
          </div>
          <div className='flex gap-2 items-center my-2'>
            <label className='w-48' htmlFor='checkHP'>
              HP
            </label>
            <input id='checkHP' type='number' className='input' min={1} max={6} step={1} value={game.checkHP} onChange={handleChange('checkHP')} />
          </div>
          <div className='flex gap-2 items-center my-2'>
            <label className='w-48' htmlFor='healthUp'>
              Additionall Health Slots
            </label>
            <input id='healthUp' type='number' className='input' min={0} max={2} step={1} value={game.healthUp} onChange={handleChange('healthUp')} />
          </div>
          <div className='flex gap-2 items-center my-2'>
            <label className='w-48' htmlFor='gear'>
              Gear Bits
            </label>
            <input id='gear' type='number' className='input' min={0} max={186} step={1} value={game.gear} onChange={handleChange('gear')} />
          </div>
          <div className='flex gap-2 items-center my-2'>
            <label className='w-48' htmlFor='ValuedashHS'>
              Dash Challenge
            </label>
            <ValueInput id='ValuedashHS' onChange={handleChange('values')} value={game.values} className='input' type='number' step={1} min={0} max={800} />
          </div>
          <div className='flex gap-2 items-center my-2'>
            <div className='w-48'>Position</div>
            <input id='checkX' type='number' className='input w-24' step={1} value={game.checkX} onChange={handleChange('checkX')} />
            <input id='checkY' type='number' className='input w-24' step={1} value={game.checkY} onChange={handleChange('checkY')} />
            <button className='btn btn-sm ml-2' onClick={handleHome}>
              <HomeIcon className='size-6'></HomeIcon> Home
            </button>
          </div>

          <div className='flex gap-8'>
            <div className='flex gap-2 my-2'>
              <h3 className='font-bold'>Capes</h3>
              <EnumInput id='cCapes' value={game.cCapes} onChange={handleChange('cCapes')} options={enums.cCapes}></EnumInput>
            </div>
            <div className='flex gap-2 my-2'>
              <h3 className='font-bold'>Swords</h3>
              <EnumInput id='cSwords' value={game.cSwords} onChange={handleChange('cSwords')} options={enums.cSwords}></EnumInput>
            </div>
            <div className='flex gap-2 my-2'>
              <h3 className='font-bold'>Companions</h3>
              <EnumInput id='cShells' value={game.cShells} onChange={handleChange('cShells')} options={enums.cShells}></EnumInput>
            </div>
          </div>
          <div className='flex gap-2 my-2'>
            <h3 className='font-bold'>Boss Gear</h3>
            <EnumInput id='bossGearbits' value={game.bossGearbits} onChange={handleChange('bossGearbits')} options={enums.bossGearbits}></EnumInput>
          </div>
        </>
      )}

      {!!game && (
        <details>
          <summary>Debug</summary>
          <pre className='mt-8'>{JSON.stringify({ name, id, game }, null, 2)}</pre>
        </details>
      )}
    </div>
  )
}
