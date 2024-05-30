import {TypeormDatabase} from '@subsquid/typeorm-store'
import {Contract, Transfer, Approve, Upgrade} from './model'
import {processor} from './processor'
import {isErc721} from './isErc721'
import * as erc721 from './abi/erc721'
import * as proxy from './abi/0x9Dd4a2A1dB6bc1168de7D758208AbB109d9A386A'
import { json } from 'stream/consumers'

processor.run(new TypeormDatabase({supportHotBlocks: false}), async (ctx) => {
    const knownNftContractsArray: Contract[] = await ctx.store.find(Contract, { where: { isAErc721Duck: true } })
    const knownNftContracts: Map<string, Contract> = new Map(knownNftContractsArray.map(c => [ c.address, c ]))
    const newNftContracts: Map<string, Contract> = new Map()

    const transfers: Transfer[] = []
    const approvals: Approve[] = [] 
    const upgrades: Upgrade[] = []

    for (let block of ctx.blocks) {
        for (let trc of block.traces) {
            if (trc.type === 'create' && trc.result?.code && isErc721(trc.result.code)) {
                if (!trc.transaction) {
                    ctx.log.fatal(`ERROR: trace came without a parent transaction`)
                    console.log(trc)
                    process.exit(1)
                }
                let address = trc.result.address
                ctx.log.info(`Detected an NFT contract deployment at ${address}`)
                console.log(JSON.stringify(trc.transaction))
                newNftContracts.set(address, new Contract({
                    id: address,
                    deploymentHeight: block.header.height,
                    deploymentTxn: trc.transaction.hash,
                    address,
                    isAErc721Duck: true
                }))
            }
        }
        for (let log of block.logs) {
            if (log.topics[0] === erc721.events.Transfer.topic) {
           ctx.log.info(`{{{{{{{{{{{{{{{ ${log.topics[0]},${erc721.events.Transfer.topic}`)
                
                let contract: Contract | undefined = knownNftContracts.get(log.address) ?? newNftContracts.get(log.address)
           ctx.log.info(`||||||||||||||| ${log.address},${knownNftContracts.get(log.address)},${newNftContracts.get(log.address)} `)
                
                if (contract) {
                    let {from, to, tokenId} = erc721.events.Transfer.decode(log)
                    transfers.push(new Transfer({
                        id: log.id,
                        contract,
                        from,
                        to,
                        tokenId,
                        tokenStandard: "ERC721"
                    }))
                }
            } else if (log.topics[0] === erc721.events.Approval.topic){
                let contract: Contract | undefined = knownNftContracts.get(log.address) ?? newNftContracts.get(log.address)
                if (contract) {
                    let {owner, approved, tokenId} = erc721.events.Approval.decode(log)
                    approvals.push(new Approve({
                        id: log.id,
                        contract,
                        owner,
                        approved,
                        tokenId,
                        tokenStandard: "ERC721"
                    }))
                }
            } else if (log.topics[0] === proxy.events.Upgraded.topic){
                let contract: Contract | undefined = knownNftContracts.get(log.address) ?? newNftContracts.get(log.address)
                if (contract) {
                    let {implementation} = proxy.events.Upgraded.decode(log)
                    upgrades.push(new Upgrade({
                        id: log.id,
                        contract,
                        implementationContract: implementation
                    }))
                }
            }
        }
    }

    await ctx.store.upsert([...newNftContracts.values()])
    await ctx.store.upsert(transfers)
    await ctx.store.upsert(approvals)
    await ctx.store.upsert(upgrades)
})
