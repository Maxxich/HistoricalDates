import * as MiniCssExtractPlugin from "mini-css-extract-plugin"

export function buildCssLoader (isDev: boolean) {
	return {
		test:  /\.(sass|css|scss)$/,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: (resPath: string) => Boolean(resPath.includes(".module.")),
						localIdentName: isDev
							? "[path][name]__[local]"
							: "[hash:base64:8]"
					}
				}
			},
			"sass-loader"
		]
	}
}
