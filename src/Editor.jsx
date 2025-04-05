// This is the actual input-section

import { useState, useCallback } from 'react'

import EnumInput from './EnumInput'

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

  const handleChange = useCallback((name) => (e) => {
    if (name === 'id') {
      idSet(e.target.value)
    } else if (name === 'gameName') {
      gameSet({ ...game, gameName: e.target.value.toUpperCase().replace(/[^A-Z]/g, '') })
    } else {
      gameSet({ ...game, [name]: e.target.value })
    }
  })

  const handleDownload = useCallback((e) => download(name, encode({ header: atob(id), settings: game })))

  return (
    <div>
      <div className='flex flex-row gap-2 items-center mb-4'>
        <input type='file' className='file-input my-2' onChange={handleFileChange} />
        {!!game && (
          <button className='btn btn-primary btn-sm' onClick={handleDownload}>
            Download
          </button>
        )}
      </div>
      {!!game && (
        <>
          <div className='flex gap-2 items-center my-2'>
            <label htmlFor='id'>Computer ID:</label>
            <input id='id' type='text' className='input' value={id} onChange={handleChange('id')} />
          </div>
          <div className='flex gap-2 items-center my-2'>
            <label htmlFor='gameName'>Player Name:</label>
            <input id='gameName' type='text' className='input' value={game.gameName} onChange={handleChange('gameName')} />
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
