import { useHyperlight } from './hyperlight'

export default function Uploader() {
  const { handleFile } = useHyperlight()
  return <input type='file' className='file-input' onChange={handleFile} />
}
