import { Address, createPublicClient, getContract, http } from 'viem';
import { hordAbis, hordOnEthAddress } from '../abi/bnb';
import { mainnet } from 'viem/chains';
import { taskBunyContractABIs, taskBunyContractAddress } from '../abi/taskbunnyContract';
import { flashAbis } from '../abi/flash';
import { vestingContractAbis } from '../abi/vesting';

export const contracts: Record<string, { abi: any[]; address: Address }> = {
  hord: {
    abi: hordAbis,
    address: hordOnEthAddress,
  },
  taskBunny: {
    abi: taskBunyContractABIs,
    address: taskBunyContractAddress,
  },
  flash: {
    abi: flashAbis,
    address: '0x904A997680f2303b9a120E63F6fC065F8a020f87',
  },
  vesting: {
    abi: vestingContractAbis,
    address: '0x982187a77bEEeb8EB2cDcf20939a49e7FfA77A24',
  },
};

export type ContractsNames = keyof typeof contracts;
