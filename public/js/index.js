(async () => {
    const CONTRACTS = {
        '0x06343c67f77BDd4BaccebbbA0Ce65C8338394b38': {
            name: 'DUCAT',
            coin: 'Ducat',
            abi: [{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newRate","type":"uint256"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newRateChange","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"tokenAmount","type":"uint256"}],"name":"leftover","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokensPurchased","type":"event"}]
        },
    };

    const contractCoinAddress = Object.keys(CONTRACTS)[0];
    let ducatContract = new ethers.Contract(contractCoinAddress, CONTRACTS[contractCoinAddress].abi, ethers.getDefaultProvider());
    const currentValue = await ducatContract.weiRaised();
    const { data: { collected } } = await axios.get('https://data.ducat.network/additional-info');
    const { data: { USD } } = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');

    const collectedCalculated = (collected + parseFloat(ethers.utils.formatEther(currentValue)));
    const collectedInUsd = (collected + parseFloat(ethers.utils.formatEther(currentValue))) * USD;

    document.getElementById('collectedValue').innerHTML = `ETH ${collectedCalculated ? collectedCalculated.toFixed(2) : '?'}<br>$${collectedInUsd ? collectedInUsd.toFixed(2) : '?'}`;
})();