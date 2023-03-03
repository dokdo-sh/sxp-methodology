import { Utils, Transactions, Managers } from "@solar-network/crypto";
import { Connection } from "@solar-network/client";

// Configure our API client
const client = new Connection("https://api.solar.org/api");

(async () => {

    // Get current height
    const height = (await client.api("blockchain").blockchain()).body.data.block.height;

    // Ensure AIP11 is enabled for the Crypto SDK
    Managers.configManager.setFromPreset("mainnet");
    Managers.configManager.setHeight(height);


    // Step 1: Retrieve the incremental nonce of the sender wallet
    const senderWallet = await client.api("wallets").get("address");
    const senderNonce = Utils.BigNumber.make(senderWallet.body.data.nonce).plus(1);

    // Step 2: Create the transaction
    const transaction = Transactions.BuilderFactory.vote()
        .nonce(senderNonce.toFixed())
        .votesAsset({ "acanthus": 2.22, "advin": 2.22, "arbaro": 2.22, "arktoshi": 2.22, "aurelion_sol": 2.22, "bfx": 2.22, "biz_classic": 2.22, "cactus1549": 2.22, "crypticmaniac": 2.22, "dev51": 2.22, "doctordefi": 2.22, "dpos.info": 2.22, "finca": 2.22, "fnoufnou": 2.22, "fonk": 2.22, "fun": 2.22, "gangnam": 2.22, "generalpuma": 2.22, "goat": 2.22, "goose": 2.22, "kaos": 2.22, "kimchi": 2.22, "kippers": 2.22, "lunar": 2.22, "mtaylan": 2.22, "osrn": 2.22, "podushkin": 2.22, "sevi": 2.22, "sigma": 2.22, "sl33p": 2.22, "st3v3n": 2.22, "studiocoina": 2.22, "thamar": 2.22, "wevalidate": 2.22, "cams_yellow_jacket": 2.22, "deadlock": 2.22, "umbrella": 2.22, "balu": 2.22, "axel": 2.22, "schuan911": 2.22, "lucky_delegate": 2.22, "exolarite": 2.22, "pnwdrew": 2.32, "emsy": 2.22, "nybl": 2.22 }) // The sum has to be 100
        .sign("passphrase");

    // Step 4: Broadcast the transaction
    const broadcastResponse = await client.api("transactions").create({ transactions: [transaction.build().toJson()] });

    // Step 5: Log the response
    console.log(JSON.stringify(broadcastResponse.body.data, null, 4))
})();