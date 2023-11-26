import { buildBabelLoader } from "./loaders/buildBabelLoader"
import { buildCssLoader } from "./loaders/buildCssLoader"
import type { BuildOptions } from "./types/config"

export function buildLoaders (options: BuildOptions) {
	const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

	const cssLoader = buildCssLoader(options.isDev)

	const svgLoader = {
		test: /\.svg$/,
		use: ["@svgr/webpack"]
	}

	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff2|woff)$/i,
		use: [
			{
				loader: "file-loader"
			}
		]
	}

	// const loader = {
	// 	test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
	// 	use: [
	// 		{
	// 			loader: "file-loader",
	// 			options: {
	// 				name: "[name].[contenthash].[ext]",
	// 				outputPath: "fonts/",
	// 			},
	// 		},
	// 	],
	// }

  
	return [
		cssLoader,
		fileLoader,
		svgLoader,
		tsxCodeBabelLoader,
		codeBabelLoader,
		// loader
	]
}
