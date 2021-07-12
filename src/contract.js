import Web3 from 'web3'


export const WEB3 = new Web3(Web3.givenProvider || "http://192.168.1.97:3000")
export const ADDRESS = "0x694B1153725342f6b77d431eb454834483e4E849";
export const ABI = [
    {
        constant: false,
        inputs: [
            {
                name: "_index",
                type: "uint256"
            },
            {
                name: "_name",
                type: "string"
            }
        ],
        name: "setHash",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_value",
                type: "string"
            }
        ],
        name: "setValue",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        constant: true,
        inputs: [
            {
                name: "_index",
                type: "uint256"
            }
        ],
        name: "getHash",
        outputs: [
            {
                name: "",
                type: "string"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "getValue",
        outputs: [
            {
                name: "",
                type: "string"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "myNum",
        outputs: [
            {
                name: "",
                type: "int64"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    }
]




