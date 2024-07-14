import { APP_CHAIN, appChains } from '@/constatnts/chains';
import { ContractsNames, contracts } from '@/constatnts/contracts/contracts';
import { createPublicClient, http, createWalletClient, Chain, parseEther, custom, Address, Abi } from 'viem';
import { wait } from './time';
import { _fetch } from './fetch';
import { STATUS_TYPES } from '@/hooks/usePromise/usePromise';
import { STATUS_RESPONSE_TYPES } from '@/types/campaigns';

export const getChainById = (id: APP_CHAIN): Chain => appChains?.[id];

export const getProvider = async () => {
  //@ts-ignore
  if (!window.provider) {
    await wait();
    return getProvider();
  }
  //@ts-ignore
  return window.provider;
};

interface Contract {
  abi: Abi;
  address: Address;
  chain_id: number;
  contract_name: string;
  id: number;
  network: string;
}
interface ContractResponse {
  manager_contract: Contract;
  status: STATUS_RESPONSE_TYPES;
}

const getManagerContract = async (chainId = 97): Promise<Contract> => {
  try {
    return { abi: [], address: '0x', chain_id: 1, contract_name: '', id: 1, network: '' };
    // const response: ContractResponse = await _fetch(`${GET_MANAGER_CONTRACT_INFO_URL}/?chain_id=${chainId}`);
    // const managerContract = response.manager_contract;
    // // @ts-ignore
    // return { ...managerContract, abi: JSON.parse(managerContract.abi as string) };
  } catch (error) {
    throw error;
  }
};

export const contractRead = async <ReturnType = any>({
  chain,
  contractName,
  functionName,
  args,
}: {
  contractName: ContractsNames;
  chain: APP_CHAIN;
  functionName: string;
  args: any[];
}): Promise<ReturnType> => {
  const usedChain = getChainById(chain);
  const publicClient = createPublicClient({
    chain: usedChain,
    transport: http(),
  });
  const { abi, address } = contracts[contractName];
  // TODO: should refactor on BE to send as mapping of list of contract and also addresses by networks in that map
  // const { abi, address } = await getManagerContract();

  return publicClient.readContract({
    address,
    abi,
    functionName,
    args,
  }) as ReturnType;
};

export const contractWrite = async ({
  chain,
  contractName,
  functionName,
  args,
  account,
}: {
  contractName: ContractsNames;
  chain: APP_CHAIN;
  functionName: string;
  args: any[];
  account: Address;
}) => {
  //@ts-ignore
  const currentProvider = window.provider;

  const targetedChain = getChainById(chain);

  const walletClient = createWalletClient({
    chain: targetedChain,
    transport: custom(currentProvider),
  });

  const appChain = currentProvider?.chainId;

  const { abi, address } = contracts[contractName];
  // const { abi, address } = await getManagerContract();

  return walletClient.writeContract({
    address,
    abi,
    functionName,
    account,
    args,
    chain: targetedChain,
  });
};
