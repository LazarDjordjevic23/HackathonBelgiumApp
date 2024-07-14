import CommentIcon from '@/assets/svgs/comment-icon.svg?react';
import RepostIcon from '@/assets/svgs/repost-icon.svg?react';
import LikeIcon from '@/assets/svgs/like-icon.svg?react';
import ViewIcon from '@/assets/svgs/view-icon.svg?react';
import BookmarkIcon from '@/assets/svgs/bookmark-icon.svg?react';
import ShareIcon from '@/assets/svgs/share-icon.svg?react';
import MoreIcon from '@/assets/svgs/more-icon.svg?react';
import clsx from 'clsx';
import { Tweet } from '@/stores/auth/tweets';

const TwitterPost = ({
  comments,
  bookmarks,
  impression_count,
  likes,
  text,
  retweets,
  className,
  ...rest
}: Tweet & { className: string }) => {
  const iconClassName = 'w-[18px] h-[18px] fill-skin-muted';

  return (
    <article
      className={clsx(
        'px-4 py-3 flex items-start gap-2  bg-black hover:bg-[#080808] cursor-pointer transition-50',
        className,
      )}
    >
      <div className="bg-slate-400 min-w-[40px] min-h-[40px] rounded-full">{/* Image */}</div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-white text-sm font-medium">TaskBunny.io</span>
            <span className="text-gray-500 text-sm text-skin-muted ml-1">@Taskbunnyio · 19h</span>
          </div>
          <MoreIcon className={iconClassName} />
        </div>
        <div>
          <span className="text-white text-sm">{text}</span>
        </div>
        <div className="flex mt-3">
          <div className="flex w-full justify-between">
            <div className="flex gap-1 items-center">
              <CommentIcon className={iconClassName} />
              {!!comments && <span className="text-skin-muted text-sm">{comments}</span>}
            </div>
            <div className="flex gap-1 items-center">
              <RepostIcon className={iconClassName} />
              {!!retweets && <span className="text-skin-muted text-sm">{retweets}</span>}
            </div>
            <div className="flex gap-1 items-center">
              <LikeIcon className={iconClassName} />
              {!!likes && <span className="text-skin-muted text-sm">{likes}</span>}
            </div>
            <div className="flex gap-1 items-center">
              <ViewIcon className={iconClassName} />
              <span className="text-skin-muted text-sm">{impression_count}</span>
            </div>
            <div className="flex gap-1 items-center">
              <BookmarkIcon className={iconClassName} />
              <ShareIcon className={iconClassName} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TwitterPost;
