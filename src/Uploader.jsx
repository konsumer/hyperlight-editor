// this is the file-input and download-button

import { FolderArrowDownIcon } from '@heroicons/react/24/solid'
import { useHyperlight } from './hyperlight'

export default function Uploader() {
  const { handleFile, current, saveFile } = useHyperlight()
  return (
    <div className='flex gap-2 items-center'>
      <input type='file' className='file-input' onChange={handleFile} />
      {current.hasVals && (
        <button className='btn btn-primary btn-sm' onClick={saveFile}>
          <FolderArrowDownIcon className='size-6' />
          Download
        </button>
      )}
    </div>
  )
}
