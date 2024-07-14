export interface IhasStatus {
  status: string;
}

export interface IGetLocationResponse extends IhasStatus {
  redirect_url: string;
}

export interface ITwitterAuthParams {
  oauth_token: string;
  oauth_verifier: string;
}

export interface IGetInitUserInfoResponse extends IhasStatus {
  user: {
    id: number;
    name: string;
    twitter_handle: string;
    twitter_profile_id: number;
  };
}
export interface IGetUserInfoResponse extends IhasStatus {
  user: {
    name: string;
    twitter_profile_id: string;
    twitter_handle: string;
    location: string | null;
    description: string | null;
    image: string | null;
  } | null;
}
