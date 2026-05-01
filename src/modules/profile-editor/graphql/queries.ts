export const GET_MY_PROFILE_QUERY = `
  query GetMyProfile($where: UserProfileFilterInput!) {
    getUserProfiles(where: $where) {
      items {
        ItemId
        userId
        username
        displayName
        headline
        bio
        profileImageUrl
        headerImageUrl
        linkedInUrl
        githubUrl
        portfolioUrl
      }
    }
  }
`;

export const GET_PUBLIC_PROFILE_QUERY = `
  query GetPublicProfile($where: UserProfileFilterInput!) {
    getUserProfiles(where: $where) {
      items {
        displayName
        headline
        bio
        profileImageUrl
        headerImageUrl
        linkedInUrl
        githubUrl
        portfolioUrl
      }
    }
  }
`;

export const CREATE_PROFILE_MUTATION = `
  mutation CreateProfile($input: UserProfileInsertInput!) {
    insertUserProfile(input: $input) {
      acknowledged
      itemId
      message
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = `
  mutation UpdateProfile($where: UserProfileFilterInput!, $input: UserProfileUpdateInput!) {
    updateUserProfile(where: $where, input: $input) {
      acknowledged
      itemId
      message
    }
  }
`;
