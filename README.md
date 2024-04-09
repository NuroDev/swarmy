# 🐳 Swarmy

A prototype full-stack project with automated Docker Swarm deployments

## 🔧 Setup

Since this project is extremely basic there is only a few steps needed in order to get things setup.

### 👨‍💻 Local

For local development, the only requirement is for the `web` service which requires a custom `API_URL` environment variable.

To set this up, copy the `.env.example` file to `.env` inside `services/web/`. The default value should work out of the box.

### 🚀 Deployment

To set up the deployment workflow for this project, there is a few steps that need to be taken.

#### ☁️ Configure server

This project is primarily designed for a single-host Docker Swarm setup. As such, the server needs the following to be set up:

- Install Docker: Most cloud providers offer this as a one-click setup. Otherwise follow the [official guide](https://docs.docker.com/engine/install/).
- Enable Docker Swarm: Run `docker swarm init` to enable Docker Swarm on the server.
- Login to the GitHub Container Registry. See the documentation [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic).
- Create the `public` overlay Docker network by running: `docker network create --driver overlay public`

#### 🔌 DNS

The production configuration of this project uses [Traefik](https://traefik.io/) as a reverse proxy & with a single `DOMAIN` environment variable to route traffic.

With this you will, of course, need to add your servers IP address to your DNS records.

For example: If your `DOMAIN` is `example.com`, you will need to add 2 `A` records to your DNS settings:

- `example.com` pointing to your server's IP address
- `api.example.com` pointing to your server's IP address

### 🔒 Secrets

Since one of the key parts of this project is the automated deployment workflow, there are a few secrets that need to be added to the repository.

These are as follows:

- `SSH_HOSTNAME` - The IP address or hostname of the server you wish to deploy to.
- `SSH_USERNAME` - The username of the user you wish to deploy as.
- `SSH_PRIVATE_KEY` - The SSH private key that has access to the server you wish to deploy to.
  - It is recommended to make a new SSH key pair specifically for this project.
  - Generate a new key pair with `ssh-keygen -t rsa -b 4096` & then add it to both the server & secret here.
- `DOMAIN` - The domain that you wish to deploy to.
- `CLOUDFLARE_EMAIL` - The email address of the Cloudflare account.
- `CLOUDFLARE_DNS_API_TOKEN` - The API key of the Cloudflare account.
  - This is used to automatically generate SSL certificates for the domain.
