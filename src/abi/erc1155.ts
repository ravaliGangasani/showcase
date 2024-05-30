import * as p from '@subsquid/evm-codec'
import { event, fun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ApprovalForAll: event("0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31", {"account": indexed(p.address), "operator": indexed(p.address), "approved": p.bool}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", {"version": p.uint64}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    Paused: event("0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258", {"account": p.address}),
    TransferBatch: event("0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb", {"operator": indexed(p.address), "from": indexed(p.address), "to": indexed(p.address), "ids": p.array(p.uint256), "values": p.array(p.uint256)}),
    TransferSingle: event("0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62", {"operator": indexed(p.address), "from": indexed(p.address), "to": indexed(p.address), "id": p.uint256, "value": p.uint256}),
    URI: event("0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b", {"value": p.string, "id": indexed(p.uint256)}),
    Unpaused: event("0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa", {"account": p.address}),
}

export const functions = {
    balanceOf: fun("0x00fdd58e", {"account": p.address, "id": p.uint256}, p.uint256),
    balanceOfBatch: fun("0x4e1273f4", {"accounts": p.array(p.address), "ids": p.array(p.uint256)}, p.array(p.uint256)),
    burn: fun("0xf5298aca", {"account": p.address, "id": p.uint256, "value": p.uint256}, ),
    burnBatch: fun("0x6b20c454", {"account": p.address, "ids": p.array(p.uint256), "values": p.array(p.uint256)}, ),
    exists: fun("0x4f558e79", {"id": p.uint256}, p.bool),
    initialize: fun("0xc4d66de8", {"initialOwner": p.address}, ),
    isApprovedForAll: fun("0xe985e9c5", {"account": p.address, "operator": p.address}, p.bool),
    mint: fun("0x731133e9", {"account": p.address, "id": p.uint256, "amount": p.uint256, "data": p.bytes}, ),
    mintBatch: fun("0x1f7fdffa", {"to": p.address, "ids": p.array(p.uint256), "amounts": p.array(p.uint256), "data": p.bytes}, ),
    owner: fun("0x8da5cb5b", {}, p.address),
    pause: fun("0x8456cb59", {}, ),
    paused: fun("0x5c975abb", {}, p.bool),
    renounceOwnership: fun("0x715018a6", {}, ),
    safeBatchTransferFrom: fun("0x2eb2c2d6", {"from": p.address, "to": p.address, "ids": p.array(p.uint256), "values": p.array(p.uint256), "data": p.bytes}, ),
    safeTransferFrom: fun("0xf242432a", {"from": p.address, "to": p.address, "id": p.uint256, "value": p.uint256, "data": p.bytes}, ),
    setApprovalForAll: fun("0xa22cb465", {"operator": p.address, "approved": p.bool}, ),
    setURI: fun("0x02fe5305", {"newuri": p.string}, ),
    supportsInterface: fun("0x01ffc9a7", {"interfaceId": p.bytes4}, p.bool),
    "totalSupply()": fun("0x18160ddd", {}, p.uint256),
    "totalSupply(uint256)": fun("0xbd85b039", {"id": p.uint256}, p.uint256),
    transferOwnership: fun("0xf2fde38b", {"newOwner": p.address}, ),
    unpause: fun("0x3f4ba83a", {}, ),
    uri: fun("0x0e89341c", {"_0": p.uint256}, p.string),
}

export class Contract extends ContractBase {

    balanceOf(account: BalanceOfParams["account"], id: BalanceOfParams["id"]) {
        return this.eth_call(functions.balanceOf, {account, id})
    }

    balanceOfBatch(accounts: BalanceOfBatchParams["accounts"], ids: BalanceOfBatchParams["ids"]) {
        return this.eth_call(functions.balanceOfBatch, {accounts, ids})
    }

    exists(id: ExistsParams["id"]) {
        return this.eth_call(functions.exists, {id})
    }

    isApprovedForAll(account: IsApprovedForAllParams["account"], operator: IsApprovedForAllParams["operator"]) {
        return this.eth_call(functions.isApprovedForAll, {account, operator})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    paused() {
        return this.eth_call(functions.paused, {})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    "totalSupply()"() {
        return this.eth_call(functions["totalSupply()"], {})
    }

    "totalSupply(uint256)"(id: TotalSupplyParams_1["id"]) {
        return this.eth_call(functions["totalSupply(uint256)"], {id})
    }

    uri(_0: UriParams["_0"]) {
        return this.eth_call(functions.uri, {_0})
    }
}

/// Event types
export type ApprovalForAllEventArgs = EParams<typeof events.ApprovalForAll>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PausedEventArgs = EParams<typeof events.Paused>
export type TransferBatchEventArgs = EParams<typeof events.TransferBatch>
export type TransferSingleEventArgs = EParams<typeof events.TransferSingle>
export type URIEventArgs = EParams<typeof events.URI>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>

/// Function types
export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type BalanceOfBatchParams = FunctionArguments<typeof functions.balanceOfBatch>
export type BalanceOfBatchReturn = FunctionReturn<typeof functions.balanceOfBatch>

export type BurnParams = FunctionArguments<typeof functions.burn>
export type BurnReturn = FunctionReturn<typeof functions.burn>

export type BurnBatchParams = FunctionArguments<typeof functions.burnBatch>
export type BurnBatchReturn = FunctionReturn<typeof functions.burnBatch>

export type ExistsParams = FunctionArguments<typeof functions.exists>
export type ExistsReturn = FunctionReturn<typeof functions.exists>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsApprovedForAllParams = FunctionArguments<typeof functions.isApprovedForAll>
export type IsApprovedForAllReturn = FunctionReturn<typeof functions.isApprovedForAll>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type MintBatchParams = FunctionArguments<typeof functions.mintBatch>
export type MintBatchReturn = FunctionReturn<typeof functions.mintBatch>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SafeBatchTransferFromParams = FunctionArguments<typeof functions.safeBatchTransferFrom>
export type SafeBatchTransferFromReturn = FunctionReturn<typeof functions.safeBatchTransferFrom>

export type SafeTransferFromParams = FunctionArguments<typeof functions.safeTransferFrom>
export type SafeTransferFromReturn = FunctionReturn<typeof functions.safeTransferFrom>

export type SetApprovalForAllParams = FunctionArguments<typeof functions.setApprovalForAll>
export type SetApprovalForAllReturn = FunctionReturn<typeof functions.setApprovalForAll>

export type SetURIParams = FunctionArguments<typeof functions.setURI>
export type SetURIReturn = FunctionReturn<typeof functions.setURI>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type TotalSupplyParams_0 = FunctionArguments<typeof functions["totalSupply()"]>
export type TotalSupplyReturn_0 = FunctionReturn<typeof functions["totalSupply()"]>

export type TotalSupplyParams_1 = FunctionArguments<typeof functions["totalSupply(uint256)"]>
export type TotalSupplyReturn_1 = FunctionReturn<typeof functions["totalSupply(uint256)"]>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UnpauseParams = FunctionArguments<typeof functions.unpause>
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>

export type UriParams = FunctionArguments<typeof functions.uri>
export type UriReturn = FunctionReturn<typeof functions.uri>

