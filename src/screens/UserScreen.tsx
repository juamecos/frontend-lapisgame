import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useMeQuery} from '../generated/graphql';
import {useEffect} from 'react';
import {IUser} from '../interfaces/user.interface';

const UserScreen = () => {
  const [userMe, setUserMe] = useState<IUser>({userName: '', email: ''});
  const {data, loading, error} = useMeQuery();

  useEffect(() => {
    if (loading) {
      return <Text>Loading ...</Text>;
    }
  }, [loading]);

  useEffect(() => {
    if (data) {
      const {user} = data.me.user;
      setUserMe(data.me.user);
    }
  }, [data]);

  return (
    <View>
      <Text>
        Hola {userMe.userName} con email {userMe.email} y ID {userMe.id}
      </Text>
    </View>
  );
};

export default UserScreen;
