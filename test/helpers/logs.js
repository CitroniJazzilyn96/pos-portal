import { RLP } from 'ethers/utils'
import { AbiCoder } from 'ethers/utils'

import {
  erc20TransferEventSig,
  erc20BurnEventSig,
  erc721TransferEventSig,
  erc721BatchWithdrawSig,
  erc721TransferWithMetadataEventSig,
  erc1155TransferSingleEventSig,
  erc1155TransferBatchEventSig
} from './constants'

const abi = new AbiCoder()

export const getERC20TransferLog = ({
  overrideSig,
  from,
  to,
  amount
}) => {
  return RLP.encode([
    '0x0',
    [
      overrideSig || erc20TransferEventSig,
      from,
      to
    ],
    '0x' + amount.toString(16)
  ])
}

export const getERC20BurnLog = ({
  overrideSig,
  from,
  amount
}) => {
  return RLP.encode([
    '0x0',
    [
      overrideSig || erc20BurnEventSig,
      from
    ],
    '0x' + amount.toString(16)
  ])
}

export const getERC721TransferLog = ({
  overrideSig,
  from,
  to,
  tokenId
}) => {
  return RLP.encode([
    '0x0',
    [
      overrideSig || erc721TransferEventSig,
      from,
      to,
      '0x' + tokenId.toString(16)
    ]
  ])
}

export const getERC721BatchWithdraw = ({
  overrideSig,
  user,
  tokenIds
}) => {

  return RLP.encode([
    '0x0',
    [
      overrideSig || erc721BatchWithdrawSig,
      user
    ],
    abi.encode(
      ['uint256[]'],
      [tokenIds.map(t => '0x' + t.toString(16))]
    )
  ])

}

export const getERC721TransferWithMetadataLog = ({
  overrideSig,
  from,
  to,
  tokenId,
  metaData
}) => {
  return RLP.encode([
    '0x0',
    [
      overrideSig || erc721TransferWithMetadataEventSig,
      from,
      to,
      '0x' + tokenId.toString(16)
    ],
    abi.encode(['string'], [metaData]) // ABI encoded metadata, because that's how dummy root token expects it
  ])
}

export const getERC1155TransferSingleLog = ({
  overrideSig,
  operator,
  from,
  to,
  tokenId,
  amount
}) => {
  return RLP.encode([
    '0x0',
    [
      overrideSig || erc1155TransferSingleEventSig,
      operator,
      from,
      to
    ],
    abi.encode(['uint256', 'uint256'], ['0x' + tokenId.toString(16), '0x' + amount.toString(16)])
  ])
}

export const getERC1155TransferBatchLog = ({
  overrideSig,
  operator,
  from,
  to,
  tokenIds,
  amounts
}) => {
  return RLP.encode([
    '0x0',
    [
      overrideSig || erc1155TransferBatchEventSig,
      operator,
      from,
      to
    ],
    abi.encode(
      [
        'uint256[]',
        'uint256[]'
      ],
      [
        tokenIds.map(t => '0x' + t.toString(16)),
        amounts.map(a => '0x' + a.toString(16))
      ]
    )
  ])
}
