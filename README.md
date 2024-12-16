# DailyTrack - NFT Marketplace

DailyTrack is a decentralized NFT marketplace platform that empowers users to manage and trade their NFTs seamlessly. The platform provides an intuitive interface with essential functionalities such as viewing owned and listed NFTs, exploring community-listed NFTs, and creating new NFTs.

---

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
   - [Dashboard](#dashboard)
   - [Marketplace](#marketplace)
   - [Create NFT](#create-nft)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **Dashboard:** View all owned and listed NFTs at a glance.
- **Marketplace:** Explore NFTs listed by the community and buy/sell NFTs easily.
- **Create NFT:** Mint new NFTs and add them to the marketplace.
- **Wallet Integration:** Connect your wallet to access platform features.
- **Seamless Navigation:** Secure access after wallet connection.

---

## Getting Started

To get started with DailyTrack, follow these steps:

1. Clone the repository.
2. Install dependencies.
3. Run the application locally or deploy it.

---

## Usage

### Dashboard

- Access your NFT portfolio.
- View all your owned and listed NFTs.
- Refresh to see the latest data.

### Marketplace

- Explore NFTs listed by the community.
- View detailed information about each NFT.
- Purchase listed NFTs using supported tokens.

### Create NFT

- Mint your own NFTs with metadata such as name, description, and image.
- List your newly created NFTs on the marketplace.

> **Note:** Ensure your wallet is connected before accessing the platform.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Metamask](https://metamask.io/) or any compatible Web3 wallet extension
- A testnet or mainnet Ethereum account with test/mintable tokens

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/doppedheart/dailytrack-frontend.git
   cd dailytrack-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in `.env` file:

   ```env
   VITE_PINATA_JWT=<Your Ethereum Provider URL>
   VITE_GATEWAY_URL=<Your NFT Marketplace Contract Address>
   VITE_ALCHEMY_API=<Your Contract ABI>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## Technologies Used

- **Frontend:** React.js, TailwindCSS
- **Smart Contracts:** Solidity
- **Blockchain:** Ethereum (ERC-721 Standard)
- **Libraries:** Web3.js, ethers.js, Axios

---

## Smart Contracts Repository

If you want to see the smart contracts for this project, visit the [DailyTrack Smart Contracts Repository](https://github.com/doppedheart/dailytrack_smart_contract).

---

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Open a pull request explaining your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

**Thank you for choosing DailyTrack! Start trading NFTs today.**
