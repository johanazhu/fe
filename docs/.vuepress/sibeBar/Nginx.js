function NginxSideBar() {
    return [
        {
            text: 'Nginx',
            collapsable: false,
            sidebarDepth: 0,
            children: [
                '/Nginx/',
            ],
        },
    ];
}

module.exports = NginxSideBar;
