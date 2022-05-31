module.exports = {
    devServer: {
        host: "0.0.0.0",
        port: 8080,
        open: true,
        allowedHosts: 'all',
        proxy: {
            '^/api': {
                target: 'http://localhost:5000/',
                changeOrigin: true
            },
            '^/static': {
                target: 'http://localhost:5000/',
                changeOrigin: true
            }
        }
    },

    pluginOptions: {
      vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
    }
}
