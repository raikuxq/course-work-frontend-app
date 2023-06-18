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
  role: ERole;
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
  role: ERole;
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
  role: ERole;
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
// GraphQL mutation operation: channelCategoryCreate
// ====================================================

export type T_GQL_channelCategoryCreate_channelCategoryCreate = {
  __typename: "ChannelCategory";
  id: string;
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
// GraphQL mutation operation: channelCategoryDelete
// ====================================================

export type T_GQL_channelCategoryDelete = {
  channelCategoryDelete: string;
}

export type T_GQL_channelCategoryDeleteVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: channelCategoryUpdate
// ====================================================

export type T_GQL_channelCategoryUpdate_channelCategoryUpdate = {
  __typename: "ChannelCategory";
  id: string;
}

export type T_GQL_channelCategoryUpdate = {
  channelCategoryUpdate: T_GQL_channelCategoryUpdate_channelCategoryUpdate;
}

export type T_GQL_channelCategoryUpdateVariables = {
  id: string;
  title: string;
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
  role: ERole;
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
// GraphQL mutation operation: channelLeave
// ====================================================

export type T_GQL_channelLeave = {
  channelLeave: string;
}

export type T_GQL_channelLeaveVariables = {
  channelId: string;
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
// GraphQL mutation operation: channelUpdate
// ====================================================

export type T_GQL_channelUpdate_channelUpdate_author = {
  __typename: "User";
  id: string;
  firstname: string | null;
}

export type T_GQL_channelUpdate_channelUpdate = {
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
  author: T_GQL_channelUpdate_channelUpdate_author;
}

export type T_GQL_channelUpdate = {
  channelUpdate: T_GQL_channelUpdate_channelUpdate;
}

export type T_GQL_channelUpdateVariables = {
  id: string;
  title: string;
  description: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: comment
// ====================================================

export type T_GQL_comment_comment_author_user = {
  __typename: "User";
  role: ERole;
  firstname: string | null;
  lastname: string | null;
}

export type T_GQL_comment_comment_author = {
  __typename: "TrackerMember";
  id: string;
  user: T_GQL_comment_comment_author_user;
}

export type T_GQL_comment_comment = {
  __typename: "Comment";
  id: string;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * Identifies the date and time when the object was last updated.
   */
  updatedAt: any;
  content: string;
  author: T_GQL_comment_comment_author;
}

export type T_GQL_comment = {
  comment: T_GQL_comment_comment;
}

export type T_GQL_commentVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: commentCreate
// ====================================================

export type T_GQL_commentCreate_commentCreate = {
  __typename: "Comment";
  id: string;
}

export type T_GQL_commentCreate = {
  commentCreate: T_GQL_commentCreate_commentCreate;
}

export type T_GQL_commentCreateVariables = {
  issueReportId: string;
  content: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: commentDelete
// ====================================================

export type T_GQL_commentDelete = {
  commentDelete: string;
}

export type T_GQL_commentDeleteVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: commentUpdate
// ====================================================

export type T_GQL_commentUpdate_commentUpdate = {
  __typename: "Comment";
  id: string;
}

export type T_GQL_commentUpdate = {
  commentUpdate: T_GQL_commentUpdate_commentUpdate;
}

export type T_GQL_commentUpdateVariables = {
  id: string;
  content: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: issueReport
// ====================================================

export type T_GQL_issueReport_issueReport_responsiblePerson_user = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
}

export type T_GQL_issueReport_issueReport_responsiblePerson = {
  __typename: "TrackerMember";
  id: string;
  role: ETrackerMemberRole;
  user: T_GQL_issueReport_issueReport_responsiblePerson_user;
}

export type T_GQL_issueReport_issueReport_author_user = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
}

export type T_GQL_issueReport_issueReport_author = {
  __typename: "TrackerMember";
  role: ETrackerMemberRole;
  id: string;
  user: T_GQL_issueReport_issueReport_author_user;
}

export type T_GQL_issueReport_issueReport_tracker_members_user = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
}

export type T_GQL_issueReport_issueReport_tracker_members = {
  __typename: "TrackerMember";
  id: string;
  role: ETrackerMemberRole;
  user: T_GQL_issueReport_issueReport_tracker_members_user;
}

export type T_GQL_issueReport_issueReport_tracker = {
  __typename: "Tracker";
  id: string;
  title: string;
  members: T_GQL_issueReport_issueReport_tracker_members[];
}

export type T_GQL_issueReport_issueReport = {
  __typename: "IssueReport";
  id: string;
  title: string;
  type: EIssueReportType;
  status: EIssueReportStatus;
  priority: EIssueReportPriority;
  description: string;
  createdAt: any;
  updatedAt: any;
  responsiblePerson: T_GQL_issueReport_issueReport_responsiblePerson;
  author: T_GQL_issueReport_issueReport_author;
  tracker: T_GQL_issueReport_issueReport_tracker;
  comments: T_GQL_comment_comment[];
}

export type T_GQL_issueReport = {
  issueReport: T_GQL_issueReport_issueReport;
}

export type T_GQL_issueReportVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: issueReportCreate
// ====================================================

export type T_GQL_issueReportCreate_issueReportCreate = {
  __typename: "IssueReport";
  id: string;
}

export type T_GQL_issueReportCreate = {
  issueReportCreate: T_GQL_issueReportCreate_issueReportCreate;
}

export type T_GQL_issueReportCreateVariables = {
  trackerId: string;
  title: string;
  priority: EIssueReportPriority;
  responsiblePersonId: string;
  description: string;
  status: EIssueReportStatus;
  type: EIssueReportType;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: issueReportDelete
// ====================================================

export type T_GQL_issueReportDelete = {
  issueReportDelete: string;
}

export type T_GQL_issueReportDeleteVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: issueReportUpdate
// ====================================================

export type T_GQL_issueReportUpdate_issueReportUpdate = {
  __typename: "IssueReport";
  id: string;
}

export type T_GQL_issueReportUpdate = {
  issueReportUpdate: T_GQL_issueReportUpdate_issueReportUpdate;
}

export type T_GQL_issueReportUpdateVariables = {
  issueReportId: string;
  title: string;
  priority: EIssueReportPriority;
  responsiblePersonId: string;
  description: string;
  status: EIssueReportStatus;
  type: EIssueReportType;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userChangePassword
// ====================================================

export type T_GQL_userChangePassword_userChangePassword = {
  __typename: "User";
  id: string;
}

export type T_GQL_userChangePassword = {
  userChangePassword: T_GQL_userChangePassword_userChangePassword;
}

export type T_GQL_userChangePasswordVariables = {
  newPassword: string;
  oldPassword: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: userUpdate
// ====================================================

export type T_GQL_userUpdate_userUpdate = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
  email: string;
  role: ERole;
}

export type T_GQL_userUpdate = {
  userUpdate: T_GQL_userUpdate_userUpdate;
}

export type T_GQL_userUpdateVariables = {
  firstname: string;
  lastname: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: trackerRemoveMember
// ====================================================

export type T_GQL_trackerRemoveMember_trackerRemoveMember = {
  __typename: "Tracker";
  id: string;
}

export type T_GQL_trackerRemoveMember = {
  trackerRemoveMember: T_GQL_trackerRemoveMember_trackerRemoveMember;
}

export type T_GQL_trackerRemoveMemberVariables = {
  trackerId: string;
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: trackerAddMember
// ====================================================

export type T_GQL_trackerAddMember_trackerAddMember = {
  __typename: "Tracker";
  id: string;
}

export type T_GQL_trackerAddMember = {
  trackerAddMember: T_GQL_trackerAddMember_trackerAddMember;
}

export type T_GQL_trackerAddMemberVariables = {
  trackerId: string;
  role: ETrackerMemberRole;
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: tracker
// ====================================================

export type T_GQL_tracker_tracker_members_user = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
}

export type T_GQL_tracker_tracker_members = {
  __typename: "TrackerMember";
  id: string;
  role: ETrackerMemberRole;
  user: T_GQL_tracker_tracker_members_user;
}

export type T_GQL_tracker_tracker_channel_user = {
  id: string;
}

export type T_GQL_tracker_tracker_channel_members_user = T_GQL_channel_channel_members

export type T_GQL_tracker_tracker_channel = {
  __typename: "Channel";
  id: string;
  title: string;
  author: T_GQL_tracker_tracker_channel_user;
  members: T_GQL_tracker_tracker_channel_members_user[];
}

export type T_GQL_tracker_tracker_channelCategory = {
  __typename: "ChannelCategory";
  id: string;
  title: string;
}

export type T_GQL_tracker_tracker_reports_responsiblePerson_user = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
}

export type T_GQL_tracker_tracker_reports_responsiblePerson = {
  __typename: "TrackerMember";
  id: string;
  role: ETrackerMemberRole;
  user: T_GQL_tracker_tracker_reports_responsiblePerson_user;
}

export type T_GQL_tracker_tracker_reports_author_user = {
  __typename: "User";
  id: string;
  firstname: string | null;
  lastname: string | null;
}

export type T_GQL_tracker_tracker_reports_author = {
  __typename: "TrackerMember";
  id: string;
  role: ETrackerMemberRole;
  user: T_GQL_tracker_tracker_reports_author_user;
}

export type T_GQL_tracker_tracker_reports = {
  __typename: "IssueReport";
  id: string;
  title: string;
  status: EIssueReportStatus;
  priority: EIssueReportPriority;
  type: EIssueReportType;
  updatedAt: any;
  createdAt: any;
  responsiblePerson: T_GQL_tracker_tracker_reports_responsiblePerson;
  author: T_GQL_tracker_tracker_reports_author;
}

export type T_GQL_tracker_tracker = {
  __typename: "Tracker";
  id: string;
  title: string;
  members: T_GQL_tracker_tracker_members[];
  description: string;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  reports: T_GQL_tracker_tracker_reports[];
  channel: T_GQL_tracker_tracker_channel;
  category: T_GQL_tracker_tracker_channelCategory;
}

export type T_GQL_tracker = {
  tracker: T_GQL_tracker_tracker;
}

export type T_GQL_trackerVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: trackerCreate
// ====================================================

export type T_GQL_trackerCreate_trackerCreate = {
  __typename: "Tracker";
  id: string;
  title: string;
}

export type T_GQL_trackerCreate = {
  trackerCreate: T_GQL_trackerCreate_trackerCreate;
}

export type T_GQL_trackerCreateVariables = {
  channelId: string;
  title: string;
  description?: string | null;
  channelCategoryId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: trackerDelete
// ====================================================

export type T_GQL_trackerDelete = {
  trackerDelete: string;
}

export type T_GQL_trackerDeleteVariables = {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: trackerUpdate
// ====================================================

export type T_GQL_trackerUpdate_trackerUpdate = {
  __typename: "Tracker";
  id: string;
  title: string;
}

export type T_GQL_trackerUpdate = {
  trackerUpdate: T_GQL_trackerUpdate_trackerUpdate;
}

export type T_GQL_trackerUpdateVariables = {
  id: string;
  title: string;
  description?: string | null;
  channelCategoryId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: trackerUpdateMemberRole
// ====================================================

export type T_GQL_trackerUpdateMemberRole_trackerUpdateMemberRole = {
  __typename: "Tracker";
  id: string;
}

export type T_GQL_trackerUpdateMemberRole = {
  trackerUpdateMemberRole: T_GQL_trackerUpdateMemberRole_trackerUpdateMemberRole;
}

export type T_GQL_trackerUpdateMemberRoleVariables = {
  trackerId: string;
  userId: string;
  role: ETrackerMemberRole;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Issue report priority
 */
export enum EIssueReportPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  LOW = "LOW",
  NORMAL = "NORMAL",
}

/**
 * Issue report status
 */
export enum EIssueReportStatus {
  CLOSED = "CLOSED",
  DISCUSSION = "DISCUSSION",
  FULFILMENT = "FULFILMENT",
  NEW = "NEW",
  TO_APPROVE = "TO_APPROVE",
}

/**
 * Issue report type
 */
export enum EIssueReportType {
  FUNCTIONALITY = "FUNCTIONALITY",
  REPORTING = "REPORTING",
  OTHER = "OTHER",
  VULNERABILITY = "VULNERABILITY",
}

/**
 * User role
 */
export enum ERole {
  ADMIN = "ADMIN",
  USER = "USER",
}

/**
 * Tracker member role
 */
export enum ETrackerMemberRole {
  DEV = "DEV",
  GUEST = "GUEST",
  QA = "QA",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
