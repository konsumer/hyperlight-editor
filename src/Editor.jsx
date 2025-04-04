import { useHyperlight } from './hyperlight'

export default function Editor() {
	const { current } = useHyperlight()
	return <pre>{JSON.stringify(current, null, 2)}</pre>
}
