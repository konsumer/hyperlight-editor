import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Editor from './Editor'

createRoot(document.getElementById('root')).render(
  <div className='p-4'>
    <h1 className='text-2xl mb-4'>Hyperlight Editor</h1>

    <p className='alert'>This will allow you to edit Hyperlight Drifter save-files and transfer them from different computers.</p>

    <div className='alert alert-info alert-soft my-4'>
      <span>This runs on your computer, in the browser, and no data is sent anywhere else.</span>
    </div>

    <div className='alert alert-vertical sm:alert-horizontal  my-4'>
      <p>You can find your save-files in these locations:</p>

      <ul className='my-2'>
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
    </div>

    <Editor></Editor>
  </div>
)
