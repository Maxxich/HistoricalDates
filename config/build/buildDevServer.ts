import { BuildOptions } from "./types/config"

export function buildDevServer (options: BuildOptions) {
	return {
		hot: true,
		open: true,
		historyApiFallback: true,
		port: options.port
	}
}
