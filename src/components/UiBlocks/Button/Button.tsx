import React from 'react';
import CicularProgress from '../CicularProgress/CicularProgress';
import clsx from 'clsx';
import { APP_CHAIN } from '@/constatnts/chains';
import { useAccount } from 'wagmi';
import { getChainById, getProvider } from '@/utils/contracts';
import { createWalletClient, custom } from 'viem';
import { useUiStore } from '@/stores/ui';
import Tooltip, { TooltipProps } from '@/components/Common/Tooltip/Tooltip';

type btnType = 'primary' | 'gredient' | 'simple';

type SrcObj = {
  condition: boolean;
  msg: string;
};

interface ButtonTooltipPtops extends TooltipProps {
  showOnBtnDisabled?: boolean;
}

interface IButton<T = any> extends React.ButtonHTMLAttributes<T> {
  text?: string;
  loading?: boolean;
  loadingText?: string;
  varient?: btnType;
  loadingSrc?: SrcObj[];
  disabledSrc?: SrcObj[];
  textSrc?: SrcObj[];
  className?: string;
  progressClass?: string;
  requiredChain?: APP_CHAIN;
  tooltipProps?: ButtonTooltipPtops;
  onClick?: React.MouseEventHandler<T>;
}

const virentClassSrc: Record<btnType, string> = {
  gredient: ' text-white',
  primary: 'text-[#000] bg-primary',
  simple: 'text-[#000] bg-content-primary',
};

export default function Button({
  text,
  onClick,
  loading = false,
  progressClass,
  children,
  loadingSrc,
  disabledSrc,
  varient = 'simple',
  className,
  requiredChain,
  textSrc,
  loadingText,
  disabled,
  tooltipProps,
  ...rest
}: IButton) {
  const textClass = 'text-md font-[600]';
  const virentClass = virentClassSrc[varient];

  const { chainId: appChain, chain, address } = useAccount();
  const requireChainObj = requiredChain && getChainById(requiredChain!);
  const { customAlert } = useUiStore();

  const foundTextObj = textSrc && textSrc?.find((TextObj) => TextObj.condition);
  const renderedTextMsg = foundTextObj ? foundTextObj.msg : text;

  const foundLoadingObj = loadingSrc && loadingSrc?.find((loadingObj) => loadingObj.condition);
  const renderedLoadingMsg = foundLoadingObj ? foundLoadingObj.msg : loadingText;

  const foundDisabledObj = disabledSrc && disabledSrc?.find((disabledObj) => disabledObj.condition);
  const disabledMsg = foundDisabledObj ? foundDisabledObj.msg : '';

  const checkForChain = async () => {
    if (!requireChainObj) return;
    if (!address) throw new Error('you need to connect ur wallet!');
    const currentProvider = await getProvider();

    const walletClient = createWalletClient({
      chain,
      transport: custom(currentProvider),
    });

    if (requireChainObj.id === appChain) return;

    return walletClient.switchChain({ id: requireChainObj.id });
  };

  const handleClick = async (e: any) => {
    if (disabledMsg) {
      customAlert({ text: disabledMsg, type: 'info' });
      return;
    }

    if (loading || foundDisabledObj?.condition || disabled) {
      e.preventDefault();
      return;
    }

    try {
      await checkForChain();
      onClick?.(e);
    } catch (error: any) {
      customAlert({ text: error?.shortMessage || error?.message, type: 'error' });
    }
  };

  return (
    <Tooltip {...tooltipProps}>
      <button
        onClick={handleClick}
        className={clsx(
          'whitespace-pre h-[40px] px-5 w-full transition-50 rounded-[8px] flex justify-center items-center',
          textClass,
          className,
          virentClass,
          !disabled && !foundDisabledObj?.condition && !loading && 'hover:brightness-95 active:scale-105',
          (disabled || loading || disabledMsg) &&
            'bg-transparent-15 text-transparent-40 cursor-not-allowed opacity-70 hover:brightness-70',
        )}
        {...rest}
      >
        {!loading ? (
          <>{children || <span className={textClass}>{renderedTextMsg}</span>}</>
        ) : (
          <div className={clsx('flex items-center justify-center gap-3', progressClass)}>
            <span>{renderedLoadingMsg}</span>
            <CicularProgress className={clsx('text-[#000] text-[8px]', progressClass)} />
          </div>
        )}
      </button>
    </Tooltip>
  );
}
