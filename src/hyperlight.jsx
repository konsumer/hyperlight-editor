import { createContext, useContext, useState, useCallback } from 'react'

// this context stores the current parsed file and has some functions for messing with hyperlight files
export const context = createContext()

// hook for react-context
export const useHyperlight = () => useContext(context)

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

export const colors = ['red', 'blue', 'fuscia', 'white', 'yellow', 'orange', 'green', 'pink', 'black', 'ochre', 'purple', 'ngplus', 'gold']
export const itemTypes = ['outfits', 'swords', 'companions']
const itemTypesSave = ['cCapes', 'cSwords', 'cShells']
const itemCurrentSave = ['cape', 'sword', 'compShell']

// provider for react-context
export function HyperlightProvider({ children }) {
  const [current, currentSet] = useState({})

  // handles a file and inserts current value
  const handleFile = useCallback(async (e) => {
    const data = decode(await e.target.files[0].text())
    data.name = e.target.files[0].name

    // parse it all into a nice structure
    data.parsed = {
      id: btoa(data.header),
      name: data.settings.gameName || 'ANON',
      gears: data.settings.gear || 0,
      health: data.settings.checkHP || 0,
      healthUp: data.settings.healthUp || 0,
      deaths: data.settings.charDeaths || 0,
      ammo: data.settings.checkAmmo || 0,
      posX: data.settings.checkX || 0,
      posY: data.settings.checkY || 0,
      drifterkey: data.settings.drifterkey || 0,

      outfits: [],
      swords: [],
      companions: [],

      // TODO: are these the same?
      keys: 0,
      shards: { north: 0, west: 0, south: 0, east: 0 }
    }

    for (const t in itemTypes) {
      for (const c in colors) {
        if (data.settings[itemTypesSave[t]].includes(`${c}+`)) {
          data.parsed[itemTypes[t]].push(colors[c])
        }
      }
    }

    // tell UI that it's been loaded
    data.hasVals = true

    console.log(data)
    currentSet(data)
  })

  // save file for user
  const saveFile = useCallback((e) => {
    const data = { ...current }

    // put parsed back into settings
    data.header = atob(data.parsed.id)
    data.settings.gameName = data.parsed.name
    data.settings.gear = data.parsed.gears || 0
    data.settings.healthUp = data.parsed.healthUp || 0
    data.settings.checkHP = data.parsed.health || 0
    data.settings.charDeaths = data.parsed.deaths || 0
    data.settings.checkAmmo = data.parsed.ammo || 0
    data.settings.checkX = data.parsed.posX || 0
    data.settings.checkY = data.parsed.posY || 0
    data.settings.drifterkey = data.parsed.drifterkey || 0

    for (const t in itemTypes) {
      data.settings[itemTypesSave[t]] = ''
      for (const c in colors) {
        if (data.parsed[itemTypes[t]].includes(colors[c])) {
          data.settings[itemTypesSave[t]] += `${c}+`
        }
        // make sure the current item is valid
        if (!data.parsed[itemTypes[t]].includes(colors[c])) {
          data.settings[itemCurrentSave[t]] = 0
        }
      }
    }

    // Make sure HP is valid
    if (data.settings.checkHP > data.settings.healthUp + 6) {
      data.settings.checkHP = data.settings.healthUp + 6
    }

    console.log(data)
    currentSet(data)

    download(data.name, encode(data))
  })

  return <context.Provider value={{ current, handleFile, saveFile, currentSet }}>{children}</context.Provider>
}
