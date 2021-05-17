import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {useUsersQuery} from '../generated/graphql';

const Users = () => {
  const {data, loading, error} = useUsersQuery();

  return (
    <View>
      <Text>Users</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
};

export default Users;
