import { graphqlClient } from '@/lib/graphql-client';
import {
  GET_MY_PROFILE_QUERY,
  GET_PUBLIC_PROFILE_QUERY,
  CREATE_PROFILE_MUTATION,
  UPDATE_PROFILE_MUTATION,
} from '../graphql/queries';
import { UserProfile, UserProfileInput } from '../../types/profile';

export interface ProfileResponse {
  UserProfiles: {
    items: UserProfile[];
  };
}

export const getMyProfile = async (userId: string): Promise<UserProfile | null> => {
  const response = await graphqlClient.query<{ getUserProfiles: { items: UserProfile[] } }>({
    query: GET_MY_PROFILE_QUERY,
    variables: { where: { userId: { eq: userId } } },
  });

  const profiles = response?.getUserProfiles?.items || [];
  return profiles.length > 0 ? profiles[0] : null;
};

export const getPublicProfile = async (username: string): Promise<UserProfile | null> => {
  const response = await graphqlClient.query<{ getUserProfiles: { items: UserProfile[] } }>({
    query: GET_PUBLIC_PROFILE_QUERY,
    variables: { where: { username: { eq: username } } },
  });

  const profiles = response?.getUserProfiles?.items || [];
  return profiles.length > 0 ? profiles[0] : null;
};

export const createProfile = async (input: UserProfileInput) => {
  return graphqlClient.mutate<{ insertUserProfile: { ItemId: string; userId: string; username: string } }>({
    query: CREATE_PROFILE_MUTATION,
    variables: { input },
  });
};

export const updateProfile = async (where: UserProfileFilterInput, input: Partial<UserProfileInput>) => {
  return graphqlClient.mutate<{ updateUserProfile: { ItemId: string; displayName: string } }>({
    query: UPDATE_PROFILE_MUTATION,
    variables: { where, input },
  });
};
