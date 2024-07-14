import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMounted } from '@/hooks/useMounted';
import clsx from 'clsx';
import CloseBtn from '@/components/Common/CloseBtn/CloseBtn';
import { useModalStore } from '@/stores/modal';
import ShowAt from '@/components/Common/ShowAt/ShowAt';

const Modal = () => {
  const isMounted = useMounted();
  const [showClosedAnimation, setShowClosedAnimation] = useState(false);

  const { pathname } = useLocation();

  const {
    modal: {
      isOpen,
      content,
      // styles
      modalStyle,
      modalClassname,
      wrapperClassname,
      modalLayoutClassName,
    },
    actions: { closeModal: resetModalState },
  } = useModalStore();

  // Prevent closing the modal when click the content inside of the modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    setShowClosedAnimation(true);
    setTimeout(() => {
      resetModalState();
      setShowClosedAnimation(false);
    }, 150); // 150ms is bc animation is 170ms, to ansure that timeout will happened beofre end of the animation
  };

  // For closing modal on click on ESC
  useEffect(() => {
    const handleEscClick = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscClick);

    return () => {
      window.removeEventListener('keydown', handleEscClick);
    };
  }, []);

  // If navigation change close the modal
  useEffect(() => {
    if (isMounted) resetModalState();
  }, [pathname]);

  return (
    <ShowAt at={isOpen}>
      <div
        className={clsx(
          'w-full h-full z-[2000] fixed top-0 left-0 not-blured bg-[#000000d9] animate-fadeIn',
          { 'animate-fade-out': showClosedAnimation },
        )}
      />
      <div
        className={clsx(
          'w-full min-w-[100dvw] min-h-[100dvh] fixed top-0 left-0 z-[2001] overflow-auto flex-center max-sm:items-end',
          wrapperClassname,
        )}
        onClick={closeModal}
      >
        <div
          className={clsx(
            'rounded-3xl backdrop-blur-[5px] max-w-[450px] max-h-[570px] w-fit z-[2002] overscroll-y-auto animate-fadeInScaleUp max-sm:w-full max-sm:max-h-[calc(100dvh-32px)]',
            modalClassname,
            {
              'modal-open': isOpen,
              'animate-fadeOutScaleDown scale-75': showClosedAnimation,
            },
          )}
          style={modalStyle}
          onClick={handleModalContentClick}
        >
          <div className="relative max-w-[420px]">
            <CloseBtn onClick={closeModal} />
            <div
              className={clsx(
                'flex bg-primary-100 px-6 py-6 flex-col gap-6 rounded-3xl max-sm:rounded-b-none max-sm:px-6 max-sm:py-3 has-[.no-gap-modal]:gap-0',
                modalLayoutClassName,
              )}
            >
              {content}
            </div>
          </div>
        </div>
      </div>
    </ShowAt>
  );
};

export default Modal;
