/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userCurrent
// ====================================================

export type T_GQL_userCurrent_userCurrent = {
  __typename: "User";
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  role: Role;
}

export type T_GQL_userCurrent = {
  userCurrent: T_GQL_userCurrent_userCurrent;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: authLogin
// ====================================================

export type T_GQL_authLogin_authLogin_user = {
  __typename: "User";
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  role: Role;
}

export type T_GQL_authLogin_authLogin = {
  __typename: "Auth";
  /**
   * JWT access token
   */
  accessToken: any;
  /**
   * JWT refresh token
   */
  refreshToken: any;
  user: T_GQL_authLogin_authLogin_user;
}

export type T_GQL_authLogin = {
  authLogin: T_GQL_authLogin_authLogin;
}

export type T_GQL_authLoginVariables = {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: authRefreshToken
// ====================================================

export type T_GQL_authRefreshToken_authRefreshToken = {
  __typename: "Token";
  /**
   * JWT access token
   */
  accessToken: any;
  /**
   * JWT refresh token
   */
  refreshToken: any;
}

export type T_GQL_authRefreshToken = {
  authRefreshToken: T_GQL_authRefreshToken_authRefreshToken;
}

export type T_GQL_authRefreshTokenVariables = {
  token: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: authSignup
// ====================================================

export type T_GQL_authSignup_authSignup_user = {
  __typename: "User";
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  role: Role;
}

export type T_GQL_authSignup_authSignup = {
  __typename: "Auth";
  /**
   * JWT access token
   */
  accessToken: any;
  /**
   * JWT refresh token
   */
  refreshToken: any;
  user: T_GQL_authSignup_authSignup_user;
}

export type T_GQL_authSignup = {
  authSignup: T_GQL_authSignup_authSignup;
}

export type T_GQL_authSignupVariables = {
  email: string;
  password: string;
  firstname?: string | null;
  lastname?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: channel
// ====================================================

export type T_GQL_channel_channel_author = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
}

export type T_GQL_channel_channel_members = {
  __typename: "User";
  id: string;
  lastname: string | null;
  firstname: string | null;
  role: Role;
}

export type T_GQL_channel_channel_categories_trackers = {
  __typename: "Tracker";
  id: string;
  title: string;
}

export type T_GQL_channel_channel_categories = {
  __typename: "ChannelCategory";
  title: string;
  id: string;
  trackers: T_GQL_channel_channel_categories_trackers[];
}

export type T_GQL_channel_channel = {
  __typename: "Channel";
  id: string;
  title: string;
  description: string;
  inviteLink: string;
  author: T_GQL_channel_channel_author;
  members: T_GQL_channel_channel_members[];
  categories: T_GQL_channel_channel_categories[];
}

export type T_GQL_channel = {
  channel: T_GQL_channel_channel;
}

export type T_GQL_channelVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: channelCreate
// ====================================================

export type T_GQL_channelCreate_channelCreate_author = {
  __typename: "User";
  id: string;
  firstname: string | null;
}

export type T_GQL_channelCreate_channelCreate = {
  __typename: "Channel";
  id: string;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * Identifies the date and time when the object was last updated.
   */
  updatedAt: any;
  title: string;
  description: string;
  author: T_GQL_channelCreate_channelCreate_author;
}

export type T_GQL_channelCreate = {
  channelCreate: T_GQL_channelCreate_channelCreate;
}

export type T_GQL_channelCreateVariables = {
  title: string;
  description: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: channelCategoryCreate
// ====================================================

export type T_GQL_channelCategoryCreate_channelCategoryCreate = {
  __typename: "ChannelCategory";
  id: string;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * Identifies the date and time when the object was last updated.
   */
  updatedAt: any;
  title: string;
}

export type T_GQL_channelCategoryCreate = {
  channelCategoryCreate: T_GQL_channelCategoryCreate_channelCategoryCreate;
}

export type T_GQL_channelCategoryCreateVariables = {
  title: string;
  channelId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: channelJoin
// ====================================================

export type T_GQL_channelJoin_channelJoin_author = {
  __typename: "User";
  id: string;
  firstname: string | null;
}

export type T_GQL_channelJoin_channelJoin = {
  __typename: "Channel";
  id: string;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * Identifies the date and time when the object was last updated.
   */
  updatedAt: any;
  title: string;
  description: string;
  author: T_GQL_channelJoin_channelJoin_author;
}

export type T_GQL_channelJoin = {
  channelJoin: T_GQL_channelJoin_channelJoin;
}

export type T_GQL_channelJoinVariables = {
  inviteLink: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userChannels
// ====================================================

export type T_GQL_userChannels_userChannelsOwn_author = {
  __typename: "User";
  id: string;
}

export type T_GQL_userChannels_userChannelsOwn = {
  __typename: "Channel";
  id: string;
  title: string;
  author: T_GQL_userChannels_userChannelsOwn_author;
}

export type T_GQL_userChannels_userChannelsMemberOf_channel_author = {
  __typename: "User";
  id: string;
}

export type T_GQL_userChannels_userChannelsMemberOf_channel = {
  __typename: "Channel";
  id: string;
  title: string;
  author: T_GQL_userChannels_userChannelsMemberOf_channel_author;
}

export type T_GQL_userChannels_userChannelsMemberOf = {
  __typename: "UserOnChannel";
  id: string;
  channel: T_GQL_userChannels_userChannelsMemberOf_channel;
}

export type T_GQL_userChannels = {
  userChannelsOwn: T_GQL_userChannels_userChannelsOwn[];
  userChannelsMemberOf: T_GQL_userChannels_userChannelsMemberOf[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: channelDelete
// ====================================================

export type T_GQL_channelDelete = {
  channelDelete: string;
}

export type T_GQL_channelDeleteVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * User role
 */
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
