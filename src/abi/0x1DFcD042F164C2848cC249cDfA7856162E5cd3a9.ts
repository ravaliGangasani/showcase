import * as p from '@subsquid/evm-codec'
import { event, fun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", {"owner": indexed(p.address), "approved": indexed(p.address), "tokenId": indexed(p.uint256)}),
    ApprovalForAll: event("0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31", {"owner": indexed(p.address), "operator": indexed(p.address), "approved": p.bool}),
    BatchMinted: event("0x59f9fb6d992d2aee0ed338bb4c504a17fd3f67ae91a3135bc2ef947e308c41b2", {"to": p.address, "nextTokenId": p.uint256, "quantity": p.uint256}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", {"from": indexed(p.address), "to": indexed(p.address), "tokenId": indexed(p.uint256)}),
}

export const functions = {
    approve: fun("0x095ea7b3", {"to": p.address, "tokenId": p.uint256}, ),
    balanceOf: fun("0x70a08231", {"_owner": p.address}, p.uint256),
    burn: fun("0x42966c68", {"tokenId": p.uint256}, ),
    collectionURI: fun("0xa5097ebf", {}, p.string),
    contractURI: fun("0xe8a3d485", {}, p.string),
    dropsManager: fun("0xd72822bb", {}, p.address),
    endTime: fun("0x3197cbb6", {}, p.uint256),
    getApproved: fun("0x081812fc", {"tokenId": p.uint256}, p.address),
    initialize: fun("0x6273c8b4", {"params": p.struct({"name": p.string, "symbol": p.string, "uri": p.string, "tokensURI": p.string, "maxSupply": p.uint24, "isZeroIndexed": p.bool, "royaltyAmount": p.uint24, "endTime": p.uint256, "isEdition": p.bool, "isSBT": p.bool, "premintQuantity": p.uint256}), "_owner": p.address, "_dropsManager": p.address, "_scheduler": p.address}, ),
    isApprovedForAll: fun("0xe985e9c5", {"owner": p.address, "operator": p.address}, p.bool),
    isEdition: fun("0x6dbe6c1f", {}, p.bool),
    isSBT: fun("0x3cf40df3", {}, p.bool),
    isZeroIndexed: fun("0xefc585ad", {}, p.bool),
    maxSupply: fun("0xd5abeb01", {}, p.uint24),
    mint: fun("0xd112fe33", {"_minter": p.address, "_quantity": p.uint24, "_merkleProof": p.array(p.bytes32), "_phaseId": p.uint8}, p.uint256),
    mintPrice: fun("0x8147ef37", {"_phaseId": p.uint8}, p.uint256),
    mintedOf: fun("0x617692dd", {"_owner": p.address}, p.uint256),
    name: fun("0x06fdde03", {}, p.string),
    owner: fun("0x8da5cb5b", {}, p.address),
    ownerOf: fun("0x6352211e", {"tokenId": p.uint256}, p.address),
    preMintToPlatform: fun("0xd2fb1929", {"_quantity": p.uint256}, ),
    preMintToTeam: fun("0x6da7870b", {"_quantity": p.uint256}, ),
    royaltyAmount: fun("0x7c6e551d", {}, p.uint24),
    royaltyInfo: fun("0x2a55205a", {"_0": p.uint256, "value": p.uint256}, {"_receiver": p.address, "_royaltyAmount": p.uint256}),
    "safeTransferFrom(address,address,uint256)": fun("0x42842e0e", {"from": p.address, "to": p.address, "tokenId": p.uint256}, ),
    "safeTransferFrom(address,address,uint256,bytes)": fun("0xb88d4fde", {"from": p.address, "to": p.address, "tokenId": p.uint256, "_data": p.bytes}, ),
    scheduler: fun("0xd1ad17bf", {}, p.address),
    setApprovalForAll: fun("0xa22cb465", {"operator": p.address, "approved": p.bool}, ),
    setPhase: fun("0x2ad47c27", {"_phaseId": p.uint8, "_from": p.uint256, "_to": p.uint256, "_merkleRoot": p.bytes32, "_maxPerAddress": p.uint24, "_price": p.uint256, "_token": p.address, "_minToken": p.uint256}, ),
    setRoyaltyAmount: fun("0x52a284a2", {"_royaltyAmount": p.uint24}, ),
    setTokensURI: fun("0xb19ab245", {"_uri": p.string}, ),
    supportsInterface: fun("0x01ffc9a7", {"interfaceId": p.bytes4}, p.bool),
    symbol: fun("0x95d89b41", {}, p.string),
    tokenURI: fun("0xc87b56dd", {"tokenId": p.uint256}, p.string),
    tokensURI: fun("0x2dd0066e", {}, p.string),
    totalMinted: fun("0xa2309ff8", {}, p.uint256),
    totalSupply: fun("0x18160ddd", {}, p.uint256),
    transferFrom: fun("0x23b872dd", {"from": p.address, "to": p.address, "tokenId": p.uint256}, ),
}

export class Contract extends ContractBase {

    balanceOf(_owner: BalanceOfParams["_owner"]) {
        return this.eth_call(functions.balanceOf, {_owner})
    }

    collectionURI() {
        return this.eth_call(functions.collectionURI, {})
    }

    contractURI() {
        return this.eth_call(functions.contractURI, {})
    }

    dropsManager() {
        return this.eth_call(functions.dropsManager, {})
    }

    endTime() {
        return this.eth_call(functions.endTime, {})
    }

    getApproved(tokenId: GetApprovedParams["tokenId"]) {
        return this.eth_call(functions.getApproved, {tokenId})
    }

    isApprovedForAll(owner: IsApprovedForAllParams["owner"], operator: IsApprovedForAllParams["operator"]) {
        return this.eth_call(functions.isApprovedForAll, {owner, operator})
    }

    isEdition() {
        return this.eth_call(functions.isEdition, {})
    }

    isSBT() {
        return this.eth_call(functions.isSBT, {})
    }

    isZeroIndexed() {
        return this.eth_call(functions.isZeroIndexed, {})
    }

    maxSupply() {
        return this.eth_call(functions.maxSupply, {})
    }

    mintPrice(_phaseId: MintPriceParams["_phaseId"]) {
        return this.eth_call(functions.mintPrice, {_phaseId})
    }

    mintedOf(_owner: MintedOfParams["_owner"]) {
        return this.eth_call(functions.mintedOf, {_owner})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    ownerOf(tokenId: OwnerOfParams["tokenId"]) {
        return this.eth_call(functions.ownerOf, {tokenId})
    }

    royaltyAmount() {
        return this.eth_call(functions.royaltyAmount, {})
    }

    royaltyInfo(_0: RoyaltyInfoParams["_0"], value: RoyaltyInfoParams["value"]) {
        return this.eth_call(functions.royaltyInfo, {_0, value})
    }

    scheduler() {
        return this.eth_call(functions.scheduler, {})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    tokenURI(tokenId: TokenURIParams["tokenId"]) {
        return this.eth_call(functions.tokenURI, {tokenId})
    }

    tokensURI() {
        return this.eth_call(functions.tokensURI, {})
    }

    totalMinted() {
        return this.eth_call(functions.totalMinted, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ApprovalForAllEventArgs = EParams<typeof events.ApprovalForAll>
export type BatchMintedEventArgs = EParams<typeof events.BatchMinted>
export type TransferEventArgs = EParams<typeof events.Transfer>

/// Function types
export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type BurnParams = FunctionArguments<typeof functions.burn>
export type BurnReturn = FunctionReturn<typeof functions.burn>

export type CollectionURIParams = FunctionArguments<typeof functions.collectionURI>
export type CollectionURIReturn = FunctionReturn<typeof functions.collectionURI>

export type ContractURIParams = FunctionArguments<typeof functions.contractURI>
export type ContractURIReturn = FunctionReturn<typeof functions.contractURI>

export type DropsManagerParams = FunctionArguments<typeof functions.dropsManager>
export type DropsManagerReturn = FunctionReturn<typeof functions.dropsManager>

export type EndTimeParams = FunctionArguments<typeof functions.endTime>
export type EndTimeReturn = FunctionReturn<typeof functions.endTime>

export type GetApprovedParams = FunctionArguments<typeof functions.getApproved>
export type GetApprovedReturn = FunctionReturn<typeof functions.getApproved>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsApprovedForAllParams = FunctionArguments<typeof functions.isApprovedForAll>
export type IsApprovedForAllReturn = FunctionReturn<typeof functions.isApprovedForAll>

export type IsEditionParams = FunctionArguments<typeof functions.isEdition>
export type IsEditionReturn = FunctionReturn<typeof functions.isEdition>

export type IsSBTParams = FunctionArguments<typeof functions.isSBT>
export type IsSBTReturn = FunctionReturn<typeof functions.isSBT>

export type IsZeroIndexedParams = FunctionArguments<typeof functions.isZeroIndexed>
export type IsZeroIndexedReturn = FunctionReturn<typeof functions.isZeroIndexed>

export type MaxSupplyParams = FunctionArguments<typeof functions.maxSupply>
export type MaxSupplyReturn = FunctionReturn<typeof functions.maxSupply>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type MintPriceParams = FunctionArguments<typeof functions.mintPrice>
export type MintPriceReturn = FunctionReturn<typeof functions.mintPrice>

export type MintedOfParams = FunctionArguments<typeof functions.mintedOf>
export type MintedOfReturn = FunctionReturn<typeof functions.mintedOf>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type OwnerOfParams = FunctionArguments<typeof functions.ownerOf>
export type OwnerOfReturn = FunctionReturn<typeof functions.ownerOf>

export type PreMintToPlatformParams = FunctionArguments<typeof functions.preMintToPlatform>
export type PreMintToPlatformReturn = FunctionReturn<typeof functions.preMintToPlatform>

export type PreMintToTeamParams = FunctionArguments<typeof functions.preMintToTeam>
export type PreMintToTeamReturn = FunctionReturn<typeof functions.preMintToTeam>

export type RoyaltyAmountParams = FunctionArguments<typeof functions.royaltyAmount>
export type RoyaltyAmountReturn = FunctionReturn<typeof functions.royaltyAmount>

export type RoyaltyInfoParams = FunctionArguments<typeof functions.royaltyInfo>
export type RoyaltyInfoReturn = FunctionReturn<typeof functions.royaltyInfo>

export type SafeTransferFromParams_0 = FunctionArguments<typeof functions["safeTransferFrom(address,address,uint256)"]>
export type SafeTransferFromReturn_0 = FunctionReturn<typeof functions["safeTransferFrom(address,address,uint256)"]>

export type SafeTransferFromParams_1 = FunctionArguments<typeof functions["safeTransferFrom(address,address,uint256,bytes)"]>
export type SafeTransferFromReturn_1 = FunctionReturn<typeof functions["safeTransferFrom(address,address,uint256,bytes)"]>

export type SchedulerParams = FunctionArguments<typeof functions.scheduler>
export type SchedulerReturn = FunctionReturn<typeof functions.scheduler>

export type SetApprovalForAllParams = FunctionArguments<typeof functions.setApprovalForAll>
export type SetApprovalForAllReturn = FunctionReturn<typeof functions.setApprovalForAll>

export type SetPhaseParams = FunctionArguments<typeof functions.setPhase>
export type SetPhaseReturn = FunctionReturn<typeof functions.setPhase>

export type SetRoyaltyAmountParams = FunctionArguments<typeof functions.setRoyaltyAmount>
export type SetRoyaltyAmountReturn = FunctionReturn<typeof functions.setRoyaltyAmount>

export type SetTokensURIParams = FunctionArguments<typeof functions.setTokensURI>
export type SetTokensURIReturn = FunctionReturn<typeof functions.setTokensURI>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TokenURIParams = FunctionArguments<typeof functions.tokenURI>
export type TokenURIReturn = FunctionReturn<typeof functions.tokenURI>

export type TokensURIParams = FunctionArguments<typeof functions.tokensURI>
export type TokensURIReturn = FunctionReturn<typeof functions.tokensURI>

export type TotalMintedParams = FunctionArguments<typeof functions.totalMinted>
export type TotalMintedReturn = FunctionReturn<typeof functions.totalMinted>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

