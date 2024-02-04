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
  command: 'docker run -d --name overseerr -e LOG_LEVEL=debug -e TZ=your-timezone -e PORT=5055 -p 5055:5055 -v /path/to/appdata/config:/app/config --restart unless-stopped sctx/overseerr',
  compose: `version: '3'
services:
  overseerr:
    image: sctx/overseerr:latest
    container_name: overseerr
    environment:
      - LOG_LEVEL=debug
      - TZ=your-timezone
      - PORT=5055 #optional
    ports:
      - 5055:5055
    volumes:
      - /path/to/appdata/config:/app/config
    restart: unless-stopped
`,
  officialsite: 'https://overseerr.dev/'
},
{
  name: 'Jellyseerr',
  description: 'Jellyfin and Emby integration for Sonarr, Radarr, and Lidarr.',
  command: 'docker run -d --name jellyseerr -e LOG_LEVEL=debug -e TZ=your-timezone -p 5055:5055 -v /path/to/appdata/config:/app/config --restart unless-stopped fallenbagel/jellyseerr:latest',
  compose: `version: '3'
services:
    jellyseerr:
       image: fallenbagel/jellyseerr:latest
       container_name: jellyseerr
       environment:
            - LOG_LEVEL=debug
            - TZ=your-timezone
       ports:
            - 5055:5055
       volumes:
            - /path/to/appdata/config:/app/config
       restart: unless-stopped
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
{
  name: 'Mattermost',
  description: 'Open source, self-hosted Slack alternative.',
  command: 'docker run -d --name=mattermost -p 8065:8065 mattermost/mattermost-team-edition',
  compose: `version: '2'
services:
mattermost:
  image: mattermost/mattermost-team-edition
  container_name: mattermost
  ports:
    - "8065:8065"
`,
  officialsite: 'https://mattermost.com/'
},
{
  name: 'Minio',
  description: 'High-performance object storage server.',
  command: 'docker run -d --name=minio -p 9000:9000 -v /path/to/data:/data minio/minio server /data',
  compose: `version: '2'
services:
minio:
  image: minio/minio
  container_name: minio
  ports:
    - "9000:9000"
  volumes:
    - /path/to/data:/data
`,
  officialsite: 'https://min.io/'
},
{
  name: 'Booktype',
  description: 'Collaborative book writing platform.',
  command: 'docker run -d --name=booktype -p 8004:8004 -v /path/to/booktype:/data/booktype serverest/booktype',
  compose: `version: '2'
services:
booktype:
  image: serverest/booktype
  container_name: booktype
  ports:
    - "8004:8004"
  volumes:
    - /path/to/booktype:/data/booktype
`,
  officialsite: 'https://www.sourcefabric.org/en/booktype/'
},
{
  name: 'CodiMD',
  description: 'Real-time collaborative markdown notes.',
  command: 'docker run -d --name=codimd -p 3000:3000 -v /path/to/codimd:/data quay.io/codimd/server:latest',
  compose: `version: '2'
services:
codimd:
  image: quay.io/codimd/server:latest
  container_name: codimd
  ports:
    - "3000:3000"
  volumes:
    - /path/to/codimd:/data
`,
  officialsite: 'https://hackmd.io/c/codimd-documentation/%2F%2BbQMtecoTdW-LX1otHvRA'
},
{
  name: 'Jitsi Meet',
  description: 'Video conferencing with Jitsi.',
  command: 'docker run -d --name=jitsi-meet -p 8443:443 -p 8000:80 -p 10000:10000 jitsi/jitsi-meet',
  compose: `version: '2'
services:
jitsi-meet:
  image: jitsi/jitsi-meet
  container_name: jitsi-meet
  ports:
    - "8443:443"
    - "8000:80"
    - "10000:10000"
`,
  officialsite: 'https://jitsi.org/jitsi-meet/'
},
{
  name: 'Snipe-IT',
  description: 'Open Source Asset Management System.',
  command: 'docker run -d --name=snipe-it -p 8082:80 -v /path/to/snipe-it:/var/lib/snipeit snipe/snipe-it',
  compose: `version: '2'
services:
snipe-it:
  image: snipe/snipe-it
  container_name: snipe-it
  ports:
    - "8082:80"
  volumes:
    - /path/to/snipe-it:/var/lib/snipeit
`,
  officialsite: 'https://snipeitapp.com/'
},
{
  name: 'Firefly III',
  description: 'A personal finances manager.',
  command: 'docker run -d --name=firefly-iii -p 8083:8080 -v /path/to/firefly-iii:/var/www/html grumpydictator/firefly-iii',
  compose: `version: '2'
services:
firefly-iii:
  image: grumpydictator/firefly-iii
  container_name: firefly-iii
  ports:
    - "8083:8080"
  volumes:
    - /path/to/firefly-iii:/var/www/html
`,
  officialsite: 'https://www.firefly-iii.org/'
},
{
  name: 'ONLYOFFICE',
  description: 'Online office suite with collaborative editing features.',
  command: 'docker run -d --name=onlyoffice -p 8084:80 -v /path/to/onlyoffice:/var/www/onlyoffice/data onlyoffice/documentserver',
  compose: `version: '2'
services:
onlyoffice:
  image: onlyoffice/documentserver
  container_name: onlyoffice
  ports:
    - "8084:80"
  volumes:
    - /path/to/onlyoffice:/var/www/onlyoffice/data
`,
  officialsite: 'https://www.onlyoffice.com/'
},
{
  name: 'Heimdall',
  description: 'Application dashboard and launcher.',
  command: 'docker run -d --name=heimdall -p 8085:80 -v /path/to/heimdall:/config linuxserver/heimdall',
  compose: `version: '2'
services:
heimdall:
  image: linuxserver/heimdall
  container_name: heimdall
  ports:
    - "8085:80"
  volumes:
    - /path/to/heimdall:/config
`,
  officialsite: 'https://heimdall.site/'
},
{
  name: 'Organizr',
  description: 'HTPC/Homelab Services Organizer.',
  command: 'docker run -d --name=organizr -p 8086:80 -e PUID=1000 -e PGID=1000 -e TZ=your-timezone -v /path/to/config:/config linuxserver/organizr',
  compose: `version: '2'
services:
organizr:
  image: linuxserver/organizr
  container_name: organizr
  ports:
    - "8086:80"
  environment:
    - PUID=1000
    - PGID=1000
    - TZ=your-timezone
  volumes:
    - /path/to/config:/config
`,
  officialsite: 'https://organizr.app/'
},
{
  name: 'Grafana',
  description: 'Open platform for monitoring and observability.',
  command: 'docker run -d --name=grafana -p 3001:3000 -e GF_SECURITY_ADMIN_PASSWORD=admin -v /path/to/grafana-data:/var/lib/grafana grafana/grafana',
  compose: `version: '2'
services:
grafana:
  image: grafana/grafana
  container_name: grafana
  ports:
    - "3001:3000"
  environment:
    - GF_SECURITY_ADMIN_PASSWORD=admin
  volumes:
    - /path/to/grafana-data:/var/lib/grafana
`,
  officialsite: 'https://grafana.com/'
},
{
  name: 'Pi-hole',
  description: 'Network-wide ad blocking.',
  command: 'docker run -d --name=pihole -p 8087:80 -p 53:53/tcp -p 53:53/udp -e TZ=your-timezone -v /path/to/pihole:/etc/pihole -v /path/to/dnsmasq.d:/etc/dnsmasq.d --dns=127.0.0.1 --dns=1.1.1.1 pihole/pihole',
  compose: `version: '3'
services:
pihole:
  image: pihole/pihole
  container_name: pihole
  ports:
    - "8087:80"
    - "53:53/tcp"
    - "53:53/udp"
  environment:
    - TZ=your-timezone
  volumes:
    - /path/to/pihole:/etc/pihole
    - /path/to/dnsmasq.d:/etc/dnsmasq.d
  dns:
    - 127.0.0.1
    - 1.1.1.1
`,
  officialsite: 'https://pi-hole.net/'
},
{
  name: 'Home Assistant',
  description: 'Open-source home automation platform.',
  command: 'docker run -d --name=home-assistant -p 8123:8123 -v /path/to/home-assistant:/config homeassistant/home-assistant',
  compose: `version: '2'
services:
home-assistant:
  image: homeassistant/home-assistant
  container_name: home-assistant
  ports:
    - "8123:8123"
  volumes:
    - /path/to/home-assistant:/config
`,
  officialsite: 'https://www.home-assistant.io/'
},
{
  name: 'Nginx',
  description: 'High-performance web server.',
  command: 'docker run -d --name=nginx -p 8088:80 -v /path/to/nginx:/usr/share/nginx/html nginx',
  compose: `version: '3'
services:
nginx:
  image: nginx
  container_name: nginx
  ports:
    - "8088:80"
  volumes:
    - /path/to/nginx:/usr/share/nginx/html
`,
  officialsite: 'https://www.nginx.com/'
},
{
  name: 'Bitwarden',
  description: 'Open-source password manager.',
  command: 'docker run -d --name=bitwarden -p 8089:80 -v /path/to/bitwarden:/data bitwardenrs/server',
  compose: `version: '2'
services:
bitwarden:
  image: bitwardenrs/server
  container_name: bitwarden
  ports:
    - "8089:80"
  volumes:
    - /path/to/bitwarden:/data
`,
  officialsite: 'https://bitwarden.com/'
},
{
  name: 'Jupyter Notebook',
  description: 'Open-source web application for interactive computing.',
  command: 'docker run -d --name=jupyter -p 8090:8888 -v /path/to/notebooks:/home/jovyan jupyter/base-notebook',
  compose: `version: '2'
services:
jupyter:
  image: jupyter/base-notebook
  container_name: jupyter
  ports:
    - "8090:8888"
  volumes:
    - /path/to/notebooks:/home/jovyan
`,
  officialsite: 'https://jupyter.org/'
},
{
  name: 'Prometheus',
  description: 'Monitoring and alerting toolkit.',
  command: 'docker run -d --name=prometheus -p 9090:9090 -v /path/to/prometheus:/etc/prometheus prom/prometheus',
  compose: `version: '2'
services:
prometheus:
  image: prom/prometheus
  container_name: prometheus
  ports:
    - "9090:9090"
  volumes:
    - /path/to/prometheus:/etc/prometheus
`,
  officialsite: 'https://prometheus.io/'
},
{
  name: 'Gitea',
  description: 'A painless self-hosted Git service.',
  command: 'docker run -d --name=gitea-2 -p 3001:3000 -v /path/to/gitea-2:/data gitea/gitea',
  compose: `version: '2'
services:
gitea-2:
  image: gitea/gitea
  container_name: gitea-2
  ports:
    - "3001:3000"
  volumes:
    - /path/to/gitea-2:/data
`,
  officialsite: 'https://gitea.io/'
},
{
  name: 'Bitbucket Server',
  description: 'Git repository management for enterprise teams.',
  command: 'docker run -d --name=bitbucket -p 7990:7990 -p 7999:7999 -v /path/to/bitbucket:/var/atlassian/application-data/bitbucket atlassian/bitbucket-server',
  compose: `version: '2'
services:
bitbucket:
  image: atlassian/bitbucket-server
  container_name: bitbucket
  ports:
    - "7990:7990"
    - "7999:7999"
  volumes:
    - /path/to/bitbucket:/var/atlassian/application-data/bitbucket
`,
  officialsite: 'https://www.atlassian.com/software/bitbucket'
},
{
  name: 'Redash',
  description: 'Open-source visualizations and dashboards.',
  command: 'docker run -d --name=redash -p 8091:5000 -e REDASH_WEB_BASE_PATH=/ -v /path/to/redash:/app/redash redash/redash',
  compose: `version: '2'
services:
redash:
  image: redash/redash
  container_name: redash
  ports:
    - "8091:5000"
  environment:
    - REDASH_WEB_BASE_PATH=/
  volumes:
    - /path/to/redash:/app/redash
`,
  officialsite: 'https://redash.io/'
},
{
  name: 'Minecraft Server',
  description: 'Vanilla Minecraft server.',
  command: 'docker run -d --name=minecraft -p 25565:25565 -v /path/to/minecraft:/data itzg/minecraft-server',
  compose: `version: '2'
services:
minecraft:
  image: itzg/minecraft-server
  container_name: minecraft
  ports:
    - "25565:25565"
  volumes:
    - /path/to/minecraft:/data
`,
  officialsite: 'https://hub.docker.com/r/itzg/minecraft-server'
},
{
  name: 'Netdata',
  description: 'Real-time performance monitoring.',
  command: 'docker run -d --name=netdata -p 19999:19999 -v /path/to/netdata:/host --cap-add SYS_PTRACE --security-opt apparmor=unconfined netdata/netdata',
  compose: `version: '2'
services:
netdata:
  image: netdata/netdata
  container_name: netdata
  ports:
    - "19999:19999"
  volumes:
    - /path/to/netdata:/host
  cap_add:
    - SYS_PTRACE
  security_opt:
    - apparmor=unconfined
`,
  officialsite: 'https://www.netdata.cloud/'
},
{
  name: 'Cockpit',
  description: 'Server monitoring and management tool.',
  command: 'docker run -d --name=cockpit -p 9091:9090 -v /path/to/cockpit:/data cockpit/cockpit',
  compose: `version: '2'
services:
cockpit:
  image: cockpit/cockpit
  container_name: cockpit
  ports:
    - "9091:9090"
  volumes:
    - /path/to/cockpit:/data
`,
  officialsite: 'https://cockpit-project.org/'
},
{
  name: 'JupyterLab',
  description: 'An extensible environment for interactive and reproducible computing.',
  command: 'docker run -d --name=jupyterlab -p 8092:8888 -v /path/to/notebooks:/home/jovyan jupyter/base-notebook start-notebook.sh --LabApp.token= --LabApp.password=',
  compose: `version: '2'
services:
jupyterlab:
  image: jupyter/base-notebook
  container_name: jupyterlab
  ports:
    - "8092:8888"
  volumes:
    - /path/to/notebooks:/home/jovyan
  command: start-notebook.sh --LabApp.token= --LabApp.password=
`,
  officialsite: 'https://jupyter.org/'
},
{
  name: 'Graylog',
  description: 'Open-source log management and analysis tool.',
  command: 'docker run -d --name=graylog -p 9002:9000 -p 12201:12201 -p 1514:1514 -v /path/to/graylog:/usr/share/graylog/data graylog/graylog',
  compose: `version: '2'
services:
graylog:
  image: graylog/graylog
  container_name: graylog
  ports:
    - "9002:9000"
    - "12201:12201"
    - "1514:1514"
  volumes:
    - /path/to/graylog:/usr/share/graylog/data
`,
  officialsite: 'https://www.graylog.org/'
},
{
  name: 'Managebot',
  description: 'Docker container management from Discord',
  command: 'docker run -d --name managebot --privileged --restart unless-stopped -v /your/path/to/managebot/config:/usr/src/app/config -v /var/run/docker.sock:/var/run/docker.sock ghcr.io/xdfnleaks/managebot:latest',
  compose: `version: "3.3"
services:
  managebot:
    container_name: managebot
    privileged: true
    restart: unless-stopped
    image: "ghcr.io/xdfnleaks/managebot:latest"
    volumes:
      - /your/path/to/managebot/config:/usr/src/app/config
      - /var/run/docker.sock:/var/run/docker.sock
`,
  officialsite: 'https://github.com/xdFNLeaks/managebot'
},
{
  name: 'Dozzle',
  description: 'Realtime log viewer for docker containers.',
  command: '$ docker run --name dozzle -d --volume=/var/run/docker.sock:/var/run/docker.sock:ro -p 8888:8080 amir20/dozzle:latest',
  compose: `version: "3"
services:
  dozzle:
    container_name: dozzle
    image: amir20/dozzle:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - 8888:8080
`,
  officialsite: 'https://dozzle.dev/'
},

  ];

  function renderServices(filteredServices) {
    instructionsDiv.innerHTML = '';

    filteredServices.forEach(service => {
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
      serviceDiv.addEventListener('click', function () {
        window.open(service.officialsite, '_blank');
      });
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
  }

  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredServices = services.filter(service =>
      service.name.toLowerCase().includes(searchTerm)
    );
    renderServices(filteredServices);
  });

  renderServices(services);
});
