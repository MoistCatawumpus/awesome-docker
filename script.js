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
`
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
`
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
`
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
`
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
`
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
`
        },
        {
            name: 'Requestrr',
            description: 'Chatbot used to simplify using services like Sonarr/Radarr/Ombi via the use of chat.',
            command: 'docker run -d --name=requestrr -p 4545:4545 -v /path/to/config:/app/config -v /path/to/downloads:/app/downloads tidusjar/requestrr',
            compose: `version: '3'
services:
  requestrr:
    image: tidusjar/requestrr
    container_name: requestrr
    ports:
      - "4545:4545"
    volumes:
      - /path/to/config:/app/config
      - /path/to/downloads:/app/downloads
`
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
`
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
`
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
`
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
`
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
`
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
            <hr>
        `;
        instructionsDiv.appendChild(serviceDiv);
    });
});
