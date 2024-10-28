import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/4FMscpaveZCmkzjCYxpmkqr8REA9xUcfixqkNkqVA4Wi"
        const metadata = {
             name: "My First Rug ",
             symbol: "rug",
             description: "Monsieur Poulpe",
            image: image,
             attributes: [
                 {trait_type: 'Pinky', value: '7'}
             ],
             properties: {
                 files: [
                     {
                         type: "image/jpg",
                         uri: image
                     },
                 ]
             },
             creators: []
         };
         const myUri = createGenericFile(
                Buffer.from(JSON.stringify(metadata)),
                "metadata.json",
                { contentType: "application/json" }
            );
    
        

    

         console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();