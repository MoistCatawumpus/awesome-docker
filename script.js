document.addEventListener('DOMContentLoaded', function () {
    const instructionsDiv = document.getElementById('instructions');

    const services = [
{
    name: 'Portainer',
    description: 'A lightweight container management UI.',
    command: 'docker run -d --name=portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer',
    compose: `version: '3'
services:
  portainer:
    image: portainer/portainer
    container_name: portainer
    ports:
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
`,
    officialsite: 'https://www.portainer.io/'
},
{
    name: 'Jellyfin',
    description: 'The Free Software Media System.',
    command: 'docker run -d --name=jellyfin -p 8096:8096 -p 8920:8920 -v /path/to/config:/config -v /path/to/media:/media jellyfin/jellyfin',
    compose: `version: '2'
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    ports:
      - "8096:8096"
      - "8920:8920"
    volumes:
      - /path/to/config:/config
      - /path/to/media:/media
`,
    officialsite: 'https://jellyfin.org/'
},
{
    name: 'Plex',
    description: 'A media server that catalogs your movies and TV shows.',
    command: 'docker run -d --name=plex -p 32400:32400 -v /path/to/config:/config -v /path/to/transcode:/transcode -v /path/to/media:/data plexinc/pms-docker',
    compose: `version: '2'
services:
  plex:
    image: plexinc/pms-docker
    container_name: plex
    ports:
      - "32400:32400"
    volumes:
      - /path/to/config:/config
      - /path/to/transcode:/transcode
      - /path/to/media:/data
`,
    officialsite: 'https://www.plex.tv/'
},
{
    name: 'Radarr',
    description: 'A movie collection manager for Usenet and BitTorrent users.',
    command: 'docker run -d --name=radarr -p 7878:7878 -e PUID=1000 -e PGID=1000 -e TZ=your-timezone -v /path/to/config:/config -v /path/to/movies:/movies -v /path/to/download:/downloads linuxserver/radarr',
    compose: `version: '3'
services:
  radarr:
    image: linuxserver/radarr
    container_name: radarr
    ports:
      - "7878:7878"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=your-timezone
    volumes:
      - /path/to/config:/config
      - /path/to/movies:/movies
      - /path/to/download:/downloads
`,
    officialsite: 'https://radarr.video/'
},
{
    name: 'Sonarr',
    description: 'A PVR for Usenet and BitTorrent users.',
    command: 'docker run -d --name=sonarr -p 8989:8989 -e PUID=1000 -e PGID=1000 -e TZ=your-timezone -v /path/to/config:/config -v /path/to/tv:/tv -v /path/to/download:/downloads linuxserver/sonarr',
    compose: `version: '3'
services:
  sonarr:
    image: linuxserver/sonarr
    container_name: sonarr
    ports:
      - "8989:8989"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=your-timezone
    volumes:
      - /path/to/config:/config
      - /path/to/tv:/tv
      - /path/to/download:/downloads
`,
    officialsite: 'https://sonarr.tv/'
},
{
    name: 'Lidarr',
    description: 'A music collection manager for Usenet and BitTorrent users.',
    command: 'docker run -d --name=lidarr -p 8686:8686 -e PUID=1000 -e PGID=1000 -e TZ=your-timezone -v /path/to/config:/config -v /path/to/music:/music -v /path/to/download:/downloads linuxserver/lidarr',
    compose: `version: '3'
services:
  lidarr:
    image: linuxserver/lidarr
    container_name: lidarr
    ports:
      - "8686:8686"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=your-timezone
    volumes:
      - /path/to/config:/config
      - /path/to/music:/music
      - /path/to/download:/downloads
`,
    officialsite: 'https://lidarr.audio/'
},
{
    name: 'Requestrr',
    description: 'Chatbot used to simplify using services like Sonarr/Radarr/Ombi via the use of chat.',
    command: 'docker run -d --name=requestrr -p 4545:4545 -v /path/to/config:/app/config thomst08/requestrr',
    compose: `version: '3'
services:
  requestrr:
    image: thomst08/requestrr
    container_name: requestrr
    ports:
      - "4545:4545"
    volumes:
      - /path/to/config:/root/config
    restart: unless-stopped
`,
    officialsite: 'https://github.com/thomst08/requestrr'
},
{
    name: 'Overseerr',
    description: 'Request management and media discovery tool for Plex, Sonarr, Radarr, and more.',
    command: 'docker run -d --name=overseerr -p 5055:5055 -v /path/to/config:/config -v /path/to/downloads:/downloads hotio/overseerr',
    compose: `version: '3'
services:
  overseerr:
    image: hotio/overseerr
    container_name: overseerr
    ports:
      - "5055:5055"
    volumes:
      - /path/to/config:/config
      - /path/to/downloads:/downloads
`,
    officialsite: 'https://overseerr.dev/'
},
{
    name: 'Jellyseerr',
    description: 'Jellyfin and Emby integration for Sonarr, Radarr, and Lidarr.',
    command: 'docker run -d --name=jellyseerr -p 1910:1910 -e TZ=your-timezone -v /path/to/config:/config -v /path/to/downloads:/downloads fallenbagel/jellyseerr:latest',
    compose: `version: '3'
services:
  jellyseerr:
    image: fallenbagel/jellyseerr:latest
    container_name: jellyseerr
    ports:
      - "1910:1910"
    environment:
      - TZ=your-timezone
    volumes:
      - /path/to/config:/config
      - /path/to/downloads:/downloads
`,
    officialsite: 'https://github.com/Fallenbagel/jellyseerr'
},
{
    name: 'Watchtower',
    description: 'Automatically updates running Docker containers.',
    command: 'docker run -d --name=watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower',
    compose: `version: '3'
services:
  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
`,
    officialsite: 'https://github.com/containrrr/watchtower'
},
{
    name: 'Autoheal',
            description: 'Monitors and restarts unhealthy containers.',
    command: 'docker run -d --name=autoheal -v /var/run/docker.sock:/var/run/docker.sock willfarrell/autoheal',
    compose: `version: '3'
services:
  autoheal:
    image: willfarrell/autoheal
    container_name: autoheal
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
`,
    officialsite: 'https://github.com/willfarrell/docker-autoheal'
},
{
    name: 'Readarr',
    description: 'A book collection manager for Usenet and BitTorrent users.',
    command: 'docker run -d --name=readarr -p 8787:8787 -e PUID=1000 -e PGID=1000 -e TZ=your-timezone -v /path/to/config:/config -v /path/to/books:/books -v /path/to/download:/downloads linuxserver/readarr',
    compose: `version: '3'
services:
  readarr:
    image: linuxserver/readarr
    container_name: readarr
    ports:
      - "8787:8787"
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=your-timezone
    volumes:
      - /path/to/config:/config
      - /path/to/books:/books
      - /path/to/download:/downloads
`,
    officialsite: 'https://readarr.com/'
},
{
    name: 'Calibre-Web',
    description: 'A web app providing a clean interface for browsing, reading, and downloading eBooks.',
    command: 'docker run -d --name=calibre-web -p 8083:8083 -v /path/to/calibre-library:/calibre-library linuxserver/calibre-web',
    compose: `version: '2'
services:
  calibre-web:
    image: linuxserver/calibre-web
    container_name: calibre-web
    ports:
      - "8083:8083"
    volumes:
      - /path/to/calibre-library:/calibre-library
`,
    officialsite: 'https://github.com/linuxserver/docker-calibre-web'
},
{
    name: 'Bookstack',
    description: 'A platform to create documentation/wiki content.',
    command: 'docker run -d --name=bookstack -p 8080:80 -v /path/to/bookstack:/var/www/bookstack/public mprasil/bookstack',
    compose: `version: '2'
services:
  bookstack:
    image: mprasil/bookstack
    container_name: bookstack
    ports:
      - "8080:80"
    volumes:
      - /path/to/bookstack:/var/www/bookstack/public
`,
    officialsite: 'https://www.bookstackapp.com/'
},
{
    name: 'Paperless-ng',
    description: 'An OCR (optical character recognition) document management solution.',
    command: 'docker run -d --name=paperless-ng -p 8000:8000 -v /path/to/data:/opt/paperless/data -v /path/to/config:/etc/paperless thomasleveil/docker-paperless',
    compose: `version: '2'
services:
  paperless-ng:
    image: thomasleveil/docker-paperless
    container_name: paperless-ng
    ports:
      - "8000:8000"
    volumes:
      - /path/to/data:/opt/paperless/data
      - /path/to/config:/etc/paperless
`,
    officialsite: 'https://github.com/jonaswinkler/paperless-ng'
},
{
    name: 'Booksonic',
    description: 'A server for streaming audiobooks to any device.',
    command: 'docker run -d --name=booksonic -p 4040:4040 -v /path/to/music:/var/music/linuxserver/booksonic',
    compose: `version: '2'
services:
  booksonic:
    image: linuxserver/booksonic
    container_name: booksonic
    ports:
      - "4040:4040"
    volumes:
      - /path/to/music:/var/music
`,
    officialsite: 'https://booksonic.org/'
},
{
    name: 'Lychee',
    description: 'A self-hosted photo management tool.',
    command: 'docker run -d --name=lychee -p 8888:80 -v /path/to/photos:/var/www/html/uploads kylemanna/lychee',
    compose: `version: '2'
services:
  lychee:
    image: kylemanna/lychee
    container_name: lychee
    ports:
      - "8888:80"
    volumes:
      - /path/to/photos:/var/www/html/uploads
`,
    officialsite: 'https://lycheeorg.github.io/'
},
{
    name: 'BookBrainz',
    description: 'A community-driven open database of information about every book ever published.',
    command: 'docker run -d --name=bookbrainz -p 5000:5000 metabrainz/bookbrainz-docker',
    compose: `version: '2'
services:
  bookbrainz:
    image: metabrainz/bookbrainz-docker
    container_name: bookbrainz
    ports:
      - "5000:5000"
`,
    officialsite: 'https://bookbrainz.org/'
},
{
    name: 'Turtl',
    description: 'A secure and encrypted Evernote alternative.',
    command: 'docker run -d --name=turtl -p 8181:8181 -v /path/to/data:/data turtl/server',
    compose: `version: '2'
services:
  turtl:
    image: turtl/server
    container_name: turtl
    ports:
      - "8181:8181"
    volumes:
      - /path/to/data:/data
`,
    officialsite: 'https://turtlapp.com/'
},
{
    name: 'Wiki.js',
    description: 'A modern, lightweight, and powerful wiki app built on Node.js.',
    command: 'docker run -d --name=wikijs -p 3000:3000 -v /path/to/wiki:/wiki requarks/wiki:2',
    compose: `version: '2'
services:
  wikijs:
    image: requarks/wiki:2
    container_name: wikijs
    ports:
      - "3000:3000"
    volumes:
      - /path/to/wiki:/wiki
`,
    officialsite: 'https://wiki.js.org/'
},
{
    name: 'Wallabag',
    description: 'A self-hosted read-it-later app.',
    command: 'docker run -d --name=wallabag -p 8085:80 -v /path/to/data:/var/www/wallabag/data wallabag/wallabag',
    compose: `version: '2'
services:
  wallabag:
    image: wallabag/wallabag
    container_name: wallabag
    ports:
      - "8085:80"
    volumes:
      - /path/to/data:/var/www/wallabag/data
`,
    officialsite: 'https://www.wallabag.org/'
},
{
    name: 'FreshRSS',
    description: 'A free, self-hosted RSS feed aggregator.',
    command: 'docker run -d --name=freshrss -p 8081:80 -v /path/to/data:/var/www/FreshRSS/data freshrss/freshrss',
    compose: `version: '2'
services:
  freshrss:
    image: freshrss/freshrss
    container_name: freshrss
    ports:
      - "8081:80"
    volumes:
      - /path/to/data:/var/www/FreshRSS/data
`,
    officialsite: 'https://freshrss.org/'
},
    ];

    services.forEach(service => {
        const serviceDiv = document.createElement('div');
        serviceDiv.innerHTML = `
            <h2>${service.name}</h2>
            <p>${service.description}</p>
            <p><strong>Command:</strong> <code>${service.command}</code></p>
            <p><strong>Docker Compose:</strong></p>
            <pre><code>${service.compose}</code></pre>
            <p><strong><a href="${service.officialsite}" target="_blank">Official Site</a></strong></p>
            <hr>
        `;
        instructionsDiv.appendChild(serviceDiv);
    });

    const githubLogoLink = document.createElement('a');
    githubLogoLink.href = 'https://github.com/MoistCatawumpus';
    githubLogoLink.target = '_blank';

    const githubLogo = document.createElement('img');
    githubLogo.src = 'github.png';
    githubLogo.alt = 'GitHub Logo';
    githubLogo.width = '32';
    githubLogo.height = '32';

    githubLogoLink.appendChild(githubLogo);
    instructionsDiv.appendChild(githubLogoLink);

    const spaceElement = document.createElement('span');
    spaceElement.innerHTML = '&nbsp;';

    instructionsDiv.appendChild(spaceElement);

    const redditLogoLink = document.createElement('a');
    redditLogoLink.href = 'https://www.reddit.com/user/MoistCatawumpus/';
    redditLogoLink.target = '_blank';

    const redditLogo = document.createElement('img');
    redditLogo.src = 'reddit.png';
    redditLogo.alt = 'Reddit Logo';
    redditLogo.width = '32';
    redditLogo.height = '32';

    redditLogoLink.appendChild(redditLogo);
    instructionsDiv.appendChild(redditLogoLink);
});
