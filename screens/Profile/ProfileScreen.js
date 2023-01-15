// Imports
import React, { useRef, useMemo, useContext, useState } from 'react';
import { View, StyleSheet, SafeAreaView, } from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { useQuery } from '@apollo/client'

// Components
import UserCarousel from './UserReports/UserCarousel';
import BottomSheet from '../BottomSheet';
import MockTable from './MockTable';
import { GET_USER_REPORTS } from '../../src/Queries/UserReportsQueries';
import { UserContext } from '../../shared/userContext';
export default function ProfileScreen({ navigation }) {
  // Bottom Sheet Helpers
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["75%"], []);

  const openModal = () => {
    bottomSheetModalRef.current.present();
  }

  const { user, setUser } = useContext(UserContext);

  let queryVar = user ? user : "2";

  console.log('historyScreen userId: ', user);
  console.log('historyScreen queryVar: ', queryVar);

  const { loading, error, data } = useQuery(GET_USER_REPORTS, {
    variables: { "userId": queryVar },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log(data);
    }

  });
  if (loading) return <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 400 }}>Loading...</Text>;
  if (error) console.log(`Error! ${error}`);

  return (
    <View
      style={styles.container}
    >
      <Avatar.Text
        style={styles.avatar}
        size={50}
        label="JS"
      />
      <View
        style={styles.buttonContainer}
      >
        <Button
          style={styles.button}
          icon="cog"
          mode="elevated"
          onPress={() => navigation.navigate('Settings')}
        >
          SETTINGS
        </Button>
        <Button
          style={styles.button}
          icon="bookmark"
          mode="elevated"
          onPress={openModal}
        >
          SAVED
        </Button>
      </View>
      <UserCarousel data={data} />
      <BottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
      >
        <MockTable data={data}/>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  avatar: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  buttonContainer: {
    padding: 50,
  },
  button: {
    margin: 10,
  },

});