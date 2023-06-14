import { gql } from 'graphql-tag'

export const CHANNEL_LEAVE_MUTATION = gql`
    mutation channelLeave($channelId: String!) {
        channelLeave(data: {channelId: $channelId})
    }
`;
