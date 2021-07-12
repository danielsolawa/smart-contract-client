import './App.css';
import React, {createRef, useEffect, useState} from "react";
import {WEB3, ABI, ADDRESS} from "./contract"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button";
import {InfoModal} from "./components/modal/InfoModal";
import Form from "react-bootstrap/Form";


function App() {


    const [contract, setContract] = useState(null)
    const [account, setAccount] = useState('')
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [formSetValue, setFormSetValue] = useState({})
    const [errors, setErrors] = useState({});
    const [networkName, setNetworkName] = useState('')


    const modalRef = createRef()

    useEffect(() => {

        const chainDict = {
            "0x1": "Ethereum Main Network (Mainnet)",
            "0x3": "Ropsten Test Network",
            "0x4": "Rinkeby Test Network",
            "0x5": "Goerli Test Network",
            "0x2a": "Kovan Test Network"
        }

        const loadBlockChainData = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts"
                    })

                    checkAndChangeChainIdIfNecessary()
                    setAccount(accounts[0])
                    initContract()
                } catch (error) {
                    console.log("an error occurred! " + error.code)

                    // setError(error);
                }
            }
        }
        const checkAndChangeChainIdIfNecessary = async () => {
            const chainId = await window.ethereum.request({method: 'eth_chainId'})

            window.ethereum.on('chainChanged', (chainId) => {
                window.location.reload()
                if (chainId in chainDict) {
                    alert(`The network has been changed to ${chainDict[chainId]}`)
                }
            })

            if (chainId in chainDict) {
                setNetworkName(chainDict[chainId])
            }
        }

        loadBlockChainData()
    }, [])


    const initContract = () => {
        setContract(new WEB3.eth.Contract(ABI, ADDRESS))
    }


    const checkGas = async () => {
        if (contract) {
            await contract.methods
                .getValue()
                .estimateGas({from: account})
                .then(gasAmount => {
                    setTitle("Estimated gas")
                    setText(`Estimated gas amount ${gasAmount}`)
                    setOpen(true)

                })
                .catch(err => {
                    alert("An error occurred " + err)
                });
        }
    }


    const getValue = async () => {
        if (contract) {
            await contract.methods
                .getValue()
                .call({from: account})
                .then(result => {
                    setTitle("Get Value")
                    setText(`The returned value ${result}`)
                    setOpen(true)
                });
        }
    }

    const sendSetValue = async (value) => {
        if (contract) {
            await contract.methods
                .setValue(value)
                .send({from: "0x5748c7a4698464c75fF761eA11C0bf667f5Be294"})
        }
    }


    const setField = (field, value) => {
        setFormSetValue({
            ...formSetValue,
            [field]: value
        })

        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })

    }


    const handleSetValue = (e) => {
        e.preventDefault()
        const newErrors = formSetValueErrors()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            sendSetValue(formSetValue.setValue)
                .then(receipt => {
                    setTitle("Set Value")
                    setText(`Set value ${formSetValue.setValue} done`)
                    setOpen(true)
                }).catch(err => {
                setTitle("Set Value")
                setText(`Set value error: ${err.message}`)
                setOpen(true)
            })
        }

    }


    const formSetValueErrors = () => {
        const {setValue} = formSetValue
        const newErrors = {}

        if (!setValue || setValue === '') newErrors.setValue = 'cannot be empty!'
        else if (setValue && setValue.length < 3) newErrors.setValue = 'at least 3 characters are required!'


        return newErrors
    }


    const switchNetwork = async () => {

        if(window.ethereum){
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x3' }],
            }).catch(error =>{
                setTitle("Wallet error")
                setText(` ${error.message}`)
                setOpen(true)
                if (error.code === 4902) {
                    addNetwork()
                        .catch(addErr => {
                            setTitle("Wallet error")
                            setText(` ${addErr.message}`)
                            setOpen(true)
                        })
                }
            })
        }

    }

    const addNetwork = async () => {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{ chainId: '0x3', rpcUrl: 'https://...' /* ... */ }],
        })
    }



    return (
        <>
            <InfoModal
                open={open}
                setOpen={setOpen}
                title={title}
                text={text}
                myRef={modalRef}/>
            <div className="container">
                <Card className="mt-4" bg="dark">
                    <Card.Header><h3>Wallet</h3></Card.Header>

                    <Card.Body>
                        <p><span className="span-c">Your account: </span>{account}</p>
                        <p><span className="span-c">Network: </span>{networkName}</p>
                    </Card.Body>
                </Card>
                <Card className="mt-4" bg="dark">
                    <Card.Header><h3>Options</h3></Card.Header>

                    <Card.Body>
                        <Button className="c-button" variant="success" onClick={checkGas}>Check Gas</Button>
                        <Button className="c-button" variant="success" onClick={getValue}>Get Value</Button>
                        <Button className="c-button" variant="success" onClick={switchNetwork}>Switch Network to Ropsten </Button>
                        <Form onSubmit={handleSetValue} className="form-c">

                            <Form.Group controlId="setValue">
                                <Form.Label><span className="form-label-c">Set Value:</span></Form.Label>
                                <Form.Control
                                    onChange={
                                        (e) => setField(e.target.id, e.target.value)
                                    }
                                    type="text"
                                    isInvalid={!!errors.setValue}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.setValue}
                                </Form.Control.Feedback>

                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Set Value
                            </Button>
                        </Form>

                    </Card.Body>
                </Card>
            </div>

        </>
    )
}

export default App;
