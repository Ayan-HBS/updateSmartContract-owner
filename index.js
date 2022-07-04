let provider = null;
let signer = null;
let userWalletAddress = null;

// ipfs://QmQCYXpjrD3fPs1db4Gori5KEfp9kotmstFiVCwGwgbgoy/

async function connectToMetamask() {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");    
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner()

    userWalletAddress = await signer.getAddress();
    document.getElementById("acc_address").innerText = "Wallet Address: " + userWalletAddress;
    document.getElementById("metamask_connected").style.display = "block";


    // let balance = await provider.getBalance(userWalletAddress);
    // balance = ethers.utils.formatEther(balance); //Wei to Eth
    // // balance = parseInt(balance.toString(16), 16); //Hex to Int
    // document.getElementById("acc_balance").innerText = "Wallet Balance: " + balance;
}

async function updateCID() {
    if(userWalletAddress === null) return;
    if(signer === null) return;
    if(provider === null) return;
    
    let newURI = "ipfs://" + document.getElementById("newCID_IF").value + "/";

    var contractWithSigner = new ethers.Contract(sm_address, sm_abi, signer);
    await contractWithSigner.changeBaseURI(newURI)
        .then((res) => {
            console.log(res);
    });
}
