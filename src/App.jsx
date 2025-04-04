import { HyperlightProvider } from "./hyperlight";
import Uploader from "./Uploader";

function App() {
  return (
    <div className="p-4">
      <HyperlightProvider>
        <Uploader />
      </HyperlightProvider>
    </div>
  );
}

export default App;
