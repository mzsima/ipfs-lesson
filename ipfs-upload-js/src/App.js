/* eslint-disable no-console */
'use strict'

import React, { useState, useRef } from 'react'
const ipfsClient = require('ipfs-http-client')

function App() {
    const [ipfs, setIpfs] = useState(null)
    const [fileHash, setFileHash] = useState(null)
    const multiaddr = useRef(null)

    const connect = () => {
        setIpfs(ipfsClient(multiaddr.current.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const saveToIpfs = async (e) => {
        const [file] = e.target.files
        try {
            const added = await ipfs.add(file, {progress: (p) => console.log(`receive: ${p}`)})
            setFileHash(added.cid.toString())
        } catch (err) {
            console.error(err)
        }
    }

    if (ipfs) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={saveToIpfs} />
                </form>
                <a target='_blank' href={'https://ipfs.io/ipfs/' + fileHash}>
                    {fileHash}
                </a>
            </div>
        )
    } else {
        return (
            <div>
                <form>
                    <input type="text" defaultValue="/ip4/127.0.0.1/tcp/5001" ref={multiaddr} />
                    <input type="button" value="Connect" onClick={connect} />
                </form>
            </div>
        )
    }
}

module.exports = App