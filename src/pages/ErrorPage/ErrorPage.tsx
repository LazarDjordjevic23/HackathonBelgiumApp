import './ErrorPage.scss';
import Bunny404 from '@/assets/svgs/404-bunny.svg?react';

const ErrorPage = () => {
  return (
    <div className="flex-center relative main-content overflow-hidden error-page no-padding">
      {/* <Buildings className="absolute bottom-0" /> */}
      <div className="flex flex-col flex-center gap-7">
        <Bunny404 />
        <div className="flex-center flex-col gap-3">
          <h1 className="press-font">PAGE NOT FOUND</h1>
          <span>GO BACK AND TRY A DIFFERENT LINK</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
