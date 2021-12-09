module.exports = {
    siteUrl: 'https://shatkora.co/grocery',
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
   // exclude: ['/pages/profile', '/
    //
    // pages/checkout','pages/order'],
    // Default transformation function
    transform: async (config, path) => {
        return {
            loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        }
    },
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            // {
            //     userAgent: 'test-bot',
            //     allow: ['/path', '/path-2'],
            // },
            {
                userAgent: 'black-listed-bot',
                disallow: ['/checkout', '/order'],
            },
        ],
        // additionalSitemaps: [
        //     'https://example.com/sitemap.xml',
        //     'https://example.com/my-custom-sitemap-2.xml',
        //     'https://example.com/my-custom-sitemap-3.xml',
        // ],
    },
}