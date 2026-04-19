import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { getApp } from "@react-native-firebase/app";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation, route }) {

  const [alumniCount, setAlumniCount] = useState(route.params?.count ?? 0);
  const announcementCount = 1;

  // ✅ Runs every time HomeScreen comes back into focus (e.g. after returning from AlumniScreen)
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.count !== undefined) {
        setAlumniCount(route.params.count);
      }
    }, [route.params?.count])
  );

  const logoutUser = () => {
    const auth = getAuth(getApp());
    signOut(auth)
      .then(() => console.log("Logged out"))
      .catch(error => console.log(error.message));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Hello, Default Admin</Text>

        {/* ✅ Simply navigate to AlumniScreen — count will sync on return */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AlumniScreen")}
        >
          <Text style={styles.cardLabel}>Total Alumni</Text>
          <Text style={styles.cardValue}>{alumniCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AnnouncementScreen")}
        >
          <Text style={styles.cardLabel}>Announcements</Text>
          <Text style={styles.cardValue}>{announcementCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{ flex:1, backgroundColor:"#f4f6fb" },
  container:{ padding:20 },
  title:{ fontSize:28, fontWeight:"bold", color:"#1a2a6c" },
  subtitle:{ fontSize:16, color:"#666", marginBottom:25 },
  card:{
    backgroundColor:"#fff",
    borderRadius:15,
    padding:20,
    marginBottom:15,
    borderWidth:1,
    borderColor:"#eee"
  },
  cardLabel:{ fontSize:16, color:"#666" },
  cardValue:{ fontSize:28, fontWeight:"bold", color:"#1a2a6c" },
  logoutButton:{
    marginTop:30,
    borderWidth:1,
    borderColor:"#1a2a6c",
    borderRadius:30,
    paddingVertical:15,
    alignItems:"center"
  },
  logoutText:{
    fontSize:16,
    fontWeight:"600",
    color:"#1a2a6c"
  }
});