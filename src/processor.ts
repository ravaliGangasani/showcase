import { lookupArchive } from "@subsquid/archive-registry";
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from "@subsquid/evm-processor";
import * as erc721 from "./abi/erc721";
import * as proxy from "./abi/0x9Dd4a2A1dB6bc1168de7D758208AbB109d9A386A"


export const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/linea-mainnet")
  .setRpcEndpoint("https://linea-mainnet.infura.io/v3/ad1edca87f8d49bea59a35a10affd280")
  .setFinalityConfirmation(100)
  .setBlockRange({from:2320000})
  .addTrace({
    type: ["create"],
    transaction: true,

  })
  .addLog({
    address: [ "0x9Dd4a2A1dB6bc1168de7D758208AbB109d9A386A"],
    topic0: [erc721.events.Transfer.topic, proxy.events.Upgraded.topic],
    transaction: true,
    transactionLogs:true
  })
  .setFields({
    trace: {
      createResultCode: true, // for checking ERC721 compliance
      createResultAddress: true,
    },
  });

export type Fields = EvmBatchProcessorFields<typeof processor>;
export type Block = BlockHeader<Fields>;
export type Log = _Log<Fields>;
export type Transaction = _Transaction<Fields>;
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>;
