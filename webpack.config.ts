import * as path from "path"
import { buildWebpackConfig } from "./config/build/buildWebpackConfig"
import type { BuildEnv, BuildOptions } from "./config/build/types/config"


module.exports = (env: BuildEnv) => {
	const paths: BuildOptions["paths"] = {
		entry: path.resolve(__dirname, "src", "index.tsx"),
		html: path.resolve(__dirname, "public", "index.html"),
		build: path.resolve(__dirname, "build"),
		src: path.resolve(__dirname, "src"),
		bundleAnalyzerReport: path.resolve(__dirname, "reports", "bundleAnalyzerReport.html")
	}
  
	const mode = env.mode || "development"
	const isDev = mode === "development"
	const port = env.port || 3000
  
	const config: BuildOptions = {
		mode,
		isDev,
		paths,
		port
	}

	return buildWebpackConfig(config)
}
