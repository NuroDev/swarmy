## 🐳 Swarmy

A prototype full-stack project with automated Docker Swarm deployments

### 🔧 Setup

Since this project is extremely basic there is only a few steps needed in order to get things setup.

#### 🔒 Secrets

Since one of the key parts of this project is the automated deployment workflow, there are a few secrets that need to be added to the repository.

These are as follows:

- `SSH_HOSTNAME` - The IP address or hostname of the server you wish to deploy to.
- `SSH_USERNAME` - The username of the user you wish to deploy as.
- `SSH_PRIVATE_KEY` - The SSH private key that has access to the server you wish to deploy to.
  - It is recommended to make a new SSH key pair specifically for this project.
  - Generate a new key pair with `ssh-keygen -t rsa -b 4096 -C` & then add it to both the server & secret here.

#### 👨‍💻 Local

For local development, the only requirement is for the `web` service which requires a custom `API_URL` environment variable.

To set this up, copy the `.env.example` file to `.env` inside `services/web/`. The default value should work out of the box.
