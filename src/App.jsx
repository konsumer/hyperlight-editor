import Editor from './Editor'

function App() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>Hyperlight Editor</h1>
      <p>This will allow you to edit Hyperlight Drifter save-files and transfer them from different computers.</p>
      <p>You can find your save-files in these locations:</p>

      <ul className='my-4'>
        <li>
          <span className='font-bold'>OSX</span>: <code>~/Library/Application Support/com.HeartMachine.HyperLightDrifter</code>
        </li>
        <li>
          <span className='font-bold'>Windows</span>: <code>%LOCALAPPDATA%\HyperLightDrifter</code>
        </li>
        <li>
          <span className='font-bold'>Linux</span>: <code>~/.config/HyperLightDrifter</code>
        </li>
      </ul>
      <Editor></Editor>
    </div>
  )
}

export default App
